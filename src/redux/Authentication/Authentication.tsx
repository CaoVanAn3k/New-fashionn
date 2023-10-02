import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosUtil';
import { toast } from 'react-toastify';
interface Person {
    userName: string;
    fullName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}
interface AuthState {
    loading: boolean;
    isLogined: boolean;
    isRegister: boolean;
    userName: string;
    error: string;
}
interface LoginData {
    userName: string;
    password: string;
}
interface ResponseUser {
    token: string;
    refreshToken: string;
}
export const register = createAsyncThunk<void, Person>('register', async (data: Person) => {
    const values = {
        userName: data.userName,
        fullName: data.fullName,
        password: data.password,
        phoneNumber: data.phoneNumber,
        address: '',
    };
    try {
        const res: string = await axiosInstance.post('/auth/register', values);
        toast.success(res);
        return;
    } catch (err: any) {
        if (err.status === 400) {
            toast.error(err.data);
        }
        return;
    }
});
export const login = createAsyncThunk<string | any, LoginData>('login', async (data: LoginData) => {
    try {
        const res = await axiosInstance.post<void, ResponseUser>('/auth/login', data);
        if (res) {
            toast.success('đăng nhập thành công');
            return data.userName;
        }
    } catch (err: any) {
        if (err.status === 403) {
            toast.error('tài khoản hoặc mật khẩu không đúng!');
            throw new Error('tài khoản hoặc mật khẩu không đúng!');
        }
        throw err;
    }
});
export const logout = createAsyncThunk<void, string>('logout', async (data) => {
    try {
        const res: string = await axiosInstance.post('/auth/logout', data);
        if (res) {
            toast.success(res);
        }
    } catch (err: any) {
        toast.error(err);
        throw new Error(err);
    }
});
const initialState: AuthState = {
    loading: false,
    isLogined: false,
    isRegister: false,
    userName: '',
    error: '',
};
const AuthenTicationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRegister: (state) => {
            state.isRegister = true;
        },
        clearState: (state) => {
            state.isRegister = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<void>) => {
                state.loading = false;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.isLogined = true;
                state.userName = action.payload;
            })
            .addCase(logout.fulfilled, (state, action: PayloadAction<void>) => {
                state.loading = false;
                state.isLogined = false;
                state.userName = '';
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isLogined = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.isLogined = false;
                state.error = action.error.message || 'Logout failed';
            });
    },
});
export const { userRegister, clearState } = AuthenTicationSlice.actions;
export default AuthenTicationSlice.reducer;
