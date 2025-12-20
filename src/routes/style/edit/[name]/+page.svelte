<script>
  let { data } = $props();
  // let { style, css } = data;

  let styleMessage = $state("");
  let styleMessageType = $state("");

  async function handleStyleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const styleData = form.elements.style.value;
    const response = await fetch(`/api/v1/style/${data.style.name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: styleData,
    });

    const result = await response.json();

    if (response.ok) {
      styleMessage = "Style saved successfully!";
      styleMessageType = "success";
    } else {
      styleMessage = "Failed to save style.";
      styleMessageType = "error";
    }
  }
</script>

<div class="my-8">
  <h1 class="text-2xl font-bold">{data.style["name-ja"]}</h1>
  <h2 class="text-xl font-bold">{data.style.name}</h2>
</div>

<div style="height: 80lvh">
  <div class="flex gap-4 h-full">
    <div class="flex-1 h-full flex flex-col gap-4">
      <form onsubmit={handleStyleSubmit} class="flex flex-col h-full">
        <button
          type="submit"
          class="bg-slate-100 border border-slate-400 rounded m-4 p-2"
          >Save</button
        >
        {#if styleMessage}
          <div
            class={`mt-2 text-sm ${styleMessageType === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {styleMessage}
          </div>
        {/if}
        <label for="json" class="text-sm font-semibold">JSON</label>
        <textarea
          name="style"
          class="p-4 w-full h-full
        bg-slate-50 border border-slate-400 text-sm font-mono rounded"
          >{JSON.stringify(data.style, null, 2)}</textarea
        >
      </form>
    </div>
    <div class="flex-1 h-full flex flex-col gap-4">
      <form
        action={`/api/v1/generate/${data.style.name}`}
        method="POST"
        class="flex flex-col h-full"
      >
        <button
          type="submit"
          class="bg-slate-100 border border-slate-400 rounded m-4 p-2"
          >Generate CSS</button
        >
        <label for="css" class="text-sm font-semibold">CSS</label>
        <textarea
          name="css"
          disabled
          class="p-4 w-full h-full
        bg-slate-100 border border-slate-400 text-sm font-mono rounded text-slate-500 select-none"
          >{data.css}</textarea
        >
      </form>
    </div>
  </div>
</div>
