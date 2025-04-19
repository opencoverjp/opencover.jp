<script lang="ts">
  import "../app.css";
	import { navigating } from '$app/state';
	import Header from "../lib/Header.svelte";
	import Footer from "../lib/Footer.svelte";
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>opencover : みんなでつくる書籍カバー画像</title>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
	{@html `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MPGLQ8VW');</script>`}
  {@html `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "93b323d9ed184579948095473421a257"}'></script>`}
</svelte:head>

{#if navigating.to}
  <div class="loading-indicator">
    <div class="spinner"></div>
    <p>読み込み中...</p>
  </div>
{/if}

<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MPGLQ8VW" title="Google Tag Manager" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	

<div class="flex flex-col min-h-screen justify-between">
  <div class="fixed top-0 left-0 right-0 z-50">
    <Header />
  </div>
  
  <main class="flex-grow pt-header">
		<div class="max-w-screen-xl mx-auto">
			{@render children()}
			<!-- <slot /> -->
		</div>
	</main>

	<Footer />

</div>

<style>
  :global(:root) {
    --header-height: 69px;
  }
  
  .pt-header {
    padding-top: var(--header-height);
  }

  .loading-indicator {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>