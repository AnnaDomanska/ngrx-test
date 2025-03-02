import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ProductModel } from "../../models/product.model";


export const BasketActions = createActionGroup({
    source: 'Basket',
    events: {
        'Add product to basket': props<{product: ProductModel}>(),
        'Remove product from basket': props<{productId: number}>(),
        'Update total value': emptyProps(),
        'Send basket to api': emptyProps(),
        'Send basket succesfully': emptyProps(),
        'Send basket failure': props<{error: Error}>(),
        'Clear basket': emptyProps(),
        'Load basket from local storage': emptyProps(),
        'Set basket': props<{products: ProductModel[], totalValueForClient: number}>(),
        'Save basket to local storage': emptyProps()
    }
})