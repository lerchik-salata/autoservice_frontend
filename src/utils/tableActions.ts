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
    columns.forEach((column) => {
        if (!entityData[column]) {
            errors[column] = `${column} is required`;
        }
    });
    return errors;
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
