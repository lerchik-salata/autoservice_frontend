import { useEffect, useState } from "react";
import Table from "../../components/admin/Table/Table.tsx";
import styles from './AdminPage.module.scss';
import { addCategory, deleteCategory, updateCategory, getCategories } from "../../api/categoriesApi.ts";
import {deleteUser, getUsers} from "../../api/userApi.ts";

const AdminPage = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    const fetchCategories = async () => {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
    };

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    }

    useEffect(() => {
        fetchCategories();
        fetchUsers();
    }, []);

    return (
        <div className={styles.adminPage}>
            <div className="container mx-auto py-10">
                <Table
                    entityName="Category"
                    addEntity={addCategory}
                    updateEntity={updateCategory}
                    deleteEntity={deleteCategory}
                    columns={['name']}
                    data={categories}
                    fetchEntities={getCategories}
                />
                <Table
                    entityName="User"
                    deleteEntity={deleteUser}
                    columns={['name', 'surname', 'email', 'role']}
                    data={users}
                    fetchEntities={getUsers}
                />
            </div>
        </div>
    );
};

export default AdminPage;
