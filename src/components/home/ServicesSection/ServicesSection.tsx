import styles from './ServicesSection.module.scss'
import {ServicesList} from "./ServicesList/ServicesList.tsx";

export const ServicesSection = () => {

    return (
        <div className={styles.servicesList} id={'services'}>
            <div className="container mx-auto">
                <h2 className="heading-secondary text-white">Services</h2>
                <p className="text text-white mb-10">
                    Company managers will be happy to answer your questions and help you choose products.
                </p>
                <ServicesList/>
            </div>
        </div>
    );
};
