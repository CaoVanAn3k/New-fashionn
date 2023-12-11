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
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
const callRefreshToken = async (): Promise<void> => {
    if (!isRefreshing) {
        isRefreshing = true;
        const res = await axiosInstance.get<void, response>('/auth/refreshToken');
        isRefreshing = false;

        // Lưu AccessToken mới vào Cookies hoặc nơi lưu trữ khác
        Cookies.set('accessToken', res.token);
    }
};
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
            if (!refreshPromise) {
                // Gọi refreshToken và lưu promise vào biến refreshPromise
                refreshPromise = callRefreshToken();
            }
            // Chờ refreshToken hoàn thành trước khi thực hiện lại request gốc
            await refreshPromise;

            // Sau khi refreshToken hoàn thành, reset biến refreshPromise
            refreshPromise = null;

            // Gọi lại API gốc với AccessToken mới
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
