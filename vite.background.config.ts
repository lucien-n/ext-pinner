import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	},
	build: {
		outDir: 'build',
		emptyOutDir: false,
		lib: {
			entry: 'src/background.ts',
			formats: ['es'],
			fileName: () => 'background.js'
		}
	}
});
