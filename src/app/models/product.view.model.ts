import { ProductModel } from "./product.model";

export interface ProductViewModel extends ProductModel {
readonly quantity: number
}