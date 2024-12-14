import { ShopItem } from './ShopItem/ShopItem';
import {Product} from "../../../types/products.ts";
import {concatenateImage} from "../../../utils/concatenateImage.ts";
import styles from "./ShopList.module.scss";

interface ShopListProps  {
    items: Product[],
};

export const ShopList = ({ items } : ShopListProps) => {
    return (
        <>
            {items.length === 0 && <p className={'heading-tertiary text-center mx-auto mt-10'}>There are no items in the shop</p>}
            <div className={styles.shopList}>
                {items.map((item) => (
                    <ShopItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image ?concatenateImage(item.image) : ''}
                        price={item.price}
                        category={item.category}
                    />
                ))}
            </div>
        </>
    );
};

export default ShopList;