import { ChangeEvent, FocusEvent } from 'react';
import './InputField.scss';

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
    return (
        <div className="input-field">
            <label htmlFor={id}>{label}:</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
            />
        </div>
    );
};
