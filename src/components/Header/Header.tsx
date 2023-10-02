import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../Images';
import { Link, useNavigate } from 'react-router-dom';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/Authentication/Authentication';
import waiting from '../../util/waiting';
const cx = classNames.bind(styles);
const menuList = [
    {
        title: 'Trang Chủ',
        paths: '/',
    },
    {
        title: 'Cửa hàng',
        paths: '/shop',
    },
    {
        title: 'Thông tin',
        paths: '',
    },
];
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [activeMenu, setActiveMenu] = useState(false);
    const { isLogined, userName } = useAppSelector((state) => state.users);
    const handleClickCart = () => {
        navigate('/cart');
    };
    const handleClickPerson = () => {
        setActiveMenu(!activeMenu);
    };
    const handleClickLogin = () => {
        navigate('/login');
    };
    const handleClickRegister = () => {
        navigate('/register');
    };
    const handleClickLogout = async () => {
        dispatch(logout(userName));
        await waiting(1000);
        navigate('/login');
    };
    return (
        <div className={cx('header')}>
            <div className={cx('header-main')}>
                <div className={cx('header-main-left')}>
                    <Link to="/" className={cx('main-left-body')}>
                        <div className={cx('main-left-logo')}>
                            <img src={images.logo} alt={images.logo} />
                        </div>
                        <div className={cx('main-left-title')}>
                            <h3>Bich Thuan Stote</h3>
                        </div>
                    </Link>
                </div>
                <div className={cx('header-main-right')}>
                    <div className={cx('main-right-body')}>
                        <ul className={cx('main-right-list')}>
                            {menuList.map((menu, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={menu.paths}>{menu.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className={cx('main-right-icon')}>
                            <li>
                                <SearchIcon />
                            </li>
                            <li>
                                <BootstrapTooltip
                                    title="Cart 0 items"
                                    placement="bottom-start"
                                    onClick={() => handleClickCart()}
                                >
                                    <LocalMallOutlinedIcon />
                                </BootstrapTooltip>
                            </li>
                            <li className={cx('dropdown')} onClick={() => handleClickPerson()}>
                                <PersonIcon />
                                {activeMenu && (
                                    <ul className={cx('dropdown-menu')}>
                                        {isLogined ? (
                                            <>
                                                <li>
                                                    <AccountBoxIcon />
                                                    <span>chào {userName}</span>
                                                </li>
                                                <li onClick={handleClickLogout}>
                                                    <LogoutIcon />
                                                    <span>Đăng xuất</span>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li onClick={() => handleClickLogin()}>
                                                    <LoginIcon />
                                                    <span>đăng nhập</span>
                                                </li>
                                                <li onClick={() => handleClickRegister()}>
                                                    <PersonAddAlt1Icon />
                                                    <span>đăng kí</span>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
