import React from 'react';
import styles from './RepairItem.module.scss';
import { Repair } from '../../../types/repairs.ts';

interface RepairItemProps {
    repair: Repair;
}

const getStageProgress = (repairStage: string): number => {
    switch (repairStage) {
        case 'pending':
            return 33;
        case 'in progress':
            return 66;
        case 'completed':
            return 100;
        default:
            return 0;
    }
};

export const RepairItem: React.FC<RepairItemProps> = ({ repair }) => {
    const progress = getStageProgress(repair.repair_stage);

    return (
        <li className={styles.repairItem}>
            <h3 className={styles.repairTitle}>
                Brand: {repair.brand} | Model: {repair.model} | Year: {repair.year}
            </h3>

            <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <span className={styles.progressLabel}>
                    {repair.repair_stage.replace(/_/g, ' ').toLowerCase()}
                </span>
            </div>

            <p className={styles.serviceType}>
                <strong>Service Type:</strong>
                <span className={styles.serviceTypeTag}>{repair.service_type.replace(/_/g, ' ').toLowerCase()}</span>
            </p>
        </li>
    );
};
