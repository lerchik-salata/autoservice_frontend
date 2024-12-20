import React from 'react';
import styles from './OrderItem.module.scss';
import { concatenateImage } from '../../../utils/concatenateImage.ts';
import placeholder from '../../../assets/placeholder.svg';
import { Order } from '../../../types/orders.ts';

interface OrderItemProps {
    order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    return (
        <li className={styles.orderItem}>
            <h3 className={styles.orderTitle}>
                Order ID: <span className={styles.orderId}>{order.id}</span>
            </h3>

            <ul className={styles.orderItemsList}>
                {order.order_items.map((item) => (
                    <li key={item.id} className={styles.orderItemDetails}>
                        <img
                            src={concatenateImage(item.product.image ? item.product.image : placeholder)}
                            alt={item.product.name}
                            className={styles.productImage}
                        />
                        <div className={styles.productDetails}>
                            <p><strong>Product:</strong> {item.product.name}</p>
                            <p><strong>Price:</strong> ${item.product.price}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <p className={styles.orderItemPrice}>
                <strong>Total Price: </strong>
                ${order.order_items.reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0).toFixed(2)}
            </p>
        </li>
    );
};
