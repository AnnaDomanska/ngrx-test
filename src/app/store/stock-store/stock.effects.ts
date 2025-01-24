import { inject, Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { StockState } from './stock.state';
import { distinctUntilChanged, EMPTY, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { StockActions } from './stock.actions';

@Injectable()
export class StockEffects {
  readonly actions$ = inject(Actions);
  readonly stockStore = inject(Store);

  alertWhenQuantity0$ = createEffect(() => {
    return this.stockStore.select(StockState.selectProductsQuantity).pipe(
      distinctUntilChanged(), 
      mergeMap((pq) => {
        const actions = pq
        .filter((product) => product.quantity === 0) 
        .map((product) => StockActions.productQuantityTurned0({ productId: product.id })); 
        return actions.length > 0 ? of(...actions) : EMPTY; 
      })
    );
  });
}
