import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getProductById} from "../../api/productsApi.ts";
import {Product} from "../../types/products.ts";
import styles from "./ProductPage.module.scss";
import placeholder from '../../assets/placeholder.svg'
import {concatenateImage} from "../../utils/concatenateImage.ts";
import {Loader} from "../../components/common/Loader/Loader.tsx";

export const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                console.log('Product ID is missing.');
                setLoading(false);
                return;
            }
            try {
                const productData = await getProductById(id);
                setProduct(productData);
            } catch (err) {
                console.log('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className={styles.productPage}>
            {loading && <Loader/>}
            {!loading && (
                <div className={'container mx-auto'}>
                    {product && (
                        <div className={styles.productItem}>
                            <img src={product.image ? concatenateImage(product.image) : placeholder}
                                 alt={product.name}/>
                            <div className={styles.productContent}>
                                <h1 className={'heading-tertiary'}>{product.name}</h1>
                                <p className={styles.productItemCategory}>{product.category.name}</p>
                                <p className={'text-small'}>Description: {product.description}</p>
                                <p className={'text'}>Price: ${product.price}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
