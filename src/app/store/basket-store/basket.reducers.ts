import { createReducer, on } from '@ngrx/store';
import { BasketState } from './basket.state';
import { BasketActions } from './basket.actions';

export const BasketReducer = createReducer(
  BasketState.INIT_STATE,
  on(BasketActions.addProductToBasket, (state, action) => {
    console.log(state)
    return { ...state, products: [...state.products, action.product] };
  }),
  on(BasketActions.removeProductFromBasket, (state, action) => {
    const indexToRemove = state.products.findIndex(product => product.id === action.productId);

    if(indexToRemove > -1) {
      const updateProducts = [...state.products];
      updateProducts.splice(indexToRemove, 1);
      return {...state, products: updateProducts}
    }

    return state;
  }),
  on(BasketActions.updateTotalValue, (state) => {
   const totalValueForClient = state.products.reduce((sum, product) => sum + product.price, 0)
    return {...state, totalValueForClient}
  }),
  on(BasketActions.clearBasket, (state) => {
    return {...state, products: [], totalValueForClient: 0}
  }),
  on(BasketActions.setBasket, (state, { products, totalValueForClient }) => {
    return {
      ...state,  
      products,
      totalValueForClient,
    };
  })
);
