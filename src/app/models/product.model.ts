export interface ProductModel {
    title: string;
    id: number;
    image: string;
    description: string;
    price: number;
    category: string;
    rating: {rate: number, count: number}
    }


export interface ProductStockModel {
        id: number;
        quantity: number
    }