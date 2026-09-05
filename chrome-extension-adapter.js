import staticAdapter from '@sveltejs/adapter-static';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import glob from 'tiny-glob';
import * as cheerio from 'cheerio';

const PAGES_DIR = './build';

/**
 * @typedef {Object} AdapterOptions
 * @property {string} [manifestFile] -
 */

/**
 * @param {AdapterOptions} [options]
 * @returns {import('@sveltejs/kit').Adapter} */
export default function (options) {
	return {
		name: 'Chrome Extension Adapter',
		adapt: async (builder) => {
			staticAdapter().adapt(builder);

			await extractInlineScripts(builder);
			await writeExtensionManifest(builder, options?.manifestFile ?? 'manifest.json');
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
	// const filePaths = relativeFilesPaths.map((filePath) => path.join(PAGES_DIR, filePath));

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
			// node.removeAttr('type');
			// node.removeAttr('defer');
			// node.removeAttr('async');
			// node.removeAttr('nomodule');
			// node.removeAttr('crossorigin');
			// node.removeAttr('integrity');
			// node.removeAttr('referrerpolicy');
			// node.removeAttr('nonce');
			// node.removeAttr('charset');
			// node.removeAttr('language');
			// node.removeAttr('data-main');

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

	copy(manifestPath, path.join(getClientDirectory(), 'manifest.json'));

	log.success(`Copied manifest.json to ${getClientDirectory()}`);
}
