import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../Images';
import { Link } from 'react-router-dom';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
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
                                <Tooltip title="Cart 0 items" placement="bottom-start">
                                    <LocalMallOutlinedIcon />
                                </Tooltip>
                            </li>
                            <li>
                                <PersonIcon />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
