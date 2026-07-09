# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenCover.jp is a SvelteKit web application deployed on Cloudflare Workers that generates book cover images and provides book-related APIs. The project focuses on creating visual representations of books using ISBN data and custom styling.

## Development Commands

- **Development server**: `npm run dev` (runs on host with `host: true` in vite config)
- **Build**: `npm run build` (builds for Cloudflare Workers)
- **Preview**: `npm run preview`
- **Deploy**: Uses wrangler for Cloudflare Workers deployment

## Architecture

### Core Structure
- **Framework**: SvelteKit 2.x with Svelte 5.x (using modern runes API)
- **Deployment**: Cloudflare Workers via `@sveltejs/adapter-cloudflare`
- **Styling**: Tailwind CSS 4.x with PostCSS
- **Package Manager**: pnpm with specific built dependencies config

### Key Components
- **Book Components**: `Book.svelte`, `BookFront.svelte`, `BookSpine.svelte` - Core visual book representations (`BookFront`/`BookSpine` share `CoverImage.svelte`)
- **Image Generation**: Delegated to the upstream `oc-image` worker; the OG route proxies via `src/lib/server/og.ts`
- **API Routes**: RESTful endpoints under `/api/` for book data, images, and styles

### External Services
The application integrates with three upstream Cloudflare Workers. Base URLs are
centralized in `src/lib/server/upstream.ts`, and the `/api` routes proxy to them
via `fetch`. Note: `oc-bib`/`oc-style` service bindings are also declared in
`wrangler.jsonc`, but the current code paths call the workers over HTTP rather
than through the bindings.
- **oc-image**: Cover/OG image generation, cover metadata, random ISBN
- **oc-bib**: Book bibliographic data
- **oc-style**: Book styling information

### API Structure
- `/api/bib/[isbn]`: Book bibliographic data
- `/api/og/[isbn]`: OpenGraph image generation
- `/api/style/isbn/[isbn]`: Book styling by ISBN (used for spine height)
- `/api/v1/image/cover/spine/[isbn]`: Book spine image generation

### Image Handling
- External images served from `image.opencover.jp`
- Cover/OG image generation is delegated to the upstream `oc-image` worker
  (this app no longer bundles satori/resvg/yoga locally)

### Security
- Content Security Policy configured in `svelte.config.js` (`kit.csp`, hash mode)
- CORS headers for API endpoints centralized in `src/lib/server/cors.ts`
- Upstream credentials (Rakuten / ValueCommerce) are read from environment
  variables via `$env/dynamic/private`; see `.dev.vars.example`

### Route Structure
- `/shelf/isbn/[isbn]`: Book shelf view
- `/goto/[service]/[isbn]`: External service redirects

## Development Notes

### Environment Considerations
- Uses `nodejs_compat` flag for Cloudflare Workers
- Development and production CSP policies differ
- Host binding enabled for network access during development

### Key Dependencies
- ISBN handling via `isbn3`
- Lucide icons via `@lucide/svelte`
- Tailwind CSS 4.x (via `@tailwindcss/vite`)

### Svelte 5 Features
- Uses modern runes API (`$props`, `$state`, `$derived`)
- Component architecture with prop destructuring
- Reactive state management with runes