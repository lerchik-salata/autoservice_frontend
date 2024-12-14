import { Link } from "react-router-dom";
import styles from "./ShopItem.module.scss";
import placeholder from '../../../../assets/placeholder.svg';
import { Category } from "../../../../types/categories.ts";
import {CartButtons} from "../../../cart/CartButtons/CartButtons.tsx";

interface ShopItemProps  {
    id: string;
    name: string;
    image: string;
    price: string;
    category: Category;
};

export const ShopItem = ({ id, name, image, price, category } : ShopItemProps) => {

    return (
        <div className={styles.shopItem}>
            <img src={image ? image : placeholder} alt={name}/>
            <h2 className="heading-tertiary text-center">{name}</h2>
            <p className={styles.shopItemCategory}>{category.name}</p>
            <p className="text text-center">${price}</p>

            <Link to={`/products/${id}`} className="btn-primary red">View Details</Link>

           <CartButtons id={id} name={name} image={image} price={price} category={category}/>
        </div>
    );
};

export default ShopItem;