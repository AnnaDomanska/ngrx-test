export interface CartModel {
    userId: number,
    date: string,
    products: {productId: number, quantity: number}[]
}