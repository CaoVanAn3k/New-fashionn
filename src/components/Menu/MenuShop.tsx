import classNames from 'classnames/bind';
import styles from './MenuShop.module.scss';
// import React from 'react';
import Slider from 'react-slick';
import { useEffect } from 'react';
import {
    getAllCategory,
    findProductByCategoryId,
    deleteDataProducts,
    checkStateGetProductByCategoryId,
    findAllProductShop,
    findAllProductShopBySortPrice,
    updateStateSortName,
} from '../../redux/products/products';
import { useAppSelector, useAppDispatch } from '../../redux/store';
// import MenuLink from './MenuLink';
const cx = classNames.bind(styles);
interface ResponseCategory {
    categoryId: number;
    name: string;
}
let menuLink = [
    {
        id: 1,
        title: 'Shop',
        path: '/shop',
        icon: 'icon',
    },
];
function MenuShop() {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.products);
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllCategory());
        }
    }, [categories.length, dispatch]);
    const handleClickCategoryItem = (item: ResponseCategory) => {
        menuLink = menuLink.filter((item) => item.id !== 2);
        menuLink.push({
            id: 2,
            title: `${item.name}`,
            path: '',
            icon: '',
        });
        Promise.all([
            dispatch(checkStateGetProductByCategoryId(item.name)),
            dispatch(deleteDataProducts()),
            dispatch(findProductByCategoryId(item.categoryId)),
        ]);
    };
    const handleChangeSortProduct = async (e: any) => {
        await dispatch(updateStateSortName(''));
        if (e.target.value === 'stand-out') {
            await dispatch(deleteDataProducts());
            dispatch(findAllProductShop(0));
        } else {
            const data = {
                sortName: e.target.value,
                offset: 0,
            };
            await dispatch(updateStateSortName(e.target.value));
            await dispatch(findAllProductShopBySortPrice(data));
        }
    };

    const settings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 500,
    };
    return (
        <div className={cx('menu-shop')}>
            <div className={cx('menu-shop-main')}>
                <div className={cx('menu-main-title')}>
                    <h2>DANH MỤC</h2>
                    <h2>SẮP XẾP THEO</h2>
                </div>
                <div className={cx('menu-main-information')}>
                    <div className={cx('main-information-right')}>
                        <select
                            className={cx('information-item-right')}
                            onChange={(e) => {
                                handleChangeSortProduct(e);
                            }}
                        >
                            <option value="stand-out">Nổi Bật</option>
                            <option value="increase">Sắp xếp theo giá từ thấp đến cao</option>
                            <option value="decrease">Sắp xếp theo giá từ cao đến thấp</option>
                        </select>
                    </div>
                    <div className={cx('main-information-left')}>
                        <ul className={cx('main-information-list')}>
                            <Slider {...settings}>
                                {categories.length > 0 &&
                                    categories.map((item: ResponseCategory, index: number) => {
                                        return (
                                            <li
                                                className={cx('main-information-item', 'active')}
                                                key={index}
                                                onClick={() => {
                                                    handleClickCategoryItem(item);
                                                }}
                                            >
                                                <span>{item.name}</span>
                                            </li>
                                        );
                                    })}
                            </Slider>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuShop;
