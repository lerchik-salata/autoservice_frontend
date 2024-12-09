import styles from './CategoriesSection.module.scss'
import {CategoriesList} from "./CategoriesList/CategoriesList.tsx";

export const CategoriesSection = () => {

    return (
        <>
        <div className={styles.categoriesList}>
            <div className="container mx-auto">
                <h2 className="heading-secondary">Automotive products: accessories, 
                    <br />
                consumables and much more</h2>
                <p className="text mb-10">
                PROAuto is a specialized online store of popular products for cars.</p>
                <CategoriesList/>
            </div>
        </div>
        </>
    )
}