import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '../../store/slices/userSlice';
import { getMe as getMeApi } from '../../api/authApi';
import { RootState } from '../../store/store';
import {Link, Outlet} from "react-router-dom";

export const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.user);

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
        <div className={'container mx-auto'}>
            <h1 className="mb-4">Hello {userData.name} {userData.surname}!</h1>

            <nav className="flex gap-4">
                <Link to="/profile/settings">Settings</Link>
                <Link to="/profile/orders">Orders</Link>
                <Link to="/profile/repairs">Repairs</Link>
            </nav>

            <Outlet />
        </div>
    );
};
