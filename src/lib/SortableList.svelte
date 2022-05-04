<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Sortable, { MultiDrag, Swap, type GroupOptions, type Options } from 'sortablejs';
	import type { SortableEvent } from 'sortablejs';
	import type { MoveEvent } from 'sortablejs';

	// Svelte Library Variables
	let list: HTMLElement;
	let sortable: Sortable;
	let className: string;
	export { className as class };

	// Plugin Options
	export let multiDragClass: string | null = null;
	export let swapClass: string | null = null;

	// Default Options
	export let group: string | GroupOptions | undefined = undefined;
	export let sort = true;
	export let disabled = false;
	export let store:
		| {
				get: (sortable: Sortable) => string[];
				set: (sortable: Sortable) => void;
		  }
		| undefined = undefined;
	export let handle: string | undefined = undefined;
	export let swapThreshold = 1; // 0 <= x <= 1
	export let invertSwap = false;
	export let invertedSwapThreshold: number | undefined = undefined; // will be set to same as swapThreshold if default
	export let removeCloneOnHide = true;
	export let ghostClass = 'sortable-ghost';
	export let chosenClass = 'sortable-chosen';
	export let dragClass = 'sortable-drag';
	export let ignore = 'a; img';
	export let filter:
		| string
		| ((
				this: Sortable,
				event: Event | TouchEvent,
				target: HTMLElement,
				sortable: Sortable
		  ) => boolean)
		| undefined = undefined;
	export let preventOnFilter = true;
	export let animation = 0;
	/**
	 * Easing for animation. Defaults to null.
	 *
	 * See https://easings.net/ for examples.
	 *
	 * For other possible values, see
	 * https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp
	 *
	 * @example
	 *
	 * // CSS functions
	 * | 'steps(int, start | end)'
	 * | 'cubic-bezier(n, n, n, n)'
	 *
	 * // CSS values
	 * | 'linear'
	 * | 'ease'
	 * | 'ease-in'
	 * | 'ease-out'
	 * | 'ease-in-out'
	 * | 'step-start'
	 * | 'step-end'
	 * | 'initial'
	 * | 'inherit'
	 */
	export let easing: string | undefined = undefined;
	export let dropBubble = false;
	export let dragoverBubble = false;
	export let dataIdAttr = 'data-id';
	export let delay = 0;
	export let delayOnTouchOnly = false;
	export let forceFallback = false;
	export let fallbackClass = 'sortable-fallback';
	export let fallbackOnBody = false;
	export let fallbackTolerance = 0;
	export let fallbackOffset = {
		x: 0,
		y: 0
	};
	export let emptyInsertThreshold = 5;
	export let direction: 'horizontal' | 'vertical' | undefined = undefined;
	export let touchStartThreshold: number | undefined = undefined;
	export let setData:
		| ((dataTransfer: DataTransfer, draggedElement: HTMLElement) => void)
		| undefined = undefined;
	export let draggable: string | null = null;
	export let onChoose: ((event: SortableEvent) => void) | undefined = undefined;
	export let onUnchoose: ((event: SortableEvent) => void) | undefined = undefined;
	export let onStart: ((event: SortableEvent) => void) | undefined = undefined;
	export let onEnd: ((event: SortableEvent) => void) | undefined = undefined;
	export let onAdd: ((event: SortableEvent) => void) | undefined = undefined;
	export let onUpdate: ((event: SortableEvent) => void) | undefined = undefined;
	export let onRemove: ((event: SortableEvent) => void) | undefined = undefined;
	export let onFilter: ((event: SortableEvent) => void) | undefined = undefined;
	export let onSort: ((event: SortableEvent) => void) | undefined = undefined;
	export let onClone: ((event: SortableEvent) => void) | undefined = undefined;
	export let onMove:
		| ((evt: MoveEvent, originalEvent: Event) => boolean | -1 | 1 | void)
		| undefined = undefined;
	export let onChange: ((event: SortableEvent) => void) | undefined = undefined;

	let options: Options;
	onMount(() => {
		options = {
			group,
			sort,
			disabled,
			store,
			handle,
			swapThreshold,
			invertSwap,
			invertedSwapThreshold,
			removeCloneOnHide,
			ghostClass,
			chosenClass,
			dragClass,
			ignore,
			filter,
			preventOnFilter,
			animation,
			easing,
			dropBubble,
			dragoverBubble,
			dataIdAttr,
			delay,
			delayOnTouchOnly,
			forceFallback,
			fallbackClass,
			fallbackOnBody,
			fallbackTolerance,
			fallbackOffset,
			emptyInsertThreshold,
			direction,
			touchStartThreshold,
			setData,
			onChoose,
			onUnchoose,
			onStart,
			onEnd,
			onAdd,
			onUpdate,
			onRemove,
			onFilter,
			onSort,
			onClone,
			onMove,
			onChange
		};

		if (draggable) {
			options.draggable = draggable;
		}

		if (multiDragClass) {
			try {
				Sortable.mount(new MultiDrag());
			} catch (e) {
				// BUG: Do nothing. Find a better way to handle multiple mounts.
			}

			options.multiDrag = true;
			options.selectedClass = multiDragClass;
			options.fallbackTolerance = 3;
		}

		if (swapClass) {
			try {
				Sortable.mount(new Swap());
			} catch (e) {
				// BUG: Do nothing. Find a better way to handle multiple mounts.
			}

			options.swap = true;
			options.swapClass = swapClass;
		}

		sortable = Sortable.create(list, { ...options });
	});

	onDestroy(() => {
		if (sortable) sortable.destroy();
	});
</script>

<div bind:this={list} class={className}>
	<slot />
</div>
