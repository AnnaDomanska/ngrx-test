import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { BasketEffects } from './store/basket-store/basket.effects';
import { BasketReducer } from './store/basket-store/basket.reducers';
import { CartService } from './services/cart.service';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { StockReducers } from './store/stock-store/stock.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ basket: BasketReducer, stock: StockReducers}),
    provideEffects(BasketEffects),
    ProductService,
    CategoryService,
    CartService,
    provideStoreDevtools({maxAge: 25})
  ],
};
