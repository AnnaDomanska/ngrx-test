import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BasketActions } from "./basket.actions";
import { catchError, debounceTime, map, of, switchMap, withLatestFrom } from "rxjs";
import { BasketState } from "./basket.state";
import { Store } from "@ngrx/store";
import { CartService } from "../../services/cart.service";
import { CartModel } from "../../models/cart.model";
import { Router } from "@angular/router";
import { StockActions } from "../stock-store/stock.actions";

@Injectable()
export class BasketEffects {
    readonly actions$ = inject(Actions)
    readonly cartService = inject(CartService)
    readonly basketStore = inject(Store)

    updateTotalValueAfterBasketChanges$ = createEffect(() => {
       return this.actions$.pipe(
            ofType(
                BasketActions.addProductToBasket,
                BasketActions.removeProductFromBasket
            ),
            map(() => BasketActions.updateTotalValue())
        )
    })

    updateQuantityInStockWhenProductAddedToBasket$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                BasketActions.addProductToBasket,
            ),
            map((action) => StockActions.decrementQuantityForProduct({productId: action.product.id}))
        )
    })

    updateQuantityInStockWhenProductRemovedBasket$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                BasketActions.removeProductFromBasket,
            ),
            map((action) => StockActions.incrementQuantityForProduct({productId: action.productId}))
        )
    })

    sendBasketToApi$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BasketActions.sendBasketToApi),
            withLatestFrom(this.basketStore.select(BasketState.selectProducts)),
            switchMap(([, products]) => {
                const cart: CartModel = {
                    userId: 1,
                    date: '2024-12-19',
                    products: products.map(product => ({productId: product.id, quantity: 1}))
                }
                return this.cartService.postCart(cart).pipe(
                    map(() => BasketActions.sendBasketSuccesfully()),
                    catchError(error => of(BasketActions.sendBasketFailure({error})))
                )
            })
        )
    })
}