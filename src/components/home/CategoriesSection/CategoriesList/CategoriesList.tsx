import { useState, useEffect } from 'react';
import './CategoriesList.scss';
import { CategoriesItem } from './CategoriesItem/CategoriesItem';
import category1 from '../../../../assets/category-1.png';
import category2 from '../../../../assets/category-2.png';
import category3 from '../../../../assets/category-3.png';
import category4 from '../../../../assets/category-4.png';
import category5 from '../../../../assets/category-5.png';
import category6 from '../../../../assets/category-6.png';
import { getCategories } from '../../../../api/categoriesApi.ts';
import {Category} from "../../../../types/categories.ts";

const categoryImages = [category1, category2, category3, category4, category5, category6];

interface CategoryImage extends Category{
    image: string;
}

export const CategoriesList = () => {
    const [categories, setCategories] = useState<CategoryImage[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data: Category[] = await getCategories();
            const categoriesWithImages: CategoryImage[] = data.map((category: Category, index: number) => ({
                ...category,
                image: categoryImages[index % categoryImages.length],
            }));
            setCategories(categoriesWithImages);
        };

        fetchCategories();
    }, []);

    return (
        <div className="categories-list">
            {categories.map((category, index) => (
                <CategoriesItem
                    key={index}
                    name={category.name}
                    backgroundImage={category.image}
                />
            ))}
        </div>
    );
};
