import axios from "axios";

const api = axios.create({
    baseURL: "https://social-media-server-gidr.onrender.com/api",
    withCredentials: true,
});

// FormData ke liye interceptor — Content-Type auto set hoga
api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
});

export default api;