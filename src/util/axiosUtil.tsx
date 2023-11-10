import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
const Api_url = process.env.REACT_APP_API_URL;
interface response {
    token: string;
    refreshToken: string;
}
export const axiosInstance: AxiosInstance = axios.create({
    baseURL: Api_url,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken: string | undefined = Cookies.get('accessToken');
        if (accessToken === undefined || accessToken.length === 0) {
            config.headers.Authorization = null;
        } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);
axiosInstance.interceptors.response.use(
    (res) => res.data,
    async (err) => {
        if (err.response.status === 403) {
            const res = await axiosInstance.get<void, response>('/auth/refreshToken');
            err.config.headers['Authorization'] = `Bearer ${res.token}`;
            return axios.request(err.config);
        }
        if (err.response.status === 401) {
            const accessToken: any = Cookies.get('accessToken');
            if (accessToken !== undefined) {
                err.response.message = 'phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
                return Promise.reject(err.response);
            }
            err.response.message = 'vui lòng đăng nhập lại';
            return Promise.reject(err.response);
        }
        if (err.response) {
            return Promise.reject(err.response);
        }
        if (err.request) {
            return Promise.reject(err.request);
        }
        return Promise.reject(err.message);
    },
);
