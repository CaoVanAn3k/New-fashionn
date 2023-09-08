import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../Images';

const cx = classNames.bind(styles);
const Header = () => {
    return (
        <div className={cx('header')}>
            <div className={cx('header-main')}>
                <div className={cx('header-main-left')}>
                    <div className={cx('main-left-body')}>
                        <div className={cx('main-left-logo')}>
                            <img src={images.logo} alt={images.logo} />
                        </div>
                        <div className={cx('main-left-title')}>
                            <h3>Bich Thuan Stote</h3>
                        </div>
                    </div>
                </div>
                <div className={cx('header-main-right')}>
                    <div className={cx('main-right-body')}>
                        <ul className={cx('main-right-list')}>
                            <li>Trang Chủ</li>
                            <li>Cửa hàng</li>
                            <li>Thông tin</li>
                            <li>
                                <i className={cx('fa-solid fa-magnifying-glass')}></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
