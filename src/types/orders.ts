import {Product} from "./products.ts";
import {User} from "./user.ts";

export interface OrderItems {
    id: string;
    product: Product;
    quantity: number;
}

export interface Order {
    id: string;
    user: User;
    order_items: OrderItems[];
}

export interface GetOrdersResponse {
    items: Order[];
}

export interface AddOrderItem {
    product: string;
    quantity: number;
}

export interface AddOrderPayload {
    order_items: AddOrderItem[];
}