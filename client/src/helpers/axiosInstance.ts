import axios from "axios";

type AxiosInstanceType = {
    baseURL: string;
    headers: {
        'Content-Type': string;
    };
    withCredentials: boolean;
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

export default axiosInstance<AxiosInstanceType>;