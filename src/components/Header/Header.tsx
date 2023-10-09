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
import { Link as ScrollLink } from 'react-scroll';
import waiting from '../../util/waiting';
import logo from '../Images/Product/logo.svg';
const cx = classNames.bind(styles);
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
    const [searchClick, setSearchClick] = useState(false);
    const handleSearchOn = () => {
        setSearchClick(true);
    };
    const handleSearchOff = () => {
        setSearchClick(false);
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
                            <li>
                                <Link to="/">Trang Chủ</Link>
                            </li>
                            <li>
                                <Link to="/shop">Cửa Hàng</Link>
                            </li>
                            <li>
                                <ScrollLink
                                    to="information-shop"
                                    smooth={true}
                                    duration={1000}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Thông Tin
                                </ScrollLink>
                            </li>
                        </ul>
                        <ul className={cx('main-right-icon')}>
                            <li onClick={handleSearchOn}>
                                <SearchIcon />
                            </li>
                            <li className={cx('right-cart')}>
                                <BootstrapTooltip
                                    title="Cart 0 items"
                                    placement="bottom-start"
                                    onClick={() => handleClickCart()}
                                >
                                    <LocalMallOutlinedIcon />
                                </BootstrapTooltip>
                            </li>
                            {/* <li className={cx('right-cart')}>
                                <Tooltip title="Cart 0 items" placement="bottom-start">
                                    <LocalMallOutlinedIcon />
                                </BootstrapTooltip>
                            </li> */}
                            {/* <li className={cx('dropdown')} onClick={() => handleClickPerson()}> */}
                            <li className={cx('right-person', 'dropdown')} onClick={() => handleClickPerson()}>
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
            {searchClick && (
                <div className={cx('header-main-search')}>
                    <div className={cx('head-search-main')}>
                        <div className={cx('head-search-left')}>
                            <div className={cx('search-left')}>
                                <img src={logo} alt="logo" />
                            </div>
                            <div className={cx('search-input')}>
                                <div className={cx('search-input-main')}>
                                    <div className={cx('search-input-top')}>
                                        <i className={cx('fa-solid fa-magnifying-glass')}></i>
                                        <input type="text" placeholder="Tìm kiếm" />
                                    </div>
                                    <div className={cx('search-input-bottom')}>
                                        <p>Cụm từ tìm kiếm phổ biến</p>
                                        <ul>
                                            <li>JUMSUIT Liền thân</li>
                                            <li>Đầm ngắn</li>
                                            <li>Đầm dài</li>
                                            <li>Set bộ rời</li>
                                            <li>Vest</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('search-right')} onClick={handleSearchOff}>
                                <p>Tắt tìm kiếm</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
