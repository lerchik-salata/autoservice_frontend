import styles from './ContactForm.module.scss';

export const ContactForm = () => {
    return(
        <>
            <form className={styles.contactForm}>
                <div className={styles.contactGroup}>
                    <label htmlFor="name">Name <span>*</span></label>
                    <input name={'name'} type={'text'} className={styles.contactInput} required={true}/>
                </div>
                <div className={styles.contactGroup}>
                    <label htmlFor="phone">Phone number <span>*</span></label>
                    <input name={'phone'} type={'tel'} className={styles.contactInput} required={true}/>
                </div>
                <div className={styles.contactGroup}>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input name={'email'} type={'email'} className={styles.contactInput} required={true}/>
                </div>
                <div className={styles.contactGroup}>
                    <label htmlFor="message">Message <span>*</span></label>
                    <textarea name={'message'} rows={4} required={true}/>
                </div>
                <button type={'submit'} className={'btn-primary'}>Send</button>
            </form>
        </>
    )
}