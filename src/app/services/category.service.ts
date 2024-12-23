import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductModel } from "../models/product.model";

@Injectable()
export class CategoryService {
    private readonly httpClient: HttpClient = inject(HttpClient);

    getAll(): Observable<string[]> {
      return this.httpClient.get<string[]>('https://fakestoreapi.com/products/categories')
    }

}