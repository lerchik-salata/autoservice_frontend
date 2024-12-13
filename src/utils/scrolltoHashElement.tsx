import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToHashElement = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [location]);

    return null;
};

