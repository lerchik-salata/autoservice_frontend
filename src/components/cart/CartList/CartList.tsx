import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { clearCart } from '../../../store/slices/cartSlice';
import CartItem from './CartItem/CartItem';
import styles from './CartList.module.scss';

export const CartList = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className={styles.cartList}>
            {cartItems.length === 0 ? (
                <p className={'heading-tertiary text-center'}>Your cart is empty</p>
            ) : (
                <>
                    <ul className={styles.cartItems}>
                        {cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                                totalPrice={totalPrice}
                                quantity={item.quantity}
                                category={item.category}
                            />
                        ))}
                    </ul>

                    <div className={styles.cartSummary}>
                        <p className={'heading-tertiary'}>Total price: ${totalPrice.toFixed(2)}</p>
                        <button onClick={handleClearCart} className="btn-secondary">
                            Clear cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartList;
