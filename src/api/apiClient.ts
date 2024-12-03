import axios from 'axios';
import { store } from '../store/store.ts';
import { RootState } from '../store/store.ts';

const apiClient = axios.create({
    baseURL: 'http://0.0.0.0:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const state = store.getState() as RootState;
        const accessToken = state.auth.accessToken;
        console.log(accessToken);
        console.log(state.auth)
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
