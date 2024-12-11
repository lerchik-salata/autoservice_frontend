import { useEffect, useState } from "react";
import Table from "../../components/admin/Table/Table.tsx";
import styles from './AdminPage.module.scss';
import { addCategory, deleteCategory, updateCategory, getCategories } from "../../api/categoriesApi.ts";
import {deleteUser, getUsers} from "../../api/userApi.ts";
import {Category} from "../../types/categories.ts";
import {User} from "../../types/auth.ts";
import {Product} from "../../types/products.ts";
import {addProduct, deleteProduct, getProducts, updateProduct} from "../../api/productsApi.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";

const AdminPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state: RootState) => state.user.user?.role);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else if(!isAdmin) {
            navigate('/profile/settings')
        }
    }, [isAuthenticated, navigate]);

    const fetchCategories = async () => {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
    };

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    }

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
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
                <Table
                    entityName="Product"
                    addEntity={addProduct}
                    updateEntity={updateProduct}
                    deleteEntity={deleteProduct}
                    columns={['name', 'description', 'price', 'category', 'image']}
                    data={products}
                    fetchEntities={getProducts}
                />
            </div>
        </div>
    );
};

export default AdminPage;
