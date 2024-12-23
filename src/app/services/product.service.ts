import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductModel } from "../models/product.model";

@Injectable()
export class ProductService {
    private readonly httpClient: HttpClient = inject(HttpClient);

    getAll(): Observable<ProductModel[]> {
      return this.httpClient.get<ProductModel[]>('https://fakestoreapi.com/products')
    }

    getById(id: string) {
        return this.httpClient.get<ProductModel>(`https://fakestoreapi.com/products/${id}`)
    
    }
}