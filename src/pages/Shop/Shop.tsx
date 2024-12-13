import styles from './Shop.module.scss';
import { ShopList } from "../../components/shop/ShopList/ShopList.tsx";
import { useEffect, useState } from 'react';
import { getProducts } from "../../api/productsApi.ts";
import { Product } from "../../types/products.ts";
import { Category } from "../../types/categories.ts";
import { getCategories } from "../../api/categoriesApi.ts";
import {filterItems, handleCategoryChange, handlePriceChange, PriceRange} from "../../utils/filterUtils.ts";
import {Loader} from "../../components/common/Loader/Loader.tsx";

export const Shop = () => {
    const [items, setItems] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredItems, setFilteredItems] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [priceRange, setPriceRange] = useState<PriceRange>({ min: '0', max: '1000' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getProducts();
                setItems(response);
                setIsLoading(false);
                setFilteredItems(response);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching shop items:', error);
            }
        };

        fetchItems();

        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        setFilteredItems(filterItems(items, selectedCategory, priceRange));
    }, [items, selectedCategory, priceRange]);

    return (
        <div className={styles.shopPage}>
            {isLoading && <Loader/>}

            {!isLoading && (
                <div className={'container mx-auto'}>
                    <h2 className={'heading-secondary'}>Shop</h2>
                    <div className={styles.shopFilters}>
                        <select onChange={(e) => handleCategoryChange(e, setSelectedCategory)} value={selectedCategory}
                                className={styles.shopFilter}>
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>

                        <div className={styles.priceFilter}>
                            <label htmlFor="minPrice">Min Price</label>
                            <input
                                type="text"
                                id="minPrice"
                                name="min"
                                value={priceRange.min}
                                className={styles.shopFilter}
                                onChange={(e) => handlePriceChange(e, setPriceRange)}
                            />
                            <label htmlFor="maxPrice">Max Price</label>
                            <input
                                type="text"
                                id="maxPrice"
                                name="max"
                                value={priceRange.max}
                                className={styles.shopFilter}
                                onChange={(e) => handlePriceChange(e, setPriceRange)}
                            />
                        </div>
                    </div>
                    <ShopList items={filteredItems}/>
                </div>
            )}
        </div>
    );
};

export default Shop;
