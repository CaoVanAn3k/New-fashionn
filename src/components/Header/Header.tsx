import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../Images';
import { Link } from 'react-router-dom';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import logo from '../Images/Product/logo.svg';
import { useState } from 'react';
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
const Header = () => {
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
                            {menuList.map((menu, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={menu.paths}>{menu.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className={cx('main-right-icon')}>
                            <li onClick={handleSearchOn}>
                                <SearchIcon />
                            </li>
                            <li className={cx('right-cart')}>
                                <Tooltip title="Cart 0 items" placement="bottom-start">
                                    <LocalMallOutlinedIcon />
                                </Tooltip>
                            </li>
                            <li className={cx('right-person')}>
                                <PersonIcon />
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
