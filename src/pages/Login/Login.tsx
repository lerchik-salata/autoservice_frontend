import styles from './Login.module.scss'
import {LoginForm} from "../../components/login/LoginForm/LoginForm.tsx";

export const Login = () => {
    return (
        <div className={styles.loginPage}>
            <div className={'container mx-auto'}>
                <LoginForm/>
            </div>
        </div>
    );
}