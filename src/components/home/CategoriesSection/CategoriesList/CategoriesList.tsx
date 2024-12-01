import './CategoriesList.scss'
import { CategoriesItem } from "./CategoriesItem/CategoriesItem";
import category1 from '../../../../assets/category-1.png'
import category2 from '../../../../assets/category-2.png'
import category3 from '../../../../assets/category-3.png'
import category4 from '../../../../assets/category-4.png'
import category5 from '../../../../assets/category-5.png'
import category6 from '../../../../assets/category-6.png'

const categories = [
    { name: "Technology", image: category1 },
    { name: "Health", image:  category2  },
    { name: "Education", image:  category3  },
    { name: "Sports", image:  category4  },
    { name: "Cars", image:  category5  },
    { name: "Accessories", image:  category6  },
];

export const CategoriesList = () => {
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
