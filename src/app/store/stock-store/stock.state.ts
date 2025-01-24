import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductStockModel } from '../../models/product.model';

export interface StockState {
  readonly productsQuantity: ProductStockModel[];
  readonly notAvailableProducts: number[];
}

export namespace StockState {
  export const INIT_STATE: StockState = {
    productsQuantity: [
      { id: 1, quantity: 34 },
      { id: 2, quantity: 0 },
      { id: 3, quantity: 23 },
      { id: 4, quantity: 190 },
      { id: 5, quantity: 12 },
      { id: 6, quantity: 58 },
      { id: 7, quantity: 3 },
      { id: 8, quantity: 76 },
      { id: 9, quantity: 45 },
      { id: 10, quantity: 8 },
      { id: 11, quantity: 67 },
      { id: 12, quantity: 0 },
      { id: 13, quantity: 89 },
      { id: 14, quantity: 150 },
      { id: 15, quantity: 24 },
      { id: 16, quantity: 98 },
      { id: 17, quantity: 1 },
      { id: 18, quantity: 37 },
      { id: 19, quantity: 14 },
      { id: 20, quantity: 200 },
    ],
    notAvailableProducts: [2, 12],
  };

  export const selectStockState = createFeatureSelector<StockState>('stock');
  export const selectProductsQuantity = createSelector(
    selectStockState,
    (state: StockState) => state.productsQuantity
  );
  export const selectNotAvailableProducts = createSelector(
    selectStockState,
    (state: StockState) => state.notAvailableProducts
  );
}
