import {ChangeEvent, FocusEvent, useState} from 'react';
import styles from './InputField.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputFieldProps {
    id: string;
    name: string;
    value: string;
    type: string;
    label: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export const InputField = ({
                               id,
                               name,
                               value,
                               type,
                               label,
                               onChange,
                               onBlur,
                               required = false,
                           }: InputFieldProps) => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const isPasswordField = type === 'password';

    return (
        <div className={styles.inputField}>
            <label htmlFor={id}>{label}:</label>
            <input
                type={isPasswordField && showPassword ? 'text' : type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                className={isPasswordField ? styles.passwordInput : ''}
            />
            {isPasswordField && (
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <FaEyeSlash color={'white'}/> : <FaEye color={'white'}/>}
                </button>
            )}
        </div>
    )
        ;
};
