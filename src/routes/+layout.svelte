<script>
  import "../app.css";
</script>

<svelte:head>
	<title>opencover : みんなの本棚</title>
</svelte:head>

<div class="flex flex-col h-screen justify-between">

<header class="avenir p-3 font-semibold bg-white border-b border-slate-100">
	<div class="flex flex-col sm:flex-row content-between items-center max-w-screen-xl mx-auto my-0 py-2">
		<div class="flex-auto">
			<a href="/">
				<div id="title" class="text-xl tracking-widest">
					<img src="/favicon.png" alt="opencover" class="w-8 h-8 inline" />
					<span class="hidden sm:inline">opencover</span>
				</div>
			</a>
		</div>
	</div>
</header>

<main class="mb-auto">
	<div class="max-w-screen-xl mx-auto my-8">
		<slot />
	</div>
</main>

<footer class="avenir mt-8 h-40 p-3 bg-slate-50">
	<div class="max-w-screen-xl mx-auto my-0 py-8">
		<div class="text-lg font-semibold tracking-widest">opencover</div>
		<div class="text-sm text-slate-400 mt-4">Developed by opencover project.</div>
	</div>
</footer>

</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}
	:global(a) {
		color: #333;
		text-decoration: none;
	}
	:global(*)::selection {
		background-color: #cbd5e1;
	}
	header > div {
		font-size: 14px;
		gap: 2rem;
	}
	/* button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    background-color: #333;
    color: #fff;
    border: 0;
    border-radius: 0.25rem;
    line-height: 1.15;
    padding: .5rem;
  }
  button:hover {
    cursor: pointer;
  } */
	
	@media print {
		* {
			visibility: hidden;
		}
	}
</style>
