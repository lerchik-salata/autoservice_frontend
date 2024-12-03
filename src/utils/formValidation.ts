import { FormData } from '../components/login/LoginForm/LoginForm';

export const validateField = (name: string, value: string, formData: FormData): string => {
    switch (name) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? ''
                : 'Please enter a valid email address.';
        case 'password':
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
                ? ''
                : 'Password must be at least 8 characters long and include a number and a special character.';
        case 'confirmPassword':
            return value === formData.password
                ? ''
                : 'Passwords do not match.';
        case 'firstName':
            return value.trim().length >= 2
                ? ''
                : 'Name must be at least 2 characters long.';
        case 'lastName':
            return value.trim().length >= 2
                ? ''
                : 'Surname must be at least 2 characters long.';
        default:
            return '';
    }
};

export const validateForm = (formData: FormData): { [key: string]: string } => {
    return Object.keys(formData).reduce((errors, key) => {
        const error = validateField(key, formData[key as keyof FormData] || '', formData);
        if (error) errors[key] = error;
        return errors;
    }, {} as { [key: string]: string });
};
