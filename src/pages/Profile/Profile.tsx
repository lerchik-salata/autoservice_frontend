import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '../../store/slices/userSlice';
import { getMe as getMeApi } from '../../api/authApi';
import { RootState } from '../../store/store';
import {Link, Outlet, useNavigate} from "react-router-dom";
import styles from './Profile.module.scss';

export const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const fetchUserData = async () => {
        dispatch(fetchUserStart());
        try {
            const response = await getMeApi();
            dispatch(fetchUserSuccess(response.user));
        } catch (err) {
            dispatch(fetchUserFailure('Failed to fetch user data'));
            console.error('Error fetching user data:', err);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [dispatch]);

    if (!userData) {
        return <div>No user data</div>;
    }

    return (
        <div className={styles.profilePage}>
            <div className={'container mx-auto'}>
                <h1 className="heading-secondary mb-4">Hello {userData.name} {userData.surname}!</h1>

                <nav className={styles.tabs}>
                    <Link
                        to="/profile/settings"
                        className={`${styles.tab} ${location.pathname === '/profile/settings' ? `${styles.active}` : ''}`}
                    >
                        Settings
                    </Link>
                    <Link
                        to="/profile/orders"
                        className={`${styles.tab} ${location.pathname === '/profile/orders' ? `${styles.active}` : ''}`}
                    >
                        Orders
                    </Link>
                    <Link
                        to="/profile/repairs"
                        className={`${styles.tab} ${location.pathname === '/profile/repairs' ? `${styles.active}` : ''}`}
                    >
                        Repairs
                    </Link>
                </nav>

                <Outlet/>
            </div>
        </div>
    );
};
