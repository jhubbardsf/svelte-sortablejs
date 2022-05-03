<script lang="ts">
	import type { Options } from 'sortablejs';
	import Slider from '@bulatdashiev/svelte-slider';
	import SortableList from '$lib/SortableList.svelte';
	import SortableItem from '$lib/SortableItem.svelte';
	import { FontAwesomeIcon } from 'fontawesome-svelte';
	import { library } from '@fortawesome/fontawesome-svg-core';
	import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

	library.add(faArrowsAlt);

	type ItemList = { item: string; filtered?: boolean }[];
	type SelectOption = { isHorizontal: boolean; text: string };

	let invertSwap = false;
	let isHorizontal = true;
	let options: Options[] = Array(8);
	let selectOptions: SelectOption[] = [
		{ isHorizontal: true, text: 'Horizontal' },
		{ isHorizontal: false, text: 'Vertical' }
	];
	let sliderValue: [number, number] = [0.5, 1];
	let selected = selectOptions[0];
	$: boxWidth = 200 * sliderValue[0];

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
		handle: '.cursor-grab', // handle's class
		animation: 150
	};

	// Example 6 - Filtered
	options[6] = {
		filter: '.filtered', // 'filtered' class is not draggable
		animation: 150
	};

	// Example 7 - Threshold
	$: options[7] = {
		swapThreshold: sliderValue[0],
		animation: 150
	};

	// Example 8 - Nesting
	options[8] = {
		group: 'nested',
		animation: 150,
		forceFallback: true,
		swapThreshold: 0.65
	};
</script>

<div class="container mb-4">
	<div class="border-b pb-2">
		<h1 class="font-bold text-xl">Welcome to Svelte-SortableJS.</h1>
		<div id="intro-text">This is the sandbox. Examples.</div>
	</div>

	<div id="simple-list" class="mt-4 border rounded p-6">
		<h2 class="font-bold">Example 1 - Simple List</h2>

		<SortableList class="list-group col" options={options[0]}>
			{#each exampleItems as item}
				<div class="list-group-item">
					{item}
				</div>
			{/each}
		</SortableList>
	</div>

	<div id="shared-list" class="mt-4 border rounded p-6">
		<h2 class="font-bold">Example 2 - Shared Lists</h2>

		<div class="flex">
			<SortableList class="list-group col mr-6" options={options[1]}>
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

	<div id="clone-list" class="mt-4 border rounded p-6">
		<h2 class="font-bold">Example 3 - Cloning Lists</h2>

		<div class="flex">
			<SortableList class="list-group col mr-6" options={options[2]}>
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

	<div id="disable-list" class="mt-4 border rounded p-6">
		<h2 class="font-bold">Example 4 - Disable Sort/Clone on Left</h2>

		<div class="flex">
			<SortableList class="list-group col mr-6" options={options[3]}>
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

	<div id="handle-list" class="mt-4 border rounded p-6">
		<h2 class="font-bold">Example 5 - Handle</h2>

		<SortableList class="list-group col" options={options[5]}>
			{#each exampleItems as item}
				<div class="list-group-item">
					<FontAwesomeIcon icon={faArrowsAlt} class="cursor-grab" />
					{item}
				</div>
			{/each}
		</SortableList>
	</div>

	<div id="filter-list" class="mt-4 border rounded p-6">
		<h2 class="font-bold">Example 6 - Filter</h2>

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

	<div id="threshold-list" class="mt-4 border rounded p-6">
		<div class="-mb-4">
			<h2 class="font-bold">Example 7 - Thresholds</h2>
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
		</div>
		{#key options}
			<SortableList class="flex" options={options[7]}>
				<div class="h-[200px] w-[200px] border border-solid  mr-4 mt-4">
					<div class="bg-red-500 m-auto h-full" style="width: {boxWidth}px;" />
				</div>

				<div class="h-[200px] w-[200px] border border-solid mr-4 mt-4">
					<div class="bg-blue-500 m-auto h-full" style="width: {boxWidth}px;" />
				</div>
			</SortableList>
		{/key}
	</div>

	<div id="nested-lists" class="mt-4 border rounded p-6">
		<h2 class="font-bold">Example 7 - Nesting</h2>

		<SortableList class="list-group col nested-sortable" options={options[8]}>
			<div class="list-group-item nested-1">
				Item 1.1
				<SortableList class="list-group col nested-sortable" options={options[8]}>
					<div class="list-group-item nested-2">Item 2.1</div>
					<div class="list-group-item nested-2">
						Item 2.2
						<SortableList class="list-group col nested-sortable" options={options[8]}>
							<div class="list-group-item nested-3">Item 3.1</div>
							<div class="list-group-item nested-3">Item 3.2</div>
							<div class="list-group-item nested-3">Item 3.3</div>
							<div class="list-group-item nested-3">Item 3.4</div>
						</SortableList>
					</div>
					<div class="list-group-item nested-2">Item 2.3</div>
					<div class="list-group-item nested-2">Item 2.4</div>
				</SortableList>
			</div>
			<div class="list-group-item nested-1">Item 1.2</div>
			<div class="list-group-item nested-1">Item 1.3</div>
			<div class="list-group-item nested-1">
				Item 1.4
				<SortableList class="list-group col nested-sortable" options={options[8]}>
					<div class="list-group-item nested-2">Item 2.1</div>
					<div class="list-group-item nested-2">Item 2.2</div>
					<div class="list-group-item nested-2">Item 2.3</div>
					<div class="list-group-item nested-2">Item 2.4</div>
				</SortableList>
			</div>
			<div class="list-group-item nested-1">Item 1.5</div>
		</SortableList>
	</div>
</div>

<style>
	.nested-1 {
		margin-bottom: 8px;
		background-color: rgb(241, 241, 241);
	}

	.nested-2 {
		margin-bottom: 8px;
		background-color: rgb(221, 221, 221);
	}

	.nested-3 {
		margin-bottom: 8px;
		background-color: rgb(201, 201, 201);
	}
</style>
