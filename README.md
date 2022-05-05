# `svelte-sortablejs`
![npm](https://img.shields.io/npm/v/@jhubbardsf/svelte-sortablejs?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@jhubbardsf/svelte-sortablejs?style=flat-square)
![Netlify](https://img.shields.io/netlify/17ccb8e4-9fc6-4654-802b-688c7cd125c3?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/jhubbardsf/svelte-sortablejs?style=flat-square)

Unofficial Svelte package for the SortableJS library.

## Demo

See a live [`demo`](https://svelte-sortablejs.netlify.app/) on Netlify.

## Quick Start

1. Install with npm, pnpm, or yarn.

    `npm i -D @jhubbardsf/svelte-sortablejs`

2. Import SortableList from package.

    `import { SortableList } from '@jhubbardsf/svelte-sortablejs'`;

3. Use the SortableList component in your svelte file.

    ```Svelte
    <SortableList>
        <div> List Item 1 </div>
        <div> List Item 2 </div>
        <div> List Item 3 </div>
    </SortableList>
    ```


## Example Use

Look in [`src/routes/index.svelte`](https://github.com/jhubbardsf/svelte-sortablejs/blob/master/src/routes/index.svelte) to see Svelte implementations of the [`SortableJS`](https://sortablejs.github.io/Sortable/) examples.


## SortableList Parameters

Below is a list explaining the SortableList component parameters. All parameters are optional. Check out the official SortableJS [`github`](https://github.com/SortableJS/Sortable) for more in depth information on the parameters.

<!-- Generated Text Below  -->
---

#### `multiDragClass` option

Type: string

Default Value: null

Add a multiDrag class. Automatically mounts the multiDrag Plugin, sets it to true and sets fallbackTolerance to 3.

---

#### `swapClass` option

Type: string

Default Value: null

Add a swap class. Automatically mounts the swap Plugin, sets it to true.

---

#### `group` option

Type: string | GroupOptions

Default Value:

"name" OR { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }

---

#### `sort` option

Type: boolean

Default Value: true

Sorting inside list

---

#### `disabled` option

Type: boolean

Default Value: false

Disables the sortable if set to true.

---

#### `store` option

Type: undefined

Default Value:

---

#### `handle` option

Type: string

Default Value:

Drag handle selector within list items

---

#### `swapThreshold` option

Type: number

Default Value: 1

Threshold of the swap zone. Must be between 0 and 1.

---

#### `invertSwap` option

Type: boolean

Default Value: false

Will always use inverted swap zone if set to true.

---

#### `invertedSwapThreshold` option

Type: number

Default Value:

Threshold of the inverted swap zone (will be set to swapThreshold value by default).

---

#### `removeCloneOnHide` option

Type: boolean

Default Value: true

Remove the clone element when it is not showing, rather than just hiding it

---

#### `ghostClass` option

Type: string

Default Value: "sortable-ghost"

Class name for the drop placeholder.

---

#### `chosenClass` option

Type: string

Default Value: "sortable-chosen"

Class name for the chosen item.

---

#### `dragClass` option

Type: string

Default Value: "sortable-drag"

Class name for the dragging item.

---

#### `ignore` option

Type: string

Default Value: "a; img"

Elements to ignore

---

#### `filter` option

Type: string | Function

Default Value:

Selectors that do not lead to dragging (String or Function)

---

#### `preventOnFilter` option

Type: boolean

Default Value: true

---

#### `animation` option

Type: number

Default Value: 0

---

#### `easing` option

Type: string | function

Default Value:

Easing for animation. Defaults to null. See https://easings.net/ for examples. For other possible values, see https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp

---

#### `dataIdAttr` option

Type: string

Default Value: "data-id"

HTML attribute that is used by the `toArray()` method.

---

#### `delay` option

Type: number

Default Value: 0

Time in milliseconds to define when the sorting should start

---

#### `delayOnTouchOnly` option

Type: boolean

Default Value: false

Whether or not the delay should be applied only if the user is using touch (eg. on a mobile device). No delay will be applied in any other case.

---

#### `forceFallback` option

Type: boolean

Default Value: false

Ignore the HTML5 DnD behaviour and force the fallback to kick in

---

#### `fallbackClass` option

Type: string

Default Value: "sortable-fallback"

Class name for the cloned DOM Element when using forceFallback.

---

#### `fallbackOnBody` option

Type: boolean

Default Value: false

Appends the cloned DOM Element into the Document's Body.

---

#### `fallbackTolerance` option

Type: number

Default Value: 0

Specify in pixels how far the mouse should move before it's considered as a drag.

---

#### `fallbackOffset` option

Type: { x: 0, y: 0 }

Default Value: { x: 0, y: 0 }

---

#### `emptyInsertThreshold` option

Type: number

Default Value: 5

Pixel distance mouse must be from empty sortable to insert drag element into it

---

#### `direction` option

Type: undefined

Default Value:

Direction that the Sortable should sort in. Can be set to 'vertical', 'horizontal', or a function, which will be called whenever a target is dragged over. Must return 'vertical' or 'horizontal'. Leave blank to auto detect.

---

#### `touchStartThreshold` option

Type: undefined

Default Value:

How many pixels the point should move before cancelling a delayed drag event

---

#### `setData` option

Type: undefined

Default Value:

---

#### `draggable` option

Type: undefined

Default Value: null

Specifies which items inside the element should be draggable.

---

#### `onChoose` option

Type: fn(event: SortableEvent) => void

Default Value:

Element is chosen

---

#### `onUnchoose` option

Type: fn(event: SortableEvent) => void

Default Value:

Element is unchosen

---

#### `onStart` option

Type: fn(event: SortableEvent) => void

Default Value:

Element dragging started

---

#### `onEnd` option

Type: fn(event: SortableEvent) => void

Default Value:

Element dragging ended

---

#### `onAdd` option

Type: fn(event: SortableEvent) => void

Default Value:

Element is dropped into the list from another list

---

#### `onUpdate` option

Type: fn(event: SortableEvent) => void

Default Value:

Changed sorting within list

---

#### `onRemove` option

Type: fn(event: SortableEvent) => void

Default Value:

Element is removed from the list into another list

---

#### `onFilter` option

Type: fn(event: SortableEvent) => void

Default Value:

Attempt to drag a filtered element

---

#### `onSort` option

Type: fn(event: SortableEvent) => void

Default Value:

Called by any change to the list (add / update / remove)

---

#### `onClone` option

Type: fn(event: SortableEvent) => void

Default Value:

Called when creating a clone of element

---

#### `onMove` option

Type: fn(event: SortableEvent) => void

Default Value:

Event when you move an item in the list or between lists

---

#### `onChange` option

Type: fn(event: SortableEvent) => void

Default Value:

Called when dragging element changes position

---
