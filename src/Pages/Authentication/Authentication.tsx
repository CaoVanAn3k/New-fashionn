import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Authentication.module.scss';
import BackgroundLogin from '../../components/Images/login/BackgroundLogin.jpg';
import ImageLogin from '../../components/Images/login/ImageLogin.jpg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    register,
    userRegister,
    clearState,
    login,
    logout,
    checkStateLogin,
    OAuthExchangeCode,
} from '../../redux/Authentication/Authentication';
import { getAllProductInCart } from '../../redux/Cart/cart';
import { useAppDispatch, useAppSelector } from '../../redux/store';                 
import waiting from '../../util/waiting';
import Cookies from 'js-cookie';
import { useGoogleLogin } from '@react-oauth/google';
interface Person {
    userName: string;
    fullName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    OTP: string;
}
interface LoginData {
    userName: string;
    password: string;
}
const registerSchema: yup.ObjectSchema<Person> = yup.object({
    userName: yup.string().required('userName is required'),
    fullName: yup
        .string()
        .defined()
        .matches(/(\w.+\s).+/, 'Enter at least 2 names')
        .required('fullName is required'),
    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, 'password must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'password must have a capital letter')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .min(8, 'Confirm password should be of minimum 8 characters length')
        .oneOf([yup.ref('password'), 'password do not match'])
        .required('Confirm password is required'),
    phoneNumber: yup
        .string()
        .matches(/(0)(\d){9}\b/, 'Enter a valid phone number')
        .defined()
        .required('phoneNumber is required'),
    OTP: yup.string().defined().required('OTP is required'),
});
const validationSchema: yup.ObjectSchema<LoginData> = yup.object({
    userName: yup.string().required('userName is required'),
    password: yup.string().required('Password is required'),
});
const cx = classNames.bind(styles);
const Authentication = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { isRegister, isLogined } = useAppSelector((state) => state.users);
    const inputUserName = useRef<HTMLInputElement | null>(null);
    const inputPassword = useRef<HTMLInputElement | null>(null);
    const [activeEye, setActiveEye] = useState(false);
    const [translate, setTranslate] = useState(0);
    const [activeFormRegister, SetActiveFormRegister] = useState(false);
    const formik = useFormik({
        initialValues: {
            userName: '',
            fullName: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            OTP: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values: Person) => {
            dispatch(register(values));
            await waiting(1000);
            dispatch(userRegister());
        },
    });
    const formLogin = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values: LoginData) => {
            dispatch(login(values));
            await waiting(1000);
            const accessToken: string | undefined = Cookies.get('accessToken');
            if (accessToken !== undefined && accessToken.length > 0) {
                Promise.all([dispatch(checkStateLogin()), dispatch(getAllProductInCart())]);
            }
        },
    });
    useEffect(() => {
        const currentPathname = location.pathname;
        if (currentPathname === '/register') {
            setTranslate(105);
            setTimeout(() => {
                SetActiveFormRegister(true);
            }, 700);
        } else {
            setTranslate(0);
            setTimeout(() => {
                SetActiveFormRegister(false);
            }, 700);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isRegister) {
            navigate('/login');
        }
        if (isLogined) {
            navigate('/');
        }
    }, [isLogined, isRegister, navigate]);
    useEffect(() => {
        const accessToken: string | undefined = Cookies.get('accessToken');
        if (accessToken !== undefined) {
            dispatch(logout());
        }
    }, [dispatch]);

    const focusInputUsername = () => {
        if (inputUserName.current) {
            inputUserName.current.focus();
        }
    };
    const focusInputPassword = () => {
        if (inputPassword.current) {
            inputPassword.current.focus();
        }
    };
    const handleClickEye = () => {
        if (inputPassword.current) {
            inputPassword.current.type = activeEye ? 'password' : 'text';
            setActiveEye(!activeEye);
        }
    };
    const handleControlRegister = async () => {
        dispatch(clearState());
        formik.resetForm();
        await waiting(200);
        navigate('/register');
        setTranslate(105);
        setTimeout(() => {
            SetActiveFormRegister(true);
        }, 700);
    };
    const handleControlLogin = () => {
        formLogin.resetForm();
        navigate('/login');
        setTranslate(0);
        setTimeout(() => {
            SetActiveFormRegister(false);
        }, 700);
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
            dispatch(OAuthExchangeCode(codeResponse.code));
        },
        onError: (errResponse) => console.log(errResponse),
        flow: 'auth-code',
    });
    return (
        <div className={cx('container')} style={{ backgroundImage: `url(${BackgroundLogin})` }}>
            <div className={cx('box')}>
                <div
                    className={cx('box-left')}
                    style={{
                        backgroundImage: `url(${ImageLogin})`,
                        transform: `translate3d(${translate}%,0,0)`,
                        borderRadius: `${activeFormRegister ? '0 1rem 1rem 0' : '1rem 0 0 1rem'}`,
                    }}
                >
                    <div className={cx('title')}>
                        <h2>
                            <span>Chào mừng bạn đến với </span>
                            <span>Bich Thuan Store</span>
                        </h2>
                    </div>
                    <div className={cx('paragraph')}>
                        <p>
                            Chào mừng trở lại! Chúng tôi rất vui khi có bạn ở đây. Thật là tuyệt khi gặp lại bạn. Chúng
                            tôi hi vọng bạn đã có một thời gian an toàn và thú vị.
                        </p>
                    </div>
                    <div className={cx('control-form')}>
                        {activeFormRegister ? (
                            <>
                                <span>Bạn đã có tài khoản?</span>
                                <button className={cx('control-button')} onClick={handleControlLogin}>
                                    <span>Đăng nhập ở đây!</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <span>Bạn chưa có tài khoản?</span>
                                <button className={cx('control-button')} onClick={handleControlRegister}>
                                    <span>Đăng kí ở đây!</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div
                    className={cx('box-right')}
                    style={{
                        transform: `translate3d(${-translate + 5}%,0,0)`,
                        borderRadius: `${activeFormRegister ? '1rem 0 0 1rem' : '0 1rem 1rem 0'}`,
                    }}
                >
                    <div className={cx('title')}>
                        {activeFormRegister ? <h2 className={cx('register')}>đăng kí</h2> : <h2>đăng nhập</h2>}
                    </div>
                    <div className={cx('form-input')}>
                        {activeFormRegister ? (
                            <form onSubmit={formik.handleSubmit} className={cx('form-register')}>
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    variant="standard"
                                    name="userName"
                                    label="Tên đăng nhập"
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                                    helperText={formik.touched.userName && formik.errors.userName}
                                />
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    variant="standard"
                                    name="fullName"
                                    label="Họ và Tên"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />

                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    variant="standard"
                                    name="password"
                                    label="Mật Khẩu"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    variant="standard"
                                    name="confirmPassword"
                                    label="Xác Nhận mật khẩu"
                                    type="password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                                <div className={cx('authentication-phone-number')}>
                                    <div className={cx('input-submit-phone-number')}>
                                        <TextField
                                            fullWidth
                                            id="phoneNumber"
                                            variant="standard"
                                            name="phoneNumber"
                                            label="Số điện thoại"
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                        />
                                        <button type="button" className={cx('button-OTP')}>
                                            <span>nhận mã OTP</span>
                                        </button>
                                    </div>
                                    <div className={cx('input-otp')}>
                                        <TextField
                                            id="OTP"
                                            label="OTP"
                                            variant="standard"
                                            value={formik.values.OTP}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.OTP && Boolean(formik.errors.OTP)}
                                            helperText={formik.touched.OTP && formik.errors.OTP}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className={cx('button-register')}>
                                    <span>Đăng Kí</span>
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={formLogin.handleSubmit}>
                                <div className={cx('input')} onClick={focusInputUsername}>
                                    <input
                                        type="text"
                                        className={cx('input-value')}
                                        placeholder="Tên đăng nhập"
                                        ref={inputUserName}
                                        name="userName"
                                        onChange={formLogin.handleChange}
                                        onBlur={formLogin.handleBlur}
                                        value={formLogin.values.userName}
                                        autoComplete="userName"
                                    />
                                </div>
                                <div className={cx('input')} onClick={focusInputPassword}>
                                    <input
                                        type={`${activeEye ? 'text' : 'password'}`}
                                        className={cx('input-value')}
                                        placeholder="Mật khẩu"
                                        ref={inputPassword}
                                        name="password"
                                        onChange={formLogin.handleChange}
                                        onBlur={formLogin.handleBlur}
                                        value={formLogin.values.password}
                                        autoComplete="current-password"
                                    />
                                    <div className={cx('active-password')} onClick={handleClickEye}>
                                        {activeEye ? (
                                            <i className="fa-solid fa-eye"></i>
                                        ) : (
                                            <i className="fa-solid fa-eye-slash"></i>
                                        )}
                                    </div>
                                </div>
                                <div className={cx('button-submit')}>
                                    <button className={cx('button')} type="submit">
                                        <span>Đăng Nhập</span>
                                    </button>
                                </div>
                                <div className={cx('forgot-password')}>
                                    <span>Quên Mật Khẩu?</span>
                                </div>
                            </form>
                        )}
                    </div>
                    {activeFormRegister ? (
                        ''
                    ) : (
                        <>
                            <div className={cx('divide')}>
                                <hr />
                                <span className={cx('text')}>hoặc</span>
                                <hr />
                            </div>
                            <div className={cx('login-networking')}>
                                <button className={cx('login', 'login-facebook')}>
                                    <i className={cx('fa-brands fa-facebook-f')}></i>
                                    <span>Đăng nhập bằng Facebook</span>
                                </button>
                                <button className={cx('login', 'login-google')} onClick={() => handleGoogleLogin()}>
                                    <i className={cx('fa-brands fa-google')}></i>
                                    <span>Đăng nhập bằng Google</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Authentication;
