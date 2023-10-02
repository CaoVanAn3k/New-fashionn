import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import img1 from '../../components/Images/Product/Green.png';
import img2 from '../../components/Images/Product/Blue.png';

import MenuLink from '../../components/Menu/MenuLink';
import InformationProduct from '../../components/Products/InformationProduct/InformationProduct';
import { useState } from 'react';
const cx = classNames.bind(styles);
const menuLink = [
    {
        id: 1,
        title: 'Oh’Lady Boutique',
        path: '/',
        icon: 'icon',
    },
    {
        id: 2,
        title: 'Giỏ hàng',
        path: '',
        icon: '',
    },
];
const CartList = [
    {
        id: 1,
        discount: '20%',
        linkimg: img1,
        title: 'SẢN PHẨM MẪU SỐ 1',
        code: '12345',
        color: '08 Green',
        size: 'L',
        date: '20/12/2023',
        price: '4000000VNĐ',
        total: '400000VNĐ',
    },
    {
        id: 2,
        discount: '20%',
        linkimg: img2,
        title: 'SẢN PHẨM MẪU SỐ 1',
        code: '12345',
        color: '08 Green',
        size: 'L',
        date: '20/12/2023',
        price: '4000000VNĐ',
        total: '400000VNĐ',
    },
];
const informationCart = [
    {
        id: 1,
        titleHead: '',
        product: [
            {
                idd: 1,
                linkimg: img1,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '%20',
                button: 'Mua ngay',
            },
            {
                idd: 2,
                linkimg: img2,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '',
                button: 'Mua ngay',
            },
            {
                idd: 3,
                linkimg: img1,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '%20',
                button: 'Mua ngay',
            },
            {
                idd: 4,
                linkimg: img2,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '',
                button: 'Mua ngay',
            },
        ],
    },
];

function Cart() {
    const [checkInputList, setCheckInputList] = useState(CartList.map(() => false));
    const handleCheckedBtn = (e: any) => {
        if (e.target.checked) {
            setCheckInputList(checkInputList.map(() => true));
        } else {
            setCheckInputList(checkInputList.map(() => false));
        }
    };
    const handleClickCheckBox = (index: number) => {
        const updateCheck = [...checkInputList];
        updateCheck[index] = !updateCheck[index];
        setCheckInputList(updateCheck);
    };
    return (
        <div className={cx('cart')}>
            <div className={cx('cart-main')}>
                <div className={cx('cart-main-link')}>
                    <MenuLink children={menuLink} />
                </div>
                <div className={cx('cart-main-check')}>
                    <div className={cx('main-check-list')}>
                        <input id="inputcheck" type="checkbox" onChange={(e) => handleCheckedBtn(e)} />
                        <label htmlFor="inputcheck">Chọn tất cả sản phẩm</label>
                    </div>
                </div>
                <div className={cx('cart-main-information')}>
                    <div className={cx('main-information-list')}>
                        <div className={cx('information-list-left')}>
                            {CartList.map((menu, index) => {
                                return (
                                    <div className={cx('information-left-item')} key={index}>
                                        <div className={cx('left-item-body')}>
                                            <div className={cx('item-discount')}>{menu.discount}</div>
                                            <div className={cx('item-img')}>
                                                <img src={menu.linkimg} alt="logo" />
                                            </div>
                                            <div className={cx('left-icon')}>
                                                <i className={cx('fa-solid fa-heart')}></i>
                                            </div>
                                        </div>
                                        <div className={cx('left-item-data')}>
                                            <div className={cx('item-data-main')}>
                                                <div className={cx('data-main-title')}>
                                                    <h3>{menu.title}</h3>
                                                    <input
                                                        id="inputcheck"
                                                        type="checkbox"
                                                        onChange={() => handleClickCheckBox(index)}
                                                        checked={checkInputList[index]}
                                                    />
                                                </div>
                                                <div className={cx('data-main-list')}>
                                                    <p>Mã sản phẩm:{menu.code}</p>
                                                    <p>Màu sắc:{menu.color}</p>
                                                    <p>Kích cỡ:{menu.size}</p>
                                                    <p>Giảm giá đến hết ngày :{menu.date}</p>
                                                </div>
                                                <div className={cx('data-main-price')}>
                                                    <p>{menu.price}</p>
                                                </div>
                                                <div className={cx('data-main-quantity')}>
                                                    <div className={cx('main-quantity-left')}>
                                                        <h3>SỐ LƯỢNG</h3>
                                                        <div className={cx('main-left-icon')}>
                                                            <div className={cx('icon-list')}>
                                                                <i className={cx('fa-solid fa-plus')}></i>
                                                            </div>
                                                            <span>1</span>
                                                            <div className={cx('icon-list')}>
                                                                <i className={cx('fa-solid fa-minus')}></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('main-quantity-right')}>
                                                        <h3>TỔNG:</h3>
                                                        <p>{menu.total}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('information-list-right')}>
                            <div className={cx('information-right-item')}>
                                <div className={cx('information-right-total')}>
                                    <div className={cx('right-total-title')}>
                                        <h2>TỔNG ĐƠN HÀNG</h2>
                                        <p>2 sản phẩm</p>
                                    </div>
                                    <div className={cx('right-total-data')}>
                                        <div className={cx('total-data-left')}>
                                            <p>Tổng cộng</p>
                                        </div>
                                        <div className={cx('total-data-right')}>
                                            <p>400.000 VNĐ</p>
                                            <p>400.000 VNĐ</p>
                                        </div>
                                    </div>
                                    <div className={cx('right-total-add')}>
                                        <div className={cx('total-add-left')}>
                                            <h3>TỔNG</h3>
                                            <p>Thuế giá trị tăng</p>
                                        </div>
                                        <div className={cx('total-add-right')}>
                                            <h3>800.000 VNĐ</h3>
                                            <p>10.000 VNĐ</p>
                                        </div>
                                    </div>
                                    <div className={cx('right-total-list')}>
                                        <div className={cx('total-list-left')}>
                                            <h1>TỔNG GIÁ TRỊ ĐƠN</h1>
                                            <p>810.000VNĐ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('information-right-pay')}>
                                    <div className={cx('right-pay-main')}>
                                        <div className={cx('right-main-list')}>
                                            <div className={cx('main-list-item')}>
                                                <div className={cx('list-item-left')}>
                                                    <i className={cx('fa-solid fa-hand-holding-dollar')}></i>
                                                    <p>Phiếu giảm giá</p>
                                                </div>
                                                <div className={cx('list-item-right')}>
                                                    <i className={cx('fa-solid fa-chevron-right')}></i>
                                                </div>
                                            </div>
                                            <div className={cx('main-list-item')}>
                                                <div className={cx('list-item-left')}>
                                                    <i className={cx('fa-solid fa-gift')}></i>
                                                    <p>Tuỳ chọn quà tặng</p>
                                                </div>
                                                <div className={cx('list-item-right')}>
                                                    <i className={cx('fa-solid fa-chevron-right')}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('right-main-information')}>
                                            <p>
                                                Miễn phí giao hàng áp dụng cho đơn hàng giao tận nơi từ 1.500.000VND và
                                                tất cả các đơn nhận tại cửa hàng
                                            </p>
                                        </div>
                                        <div className={cx('right-main-button')}>
                                            <button>THANH TOÁN</button>
                                            <button>TIẾP TỤC MUA SẮM</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('cart-main-watched')}>
                    <h1>ĐÃ XEM GẦN ĐÂY</h1>
                    <InformationProduct children={informationCart} />
                </div>
            </div>
        </div>
    );
}

export default Cart;
