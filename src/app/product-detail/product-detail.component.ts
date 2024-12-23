import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { Store } from '@ngrx/store';
import { BasketActions } from '../store/basket-store/basket.actions';
import { ProductService } from '../services/product.service';



@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  isLoading: WritableSignal<boolean> = signal(true)

  private readonly productService = inject(ProductService)
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private readonly basketStore = inject(Store)
  readonly product$: Observable<ProductModel> = this.activatedRoute.params.pipe(
    switchMap((params) => {
      const productId = params['productId']
      return this.productService.getById(productId)
    }),
  tap(() => this.isLoading.set(false)))

  onAddButtonClicked(product: ProductModel) {
    this.basketStore.dispatch(BasketActions.addProductToBasket({product}))
  }

  onRemoveButtonClicked(product: ProductModel) {
    console.log(`${product.title} removed`)
  }
}
