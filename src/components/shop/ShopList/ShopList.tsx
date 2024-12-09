import { ShopItem } from './ShopItem/ShopItem';
import {Product} from "../../../types/products.ts";
import {concatenateImage} from "../../../utils/concatenateImage.ts";
import styles from "./ShopList.module.scss";

interface ShopListProps  {
    items: Product[],
};

export const ShopList = ({ items } : ShopListProps) => {
    return (
        <div className={styles.shopList}>
            {items.map((item) => (
                <ShopItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={concatenateImage(item.image)}
                    price={item.price}
                    category={item.category.name}
                />
            ))}
        </div>
    );
};

export default ShopList;