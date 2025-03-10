// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8999', // Backend API URL
//   withCredentials: true, // To send cookies (JWT token) with each request
// });

// export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8999", // Replace with your backend URL
    withCredentials: true, // Send cookies with requests
});

// Attach token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
