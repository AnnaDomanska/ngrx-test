import { inject, Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BasketActions } from "./basket.actions";
import { catchError, debounceTime, EMPTY, fromEventPattern, map, Observable, of, switchMap, tap, withLatestFrom } from "rxjs";
import { BasketState } from "./basket.state";
import { Action, Store } from "@ngrx/store";
import { CartService } from "../../services/cart.service";
import { CartModel } from "../../models/cart.model";
import { Router } from "@angular/router";
import { StockActions } from "../stock-store/stock.actions";
import { LocalStorageService } from "../../services/locale-storage.service";
import { BasketModel } from "../../models/basket.model";
import {Location} from "@angular/common"

@Injectable()
export class BasketEffects {
    readonly actions$ = inject(Actions)
    readonly cartService = inject(CartService)
    readonly basketStore = inject(Store)
    readonly router = inject(Router)
    readonly storage = inject(LocalStorageService)
    readonly location = inject(Location)

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
                    map(() => BasketActions.clearBasket()),
                    catchError(error => of(BasketActions.sendBasketFailure({error})))
                )
            })
        )
    })


    redirectAfterClearingBasket$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BasketActions.clearBasket),
            debounceTime(3000),
            map(() => this.router.navigate(["/"]))
        );
    }, {
        dispatch: false
    })

    clearLocalStorage$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BasketActions.clearBasket),
        tap(() => this.storage.removeItem('basket'))
      )
    }, {dispatch: false})
    saveBasketToLocalStorage$ = createEffect(
        () => {
          return this.actions$.pipe(
            ofType(BasketActions.saveBasketToLocalStorage),
            withLatestFrom(
              this.basketStore.select(BasketState.selectProducts),
              this.basketStore.select(BasketState.selectTotalValue)
            ),
            tap(([, products, totalValueForClient]) =>
              this.storage.setItem("basket", { products, totalValueForClient })
            )
          );
        },
        { dispatch: false }
      );

    loadBasket$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(BasketActions.loadBasketFromLocalStorage),
          withLatestFrom(this.basketStore.select(BasketState.selectBasketState)),
          switchMap(([action, state]) => {
            const basketData = this.storage.getItem<BasketModel>("basket");
            if (basketData && !state.products.length) {
              console.log(basketData);
              return of(
                BasketActions.setBasket({
                  products: basketData.products,
                  totalValueForClient: basketData.totalValueForClient,
                })
              );
            } else return EMPTY;
          })
        );
      });

      onUrlChange$ = createEffect(() =>
        fromEventPattern<string>((handler) => this.location.onUrlChange(handler)).pipe(
          map((urlChanges) => urlChanges[0].split('?')[0]),
          tap((sourcePath) => console.log(sourcePath))
        ), {dispatch: false}
      );     
}