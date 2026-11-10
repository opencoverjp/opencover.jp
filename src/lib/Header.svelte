<script>
  // モバイル/デスクトップの切り替えは CSS（md: ブレークポイント）だけで行う。
  // JS で画面幅を判定すると、SSR 直後にモバイルでデスクトップ用メニューが一瞬表示されてしまう。
  let isOpen = $state(false);

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }
</script>

<header class="avenir font-semibold p-4 border-b border-slate-200 bg-white">
  <div class="max-w-screen-xl mx-auto flex justify-between items-center relative">

    <a href="/">
      <div id="title" class="flex items-center gap-2">
        <img src="/favicon.png" alt="opencover" class="w-8 h-8 inline" />
        <span class="hidden sm:inline text-xl tracking-widest">opencover</span>
      </div>
    </a>

    <div class="flex items-center">
      <button
        aria-label="メニュー"
        aria-expanded={isOpen}
        aria-controls="site-nav"
        onclick={toggleMenu}
        class="md:hidden z-20 ml-auto"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <nav id="site-nav" class={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul class="text-sm flex flex-col absolute top-full right-0 bg-slate-50 rounded p-4 w-48 shadow-lg z-50 md:static md:flex-row md:items-center md:space-x-4 md:bg-transparent md:p-0 md:w-auto md:shadow-none">
          <li><a href="/how-to-use" class="rounded hover:bg-slate-100 block p-2" onclick={closeMenu}>使いかた</a></li>
          <li><a href="/faq" class="rounded hover:bg-slate-100 block p-2" onclick={closeMenu}>よくある質問</a></li>
          <li><a href="/about" class="rounded hover:bg-slate-100 block p-2" onclick={closeMenu}>opencover</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>
