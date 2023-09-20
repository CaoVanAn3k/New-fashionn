import classNames from 'classnames/bind';
import styles from './Pay.module.scss';
import MenuLink from '../../components/Menu/MenuLink';
import img1 from '../../components/Images/Product/Green.png';

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
function Pay() {
    return (
        <div className={cx('pay-home')}>
            <div className={cx('pay-home-main')}>
                <div className={cx('pay-main-link')}>
                    <MenuLink children={menuLink} />
                    <div className={cx('pay-main-information')}>
                        <div className={cx('pay-information-add')}>
                            <div className={cx('information-add-title')}>
                                <i className={cx('fa-solid fa-location-dot')}></i>
                                <p>Địa Chỉ Nhận Hàng</p>
                            </div>
                            <div className={cx('information-add-list')}>
                                <i className={cx('fa-solid fa-plus')}></i>
                                <p>Nhập địa chỉ nhận hàng</p>
                            </div>
                        </div>
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
                                    <div className={cx('product-list-item')}>
                                        <div className={cx('product-item-img')}>
                                            <img src={img1} alt="logo" />
                                        </div>
                                        <div className={cx('product-item-data')}>
                                            <div className={cx('product-data-left')}>
                                                <h3>Sản phẩm mẫu số 1</h3>
                                                <p>Màu:Xanh Pastel</p>
                                            </div>
                                            <div className={cx('product-data-right')}>
                                                <p>Size:XL</p>
                                            </div>
                                        </div>
                                        <div className={cx('product-item-price')}>
                                            <p>400.000 VNĐ</p>
                                        </div>
                                        <div className={cx('product-item-quantity')}>
                                            <p>1</p>
                                        </div>
                                        <div className={cx('product-item-price')}>
                                            <p>400.000VNĐ</p>
                                        </div>
                                    </div>
                                    <div className={cx('product-list-item')}>
                                        <div className={cx('product-item-img')}>
                                            <img src={img1} alt="logo" />
                                        </div>
                                        <div className={cx('product-item-data')}>
                                            <div className={cx('product-data-left')}>
                                                <h3>Sản phẩm mẫu số 1</h3>
                                                <p>Màu:Xanh Pastel</p>
                                            </div>
                                            <div className={cx('product-data-right')}>
                                                <p>Size:XL</p>
                                            </div>
                                        </div>
                                        <div className={cx('product-item-price')}>
                                            <p>400.000 VNĐ</p>
                                        </div>
                                        <div className={cx('product-item-quantity')}>
                                            <p>1</p>
                                        </div>
                                        <div className={cx('product-item-price')}>
                                            <p>400.000VNĐ</p>
                                        </div>
                                    </div>
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
                                            <p>0 VNĐ</p>
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
                                            <p>Phiếu giiamr giá:</p>
                                            <p>Tổng thanh toán:</p>
                                        </div>
                                        <div className={cx('order-list-right')}>
                                            <p>400.000 VNĐ</p>
                                            <p>30.000 VNĐ</p>
                                            <p>0 VNĐ</p>
                                            <p>430.000 VNĐ</p>
                                        </div>
                                    </div>
                                </div>
                                <button className={cx('order-main-button')}>ĐẶT HÀNG</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pay;
