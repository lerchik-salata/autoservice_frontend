import { useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Table from "../../components/admin/Table/Table.tsx";
import Tabs from "../../components/common/Tabs/Tabs.tsx";

import styles from './AdminPage.module.scss';

import { addCategory, deleteCategory, updateCategory, getCategories } from "../../api/categoriesApi.ts";
import { deleteUser, getUsers } from "../../api/userApi.ts";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../../api/productsApi.ts";
import { RootState } from "../../store/store.ts";

const AdminPage = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state: RootState) => state.user.user?.role);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else if (!isAdmin) {
            navigate('/profile/settings');
        }
    }, [isAuthenticated, isAdmin, navigate]);

    const tabsData = [
        { path: '/admin/categories', label: 'Categories' },
        { path: '/admin/users', label: 'Users' },
        { path: '/admin/products', label: 'Products' },
    ];

    const currentPath = location.pathname;

    return (
        <div className={styles.adminPage}>
            <div className="container mx-auto py-10">
                <Tabs tabs={tabsData} light={true} />

                {currentPath === '/admin/categories' && (
                    <Table
                        entityName="Category"
                        addEntity={addCategory}
                        updateEntity={updateCategory}
                        deleteEntity={deleteCategory}
                        columns={['name']}
                        fetchEntities={getCategories}
                    />
                )}

                {currentPath === '/admin/users' && (
                    <Table
                        entityName="User"
                        deleteEntity={deleteUser}
                        columns={['name', 'surname', 'email', 'role']}
                        fetchEntities={getUsers}
                    />
                )}

                {currentPath === '/admin/products' && (
                    <Table
                        entityName="Product"
                        addEntity={addProduct}
                        updateEntity={updateProduct}
                        deleteEntity={deleteProduct}
                        columns={['name', 'description', 'price', 'category', 'image']}
                        fetchEntities={getProducts}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;
