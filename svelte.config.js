import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// See https://kit.svelte.dev/docs/adapter-cloudflare#options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		prerender: {
			handleHttpError: 'warn'  // or 'ignore' if you want to ignore 404s
		},
		csp: {
			mode: 'hash', // nonceではなくhash方式を使う
			directives: {
				'default-src': ['self'],
				'script-src': [
					'self',
					'unsafe-hashes',
					'sha256-o7BOxdVV6xcmDScAB6rKnsnCJaYf+08VYM44zH8a3IA=',
					'sha256-7dQwUgLau1NFCCGjfn9FsYptB6ZtWxJin6VohGIu20I=',
					'https://www.googletagmanager.com',
					'https://static.cloudflareinsights.com',
					'https://www.instagram.com'
				],
				'script-src-attr': [
					'unsafe-hashes',
					'sha256-7dQwUgLau1NFCCGjfn9FsYptB6ZtWxJin6VohGIu20I='
				],
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:', 'https://image.opencover.jp'],
				'font-src': ['self', 'data:'],
				'connect-src': ['self', 'https://cloudflareinsights.com'],
				'frame-src': ['self', 'https://www.googletagmanager.com', 'https://www.instagram.com'],
				'object-src': ['none']
			}
		}
	}
};

export default config;
