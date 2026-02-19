import axios from "axios";

type AxiosInstanceType = {
    baseURL: string;
    headers: {
        'Content-Type': 'application/json';
    };
    withCredentials: boolean;
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

export default axiosInstance<AxiosInstanceType>;