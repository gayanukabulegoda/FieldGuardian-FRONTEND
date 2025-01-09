import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const version = import.meta.env.VITE_API_VERSION || 'v1';

export const api = axios.create({
    baseURL: `${baseURL}/${version}`,
    headers: {
        'Content-Type': 'application/json',
    },
});