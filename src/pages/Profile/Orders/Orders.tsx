import { useEffect, useState } from 'react';
import { getMyOrders } from '../../../api/ordersApi.ts';
import { Order } from '../../../types/orders.ts';
import styles from './Orders.module.scss';
import { Loader } from "../../../components/common/Loader/Loader.tsx";
import { OrderItem } from '../../../components/profile/OrderItem/OrderItem.tsx';

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                const response = await getMyOrders();
                setOrders(response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={styles.ordersContainer}>
            <h2 className={'heading-tertiary mb-5 mt-6'}>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className={styles.orderList}>
                    {orders.map((order) => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </ul>
            )}
        </div>
    );
};
