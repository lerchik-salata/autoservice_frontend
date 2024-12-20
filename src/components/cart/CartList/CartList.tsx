import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { clearCart } from '../../../store/slices/cartSlice';
import CartItem from './CartItem/CartItem';
import styles from './CartList.module.scss';
import { useState } from 'react';
import { addOrder } from "../../../api/ordersApi.ts";
import { useNavigate } from "react-router-dom";

export const CartList = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCreateOrder = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const orderPayload = {
            order_items: cartItems.map(item => ({
                product: item.id,
                quantity: item.quantity
            }))
        };

        setIsLoading(true);
        try {
            await addOrder(orderPayload);
            alert('Order created successfully');
            dispatch(clearCart());
        } catch (error) {
            console.error('Failed to create order', error);
        } finally {
            setIsLoading(false);
        }
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
                        <div className={styles.cartBtns}>
                            <button
                                onClick={handleClearCart}
                                className="btn-secondary"
                                disabled={isLoading}
                            >
                                Clear cart
                            </button>
                            <button
                                onClick={handleCreateOrder}
                                className="btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : 'Create Order'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartList;
