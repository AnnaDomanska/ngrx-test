import { createActionGroup, props} from "@ngrx/store";


export const StockActions = createActionGroup({
    source: 'Stock',
    events: {
        'Decrement quantity for product': props<{productId: number}>(),
        'Increment quantity for product': props<{productId: number}>()
    }})