<script lang="ts">
	import docs from '$lib/SortableList.svelte?raw&sveld';
</script>

{#each docs.props as prop}
	---<br />
	<br />
	#### `{prop.name}` option<br />
	Type: {prop.type?.replace(/'/g, '"')}<br />
	<br />
	Default Value: {prop.value?.replace(/'/g, '"') ?? ''}<br />
	<br />
	{@html prop.description ? prop.description : ''}<br />
	<br />
{/each}
<br />
---
