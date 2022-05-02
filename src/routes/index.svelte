<script lang="ts">
	import type { Options } from 'sortablejs';
	import Slider from '@bulatdashiev/svelte-slider';
	import SortableList from '$lib/SortableList.svelte';
	import { FontAwesomeIcon } from 'fontawesome-svelte';
	import { library } from '@fortawesome/fontawesome-svg-core';
	import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

	library.add(faArrowsAlt);

	let invertSwap = false;
	let isHorizontal = true;
	let sliderValue: [number, number] = [0.5, 1];
	let options: Options[] = Array(8);
	let selectOptions: SelectOption[] = [
		{ isHorizontal: true, text: 'Horizontal' },
		{ isHorizontal: false, text: 'Vertical' }
	];
	let selected = selectOptions[0];

	$: boxWidth = 200 * sliderValue[0];
	$: boxLeft = (200 - boxWidth) / 2;

	type ItemList = { item: string; filtered?: boolean }[];
	type SelectOption = { isHorizontal: boolean; text: string };

	const exampleItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];
	const exampleItemsFilter: ItemList = [
		{ item: 'Item 1' },
		{ item: 'Item 2' },
		{ item: 'Item 3' },
		{ item: 'Item 4 - Filtered', filtered: true },
		{ item: 'Item 5' },
		{ item: 'Item 6' }
	];

	const updateSelection = () => {
		if (selected) isHorizontal = selected.isHorizontal;
	};

	// Example 1
	options[0] = {
		animation: 150,
		ghostClass: 'bg-info'
	};

	// Example 2
	options[1] = {
		group: 'shared2', // set both lists to same group
		animation: 150
	};

	// Example 3
	options[2] = {
		group: {
			name: 'shared3',
			pull: 'clone' // To clone: set pull to 'clone'
		},
		animation: 150
	};

	// Example 4
	options[3] = {
		group: {
			name: 'shared4',
			pull: 'clone',
			put: false // Do not allow items to be put into this list
		},
		animation: 150,
		sort: false // To disable sorting: set sort to false
	};

	options[4] = {
		group: 'shared4',
		animation: 150
	};

	// Example 5 - Handle
	options[5] = {
		handle: '.handle', // handle's class
		animation: 150
	};

	// Example 6 - Filtered
	options[6] = {
		filter: '.filtered', // 'filtered' class is not draggable
		animation: 150
	};
</script>

<div class="container mb-4">
	<h1>Welcome to Svelte-SortableJS.</h1>

	<div id="intro-text">This is the sandbox. Examples.</div>

	<div id="simple-list">
		<h2>Example 1 - Simple List</h2>

		<SortableList class="list-group col" options={options[0]}>
			{#each exampleItems as item}
				<div class="list-group-item">
					{item}
				</div>
			{/each}
		</SortableList>
	</div>

	<div id="shared-list" class="mt-4">
		<h2>Example 2 - Shared Lists</h2>

		<div class="d-flex">
			<SortableList class="list-group col" options={options[1]}>
				{#each exampleItems as item}
					<div class="list-group-item bg-secondary text-white">{item} - Group 1</div>
				{/each}
			</SortableList>

			<SortableList class="list-group col" options={options[1]}>
				{#each exampleItems as item}
					<div class="list-group-item">{item} - Group 2</div>
				{/each}
			</SortableList>
		</div>
	</div>

	<div id="clone-list" class="mt-4">
		<h2>Example 3 - Cloning Lists</h2>

		<div class="d-flex">
			<SortableList class="list-group col" options={options[2]}>
				{#each exampleItems as item}
					<div class="list-group-item bg-secondary text-white">{item} - Group 1</div>
				{/each}
			</SortableList>

			<SortableList class="list-group col" options={options[2]}>
				{#each exampleItems as item}
					<div class="list-group-item">{item} - Group 2</div>
				{/each}
			</SortableList>
		</div>
	</div>

	<div id="disable-list" class="mt-4">
		<h2>Example 4 - Disable Sort/Clone on Left</h2>

		<div class="d-flex">
			<SortableList class="list-group col" options={options[3]}>
				{#each exampleItems as item}
					<div class="list-group-item bg-secondary text-white">{item} - Group 1</div>
				{/each}
			</SortableList>

			<SortableList class="list-group col" options={options[4]}>
				{#each exampleItems as item}
					<div class="list-group-item">{item} - Group 2</div>
				{/each}
			</SortableList>
		</div>
	</div>

	<div id="handle-list" class="mt-4">
		<h2>Example 5 - Handle</h2>

		<SortableList class="list-group col" options={options[5]}>
			{#each exampleItems as item}
				<div class="list-group-item">
					<FontAwesomeIcon icon={faArrowsAlt} class="handle" />
					{item}
				</div>
			{/each}
		</SortableList>
	</div>

	<div id="filter-list" class="mt-4">
		<h2>Example 6 - Filter</h2>

		<SortableList class="list-group col" options={options[6]}>
			{#each exampleItemsFilter as item}
				<div
					class="list-group-item"
					class:handle={!item.filtered}
					class:filtered={item.filtered}
					class:bg-danger={item.filtered}
				>
					{item.item}
				</div>
			{/each}
		</SortableList>
	</div>

	<div id="threshold-list" class="mt-4">
		<h2>Example 7 - Thresholds</h2>
		Current Threshold: {sliderValue[0]}
		<Slider min="0" max="1" step=".01" bind:value={sliderValue} />
		<div>
			Invert Swap: <input type="checkbox" bind:checked={invertSwap} />
		</div>
		<div>
			Is Horizontal?:
			<select bind:value={selected} on:change={updateSelection}>
				{#each selectOptions as option}
					<option value={option}>
						{option.text}
					</option>
				{/each}
			</select>
		</div>
		<div class="flex">
			<div class="mr-10">
				<div class="relative w-[200px]">
					<div style="position: absolute; top:0; left:0;">
						<div class="h-[200px] w-[200px] bg-blue-500" />
					</div>
					<div style="position: absolute; top:0; left:{boxLeft}px;">
						<div class="h-[200px] bg-white opacity-50" style=" width: {boxWidth}px;" />
					</div>
				</div>
			</div>
			<div class="mr-10">
				<div class="relative w-[200px]">
					<div class="absolute top-0 left-0">
						<div class="h-[200px] w-[200px] bg-blue-500" />
					</div>
					<div class="absolute top-0" style="left: {boxLeft}px">
						<div class="h-[200px] bg-white opacity-50" style="width: {boxWidth}px;" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.handle) {
		cursor: grab;
	}
</style>
