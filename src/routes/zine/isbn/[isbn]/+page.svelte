<script>
  import Book from "../../../../lib/Book.svelte";
  import BookSpine from "../../../../lib/BookSpine.svelte";
  import PreviewBook from "../../../../lib/PreviewBook.svelte";
  import BookCard from "./BookCard.svelte";
  import html2canvas from "html2canvas";

  let { data } = $props();
  let books = $derived(data.books);
  let bgColor = $derived(data.bgColor);
  let title = $derived(data.title);
  let isSingleBook = $derived(data.isSingleBook);
  let meta = $derived(data.meta);

  function captureBookbox(
    elementSelector = "#bookbox",
    filename = "bookshelf.png",
  ) {
    console.log("Starting capture process...");

    const element = document.querySelector(elementSelector);
    if (!element) {
      console.error(`Element not found: ${elementSelector}`);
      return;
    }

    // First, ensure all images are loaded
    const images = element.querySelectorAll("img");
    console.log(`Found ${images.length} images in element`);

    // Force a reload of each image and ensure they have crossorigin set
    const imagePromises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        // Create a new image to test loading
        const testImg = new Image();
        testImg.crossOrigin = "anonymous";

        testImg.onload = () => {
          console.log(`Image loaded successfully: ${img.src}`);
          img.crossOrigin = "anonymous";
          resolve();
        };

        testImg.onerror = (error) => {
          console.error(`Failed to load image: ${img.src}`, error);
          reject(error);
        };

        testImg.src = img.src;
      });
    });

    // Wait for all images to load before starting capture
    Promise.allSettled(imagePromises).then((results) => {
      // Log any failures
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.warn(`Image ${index} failed to load: ${result.reason}`);
        }
      });

      console.log("Proceeding with capture...");

      // Add a class to the element to ensure all contents are visible during capture
      element.classList.add("html2canvas-capture");

      // Define custom style to make sure everything is visible during capture
      const style = document.createElement("style");
      style.textContent = `
        .html2canvas-capture * {
          visibility: visible !important;
          opacity: 1 !important;
          display: inline-block !important;
        }
        .html2canvas-capture img {
          display: inline-block !important;
        }
      `;
      document.head.appendChild(style);

      // Use html2canvas with maximum compatibility settings
      html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 4, // Higher quality
        useCORS: true,
        allowTaint: true,
        logging: true,
        imageTimeout: 15000, // Longer timeout for images
        ignoreElements: (element) => {
          // Ignore comment nodes and empty text nodes
          return (
            element.nodeType === 8 ||
            (element.nodeType === 3 && element.textContent.trim() === "")
          );
        },
        onclone: (documentClone) => {
          // Get the cloned element in the shadow DOM
          const clonedElement = documentClone.querySelector(elementSelector);
          if (!clonedElement) {
            console.error("Could not find cloned element");
            return;
          }

          // Make sure images in the clone have crossorigin attribute
          const clonedImages = clonedElement.querySelectorAll("img");
          clonedImages.forEach((img) => {
            img.crossOrigin = "anonymous";
            img.style.display = "inline-block";
            img.style.visibility = "visible";
            img.style.opacity = "1";

            // Log image details for debugging
            console.log("Cloned image:", {
              src: img.src,
              width: img.width,
              height: img.height,
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
              complete: img.complete,
            });
          });

          console.log(`Processed ${clonedImages.length} images in clone`);
        },
      })
        .then((canvas) => {
          console.log("Canvas created:", {
            width: canvas.width,
            height: canvas.height,
          });

          // Remove our temporary style and class
          document.head.removeChild(style);
          element.classList.remove("html2canvas-capture");

          // Create a download link for the image
          const imageUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = imageUrl;
          downloadLink.download = filename;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          console.log("Download initiated");
        })
        .catch((error) => {
          console.error("Capture failed:", error);

          // Clean up even if there was an error
          document.head.removeChild(style);
          element.classList.remove("html2canvas-capture");

          // Fall back to a simple canvas method
          // tryFallbackCapture(element, filename);
        });
    });
  }
</script>

<div class="md:w-8/12 p-4 mx-auto">
  <h3 class="title text-xl font-bold my-8">
    {title}
  </h3>

  <!-- <div class="my-8">
    <PreviewBook
      {books}
      {bgColor}
      link={`/goto/amazon/${books.at(0).book?.isbn}`}
      />
  </div> -->

  <div
    id="bookbox"
    class="flex justify-center items-end border-[24px] border-[#888888] p-[12px] w-[689px] h-[429px]"
  >
    {#each books as book, i (book.isbn)}
      <Book {book} index={i} scale={2} --border-color="#ccc" />
      <!-- <BookSpine isbn={book.isbn} --border-color="#ccc" /> -->
    {/each}
  </div>

  <button
    id="download"
    class="bg-black text-white px-4 py-2 rounded mt-4"
    onclick={() => captureBookbox("#bookbox")}
  >
    本箱の画像をダウンロード
  </button>

  <div>
    {#each [...books].reverse() as book, i (book.isbn)}
      {book.book.author.replace(/\s*\[*著\]*$/, "")}『{book.book.title}』{book
        .book.label}、{book.book.date.slice(0, 4)}年。<br />
    {/each}
  </div>

  <div class="mt-4">
    {#each [...books].reverse() as book, i (book.isbn)}
      {book.book.author.replace(/\s*\[*著\]*$/, "")}『{book.book.title}{book
        .book.subtitle
        ? `──${book.book.subtitle}`
        : ""}』{book.book.label}、{book.book.date.slice(0, 4)}年。<br />
    {/each}
  </div>
</div>

<svelte:head>
  <title>{meta.title}</title>
  <meta property="og:url" content={meta.url} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.image} />
  <meta property="og:type" content="article" />
  <meta
    property="og:site_name"
    content="opencover : みんなでつくる書籍カバー画像"
  />
  <meta name="description" content={meta.description} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<style>
  .title {
    font-feature-settings: "palt";
  }
</style>
