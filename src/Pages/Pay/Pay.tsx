import classNames from 'classnames/bind';
import styles from './Pay.module.scss';
import MenuLink from '../../components/Menu/MenuLink';
import img1 from '../../components/Images/Product/Green.png';
import FormAddress from './FormAddress';
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
const listPay = [
    {
        id: 1,
        img: img1,
        title: 'Sản phẩm mẫu số 1',
        color: 'Màu:Xanh Pastel',
        size: 'Size:XL',
        price: '400.000VNĐ',
        quantity: '1',
        total: '400.000VNĐ',
    },
    {
        id: 2,
        img: img1,
        title: 'Sản phẩm mẫu số 1',
        color: 'Màu:Xanh Pastel',
        size: 'Size:XL',
        price: '400.000VNĐ',
        quantity: '1',
        total: '400.000VNĐ',
    },
];
function Pay() {
    const [onAdd, setOnAdd] = useState(false);
    const handleOnAdd = () => {
        setOnAdd(true);
    };
    const handleOffAdd = () => {
        setOnAdd(false);
    };
    return (
        <div className={cx('pay-home')}>
            <div className={cx('pay-home-main')}>
                <div className={cx('pay-main-list')}>
                    <MenuLink children={menuLink} />
                    <div className={cx('pay-main-information')}>
                        <div className={cx('pay-information-add')}>
                            <div className={cx('information-add-title')}>
                                <i className={cx('fa-solid fa-location-dot')}></i>
                                <p>Địa Chỉ Nhận Hàng</p>
                            </div>
                            <div className={cx('information-add-list')} onClick={handleOnAdd}>
                                <i className={cx('fa-solid fa-plus')}></i>
                                <p>Nhập địa chỉ nhận hàng</p>
                            </div>
                        </div>
                        <FormAddress onAdd={onAdd} handleOffAdd={handleOffAdd} />
                        <div className={cx('pay-information-product')}>
                            <div className={cx('information-product-main')}>
                                <div className={cx('information-product-title')}>
                                    <h3>SẢN PHẨM</h3>
                                    <div></div>
                                    <p>Đơn giá</p>
                                    <p>Số lượng</p>
                                    <p>Thành tiền</p>
                                </div>
                                <div className={cx('information-product-list')}>
                                    {listPay.map((list, index) => {
                                        return (
                                            <div className={cx('product-list-item')} key={index}>
                                                <div className={cx('product-item-img')}>
                                                    <img src={list.img} alt="logo" />
                                                </div>
                                                <div className={cx('product-item-data')}>
                                                    <div className={cx('product-data-left')}>
                                                        <h3>{list.title}</h3>
                                                        <p>{list.color}</p>
                                                    </div>
                                                    <div className={cx('product-data-right')}>
                                                        <p>{list.size}</p>
                                                    </div>
                                                </div>
                                                <div className={cx('product-item-price')}>
                                                    <p>{list.price}</p>
                                                </div>
                                                <div className={cx('product-item-quantity')}>
                                                    <p>{list.quantity}</p>
                                                </div>
                                                <div className={cx('product-item-price')}>
                                                    <p>{list.total}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={cx('information-product-last')}>
                                    <div className={cx('information-last-input')}>
                                        <p>Lời nhắn</p>
                                        <input placeholder="Lưu ý cho Người bán" />
                                    </div>
                                    <div className={cx('information-last-fee')}>
                                        <div className={cx('information-fee-left')}>
                                            <p>Phí vận chuyển:</p>
                                            <p>Phiếu giảm giá:</p>
                                        </div>
                                        <div className={cx('information-fee-right')}>
                                            <p>30.000 VNĐ</p>
                                            <span>0 VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('information-product-total')}>
                                    <div className={cx('information-total-left')}>
                                        <p>Tổng số tiền(2 sản phẩm):</p>
                                        <p>430.000 VNĐ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('pay-information-order')}>
                            <div className={cx('pay-order-main')}>
                                <div className={cx('order-main-title')}>
                                    <h3> PHƯƠNG THỨC THANH TOÁN</h3>
                                </div>
                                <div className={cx('order-main-fee')}>
                                    <p>Thanh toán khi nhận hàng</p>
                                    <span>Phí thu hộ :0 VNĐ</span>
                                </div>
                                <div className={cx('order-main-total')}>
                                    <div className={cx('order-total-list')}>
                                        <div className={cx('order-list-left')}>
                                            <p>Tổng tiền hàng:</p>
                                            <p>Phí vận chuyển:</p>
                                            <p>Phiếu giảm giá:</p>
                                            <p>Tổng thanh toán:</p>
                                        </div>
                                        <div className={cx('order-list-right')}>
                                            <p>400.000 VNĐ</p>
                                            <p>30.000 VNĐ</p>
                                            <span>0 VNĐ</span>
                                            <p>430.000 VNĐ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('order-main-button')}>
                                    <button>ĐẶT HÀNG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('pay-home-border')}></div>
        </div>
    );
}

export default Pay;
