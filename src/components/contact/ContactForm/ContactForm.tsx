import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from './ContactForm.module.scss';
import { addApplication } from '../../../api/applicationApi.ts';
import { validatePhoneNumber, validateEmail } from '../../../utils/contactValidation.ts';

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        client_name: '',
        phone_number: '',
        email: '',
        message: ''
    });

    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'phone_number') {
            const rawPhoneNumber = value.replace(/\D/g, '');
            const error = validatePhoneNumber(rawPhoneNumber);
            setPhoneError(error);
        }

        if (name === 'email') {
            const error = validateEmail(value);
            setEmailError(error);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (phoneError || emailError) {
            alert('Please fix the errors in the form before submitting.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await addApplication(formData);
            console.log('Form submitted successfully:', response);
            alert('Your application has been submitted successfully!');

            setFormData({
                client_name: '',
                phone_number: '',
                email: '',
                message: ''
            });

            setPhoneError(null);
            setEmailError(null);

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit your application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.contactGroup}>
                    <label htmlFor="name">Name <span>*</span></label>
                    <input
                        name="client_name"
                        type="text"
                        className={styles.contactInput}
                        required={true}
                        value={formData.client_name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles.contactGroup}>
                    <label htmlFor="phone_number">Phone number <span>*</span></label>
                    <InputMask
                        mask="+38(999) 999-99-99"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                    >
                        {(inputProps: any) => (
                            <input
                                {...inputProps}
                                name="phone_number"
                                type="tel"
                                className={`${styles.contactInput} ${phoneError ? styles.errorInput : ''}`}
                                required={true}
                            />
                        )}
                    </InputMask>
                    {phoneError && <span className={styles.errorText}>{phoneError}</span>}
                </div>

                <div className={styles.contactGroup}>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input
                        name="email"
                        type="email"
                        className={`${styles.contactInput} ${emailError ? styles.errorInput : ''}`}
                        required={true}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {emailError && <span className={styles.errorText}>{emailError}</span>}
                </div>

                <div className={styles.contactGroup}>
                    <label htmlFor="message">Message <span>*</span></label>
                    <textarea
                        name="message"
                        rows={4}
                        required={true}
                        value={formData.message}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    type="submit"
                    className={'btn-primary'}
                    disabled={isSubmitting || !!phoneError || !!emailError}
                >
                    {isSubmitting ? 'Sending...' : 'Send'}
                </button>
            </form>
        </>
    );
};
