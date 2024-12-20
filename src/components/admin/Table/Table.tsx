import { useState, useEffect } from 'react';
import styles from './Table.module.scss';
import pencilIcon from '../../../assets/pencil-square.svg';
import deleteIcon from '../../../assets/trash.svg';
import plusIcon from '../../../assets/plus.svg';
import crossIcon from '../../../assets/close.svg';
import checkIcon from '../../../assets/check.svg';
import Modal from './Modal/Modal';
import { handleCreate, handleUpdate, handleDelete, capitalizeFirstLetter } from '../../../utils/tableActions.ts';
import {concatenateImage} from "../../../utils/concatenateImage.ts";
import {Loader} from "../../common/Loader/Loader.tsx";
import placeholder from '../../../assets/placeholder.svg'
import {ImageModal} from "./ImageModal/ImageModal.tsx";
import eye from '../../../assets/eye.svg';
import {OrderItems} from "../../../types/orders.ts";

interface TableProps {
    entityName: string;
    addEntity?: (data: any) => Promise<any>;
    updateEntity?: (id: string, data: any) => Promise<any>;
    deleteEntity: (id: string) => Promise<any>;
    fetchEntities: () => Promise<any>;
    columns: string[];
}

const Table: React.FC<TableProps> = ({
                                         entityName,
                                         addEntity,
                                         updateEntity,
                                         deleteEntity,
                                         fetchEntities,
                                         columns,
                                     }) => {
    const [entities, setEntities] = useState<any[]>([]);
    const [editingEntity, setEditingEntity] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState<string>('');

    const handleOpenModal = (imageSrc: string) => {
        setModalImageSrc(imageSrc);
        setImageModalOpen(true);
    };

    const handleCloseModal = () => {
        setImageModalOpen(false);
        setModalImageSrc('');
    };

    const fetchData = async () => {
            const data = await fetchEntities();
            setEntities(data);
            setIsLoading(false);
        };

    useEffect(() => {
        fetchData();
    }, []);

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
            {isLoading && <Loader/>}

            {!isLoading && (
                <>
                    <div className={styles.entityTableHeader}>
                        <h1 className={'heading-tertiary mb-4 text-white'}>
                            {`${entityName} Management`}
                        </h1>
                        {addEntity &&
                            <button onClick={toggleCreateForm} disabled={isLoading}>
                                <img src={plusIcon} alt="Add new entity"/>
                            </button>}
                    </div>

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
                                    <td key={column}>
                                        {column === 'image' ? (
                                                <button
                                                    onClick={() => handleOpenModal(concatenateImage(entity[column]) || placeholder)}
                                                >
                                                    <img src={eye} alt={'Watch'}/>
                                                </button>
                                        ) : column === 'category' ? (
                                            entity[column]?.name || 'N/A'
                                        ) : column === 'processed' ? (
                                            entity[column] ? <img src={checkIcon}/> : <img src={crossIcon}/>
                                        ): column === 'application' ? (
                                            entity[column]?.phone_number|| 'N/A'
                                        ) : column === 'customer' ? (
                                            entity[column]?.name|| 'N/A'
                                        ) : column === 'user' ? (
                                            entity[column].name + ' ' + entity[column].surname
                                        ): column === 'order_items' ? (
                                            entity[column]
                                                .map((item : OrderItems) => `${item.product.name} (${item.quantity})`)
                                                .join(', ')
                                        ):(
                                            entity[column]
                                        )}
                                    </td>
                                ))}
                                <td>
                                    <div className={'flex gap-4'}>
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

                    {entities.length === 0 &&
                        <p className={'heading-tertiary text-center mx-auto mt-10 text-white'}>{`There are no ${entityName}s`}</p>}

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

            <ImageModal
                isOpen={imageModalOpen}
                onClose={handleCloseModal}
                imageSrc={modalImageSrc}
                altText="Entity Image"
            />

        </div>
    );
};

export default Table;
