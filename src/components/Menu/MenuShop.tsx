import classNames from 'classnames/bind';
import styles from './MenuShop.module.scss';
import { useEffect } from 'react';
import { getAllCategory } from '../../redux/products/products';
import { useAppSelector, useAppDispatch } from '../../redux/store';
const cx = classNames.bind(styles);
interface ResponseCategory {
    id: number;
    name: string;
}
function MenuShop() {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.products);
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllCategory());
        }
    }, [categories.length, dispatch]);
    return (
        <div className={cx('menu-shop')}>
            <div className={cx('menu-shop-main')}>
                <div className={cx('menu-main-title')}>
                    <h2>DANH MỤC</h2>
                    <h2>SẮP XẾP THEO</h2>
                </div>
                <div className={cx('menu-main-information')}>
                    <div className={cx('main-information-left')}>
                        <ul className={cx('main-information-list')}>
                            {categories &&
                                categories.map((item: ResponseCategory, index: number) => {
                                    return (
                                        <li className={cx('main-information-item')} key={index}>
                                            <span>{item.name}</span>
                                        </li>
                                    );
                                })}
                        </ul>
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
