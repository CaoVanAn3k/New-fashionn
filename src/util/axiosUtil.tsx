import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { logout } from '../redux/Authentication/Authentication';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import waiting from './waiting';
const Api_url = process.env.REACT_APP_API_URL;
interface response {
    token: string;
    refreshToken: string;
}
interface token {
    exp: any;
    iat: any;
    roles: Array<string>;
    sub: string;
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
    async (config) => {
        const accessToken: any = Cookies.get('accessToken');
        const refreshToken: any = Cookies.get('refreshToken');
        if (!accessToken && !refreshToken) {
            config.headers.Authorization = null;
        } else {
            try {
                const decodedAccessToken: token = jwtDecode(accessToken);
                const decodedRefreshToken: token = jwtDecode(refreshToken);
                const currentTime = new Date().getTime() / 1000;
                if (decodedAccessToken.exp <= currentTime && decodedRefreshToken.exp > currentTime) {
                    const data = {
                        token: accessToken,
                        refreshToken: refreshToken,
                    };
                    const res = await axiosInstance.post<void, response>('/auth/refreshToken', data);
                    config.headers.Authorization = `Bearer ${res.token}`;
                } else if (decodedAccessToken.exp <= currentTime && decodedRefreshToken.exp <= currentTime) {
                    const dispatch = useDispatch<any>();
                    const navigate = useNavigate();
                    dispatch(logout(decodedAccessToken.sub));
                    await waiting(1000);
                    navigate('/login');
                    throw new Error('Both tokens expired, please log in again');
                } else {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
            } catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
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
    (err) => {
        if (err.response) {
            return Promise.reject(err.response);
        }
        if (err.request) {
            return Promise.reject(err.request);
        }
        return Promise.reject(err.message);
    },
);
