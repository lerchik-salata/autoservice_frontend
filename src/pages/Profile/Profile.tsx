import { useState, useEffect } from 'react';
import {getMe as getMeApi} from '../../api/authApi';

export const Profile = () => {
    const [userData, setUserData] = useState<{ name: string; surname: string } | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getMeApi();
                console.log(response);
                setUserData(response.user);
            } catch (err) {
                setError('Failed to fetch user data');
                console.error('Error fetching user data:', err);
            }
        };
        fetchUserData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className={'container mx-auto'}>
                <h1>Hello {userData ? `${userData.name} ${userData.surname}` : 'Loading...'}!</h1>
            </div>
        </div>
    );
};
