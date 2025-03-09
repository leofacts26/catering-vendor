import axios from 'axios';
import { logout } from '../features/user/userSlice';
export const BASE_URL = 'https://api.cateringsandtiffins.in';

// Create an Axios instance with common configuration options
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});


// Axios response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const { store } = await import('../app/store'); // Lazy import store
            store.dispatch(logout()); // Dispatch logout action
        }
        return Promise.reject(error);
    }
);