import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '../../store/slices/userSlice';
import { getMe as getMeApi } from '../../api/authApi';
import { RootState } from '../../store/store';
import {Outlet, useNavigate} from "react-router-dom";
import styles from './Profile.module.scss';
import Tabs from "../../components/common/Tabs/Tabs.tsx";

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

    const tabsData = [
        { path: '/profile/settings', label: 'Settings' },
        { path: '/profile/orders', label: 'Orders' },
        { path: '/profile/repairs', label: 'Repairs' },
    ];

    return (
        <div className={styles.profilePage}>
            <div className={'container mx-auto'}>
                <h1 className="heading-secondary mb-4">Hello {userData.name} {userData.surname}!</h1>

                <Tabs tabs={tabsData} light={false}/>

                <Outlet/>
            </div>
        </div>
    );
};
