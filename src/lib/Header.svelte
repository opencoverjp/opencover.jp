<script>
  import { onMount } from 'svelte';

  let isOpen = false;
  let isMobile = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }

  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }

  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });

</script>

<header class="avenir font-semibold p-4 border-b border-slate-200 bg-white">
  <div class="container mx-auto flex justify-between items-center relative">
    
    <a href="/">
      <div id="title" class="flex items-center gap-2">
        <img src="/favicon.png" alt="opencover" class="w-8 h-8 inline" />
        <span class="hidden sm:inline text-xl tracking-widest">opencover</span>
      </div>
    </a>

    <div class="flex items-center">
      {#if isMobile}
        <button aria-label="Menu" onclick={toggleMenu} class="md:hidden z-20 ml-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      {/if}
      
      <nav class={`${isMobile ? (isOpen ? 'block' : 'hidden') : 'block'} md:block`}>
        <ul class={`${isMobile ? 'text-sm flex flex-col absolute top-full right-0 bg-slate-50 rounded p-4 w-48 shadow-lg z-50' : 'text-sm flex items-center space-x-4'}`}>
          <li><a href="/how-to-use" class="rounded hover:bg-slate-100 block p-2" onclick={closeMenu}>つかいかた</a></li>
          <li><a href="/about" class="rounded hover:bg-slate-100 block p-2" onclick={closeMenu}>About</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>
