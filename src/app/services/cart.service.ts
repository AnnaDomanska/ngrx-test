import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CartModel } from "../models/cart.model";

@Injectable()
export class CartService {
    private readonly httpClient: HttpClient = inject(HttpClient);

    postCart(cart: CartModel) {
        return this.httpClient.post('https://fakestoreapi.com/carts', cart)
    }

}