<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Sortable, { MultiDrag, Swap, type GroupOptions, type Options } from 'sortablejs';
	import type { SortableEvent } from 'sortablejs';
	import type { MoveEvent } from 'sortablejs';

	// Svelte Library Variables
	let list: HTMLElement;
	let sortable: Sortable;
	let className: string;
	/**
	 * Classes to be added to the list div
	 */
	export { className as class };

	/**
	 * Add a multiDrag class. Automatically mounts the multiDrag Plugin, sets it to true and sets fallbackTolerance to 3.
	 * @type {string}
	 */
	export let multiDragClass: string | null = null;

	/**
	 * Add a swap class. Automatically mounts the swap Plugin, sets it to true.
	 * @type {string}
	 */
	export let swapClass: string | null = null;

	// Default Options
	/**
	 * "name" OR { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
	 * @type {string | GroupOptions}
	 * */
	export let group: string | GroupOptions | undefined = undefined;
	/** Sorting inside list */
	export let sort = true;
	/** Disables the sortable if set to true. */
	export let disabled = false;
	export let store:
		| {
				get: (sortable: Sortable) => string[];
				set: (sortable: Sortable) => void;
		  }
		| undefined = undefined;
	/**
	 * Drag handle selector within list items
	 * @type {string}
	 * */
	export let handle: string | undefined = undefined;
	/** Threshold of the swap zone. Must be between 0 and 1. */
	export let swapThreshold = 1; // 0 <= x <= 1
	/** Will always use inverted swap zone if set to true. */
	export let invertSwap = false;
	/**
	 * Threshold of the inverted swap zone (will be set to swapThreshold value by default).
	 * @type {number}
	 */
	export let invertedSwapThreshold: number | undefined = undefined; // will be set to same as swapThreshold if default
	/** Remove the clone element when it is not showing, rather than just hiding it */
	export let removeCloneOnHide = true;
	/** Class name for the drop placeholder. */
	export let ghostClass = 'sortable-ghost';
	/** Class name for the chosen item. */
	export let chosenClass = 'sortable-chosen';
	/** Class name for the dragging item. */
	export let dragClass = 'sortable-drag';
	/** Elements to ignore */
	export let ignore = 'a; img';
	/**
	 * Selectors that do not lead to dragging (String or Function)
	 * @type {string | Function}
	 */
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
	 * @type {string | function}
	 */
	export let easing: string | undefined = undefined;
	/** HTML attribute that is used by the `toArray()` method. */
	export let dataIdAttr = 'data-id';
	/** Time in milliseconds to define when the sorting should start */
	export let delay = 0;
	/** Whether or not the delay should be applied only if the user is using touch (eg. on a mobile device). No delay will be applied in any other case. */
	export let delayOnTouchOnly = false;
	/** Ignore the HTML5 DnD behaviour and force the fallback to kick in */
	export let forceFallback = false;
	/** Class name for the cloned DOM Element when using forceFallback. */
	export let fallbackClass = 'sortable-fallback';
	/** Appends the cloned DOM Element into the Document's Body. */
	export let fallbackOnBody = false;
	/** Specify in pixels how far the mouse should move before it's considered as a drag. */
	export let fallbackTolerance = 0;
	export let fallbackOffset = {
		x: 0,
		y: 0
	};
	/** Pixel distance mouse must be from empty sortable to insert drag element into it */
	export let emptyInsertThreshold = 5;
	/** Direction that the Sortable should sort in. Can be set to 'vertical', 'horizontal', or a function, which will be called whenever a target is dragged over. Must return 'vertical' or 'horizontal'. Leave blank to auto detect.*/
	export let direction: 'horizontal' | 'vertical' | undefined = undefined;
	/** How many pixels the point should move before cancelling a delayed drag event */
	export let touchStartThreshold: number | undefined = undefined;
	export let setData:
		| ((dataTransfer: DataTransfer, draggedElement: HTMLElement) => void)
		| undefined = undefined;
	/** Specifies which items inside the element should be draggable. */
	export let draggable: string | null = null;
	/**
	 * Element is chosen
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onChoose: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Element is unchosen
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onUnchoose: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Element dragging started
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onStart: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Element dragging ended
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onEnd: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Element is dropped into the list from another list
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onAdd: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Changed sorting within list
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onUpdate: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Element is removed from the list into another list
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onRemove: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Attempt to drag a filtered element
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onFilter: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Called by any change to the list (add / update / remove)
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onSort: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Called when creating a clone of element
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onClone: ((event: SortableEvent) => void) | undefined = undefined;
	/**
	 * Event when you move an item in the list or between lists
	 * @type {fn(event: SortableEvent) => void}
	 * */
	export let onMove:
		| ((evt: MoveEvent, originalEvent: Event) => boolean | -1 | 1 | void)
		| undefined = undefined;
	/**
	 * Called when dragging element changes position
	 * @type {fn(event: SortableEvent) => void}
	 * */
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

<!--
@component
Svelte wrapper for SortableJS.

- Usage:
  ```tsx
  <SortableList>
	<div>List Item 1</div>
	<div>List Item 2</div>
	<div>List Item 3</div>
  </SortableList>
	```
  -->

<div bind:this={list} class={className}>
	<slot />
</div>
