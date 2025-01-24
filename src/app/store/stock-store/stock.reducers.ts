import { createReducer, on } from '@ngrx/store';
import { StockState } from './stock.state';
import { StockActions } from './stock.actions';


export const StockReducers = createReducer(StockState.INIT_STATE,
    on(StockActions.decrementQuantityForProduct, (state, action) => {
        return {
          ...state,
          productsQuantity: state.productsQuantity.map((product) =>
            product.id === action.productId
              ? { ...product, quantity: Math.max(0, product.quantity - 1) }
              : product
          ),
        };
      }),
      on(StockActions.incrementQuantityForProduct, (state, action) => {
        return {
          ...state,
          productsQuantity: state.productsQuantity.map((product) =>
            product.id === action.productId
              ? { ...product, quantity: product.quantity + 1}
              : product
          ),
        };
      }),
      on(StockActions.productQuantityTurned0, (state, action) => {
        return {
          ...state, 
          notAvailableProducts: state.notAvailableProducts.includes(action.productId)
          ? state.notAvailableProducts 
          : [...state.notAvailableProducts, action.productId]
        }
      })
)