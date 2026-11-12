<script lang="ts">
  import { Forward, X as Close, Ellipsis } from "@lucide/svelte";
  import { siX, siBluesky, siFacebook, siLine } from "simple-icons";

  // url: 共有するページ(本棚ページ)の絶対 URL。OG 画像は共有先がそのページの meta から取る
  // text: 投稿文の初期値
  // image: 「その他」(OS の共有メニュー)で一緒に渡す画像のパス(同じオリジンの OG 画像)。
  //   Instagram など、リンクの投稿画面を持たないアプリへは画像として渡す
  // onopenchange: ダイアログを開いた・閉じたときに呼ぶ(開いている間、親が自動再生を止めるなど)
  let {
    url,
    text = "",
    image = "",
    disabled = false,
    onopenchange = undefined,
  }: {
    url: string;
    text?: string;
    image?: string;
    disabled?: boolean;
    onopenchange?: (open: boolean) => void;
  } = $props();

  const enc = encodeURIComponent;

  // 各 SNS の投稿画面へのリンク(外部スクリプトを読み込まない)。アイコンは simple-icons のロゴ
  let services = $derived([
    { name: "X", icon: siX, href: `https://x.com/intent/post?text=${enc(text)}&url=${enc(url)}` },
    { name: "Bluesky", icon: siBluesky, href: `https://bsky.app/intent/compose?text=${enc(text ? `${text} ${url}` : url)}` },
    { name: "Facebook", icon: siFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { name: "LINE", icon: siLine, href: `https://social-plugins.line.me/lineit/share?url=${enc(url)}` },
  ]);

  let dialog: HTMLDialogElement;

  function open() {
    copied = false;
    prefetchImage();
    dialog.showModal();
    onopenchange?.(true);
  }

  // ---- その他: OS の共有メニュー(Web Share API)。対応している端末(主にスマホ)でだけ出す ----
  let canNativeShare = $state(false);
  $effect(() => {
    canNativeShare = typeof navigator.share === "function";
  });

  // 共有メニューは、クリックから時間が空くと開けない(特に Safari)。
  // クリック後に画像を取りに行くと間に合わないので、ダイアログを開いたときに先に取っておく
  let imageFile = $state<File | null>(null);
  let imageFor = "";
  async function prefetchImage() {
    if (!canNativeShare || !image || imageFor === image) return;
    const target = image;
    imageFor = target;
    imageFile = null;
    try {
      const response = await fetch(target);
      if (!response.ok) throw new Error(`${response.status}`);
      const blob = await response.blob();
      // 取得中に本棚が変わっていたら捨てる
      if (imageFor === target) {
        imageFile = new File([blob], "opencover-shelf.png", { type: blob.type || "image/png" });
      }
    } catch {
      // 画像が取れなくても、URL だけで共有できる。次に開いたときに取り直す
      if (imageFor === target) imageFor = "";
    }
  }

  async function nativeShare() {
    const data: ShareData = { title: text, text, url };
    // 画像を渡せる端末なら画像も添える(Instagram などは画像として受け取る)
    if (imageFile && navigator.canShare?.({ files: [imageFile] })) {
      data.files = [imageFile];
    }
    try {
      await navigator.share(data);
    } catch {
      // キャンセルされたとき(AbortError)などは何もしない
    }
  }

  // 背景(ダイアログの外側)をクリックしたら閉じる。中身は内側の div が受けるので、
  // target が dialog 自身のときだけ外側のクリック
  function handleDialogClick(event: MouseEvent) {
    if (event.target === dialog) dialog.close();
  }

  let copied = $state(false);
  let copiedTimer: ReturnType<typeof setTimeout> | undefined;
  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
      clearTimeout(copiedTimer);
      copiedTimer = setTimeout(() => (copied = false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない(URL 欄から手でコピーできる)
    }
  }

  const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yslate-400";
</script>

<button
  type="button"
  class="size-10 shrink-0 flex items-center justify-center rounded-full bg-yslate-100 text-yslate-800 enabled:hover:bg-yslate-200 enabled:cursor-pointer disabled:opacity-40 {focusRing}"
  onclick={open}
  {disabled}
  aria-label="共有"
  title="共有"
>
  <Forward class="size-5" />
</button>

<dialog
  bind:this={dialog}
  class="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl bg-white text-yslate-800 shadow-2xl backdrop:bg-black/50"
  aria-labelledby="share-dialog-title"
  onclick={handleDialogClick}
  onclose={() => onopenchange?.(false)}
>
  <div class="p-5">
    <div class="flex items-center justify-between mb-4">
      <h2 id="share-dialog-title" class="text-base font-medium">共有</h2>
      <button
        type="button"
        class="size-9 -mr-2 flex items-center justify-center rounded-full hover:bg-yslate-100 cursor-pointer {focusRing}"
        onclick={() => dialog.close()}
        aria-label="閉じる"
      >
        <Close class="size-5" />
      </button>
    </div>

    <!-- SNS のアイコン。幅が足りないときは横スクロール -->
    <ul class="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
      {#each services as service (service.name)}
        <li class="shrink-0">
          <a
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            class="group w-16 flex flex-col items-center gap-1.5 rounded-lg {focusRing}"
          >
            <span
              class="size-14 flex items-center justify-center rounded-full bg-yslate-100 group-hover:bg-yslate-200 transition-colors"
            >
              <svg viewBox="0 0 24 24" class="size-7" aria-hidden="true">
                <path d={service.icon.path} fill={`#${service.icon.hex}`} />
              </svg>
            </span>
            <span class="text-xs text-yslate-700">{service.name}</span>
          </a>
        </li>
      {/each}
      {#if canNativeShare}
        <li class="shrink-0">
          <button
            type="button"
            class="group w-16 flex flex-col items-center gap-1.5 rounded-lg cursor-pointer {focusRing}"
            onclick={nativeShare}
            title="Instagram などのアプリで共有"
          >
            <span
              class="size-14 flex items-center justify-center rounded-full bg-yslate-100 group-hover:bg-yslate-200 transition-colors"
            >
              <Ellipsis class="size-7 text-yslate-700" />
            </span>
            <span class="text-xs text-yslate-700">その他</span>
          </button>
        </li>
      {/if}
    </ul>

    <!-- URL とコピー -->
    <div class="mt-4 flex items-center gap-2 p-1.5 pl-3 rounded-lg border border-yslate-300 bg-yslate-50">
      <input
        type="text"
        readonly
        value={url}
        class="flex-1 min-w-0 bg-transparent text-sm text-yslate-800 outline-none"
        aria-label="共有する URL"
        onfocus={(e) => e.currentTarget.select()}
      />
      <button
        type="button"
        class="shrink-0 h-8 px-4 rounded-full bg-yslate-800 text-sm font-medium text-white hover:bg-yslate-900 cursor-pointer {focusRing}"
        onclick={copyUrl}
      >
        {copied ? "コピーしました" : "コピー"}
      </button>
    </div>
  </div>
</dialog>
