import { useState, useEffect } from 'react';
import styles from './Modal.module.scss';
import closeIcon from '../../../../assets/close.svg';
import { initializeEntityData, validateEntityData, capitalizeFirstLetter } from '../../../../utils/tableActions.ts';
import { Category } from "../../../../types/categories.ts";
import { getCategories } from "../../../../api/categoriesApi.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData: any;
    isEditing: boolean;
    columns: string[];
}

const Modal = ({ isOpen, onClose, onSave, initialData, isEditing, columns }: ModalProps) => {
    const [entityData, setEntityData] = useState<{ [key: string]: any }>(
        initializeEntityData(columns, initialData)
    );
    const [errors, setErrors] = useState<any>({});

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        setEntityData(initializeEntityData(columns, initialData));
    }, [initialData, columns]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        const { type, value, files } = e.target as HTMLInputElement;

        if (type === 'file' && files && files.length > 0) {
            setEntityData({ ...entityData, [field]: files[0] });
        } else {
            setEntityData({ ...entityData, [field]: value });
        }
    };

    const handleSave = () => {
        const validationErrors = validateEntityData(entityData, columns);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSave(entityData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.close} onClick={onClose}>
                    <img src={closeIcon} alt="Close" />
                </button>
                <h2 className={'heading-tertiary text-center text-white'}>{isEditing ? 'Edit Entity' : 'Create New Entity'}</h2>
                {columns.map((column) => (
                    <div key={column} className={styles.inputGroup}>
                        {column === 'image' ? (
                            <input
                                type="file"
                                onChange={(e) => handleChange(e, column)}
                            />
                        ) : column === 'category' ? (
                            <select
                                value={entityData[column] || ''}
                                onChange={(e) => handleChange(e, column)}
                                className={styles.selectInput}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={entityData[column] || ''}
                                placeholder={capitalizeFirstLetter(column)}
                                onChange={(e) => handleChange(e, column)}
                            />
                        )}
                        {errors[column] && <span className={styles.error}>{errors[column]}</span>}
                    </div>
                ))}
                <button className={'btn-primary w-full'} onClick={handleSave}>
                    {isEditing ? 'Update' : 'Create'}
                </button>
            </div>
        </div>
    );
};

export default Modal;
