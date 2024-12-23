import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductModel } from '../models/product.model';
import { BasketState } from '../store/basket-store/basket.state';
import { BasketActions } from '../store/basket-store/basket.actions';





@Component({
  selector: 'basket',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
readonly basketStore = inject(Store)

readonly products$ = this.basketStore.select(BasketState.selectProducts)
readonly totalValue$ = this.basketStore.select(BasketState.selectTotalValue)

onRemovedButtonClicked(product: ProductModel) {
  this.basketStore.dispatch(BasketActions.removeProductFromBasket({productId: product.id}))
}

onSendButtonClicked() {
  this.basketStore.dispatch(BasketActions.sendBasketToApi())
}
}
