import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from "../../types/categories";

interface CartItem {
    id: string;
    name: string;
    image: string;
    price: string;
    totalPrice: number;
    category: Category;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: newItem.quantity,
                    totalPrice: parseFloat(newItem.price) * newItem.quantity,
                });
            } else {
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice = parseFloat(existingItem.price) * existingItem.quantity;
            }
            state.totalQuantity += newItem.quantity;
            state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },

        removeItemFromCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.totalQuantity--;
                existingItem.quantity--;
                existingItem.totalPrice = parseFloat(existingItem.price) * existingItem.quantity;
                if (existingItem.quantity === 0) {
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
            state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },

        removeAllItemsFromCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const itemToRemove = state.items.find(item => item.id === id);
            if (itemToRemove) {
                state.totalQuantity -= itemToRemove.quantity;
                state.totalPrice -= itemToRemove.totalPrice;
                state.items = state.items.filter(item => item.id !== id);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
});

export const { addItemToCart, removeItemFromCart, removeAllItemsFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
