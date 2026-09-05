import staticAdapter from '@sveltejs/adapter-static';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import glob from 'tiny-glob';
import * as cheerio from 'cheerio';

const PAGES_DIR = './build';

/**
 * @typedef {Object} AdapterOptions
 * @property {string} [manifestFile] - The name of the manifest file to use. Defaults to 'manifest.json'.
 * @property {boolean} [generateAppIconVariants] - Whether to generate app icon variants. Defaults to true.
 */

/**
 * @param {AdapterOptions} [options]
 * @returns {import('@sveltejs/kit').Adapter} */
export default function (options) {
	return {
		name: 'Chrome Extension Adapter',
		adapt: async (builder) => {
			await staticAdapter().adapt(builder);

			const manifestFile = options?.manifestFile ?? 'manifest.json';

			await extractInlineScripts(builder);
			await writeExtensionManifest(builder, manifestFile);

			if (options?.generateAppIconVariants !== false) {
				await generateAppIconVariants(builder, manifestFile);
			}
		}
	};
}

/**
 * @param {string} value
 */
function hash(value) {
	let hash = 5381;
	let i = value.length;

	if (typeof value === 'string') {
		while (i) hash = (hash * 33) ^ value.charCodeAt(--i);
	} else {
		while (i) hash = (hash * 33) ^ value[--i];
	}

	return (hash >>> 0).toString(36);
}

/**
 * @param {import('@sveltejs/kit').Builder} builder
 */
async function extractInlineScripts(builder) {
	const { log } = builder;

	const filePaths = await glob('**/*.html', {
		cwd: PAGES_DIR,
		dot: true,
		filesOnly: true,
		absolute: true
	});

	for (const filePath of filePaths) {
		const file = readFileSync(filePath, 'utf-8');
		const $ = cheerio.load(file);
		const node = $('script:not([src])').first();

		if (node.length > 0) {
			const scriptContent = node.html();
			if (!scriptContent) continue;

			const scriptHash = hash(scriptContent);
			const scriptFileName = `script-${scriptHash}.js`;
			const scriptFilePath = path.join(PAGES_DIR, scriptFileName);

			// Write the inline script to a separate file
			writeFileSync(scriptFilePath, scriptContent, 'utf-8');

			// Replace the inline script with a reference to the new file
			node.attr('src', scriptFileName);
			node.empty();

			// Save the modified HTML back to the file
			writeFileSync(filePath, $.html(), 'utf-8');

			log(`Extracted inline script from ${filePath} to ${scriptFileName}`);
		}
	}
}

/**
 *
 * @param {import('@sveltejs/kit').Builder} builder
 * @param {string} manifestFile
 */
async function writeExtensionManifest(builder, manifestFile) {
	const { log, getClientDirectory, copy } = builder;

	const manifestPath = path.join(getClientDirectory(), manifestFile);
	if (!existsSync(manifestPath)) {
		log.error(`Could not find ${manifestFile} in the client directory. Please ensure it exists.`);
		return;
	}

	copy(manifestPath, path.join(PAGES_DIR, 'manifest.json'));

	log.success(`Copied ${manifestFile} to ${PAGES_DIR}`);
}

import sharp from 'sharp';

/**
 * Rasterise an icon source (SVG or bitmap) to a square PNG of the given size.
 *
 * @param {string} sourcePath Absolute path to the icon in the client directory.
 * @param {string} destPath Absolute path of the `.png` to write.
 * @param {number} size Edge length in px.
 * @returns {Promise<void>}
 */
async function writeIconVariant(sourcePath, destPath, size) {
	const source = readFileSync(sourcePath);
	const meta = await sharp(source).metadata();

	// SVGs rasterise at 72dpi by default. Re-render at the dpi that lands on
	// `size` rather than upscaling a 72dpi bitmap.
	const density =
		meta.format === 'svg' && meta.width
			? Math.min(Math.ceil((72 * size) / meta.width), 2400)
			: undefined;

	await sharp(source, density ? { density } : {})
		.resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.png({ compressionLevel: 9 })
		.toFile(destPath);
}

/**
 *
 * @param {import('@sveltejs/kit').Builder} builder
 * @param {string} manifestFile
 * @returns
 */
async function generateAppIconVariants(builder, manifestFile) {
	const { log, getClientDirectory } = builder;

	const manifestPath = path.join(getClientDirectory(), manifestFile);
	if (!existsSync(manifestPath)) {
		log.error(`Could not find ${manifestFile} in the client directory. Please ensure it exists.`);
		return;
	}

	const manifestContent = readFileSync(manifestPath, 'utf-8');
	const manifest = JSON.parse(manifestContent);

	if (manifest.action && manifest.action.default_icon) {
		const iconPath = path.join(getClientDirectory(), manifest.action.default_icon);
		if (existsSync(iconPath)) {
			const sizes = [16, 24, 32];
			/** @type {Record<string, string>} */
			const icons = {};

			for (const size of sizes) {
				const fileName = `icon-${size}.png`;
				await writeIconVariant(iconPath, path.join(PAGES_DIR, fileName), size);
				icons[String(size)] = fileName;
			}

			// Point the emitted manifest at the generated PNGs.
			const builtManifestPath = path.join(PAGES_DIR, 'manifest.json');
			const builtManifest = JSON.parse(readFileSync(builtManifestPath, 'utf-8'));
			builtManifest.action.default_icon = icons;
			builtManifest.icons ??= icons;
			writeFileSync(builtManifestPath, JSON.stringify(builtManifest, null, 2), 'utf-8');

			log.success(`Copied app icon "${manifest.action.default_icon}" variants to ${PAGES_DIR}`);
		} else {
			log.error(`Could not find app icon at ${iconPath}. Please ensure it exists.`);
		}
	} else {
		log.error(`No default_icon specified in ${manifestFile}. Please ensure it is defined.`);
	}
}
