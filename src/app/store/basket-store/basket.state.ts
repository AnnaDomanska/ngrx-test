import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductModel } from "../../models/product.model";


export interface BasketState {
    readonly products: ProductModel[];
    readonly totalValueForClient: number;
}

export namespace BasketState {
    export const INIT_STATE: BasketState = {
        products: [],
        totalValueForClient: 0
    }
    export const selectBasketState = createFeatureSelector<BasketState>('basket');
    export const selectProducts = createSelector(selectBasketState, (state: BasketState) => state.products)
    export const selectTotalValue = createSelector(selectBasketState, (state: BasketState) => state.totalValueForClient)
}