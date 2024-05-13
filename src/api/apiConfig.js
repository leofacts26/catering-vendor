import axios from 'axios';

export const BASE_URL = 'https://api.cateringsandtiffins.in';

// Create an Axios instance with common configuration options
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});