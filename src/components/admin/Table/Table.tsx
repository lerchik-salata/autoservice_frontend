import { useState, useEffect } from 'react';
import styles from './Table.module.scss';
import pencilIcon from '../../../assets/pencil-square.svg';
import deleteIcon from '../../../assets/trash.svg';
import plusIcon from '../../../assets/plus.svg';
import Modal from './Modal/Modal';
import { handleCreate, handleUpdate, handleDelete, capitalizeFirstLetter } from '../../../utils/tableActions.ts';

interface TableProps {
    entityName: string;
    addEntity?: (data: any) => Promise<any>;
    updateEntity?: (id: string, data: any) => Promise<any>;
    deleteEntity: (id: string) => Promise<any>;
    fetchEntities: () => Promise<any>;
    columns: string[];
    data: any[];
}

const Table: React.FC<TableProps> = ({
                                         entityName,
                                         addEntity,
                                         updateEntity,
                                         deleteEntity,
                                         fetchEntities,
                                         columns,
                                         data,
                                     }) => {
    const [entities, setEntities] = useState<any[]>([]);
    const [editingEntity, setEditingEntity] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data && data.length > 0) {
            setEntities(data);
            setIsLoading(false);
        }
    }, [data]);

    const handleEdit = (entity: any) => {
        setEditingEntity(entity);
        setIsEditing(true);
        setShowModal(true);
    };

    const toggleCreateForm = () => {
        setEditingEntity(null);
        setIsEditing(false);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.entityTable}>
            {isLoading && <div className={styles.loader}>Loading...</div>}

            {!isLoading && (
                <>
                    <h1 className={'heading-tertiary mb-4 text-white'}>
                        {`${entityName} Management`}
                    </h1>

                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>№</th>
                            {columns.map((column) => (
                                <th key={column}>{capitalizeFirstLetter(column)}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entities.map((entity, index) => (
                            <tr key={entity.id}>
                                <td>{index + 1}</td>
                                {columns.map((column) => (
                                    <td key={column}>{entity[column]}</td>
                                ))}
                                <td>
                                    <div className={'flex gap-4'}>
                                        {addEntity &&
                                            <button onClick={toggleCreateForm} disabled={isLoading}>
                                                <img src={plusIcon} alt="Add new entity"/>
                                            </button>}
                                        {updateEntity &&
                                            <button onClick={() => handleEdit(entity)} disabled={isLoading}>
                                                <img src={pencilIcon} alt={'edit'}/>
                                            </button>}
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    entity.id,
                                                    deleteEntity,
                                                    setEntities,
                                                    setIsLoading
                                                )
                                            }
                                            disabled={isLoading}
                                        >
                                            <img src={deleteIcon} alt={'delete'}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {addEntity && updateEntity &&
                        <Modal
                            isOpen={showModal}
                            onClose={closeModal}
                            onSave={isEditing
                                ? (updatedEntity) =>
                                    handleUpdate(
                                        updatedEntity,
                                        updateEntity,
                                        fetchEntities,
                                        setEntities,
                                        setShowModal,
                                        setIsLoading
                                    )
                                : (newEntity) =>
                                    handleCreate(
                                        newEntity,
                                        addEntity,
                                        fetchEntities,
                                        setEntities,
                                        setShowModal,
                                        setIsLoading
                                    )
                            }
                            initialData={
                                isEditing
                                    ? editingEntity
                                    : Object.fromEntries(columns.map((column) => [column, '']))
                            }
                            isEditing={isEditing}
                            columns={columns}
                        />
                    }

                </>
            )}
        </div>
    );
};

export default Table;
