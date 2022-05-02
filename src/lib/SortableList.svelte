<script lang="ts">
	import { onDestroy } from 'svelte';
	import Sortable, { type Options } from 'sortablejs';

	let list: HTMLElement;
	let sortable: Sortable;
	let className: string;
	export { className as class };
	export let options: Options | undefined = {};

	$: if (list) {
		sortable = Sortable.create(list, options);
	}

	onDestroy(() => {
		if (sortable) {
			sortable.destroy();
		}
	});
</script>

<div bind:this={list} class={className}>
	<slot />
</div>
