<script>
  import { onMount } from 'svelte';
  const { postUrl } = $props();
  
  onMount(() => {
    // スクリプトがまだ読み込まれていない場合は読み込む
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else if (window.instgrm) {
      // すでに読み込まれている場合は処理を実行
      window.instgrm.Embeds.process();
    }
  });
</script>

<div class="instagram-embed-container">
  <blockquote 
    class="instagram-media" 
    data-instgrm-permalink={postUrl}
    data-instgrm-version="14"
    style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:calc(100% - 2px);">
  </blockquote>
</div>