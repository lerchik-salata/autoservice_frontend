import { ProfileForm } from "../../../components/profile/ProfileForm/ProfileForm.tsx";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from "../../../store/slices/userSlice";
import { getMe as getMeApi } from "../../../api/authApi";

export const Settings = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');

    const fetchUserData = async () => {
        dispatch(fetchUserStart());
        try {
            const response = await getMeApi();
            dispatch(fetchUserSuccess(response.user));
            setName(response.user.name);
            setSurname(response.user.surname);
        } catch (err) {
            dispatch(fetchUserFailure('Failed to fetch user data'));
            console.error('Error fetching user data:', err);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [dispatch]);

    return (
        <div className="mt-8">
            <h2>Edit Your Profile</h2>

            <ProfileForm
                name={name}
                surname={surname}
                setName={setName}
                setSurname={setSurname}
                onProfileUpdate={fetchUserData}
            />
        </div>
    );
};
