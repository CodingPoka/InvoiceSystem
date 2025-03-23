

import axios from 'axios';

const axiosInstance = axios.create({
     baseURL: "https://invoicebackend-k6sm.onrender.com", 
   // baseURL:  'http://localhost:8999', 
   
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
