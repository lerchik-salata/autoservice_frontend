import { useState } from 'react';
import { updateUser as updateUserApi } from '../../../api/userApi';

interface ProfileFormProps {
    name: string;
    surname: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setSurname: React.Dispatch<React.SetStateAction<string>>;
    onProfileUpdate: () => void;
}

export const ProfileForm = ({
                                name,
                                surname,
                                setName,
                                setSurname,
                                onProfileUpdate
                            }: ProfileFormProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateUserApi({ name, surname });
            onProfileUpdate();
        } catch (err) {
            console.error('Error updating user data:', err);
            alert('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor="name" className="mb-2">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="surname" className="mb-2">Surname</label>
                <input
                    id="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded mt-4 disabled:opacity-50"
                disabled={isLoading}
            >
                {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
    );
};
