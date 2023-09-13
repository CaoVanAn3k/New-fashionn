import classNames from 'classnames/bind';
import styles from './MenuShop.module.scss';
const cx = classNames.bind(styles);

function MenuShop() {
    return (
        <div className={cx('menu-shop')}>
            <div className={cx('menu-shop-main')}>
                <div className={cx('menu-main-title')}>
                    <h2>DANH MỤC</h2>
                    <h2>SẮP XẾP THEO</h2>
                </div>
                <div className={cx('menu-main-information')}>
                    <div className={cx('main-information-left')}>
                        <select className={cx('information-item-left')}>
                            <option>Jumsuit liền thân</option>
                            <option>Jumsuit liền 1</option>
                            <option>Jumsuit liền 2</option>
                            <option>Jumsuit liền 3</option>
                            <option>Jumsuit liền 4</option>
                        </select>
                        <select className={cx('information-item-left')}>
                            <option>Jumsuit liền thân</option>
                            <option>Jumsuit liền 1</option>
                            <option>Jumsuit liền 2</option>
                            <option>Jumsuit liền 3</option>
                            <option>Jumsuit liền 4</option>
                        </select>
                        <select className={cx('information-item-left')}>
                            <option>Jumsuit liền thân</option>
                            <option>Jumsuit liền 1</option>
                            <option>Jumsuit liền 2</option>
                            <option>Jumsuit liền 3</option>
                            <option>Jumsuit liền 4</option>
                        </select>
                        <select className={cx('information-item-left')}>
                            <option>Jumsuit liền thân</option>
                            <option>Jumsuit liền 1</option>
                            <option>Jumsuit liền 2</option>
                            <option>Jumsuit liền 3</option>
                            <option>Jumsuit liền 4</option>
                        </select>
                        <select className={cx('information-item-left')}>
                            <option>Jumsuit liền thân</option>
                            <option>Jumsuit liền 1</option>
                            <option>Jumsuit liền 2</option>
                            <option>Jumsuit liền 3</option>
                            <option>Jumsuit liền 4</option>
                        </select>
                    </div>
                    <div className={cx('main-information-right')}>
                        <select className={cx('information-item-right')}>
                            <option>Tiêu biểu</option>
                            <option>Tiêu biểu 1</option>
                            <option>Tiêu biểu 2</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuShop;
