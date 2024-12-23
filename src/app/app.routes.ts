import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BasketComponent } from './basket/basket.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'products/:productId', component: ProductDetailComponent },
    {path: 'basket', component: BasketComponent}
];
