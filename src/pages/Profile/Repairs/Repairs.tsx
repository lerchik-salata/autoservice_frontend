import { useEffect, useState } from 'react';
import { getMyRepairs } from '../../../api/repairsApi.ts';
import { Repair } from '../../../types/repairs.ts';
import styles from './Repairs.module.scss';
import { Loader } from "../../../components/common/Loader/Loader.tsx";
import { RepairItem } from '../../../components/profile/RepairItem/RepairItem.tsx';

export const Repairs = () => {
    const [repairs, setRepairs] = useState<Repair[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepairs = async () => {
            try {
                setIsLoading(true);
                const response = await getMyRepairs();
                setRepairs(response);
            } catch (error) {
                console.error('Error fetching repairs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRepairs();
    }, []);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className={styles.repairsContainer}>
            <h2 className={'heading-tertiary mb-5 mt-6'}>Your Repairs</h2>
            {repairs.length === 0 ? (
                <p>No repairs found.</p>
            ) : (
                <ul className={styles.repairList}>
                    {repairs.map((repair) => (
                        <RepairItem key={repair.id} repair={repair} />
                    ))}
                </ul>
            )}
        </div>
    );
};
