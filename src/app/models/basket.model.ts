import { ProductModel } from "./product.model";

export interface BasketModel {
    products: ProductModel[],
    totalValueForClient: number
}