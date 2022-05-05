import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import sveld from 'vite-plugin-sveld';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [sveld()],
			ssr: {
				noExternal: ['@fortawesome/free-solid-svg-icons']
			}
		}
	}
};

export default config;
