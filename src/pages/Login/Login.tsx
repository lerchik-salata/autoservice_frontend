import './Login.scss'
import {LoginForm} from "../../components/login/LoginForm/LoginForm.tsx";

export const Login = () => {
    return (
        <div className={'login-page'}>
            <div className={'container mx-auto'}>
                <LoginForm/>
            </div>
        </div>
    );
}