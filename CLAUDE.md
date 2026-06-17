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
- **Deployment**: Cloudflare Workers via `@sveltejs/adapter-cloudflare-workers`
- **Styling**: Tailwind CSS 4.x with PostCSS
- **Package Manager**: pnpm with specific built dependencies config

### Key Components
- **Book Components**: `Book.svelte`, `BookFront.svelte`, `BookSpine.svelte` - Core visual book representations
- **Image Generation**: Uses resvg-wasm, satori, and yoga-wasm for server-side image rendering
- **API Routes**: RESTful endpoints under `/api/` for book data, images, and styles

### External Services
The application integrates with external services via Cloudflare Worker bindings:
- **BIB Service** (`oc-bib`): Book bibliographic data
- **STYLE Service** (`oc-style`): Book styling information

### API Structure
- `/api/bib/[isbn]`: Book bibliographic data
- `/api/og/[isbn]`: OpenGraph image generation
- `/api/style/isbn/[isbn]`: Book styling by ISBN
- `/api/v1/style/`: Style API endpoints
- `/api/v1/image/cover/spine/[isbn]`: Book spine image generation

### Image Handling
- External images served from `image.opencover.jp`
- WASM modules for image processing (resvg, yoga)
- Dynamic image generation using satori for SVG-to-PNG conversion

### Security
- Content Security Policy configured in `hooks.server.ts`
- Different CSP rules for development vs production
- CORS headers configured for API endpoints

### Route Structure
- `/shelf/isbn/[isbn]`: Book shelf view
- `/style/`: Style management
- `/goto/[service]/[isbn]`: External service redirects

## Development Notes

### Environment Considerations
- Uses `nodejs_compat` flag for Cloudflare Workers
- Development and production CSP policies differ
- Host binding enabled for network access during development

### Key Dependencies
- ISBN handling via `@pubdate/isbn`
- Image generation stack: satori, resvg-wasm, yoga-wasm-web
- D3.js for data visualization
- Amazon Product Advertising API integration

### Svelte 5 Features
- Uses modern runes API (`$props`, `$state`, `$derived`)
- Component architecture with prop destructuring
- Reactive state management with runes