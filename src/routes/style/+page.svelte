<script lang="ts">
  let { data } = $props();

  const categories = [
    { name: 'shinsho', label: '新書', styles: [] },
    { name: 'bunko', label: '文庫', styles: [] },
    { name: 'others', label: 'その他', styles: [] }
  ];

  const specificCategoryNames = categories
    .filter(category => category.name !== 'others')
    .map(category => category.name);

  categories.forEach((category) => {
    if (category.name === 'others') {
      category.styles = data.styles.filter(
      (style) => !specificCategoryNames.includes(style.type)
    );
    } else {
      category.styles = data.styles.filter((style) => style.type === category.name)
    }
  });
  
</script>

<h1 class="text-2xl font-bold my-8">Style</h1>

{#each categories as category}
  <h2>{category.label}</h2>
  <div class="flex flex-wrap">
    {#each category.styles as style}
    <a href={`/style/edit/${style.name}`}>
      <div class="flex flex-col items-start p-2 border border-slate-200 rounded m-2 hover:bg-slate-200">
        <div>{style['name-ja']}</div>
        <div class="text-xs text-slate-400">{style.name}</div>
      </div>
    </a>
    {/each}
  </div>
{/each}
