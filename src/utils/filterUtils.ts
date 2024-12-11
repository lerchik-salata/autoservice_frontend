import { ChangeEvent } from 'react';
import { Product } from "../types/products";

export interface PriceRange {
    min: string;
    max: string;
}

export const filterItems = (items: Product[], selectedCategory: string, priceRange: PriceRange): Product[] => {
    let filtered = items;

    if (selectedCategory) {
        filtered = filtered.filter(item => item.category.name === selectedCategory);
    }

    filtered = filtered.filter(item => {
        const price = Number(item.price);
        return price >= Number(priceRange.min) && price <= Number(priceRange.max);
    });

    return filtered;
};

export const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>, setSelectedCategory: (value: string) => void): void => {
    setSelectedCategory(e.target.value);
};

export const handlePriceChange = (e: ChangeEvent<HTMLInputElement>, setPriceRange: React.Dispatch<React.SetStateAction<PriceRange>>): void => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => {
        const updatedRange: PriceRange = { ...prevRange, [name]: Number(value) };
        return updatedRange;
    });
};