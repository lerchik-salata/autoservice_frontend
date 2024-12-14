import {Category} from "./categories.ts";

export interface Product {
    id: string,
    name: string,
    description: string,
    price: string,
    category: Category,
    image?: string
}

export interface GetProductsResponse {
    items: Product[];
}

export interface AddProductPayload {
    name: string;
    price: string;
    description: string;
    category: string;
    image?: File | Blob | null;
}

export interface UpdateProductPayload {
    name?: string;
    description?: string;
    price?: string;
    category?: string;
}
