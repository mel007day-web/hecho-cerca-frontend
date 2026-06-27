import axios from 'axios';

const api = axios.create({
    baseURL: 'https://TU_BACKEND.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;