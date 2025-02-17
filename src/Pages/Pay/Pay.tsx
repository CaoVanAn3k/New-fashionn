import classNames from 'classnames/bind';
import styles from './Pay.module.scss';
import MenuLink from '../../components/Menu/MenuLink';
// import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import FormAddress from './FormAddress';
import FormEditAddress from './FormEditAddress';
import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
    findAddressDefaultByUser,
    updateProductNeedPayment,
    orderPayment,
    handleActiveLoadingPayment,
    clearStatePayment,
    clearStatusError,
} from '../../redux/payment/payment';
import { updateCart } from '../../redux/Cart/cart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
const cx = classNames.bind(styles);
interface ProductPaymentData {
    productCartId: number;
    productId: number;
    name: string;
    color: string;
    size: string;
    price: number;
    image: string;
    quantity: number;
}
interface ProductCart {
    productCartId: number;
    productId: number;
    name: string;
    color: string;
    size: string;
    price: number;
    image: string;
    quantity: number;
}
const menuLink = [
    {
        id: 1,
        title: 'Bich Thuan Store',
        path: '/',
        icon: 'icon',
    },
    {
        id: 2,
        title: 'Giỏ hàng',
        path: '/cart',
        icon: '',
    },
];
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function Pay() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.users);
    const { addressDefault, isLoading, productsPayment, statusError, isPayment, addressList } = useAppSelector(
        (state) => state.payment,
    );
    const { productCarts } = useAppSelector((state) => state.carts);
    const { isLogined } = useAppSelector((state) => state.users);
    const [onAdd, setOnAdd] = useState(false);
    const [onChangeAddress, setOnChangeAddress] = useState(false);
    const [discountMoney, setDiscountMoney] = useState('0');
    const [noteProducer, setNoteProducer] = useState('');
    const [moneyPersonPay, setMoneyPersonPay] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOffChangeAddress = () => {
        setOnChangeAddress(false);
    };
    const handleOnChangeAddress = () => {
        setOnChangeAddress(true);
    };
    const handleOnAdd = () => {
        setOnAdd(true);
    };
    const handleOffAdd = () => {
        setOnAdd(false);
    };
    useEffect(() => {
        const productPayment = sessionStorage.getItem('productPayment');
        const discountMoney = sessionStorage.getItem('discountMoney');
        if (productPayment !== null && discountMoney !== null) {
            setDiscountMoney(JSON.parse(discountMoney));
            dispatch(updateProductNeedPayment(JSON.parse(productPayment)));
        } else {
            navigate('/cart');
        }
    }, [dispatch, navigate]);
    useEffect(() => {
        if (isLogined) {
            dispatch(findAddressDefaultByUser());
        }
    }, [dispatch, isLogined]);
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (statusError !== 0) {
            dispatch(handleActiveLoadingPayment(false));
            handleClickOpen();
        }
    }, [dispatch, statusError]);
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (isPayment && statusError === 0) {
                const updateCartData = productCarts.filter((product: ProductCart) => {
                    return productsPayment.find((p: ProductPaymentData) => product.productCartId !== p.productCartId);
                });
                dispatch(updateCart(updateCartData));
                dispatch(handleActiveLoadingPayment(false));
                dispatch(clearStatusError());
                dispatch(clearStatePayment());
                sessionStorage.removeItem('productPayment');
                sessionStorage.removeItem('discountMoney');
                navigate('/order-history');
            }
        }, 3000);
        return () => {
            clearTimeout(timerId);
        };
    }, [dispatch, isPayment, navigate, productCarts, productsPayment, statusError]);
    const handleTotalPayment = useCallback(() => {
        if (productsPayment.length > 0) {
            let totalPayment = productsPayment.reduce((sum: number, product: ProductPaymentData) => {
                return sum + product.price * product.quantity;
            }, 0);
            if (productsPayment.length > 0) totalPayment += 35000;
            if (discountMoney !== '0' && productsPayment.length > 0) {
                totalPayment -= Number.parseFloat(discountMoney) * 1000;
            }
            const formattedTotalMoney = totalPayment.toLocaleString('vi-VN', {
                useGrouping: true,
            });
            return formattedTotalMoney;
        } else {
            return 0;
        }
    }, [discountMoney, productsPayment]);
    const handleTotalBeforeMinusFreeShip = () => {
        if (productsPayment.length > 0) {
            return productsPayment
                .reduce((sum: number, product: ProductPaymentData) => {
                    return sum + product.quantity * product.price;
                }, 0)
                .toLocaleString('vi-VN', {
                    useGrouping: true,
                });
        } else {
            return 0;
        }
    };
    const handleOrderPayment = () => {
        if (addressDefault.id !== null) {
            const address =
                addressDefault.address +
                ' ' +
                addressDefault.wards +
                ' ' +
                addressDefault.district +
                ' ' +
                addressDefault.province;
            const data = {
                address: address,
                statusOrder: 0,
                isOrdered: true,
                phonePersonOrder: addressDefault.phonePayment,
                pricePersonPay: moneyPersonPay,
                productsPayment: productsPayment,
                personNote: noteProducer,
            };
            dispatch(handleActiveLoadingPayment(true));
            dispatch(orderPayment(data));
        } else {
            toast.error('vui lòng nhập địa chỉ!');
        }
    };
    useEffect(() => {
        setMoneyPersonPay(handleTotalPayment());
    }, [productsPayment, discountMoney, handleTotalPayment]);
    return (
        <div className={cx('pay-home')}>
            {isLoading || loading ? (
                <div className={cx('custom-loader')}></div>
            ) : (
                <>
                    <div className={cx('pay-home-main')}>
                        <div className={cx('pay-main-list')}>
                            <MenuLink children={menuLink} />
                            <div className={cx('pay-main-information')}>
                                <div className={cx('pay-information-add')}>
                                    <div className={cx('information-add-title')}>
                                        <i className={cx('fa-solid fa-location-dot')}></i>
                                        <p>Địa Chỉ Nhận Hàng</p>
                                    </div>
                                    {addressDefault?.status !== 0 && addressDefault?.address !== '' && (
                                        <p className={cx('address-alias')}>
                                            <span className={cx('alias')}>
                                                {addressDefault?.namePayment !== '' && addressDefault?.namePayment} -{' '}
                                                {addressDefault?.phonePayment !== '' && addressDefault?.phonePayment}
                                            </span>
                                            <span className={cx('address')}>
                                                {addressDefault?.address !== '' && addressDefault.address},{' '}
                                                {addressDefault?.wards !== '' && addressDefault?.wards},{' '}
                                                {addressDefault?.district !== '' && addressDefault?.district},{' '}
                                                {addressDefault?.province !== '' && addressDefault?.province}
                                            </span>
                                            {addressDefault?.status === 1 && <label htmlFor="">mặc định</label>}
                                        </p>
                                    )}
                                    {(addressDefault?.status !== 0 && addressDefault?.address !== '') ||
                                    addressList.length > 0 ? (
                                        <div
                                            className={cx('information-add-list', 'change-address')}
                                            onClick={handleOnChangeAddress}
                                        >
                                            <i className={cx('fa-regular fa-pen-to-square')}></i>
                                            <p>Thay đổi địa chỉ</p>
                                        </div>
                                    ) : (
                                        <div className={cx('information-add-list')} onClick={handleOnAdd}>
                                            <i className={cx('fa-solid fa-plus')}></i>
                                            <p>Nhập địa chỉ nhận hàng</p>
                                        </div>
                                    )}
                                    {/*  */}
                                </div>
                                <FormAddress onAdd={onAdd} handleOffAdd={handleOffAdd} />
                                <FormEditAddress
                                    onChangeAddress={onChangeAddress}
                                    handleOnAdd={handleOnAdd}
                                    handleOffChangeAddress={handleOffChangeAddress}
                                />
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
                                            {productsPayment.length > 0 &&
                                                productsPayment.map((product: ProductPaymentData, index: number) => {
                                                    return (
                                                        <div className={cx('product-list-item')} key={index}>
                                                            <div className={cx('product-item-img')}>
                                                                <img src={product.image} alt={`${product.name}`} />
                                                            </div>
                                                            <div className={cx('product-item-data')}>
                                                                <div className={cx('product-data-left')}>
                                                                    <h3>{product.name}</h3>
                                                                    <p>Màu: {product.color}</p>
                                                                </div>
                                                                <div className={cx('product-data-right')}>
                                                                    <p>Size: {product.size}</p>
                                                                </div>
                                                            </div>
                                                            <div className={cx('product-item-price')}>
                                                                <p>{product.price}</p>
                                                            </div>
                                                            <div className={cx('product-item-quantity')}>
                                                                <p>{product.quantity}</p>
                                                            </div>
                                                            <div className={cx('product-item-price')}>
                                                                <p>
                                                                    {(product.price * product.quantity).toLocaleString(
                                                                        'vi-VN',
                                                                        {
                                                                            useGrouping: true,
                                                                        },
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                        <div className={cx('information-product-last')}>
                                            <div className={cx('information-last-input')}>
                                                <p>Lời nhắn</p>
                                                <input
                                                    placeholder="Lưu ý cho Người bán"
                                                    value={noteProducer}
                                                    onChange={(e) => {
                                                        setNoteProducer(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            {/* <div className={cx('information-last-fee')}>
                                                <div className={cx('information-fee-left')}>
                                                    <p>Phí vận chuyển:</p>
                                                    <p>Tổng tiền giảm giá:</p>
                                                </div>
                                                <div className={cx('information-fee-right')}>
                                                    <p>35.000 VNĐ</p>
                                                    <span>{discountMoney} VNĐ</span>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className={cx('information-product-total')}>
                                            <div className={cx('information-total-left')}>
                                                <p>
                                                    Tổng số tiền(
                                                    {productsPayment.length > 0 && productsPayment.length} sản phẩm):
                                                </p>
                                                <p>{handleTotalBeforeMinusFreeShip()} VNĐ</p>
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
                                                    <p>{handleTotalBeforeMinusFreeShip()} VNĐ</p>
                                                    <p>35.000 VNĐ</p>
                                                    <span>{discountMoney} VNĐ</span>
                                                    <p>{handleTotalPayment()} VNĐ</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('order-main-button')}>
                                            <button onClick={handleOrderPayment}>ĐẶT HÀNG</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('pay-home-border')}></div>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                        className={cx('dialog-phoneNumber')}
                    >
                        <DialogTitle>{'Bạn cần xác minh số điện thoại'}</DialogTitle>
                        <DialogContent>
                            <div className={cx('container')}>
                                <div className={cx('authentication-phoneNumber')}>
                                    <div className={cx('input-phoneNumber')}>
                                        <input type="text" placeholder="số điện thoại" />
                                    </div>
                                    <div className={cx('verify')}>
                                        <button className={cx('btn-verify-phoneNumber')}>
                                            <span>Gửi OTP</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={cx('verify-code')}>
                                    <div className={cx('verify-input')}>
                                        <input type="text" placeholder="OTP" />
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Hủy bỏ</Button>
                            <Button onClick={handleClose}>Xác minh</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </div>
    );
}

export default Pay;
