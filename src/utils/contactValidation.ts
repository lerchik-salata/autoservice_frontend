export const validatePhoneNumber = (phoneNumber: string): string | null => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
        return 'Invalid phone number. Please follow the format +1234567890.';
    }
    return null;
};

export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Invalid email address. Please enter a valid email.';
    }
    return null;
};
