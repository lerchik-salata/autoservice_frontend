import styles from './CartPage.module.scss';
import CartList from "../../components/cart/CartList/CartList.tsx";

export const CartPage  = () => {
    return (
        <div className={styles.cartPage}>
            <div className={'container mx-auto'}>
               <h2 className={'heading-secondary'}>Cart</h2>
                <CartList/>
            </div>
        </div>
    )
}