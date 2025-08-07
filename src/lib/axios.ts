import axios, {InternalAxiosRequestConfig} from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig):InternalAxiosRequestConfig=> {
    config.headers.Authorization =`Bearer ${localStorage.getItem("auth_token")}`
    return config;
});

export default apiClient;