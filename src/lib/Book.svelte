<script>
  import { onMount } from 'svelte';
  import BookFront from './BookFront.svelte';
  import BookSpine from './BookSpine.svelte';

  const { book, tabindex } = $props();

  // let styleUrl = `https://oc-style.sugi2000.workers.dev/${label}`;
  let imageUrl = $derived(`https://image.opencover.jp/v1/cover/spine/${book.isbn}.webp`);
    
  const scale = 2.5;
  let width = $state(173 * scale);
  let height = $state(173 * scale);
  let loading = $state(true);
  let error = $state(null);


  async function getImageDimensions(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({
            width: img.naturalWidth,
            height: img.naturalHeight
        });
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    });
  }

  async function updateBookHeight(isbn) {
    loading = true;
    error = null;
    
    try {
      // const dimensions = await getImageDimensions(imageUrl);
      // width = dimensions.width;
      
      const response = await fetch(`/api/style/isbn/${isbn}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const style = await response.json();
      console.log({style});
      height = style.height * scale;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  // book.isbnが変更されたときに高さを更新
  $effect(() => {
    if (book && book.isbn) {
      updateBookHeight(book.isbn);
    }
  });

  // onMount(async () => {
  //   try {
  //       const dimensions = await getImageDimensions(imageUrl);
  //       width = dimensions.width;
  //       // height = dimensions.height;
  //       const response = await fetch(`/api/style/isbn/${book.isbn}`);
  //       if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //       }
  //       const style = await response.json();
  //       console.log({style});
  //       height = style.height * scale;
  //   } catch (err) {
  //       error = err.message;
  //   } finally {
  //       loading = false;
  //   }
  // });

  function handleBookClick(event, isbn) {
    event.preventDefault();
    event.stopPropagation();
    const url = `/goto/amazon/${isbn}`;
    window.open(url, "_blank");
  }
</script>

<div class="flex items-end gap-0.5 transition-all duration-300 ease-in-out"
  style="height: {height}px;"
  >
  <button
    class="h-full flex items-end shadow-lg hover:ring hover:ring-slate-400 hover:-translate-y-2 hover:brightness-105 transition-transform cursor-pointer"
    onclick={(e) => handleBookClick(e, book.isbn)}
    {tabindex}
  >
    {#if book.displaySides?.find(d => d === 'front')}
      <BookFront isbn={book.isbn} />
    {/if}
    {#if book.displaySides?.find(d => d === 'spine')}
      <BookSpine isbn={book.isbn} />
    {/if}
  </button>
</div>
