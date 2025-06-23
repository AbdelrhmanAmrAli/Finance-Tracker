import axios from 'axios';
import { BASE_URL } from './apiPath';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:10000, // 10 seconds timeout 
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Add a request interceptor to include the Authorization header with the token
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken= localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, just return it
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            if(error.response.status === 401) {
                // Unauthorized access, show a message
                console.error('Unauthorized access - Please login');
                //redirect to login page
                window.location.href = '/login';

            }
            else if (error.response.status === 500) {
                // Internal server error, show a message
                console.error('Internal server error - Please try again later');
            }
        }
        else if (error.code === 'ECONNABORTED') {
            // Handle timeout error
            console.error('Request timed out - Please try again later');
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
