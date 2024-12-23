import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { BasketActions } from '../store/basket-store/basket.actions';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ProductModel } from '../models/product.model';

import { StockState } from '../store/stock-store/stock.state';
import { ProductViewModel } from '../models/product.view.model';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly basketStore: Store = inject(Store);
  private readonly stockStore: Store = inject(Store);

  readonly sizeOptions: WritableSignal<string[]> = signal([
    '5',
    '10',
    '15',
    'all',
  ]);
  readonly pageSize: WritableSignal<string> = signal('all');
  readonly header: WritableSignal<string> = signal('All products');

  readonly products$: Observable<ProductViewModel[]> = combineLatest([
    this.productService.getAll(),
    this.stockStore.select(StockState.selectProductsQuantity),
  ]).pipe(map(([products, productsQuantity]) => {return products.map(product => {
    const productQuantity = productsQuantity.find(pq => pq.id === product.id)?.quantity || 0
    return {...product, quantity: productQuantity}})}));
  readonly categories$: Observable<string[]> = this.categoryService.getAll();

  readonly productsSignal = toSignal(this.products$);
  readonly productList: Signal<ProductViewModel[] | undefined> = computed(() => {
    if (isNaN(Number(this.pageSize()))) {
      return this.productsSignal()?.slice(0);
    } else {
      return this.productsSignal()?.slice(0, Number(this.pageSize()));
    }
  });

  onLimitChanged(limit: string) {
    this.pageSize.set(limit);
  }

  onAddButtonClicked(product: ProductModel) {
    console.log(`${product.title} added`);
    this.basketStore.dispatch(BasketActions.addProductToBasket({ product }));
  }

  onRemoveButtonClicked(product: ProductModel) {
    console.log(`${product.title} removed`);
    this.basketStore.dispatch(
      BasketActions.removeProductFromBasket({ productId: product.id })
    );
  }
}
