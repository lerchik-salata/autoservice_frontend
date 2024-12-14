import styles from "./Contact.module.scss";
import {ContactForm} from "../../components/contact/ContactForm/ContactForm.tsx";

export const Contact = () => {
    return (
        <div className={styles.contactPage}>
            <div className={'container mx-auto'}>
                <h1 className={'heading-secondary text-white'}>contact</h1>
                <p className={'text text-center text-white mb-5'}>
                    Leave your request and our manager will contact you as soon as possible!
                </p>
                <ContactForm/>
            </div>
        </div>
    )
}