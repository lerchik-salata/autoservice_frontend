import { useState, FormEvent, ChangeEvent } from 'react';
import './LoginForm.scss';
import { InputField } from './InputField/InputField.tsx';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/authSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { validateField, validateForm } from '../../../utils/formValidation';
import {login as loginApi, LoginResponse, register as registerApi} from '../../../api/authApi';

interface FormData {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

interface Field {
    id: string;
    name: string;
    label: string;
    type: string;
}

export const LoginForm = () => {
    const location = useLocation();
    const isLoginRoute = location.pathname === '/login';
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        ...(isLoginRoute ? {} : { firstName: '', lastName: '', confirmPassword: '' }),
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const dispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (touched[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: validateField(name, value, formData),
            }));
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, formData[name as keyof FormData] || '', formData),
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const { email, password, firstName, lastName } = formData;

            const response = isLoginRoute
                ? await loginApi({ email, password })
                : await registerApi({ email, password, name: firstName || '', surname: lastName || '' });

            console.log(`${isLoginRoute ? 'Login' : 'Register'} success:`, response);

            if(isLoginRoute) {
                const loginResponse = response as LoginResponse;
                const accessToken = loginResponse.access_token;
                const refreshToken = loginResponse.refresh_token;
                dispatch(login({ accessToken: accessToken, refreshToken: refreshToken }));
            }

            console.log(`${isLoginRoute ? 'Login' : 'Register'} form submitted:`, formData);

            if (isLoginRoute) {
                navigate('/profile');
            } else {
                navigate('/register');
            }
        } catch (error : any) {
            console.error('Error during login or registration:', error);

            if (error.response?.status === 401 && isLoginRoute) {
                setErrors((prev) => ({
                    ...prev,
                    global: 'Incorrect email or password. Please try again.',
                }));
            } else if(error.response?.status === 409 && !isLoginRoute) {
                setErrors((prev) => ({
                    ...prev,
                    global: 'User already exists.',
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    global: 'Failed to authenticate. Please try again.',
                }));
            }
        }
    };

    const formFields: Field[] = isLoginRoute
        ? [
            { id: 'email', name: 'email', label: 'E-mail', type: 'email' },
            { id: 'password', name: 'password', label: 'Password', type: 'password' },
        ]
        : [
            { id: 'firstName', name: 'firstName', label: 'Name', type: 'text' },
            { id: 'lastName', name: 'lastName', label: 'Surname', type: 'text' },
            { id: 'email', name: 'email', label: 'E-mail', type: 'email' },
            { id: 'password', name: 'password', label: 'Password', type: 'password' },
            { id: 'confirmPassword', name: 'confirmPassword', label: 'Confirm password', type: 'password' },
        ];

    return (
        <form onSubmit={handleSubmit} className={'login-form'}>
            <h2 className={'heading-secondary text-white'}>
                {isLoginRoute ? 'Login' : 'Register'}
            </h2>

            {formFields.map((field) => (
                <div key={field.id} className="login-form-group">
                    <InputField
                        id={field.id}
                        name={field.name}
                        value={formData[field.name as keyof FormData] || ''}
                        type={field.type}
                        label={field.label}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched[field.name] && errors[field.name] && (
                        <p className="error-text">{errors[field.name]}</p>
                    )}
                </div>
            ))}

            {errors.global && <p className="error-text text-center mt-3 mb-3">{errors.global}</p>}

            {isLoginRoute && (
                <div className={'login-form-register'}>
                    <p className={'text-small text-white mb-2'}>
                        Don't have an account?
                    </p>
                    <NavLink to={'/register'} className={'link underline'}>
                        Register
                    </NavLink>
                </div>
            )}

            <button type="submit" className={'btn-primary'}>
                {isLoginRoute ? 'Login' : 'Register'}
            </button>
        </form>
    );
};

