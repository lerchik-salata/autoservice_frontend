import {Link} from "react-router-dom";
import styles from "./ShopItem.module.scss";
import placeholder from '../../../../assets/placeholder.svg'

interface ShopItemProps  {
    id: string
    name: string,
    image: string,
    price: string,
    category: string
};

export const ShopItem = ({ id, name, image, price, category } : ShopItemProps) => {
    return (
        <div className={styles.shopItem}>
            <img src={image ? image : placeholder} alt={name} />
                <h2 className="heading-tertiary text-center">{name}</h2>
                <p className={styles.shopItemCategory}>{category}</p>
                <p className="text text-center">${price}</p>
                <Link to={`/products/${id}`} className="btn-secondary">View Details</Link>
        </div>
    );
};


export default ShopItem;