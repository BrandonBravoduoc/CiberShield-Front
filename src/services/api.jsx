import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cibershield-backend.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            } catch (error) {
                console.error("Error al leer el usuario", error);
                localStorage.removeItem('user');
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401)) {
            console.log("Sesión expirada o no autorizada");
        }
        return Promise.reject(error);
    }
);

export default api;