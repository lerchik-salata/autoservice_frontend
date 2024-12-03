import styles from "./Header.module.scss";
import logo from "../../../assets/logo.svg";
import cart from "../../../assets/cart.svg";
import userIcon from "../../../assets/user.svg";
import { RootState } from "../../../store/store.ts";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/authSlice.ts';

export const Header = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <div className="container mx-auto flex items-center justify-between flex-wrap gap-5">
                <NavLink to={'/'}>
                    <img src={logo} alt="Pro Auto"/>
                </NavLink>
                <nav className="flex gap-4">
                    <a href="/public#services" className="link">services</a>
                    <a href="/public#about" className="link">about</a>
                    <NavLink to="/shop" className="link">shop</NavLink>
                    <NavLink to="/contact" className="link">contact</NavLink>
                </nav>
                <div className="flex gap-2 items-center">
                    <img src={cart} alt="Cart" />
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/profile">
                                <img src={userIcon} alt="User Profile"/>
                            </NavLink>
                            <button onClick={handleLogout} className="btn-primary">
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="btn-primary">Login</NavLink>
                    )}
                </div>
            </div>
        </header>
    );
};
