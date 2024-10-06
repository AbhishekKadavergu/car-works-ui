// axiosInstance.js
import axios from 'axios';


// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Your backend base URL
});

// Request interceptor to set headers globally
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage or wherever it's stored
        const token = localStorage.getItem('authToken'); // Get token from localStorage

        // Exclude login and register routes from adding authorization headers
        const excludedRoutes = ['/login', '/register'];

        // If not on an excluded route, add the Authorization header
        if (token && !excludedRoutes.includes(config.url)) {
            config.headers['Authorization'] = `Bearer ${token}`; // Assuming the token is stored in userInfo
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
