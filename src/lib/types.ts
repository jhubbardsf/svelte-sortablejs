import type {
    MultiDrag,
    Swap,
    Options,
    MoveEvent,
    SortableEvent
} from 'sortablejs';
import type Sortable from 'sortablejs';


type ItemList = { item: string; filtered?: boolean }[];
type SelectOption = { isHorizontal: boolean; text: string };

export { ItemList, };