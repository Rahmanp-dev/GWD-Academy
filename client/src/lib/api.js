import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true, // Important for HttpOnly cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
