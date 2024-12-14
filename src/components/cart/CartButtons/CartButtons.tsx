import styles from "./CartButtons.module.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addItemToCart } from "../../../store/slices/cartSlice.ts";
import { Category } from "../../../types/categories.ts";

interface CartButtonsProps  {
    id: string;
    name: string;
    image: string;
    price: string;
    category: Category;
};

export const CartButtons = ({ id, name, image, price, category }: CartButtonsProps) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState<number>(1);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const addToCartHandler = () => {
        dispatch(addItemToCart({
            id,
            name,
            image,
            price,
            totalPrice: parseFloat(price) * quantity,
            category,
            quantity
        }));

        setQuantity(1);
    };

    return (
        <div className={styles.cartButtons}>
            <div className={styles.quantityControl}>
                <button
                    className="btn-primary red"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                >
                    -
                </button>
                <span className={'heading-tertiary'}>{quantity}</span>
                <button
                    className="btn-primary red"
                    onClick={increaseQuantity}
                >
                    +
                </button>
            </div>

            <button onClick={addToCartHandler} className="btn-secondary w-full">
                Add to cart
            </button>
        </div>
    )
};

export default CartButtons;
