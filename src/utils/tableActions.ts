export const handleCreate = async (
    newEntity: any,
    addEntity: (data: any) => Promise<any>,
    fetchEntities: () => Promise<any[]>,
    setEntities: React.Dispatch<React.SetStateAction<any[]>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsLoading(true);
    try {
        await addEntity(newEntity);
        const updatedEntities = await fetchEntities();
        setEntities(updatedEntities);
        setShowModal(false);
    } catch (error) {
        console.error('Error creating entity:', error);
    } finally {
        setIsLoading(false);
    }
};

export const handleUpdate = async (
    updatedEntity: any,
    updateEntity: (id: string, data: any) => Promise<any>,
    fetchEntities: () => Promise<any[]>,
    setEntities: React.Dispatch<React.SetStateAction<any[]>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsLoading(true);
    try {
        await updateEntity(updatedEntity.id, updatedEntity);
        const updatedEntities = await fetchEntities();
        setEntities(updatedEntities);
        setShowModal(false);
    } finally {
        setIsLoading(false);
    }
};

export const handleDelete = async (
    id: string,
    deleteEntity: (id: string) => Promise<any>,
    setEntities: React.Dispatch<React.SetStateAction<any[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    alert('Are tou sure to delete this item?')
    setIsLoading(true);
    try {
        await deleteEntity(id);
        setEntities((prevEntities) => prevEntities.filter((entity) => entity.id !== id));
    } finally {
        setIsLoading(false);
    }
};
export const initializeEntityData = (columns: string[], initialData: any) => {
    return initialData
        ? initialData
        : Object.fromEntries(columns.map((column) => [column, '']));
};

export const validateEntityData = (entityData: any, columns: string[]) => {
    const errors: Record<string, string> = {};
    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    columns.forEach((column) => {
        const value = entityData[column];
        if (!value && column !== 'image') {
            errors[column] = `${column} is required`;
        }

        if (column === 'price') {
            const price = parseFloat(value);
            if (isNaN(price)) {
                errors[column] = 'Price must be a valid number';
            } else if (price <= 0) {
                errors[column] = 'Price must be greater than zero';
            }
        }

        if (column === 'image' && value) {
            let fileName: string = '';

            if (value instanceof File) {
                fileName = value.name;
            } else if (typeof value === 'string') {
                fileName = value;
            }

            if (fileName) {
                const fileExtension = fileName.split('.').pop()?.toLowerCase();
                if (!fileExtension || !allowedImageExtensions.includes(fileExtension)) {
                    errors[column] = 'Only image files with .jpg, .jpeg, .png, .gif extensions are allowed';
                }
            } else {
                errors[column] = 'Invalid image file';
            }
        }

    });
    return errors;
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
