
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', 
    // baseURL: 'https://fabyoh-backend.vercel.app', 
});

export default axiosInstance;