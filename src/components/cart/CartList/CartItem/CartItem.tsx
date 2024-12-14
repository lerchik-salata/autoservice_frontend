import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart, removeAllItemsFromCart } from '../../../../store/slices/cartSlice';
import styles from './CartItem.module.scss';
import placeholder from '../../../../assets/placeholder.svg';
import { Category } from "../../../../types/categories";

interface CartItemProps {
    id: string;
    name: string;
    image: string;
    price: string;
    quantity: number;
    totalPrice: number;
    category: Category;
}

export const CartItem = ({ id, name, image, price, quantity, category }: CartItemProps) => {
    const dispatch = useDispatch();

    const increaseQuantity = () => {
        dispatch(addItemToCart({ id, name, image, price, category, quantity: 1, totalPrice: 0 }));
    };

    const decreaseQuantity = () => {
        dispatch(removeItemFromCart(id));
    };

    const deleteAllItems = () => {
        dispatch(removeAllItemsFromCart(id));
    };

    return (
        <li className={styles.cartItem}>
            <img src={image ? image : placeholder} alt={name} className={styles.itemImage} />
            <div className={styles.itemInfo}>
                <h2 className={styles.itemName}>{name}</h2>
                <p className={styles.itemCategory}>{category.name}</p>
                <p className={styles.itemPrice}>Price: ${price}</p>
            </div>

            <div className={styles.itemControls}>
                <button onClick={decreaseQuantity} className={'btn-primary'}>-</button>
                <span className={styles.itemQuantity}>{quantity}</span>
                <button onClick={increaseQuantity} className={'btn-primary'}>+</button>
            </div>

            <p className={styles.itemTotalPrice}>
                ${parseFloat(price) * quantity}
            </p>

            <button onClick={deleteAllItems} className={'btn-secondary'}>
                Delete
            </button>
        </li>
    );
};

export default CartItem;
