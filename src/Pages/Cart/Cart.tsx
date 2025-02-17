import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import MenuLink from '../../components/Menu/MenuLink';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import InformationProduct from '../../components/Products/InformationProduct/InformationProduct';
import { useEffect, useState, useRef, MutableRefObject, useCallback } from 'react';
import { incrementProductCart, decrementProductCart, deleteProductCart } from '../../redux/Cart/cart';
import { updateProductNeedPayment } from '../../redux/payment/payment';
import { getAllVoucherOfUser } from '../../redux/voucher/voucher';
import waiting from '../../util/waiting';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
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
interface VoucherData {
    freeShippingCodeId: number;
    code: string;
    discountPercent: number;
    discountUnit: string;
    expires: Date;
    isUsed: boolean;
}
interface DataProductOrder {
    orderId: number;
    productId: number;
    nameProduct: string;
    priceProduct: number;
    moneyPersonPay: number;
    color: string;
    size: string;
    image: string;
    quantity: number;
}
interface ResponseDataRender {
    orderId: number | null;
    data: DataProductOrder[];
}
const menuLink = [
    {
        id: 1,
        title: 'BichThuan Store',
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
function Cart() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { voucherList } = useAppSelector((state) => state.voucher);
    const freeShipRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null);
    const { productCarts, loading } = useAppSelector((state) => state.carts);
    const [checkInputList, setCheckInputList] = useState<boolean[]>([]);
    const [totalPayment, setTotalPayment] = useState<ProductCart[]>([]);
    const [selectedFreeShipping, setSelectedFreeShipping] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(false);
    const [voucherSelected, setVoucherSelected] = useState<VoucherData>({
        freeShippingCodeId: 0,
        code: '',
        discountPercent: 0,
        discountUnit: '',
        expires: new Date(),
        isUsed: false,
    });
    const [selectRadioFreeShipping, setSelectRadioFreeShipping] = useState<boolean[]>([]);
    const [product, setProduct] = useState<ProductCart>({
        productCartId: 0,
        productId: 0,
        name: '',
        color: '',
        size: '',
        price: 0,
        image: '',
        quantity: 0,
    });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(getAllVoucherOfUser());
    }, [dispatch]);
    useEffect(() => {
        if (productCarts.length > 0) {
            setCheckInputList(productCarts.map(() => false));
        }
    }, [productCarts]);
    useEffect(() => {
        const jsonProductReOrder = sessionStorage.getItem('productsOrder');
        if (productCarts.length > 0) {
            if (jsonProductReOrder !== null) {
                const productsReOrder: ResponseDataRender = JSON.parse(jsonProductReOrder);
                const productChecked = productCarts.filter((product: ProductCart) => {
                    return productsReOrder.data.find((productOrder) => {
                        return product.productId === productOrder.productId;
                    });
                });
                setCheckInputList(
                    productCarts.map((item: ProductCart) => {
                        return productChecked.find((product: ProductCart) => {
                            return item.productId === product.productId ? true : false;
                        });
                    }),
                );
                setTotalPayment(productChecked);
            }
        }
    }, [dispatch, productCarts]);
    const handleClickOpen = (product: ProductCart) => {
        setProduct(product);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickDeleteProductCart = async () => {
        dispatch(deleteProductCart(product));
        await waiting(1500);
        setOpen(false);
    };
    const handleCheckedBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setCheckInputList(checkInputList.map(() => true));
            setTotalPayment(productCarts.length > 0 && productCarts);
        } else {
            setCheckInputList(checkInputList.map(() => false));
            setTotalPayment([]);
        }
    };
    const handleClickCheckBox = (index: number) => {
        const updateCheck = [...checkInputList];
        updateCheck[index] = !updateCheck[index];
        if (updateCheck[index]) {
            const products = [...totalPayment];
            products.push(productCarts[index]);
            setTotalPayment(products);
        } else {
            const products = totalPayment.filter((product) => {
                return product.productId !== productCarts[index].productId;
            });
            setTotalPayment(products);
        }
        setCheckInputList(updateCheck);
    };
    const handleTotalProductCart = () => {
        return totalPayment.reduce((sum: number) => {
            return sum + 1;
        }, 0);
    };
    const handleTotalMoneyPayment = useCallback(() => {
        let totalMoney = totalPayment.reduce((sum: number, product: ProductCart) => {
            return sum + product.quantity * product.price;
        }, 0);
        if (totalPayment.length > 0) totalMoney += 35000;
        if (voucherSelected.code !== '' && totalPayment.length > 0) {
            totalMoney -= ((voucherSelected.discountPercent * 35) / 100) * 1000;
        }
        const formattedTotalMoney = totalMoney.toLocaleString('vi-VN', {
            useGrouping: true,
        });
        return formattedTotalMoney;
    }, [totalPayment, voucherSelected.code, voucherSelected.discountPercent]);
    const handleIncreaseProductCart = (product: ProductCart) => {
        dispatch(incrementProductCart(product));
    };
    const handleDecreaseProductCart = (product: ProductCart) => {
        dispatch(decrementProductCart(product));
    };
    const handleClickPayment = () => {
        sessionStorage.removeItem('productsOrder');
        if (voucherSelected.code !== '') {
            sessionStorage.setItem(
                'discountMoney',
                JSON.stringify(((voucherSelected.discountPercent * 35) / 100).toFixed(3).padEnd(6, '0')),
            );
        } else {
            sessionStorage.setItem('discountMoney', JSON.stringify(0));
        }
        if (totalPayment.length > 0) {
            sessionStorage.setItem('productPayment', JSON.stringify(totalPayment));
            dispatch(updateProductNeedPayment(totalPayment));
            navigate('/pay');
        } else {
            toast.warning('vui lòng chọn sản phẩm cần thanh toán!');
        }
    };
    const handleClickContinueShopping = () => {
        navigate('/shop');
    };
    const handleClickTagFreeShipping = (index: number) => {
        const updateListRadioFreeShipping = [...selectRadioFreeShipping];
        const findStateOfFreeShipping = updateListRadioFreeShipping.findIndex((state) => state === true);
        if (findStateOfFreeShipping !== -1 && findStateOfFreeShipping !== index) {
            updateListRadioFreeShipping[findStateOfFreeShipping] = false;
        }
        updateListRadioFreeShipping[index] = !updateListRadioFreeShipping[index];
        if (updateListRadioFreeShipping[index]) {
            setVoucherSelected(voucherList[index]);
        } else {
            setVoucherSelected({
                freeShippingCodeId: 0,
                code: '',
                discountPercent: 0,
                discountUnit: '',
                expires: new Date(),
                isUsed: false,
            });
        }

        setSelectRadioFreeShipping(updateListRadioFreeShipping);
    };
    const handleTotalBeforeMinusFreeShip = () => {
        let totalMoney = totalPayment.reduce((sum: number, product: ProductCart) => {
            return sum + product.quantity * product.price;
        }, 0);
        const formattedTotalMoney = totalMoney.toLocaleString('vi-VN', {
            useGrouping: true,
        });
        return formattedTotalMoney;
    };
    return (
        <div className={cx('cart')}>
            <div className={cx('cart-main')}>
                <div className={cx('cart-main-link')}>
                    <MenuLink children={menuLink} />
                </div>
                <div className={cx('cart-main-check')}>
                    <div className={cx('main-check-list')}>
                        <input
                            id="inputcheck"
                            type="checkbox"
                            onChange={(e) => handleCheckedBtn(e)}
                            defaultChecked={false}
                        />
                        <label htmlFor="inputcheck">Chọn tất cả sản phẩm</label>
                    </div>
                </div>
                <div className={cx('cart-main-information')}>
                    <div className={cx('main-information-list')}>
                        {loading ? (
                            <div className={cx('custom-loader')}></div>
                        ) : (
                            <div className={cx('information-list-left')}>
                                {productCarts.length > 0 &&
                                    productCarts.map((product: ProductCart, index: number) => {
                                        const totalMoney = product.quantity * product.price;
                                        const formattedNumber: string = totalMoney
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                        return (
                                            <div className={cx('information-left-item')} key={index}>
                                                <div className={cx('left-item-body')}>
                                                    <div className={cx('item-discount')}>20%</div>
                                                    <div className={cx('item-img')}>
                                                        <img src={product.image} alt="logo" />
                                                    </div>
                                                    {/* <div className={cx('left-icon')}>
                                                    <i className={cx('fa-solid fa-heart')}></i>
                                                </div> */}
                                                </div>
                                                <div className={cx('left-item-data')}>
                                                    <div className={cx('item-data-main')}>
                                                        <div className={cx('data-main-title')}>
                                                            <h3>{product.name}</h3>
                                                            <input
                                                                id={`inputcheck-${index}`}
                                                                type="checkbox"
                                                                onChange={() => handleClickCheckBox(index)}
                                                                checked={checkInputList[index] || false}
                                                            />
                                                        </div>
                                                        <div className={cx('data-main-list')}>
                                                            <p>Mã sản phẩm: {product.productId}</p>
                                                            <p>Màu sắc: {product.color}</p>
                                                            <p>Kích cỡ: {product.size}</p>
                                                            <p>Giảm giá đến hết ngày : 20/12/2023</p>
                                                        </div>
                                                        <div className={cx('data-main-price')}>
                                                            <p>{product.price / 1000.0}.000 VNĐ</p>
                                                        </div>
                                                        <div className={cx('data-main-quantity')}>
                                                            <div className={cx('main-quantity-left')}>
                                                                <h3>SỐ LƯỢNG</h3>
                                                                <div className={cx('main-left-icon')}>
                                                                    <div
                                                                        className={cx('icon-list')}
                                                                        onClick={() => {
                                                                            handleDecreaseProductCart(product);
                                                                        }}
                                                                    >
                                                                        <i className={cx('fa-solid fa-minus')}></i>
                                                                    </div>
                                                                    <span>{product.quantity}</span>
                                                                    <div
                                                                        className={cx('icon-list')}
                                                                        onClick={() =>
                                                                            handleIncreaseProductCart(product)
                                                                        }
                                                                    >
                                                                        <i className={cx('fa-solid fa-plus')}></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('main-quantity-right')}>
                                                                <div className={cx('total-money')}>
                                                                    <h3>TỔNG:</h3>
                                                                    <p>{formattedNumber} VNĐ</p>
                                                                </div>
                                                                <div className={cx('delete-product')}>
                                                                    <button onClick={() => handleClickOpen(product)}>
                                                                        <DeleteForeverIcon />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                        <div className={cx('information-list-right')}>
                            <div className={cx('information-right-item')}>
                                <div className={cx('information-right-total')}>
                                    <div className={cx('right-total-title')}>
                                        <h2>TỔNG ĐƠN HÀNG</h2>
                                        <p>{handleTotalProductCart()} sản phẩm</p>
                                    </div>
                                    <div className={cx('right-total-data')}>
                                        <div className={cx('total-data-left')}>
                                            <p>Tổng cộng</p>
                                        </div>
                                        <div className={cx('total-data-right')}>
                                            {totalPayment.length > 0 &&
                                                totalPayment.map((product: ProductCart, index: number) => {
                                                    const totalMoney = product.quantity * product.price;
                                                    const formattedNumber: string = totalMoney
                                                        .toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                                    return <p key={index}>{formattedNumber} VNĐ</p>;
                                                })}
                                        </div>
                                    </div>
                                    <div className={cx('right-total-add')}>
                                        <div className={cx('total-add-left')}>
                                            <h3>TỔNG</h3>
                                            <p>Phí vận chuyển</p>
                                            <p>Giảm giá phí vận chuyển</p>
                                            <p>Voucher giảm giá</p>
                                        </div>
                                        <div className={cx('total-add-right')}>
                                            <h3>{handleTotalBeforeMinusFreeShip()} VNĐ</h3>
                                            <p>35.000 VNĐ</p>
                                            <p ref={freeShipRef}>
                                                {voucherSelected.code !== ''
                                                    ? ((voucherSelected.discountPercent / 100) * 35)
                                                          .toFixed(3)
                                                          .padEnd(6, '0')
                                                    : 0}{' '}
                                                VNĐ
                                            </p>
                                            <p>0 VNĐ</p>
                                        </div>
                                    </div>
                                    <div className={cx('right-total-list')}>
                                        <div className={cx('total-list-left')}>
                                            <h1>TỔNG GIÁ TRỊ ĐƠN</h1>
                                            <p>{handleTotalMoneyPayment()} VNĐ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('information-right-pay')}>
                                    <div className={cx('right-pay-main')}>
                                        <div className={cx('right-main-list')}>
                                            <div className={cx('main-list-item')}>
                                                <div
                                                    className={cx('main-list-item-wrapper')}
                                                    onClick={() => {
                                                        setSelectedFreeShipping(!selectedFreeShipping);
                                                    }}
                                                >
                                                    <div className={cx('list-item-left')}>
                                                        <i className={cx('fa-solid fa-hand-holding-dollar')}></i>
                                                        <p>Phiếu giảm giá</p>
                                                    </div>
                                                    <div
                                                        className={cx('list-item-right', {
                                                            selected: selectedFreeShipping,
                                                        })}
                                                    >
                                                        <i className={cx('fa-solid fa-chevron-right')}></i>
                                                    </div>
                                                </div>
                                                {selectedFreeShipping && (
                                                    <div
                                                        className={cx(
                                                            'main-list-item-voucher',
                                                            'animate__animated animate__fadeIn',
                                                        )}
                                                    >
                                                        <ul className={cx('list-item-voucher')}>
                                                            {voucherList.length > 0 &&
                                                                voucherList.map(
                                                                    (voucher: VoucherData, index: number) => {
                                                                        const voucherDate = new Date(voucher.expires);
                                                                        const now = new Date();
                                                                        const time =
                                                                            voucherDate.getTime() - now.getTime();
                                                                        const day = Math.floor(
                                                                            time / (1000 * 60 * 60 * 24),
                                                                        );
                                                                        const hour = Math.floor(
                                                                            (time % (1000 * 60 * 60 * 24)) /
                                                                                (1000 * 60 * 60),
                                                                        );
                                                                        const minute = Math.floor(
                                                                            (time % (1000 * 60 * 60)) / (1000 * 60),
                                                                        );
                                                                        return (
                                                                            <>
                                                                                {(hour > 0 || minute >= 5) && (
                                                                                    <li
                                                                                        className={cx('item-voucher')}
                                                                                        key={voucher.freeShippingCodeId}
                                                                                        onClick={() =>
                                                                                            handleClickTagFreeShipping(
                                                                                                index,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <div className={cx('wrapper')}>
                                                                                            <div
                                                                                                className={cx(
                                                                                                    'information',
                                                                                                )}
                                                                                            >
                                                                                                <div
                                                                                                    className={cx(
                                                                                                        'thumbnail',
                                                                                                    )}
                                                                                                >
                                                                                                    <h3>free ship</h3>
                                                                                                </div>
                                                                                                <div
                                                                                                    className={cx(
                                                                                                        'information-voucher',
                                                                                                    )}
                                                                                                >
                                                                                                    <span>
                                                                                                        Giảm tối đa{' '}
                                                                                                        {
                                                                                                            voucher.discountUnit
                                                                                                        }
                                                                                                    </span>
                                                                                                    <span>
                                                                                                        Đơn tối thiểu{' '}
                                                                                                        {
                                                                                                            voucher.discountPercent
                                                                                                        }
                                                                                                        k
                                                                                                    </span>
                                                                                                    <div
                                                                                                        className={cx(
                                                                                                            'tag-expires-voucher',
                                                                                                        )}
                                                                                                    >
                                                                                                        <span>
                                                                                                            còn{' '}
                                                                                                            {day !==
                                                                                                                0 &&
                                                                                                                day +
                                                                                                                    ' ngày '}
                                                                                                            {hour} giờ
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className={cx(
                                                                                                    'radio-button',
                                                                                                )}
                                                                                            >
                                                                                                <input
                                                                                                    type="radio"
                                                                                                    checked={
                                                                                                        selectRadioFreeShipping[
                                                                                                            index
                                                                                                        ] || false
                                                                                                    }
                                                                                                    readOnly
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                )}
                                                                            </>
                                                                        );
                                                                    },
                                                                )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={cx('main-list-item')}>
                                                <div
                                                    className={cx('main-list-item-wrapper')}
                                                    onClick={() => {
                                                        setSelectedVoucher(!selectedVoucher);
                                                    }}
                                                >
                                                    <div className={cx('list-item-left')}>
                                                        <i className={cx('fa-solid fa-gift')}></i>
                                                        <p>Voucher sản phẩm</p>
                                                    </div>
                                                    <div
                                                        className={cx('list-item-right', {
                                                            selectedVoucher: selectedVoucher,
                                                        })}
                                                    >
                                                        <i className={cx('fa-solid fa-chevron-right')}></i>
                                                    </div>
                                                </div>
                                                {selectedVoucher && (
                                                    // <div
                                                    //     className={cx(
                                                    //         'main-list-item-voucher',
                                                    //         'animate__animated animate__fadeIn',
                                                    //     )}
                                                    // >
                                                    //     <ul className={cx('list-item-voucher')}>
                                                    //         {Array.from([1, 2, 3, 4, 5, 6], (index) => {
                                                    //             return (
                                                    //                 <li
                                                    //                     className={cx('item-voucher')}
                                                    //                     key={index}
                                                    //                     onClick={() => handleClickTagVoucher(index)}
                                                    //                 >
                                                    //                     <div className={cx('wrapper')}>
                                                    //                         <div className={cx('information')}>
                                                    //                             <div className={cx('thumbnail')}>
                                                    //                                 <h3>free ship</h3>
                                                    //                             </div>
                                                    //                             <div
                                                    //                                 className={cx(
                                                    //                                     'information-voucher',
                                                    //                                 )}
                                                    //                             >
                                                    //                                 <span>Giảm tối đa 35k</span>
                                                    //                                 <span>Đơn tối thiểu 0đ</span>
                                                    //                                 <div
                                                    //                                     className={cx(
                                                    //                                         'tag-expires-voucher',
                                                    //                                     )}
                                                    //                                 >
                                                    //                                     <span>còn 23 giờ</span>
                                                    //                                 </div>
                                                    //                             </div>
                                                    //                         </div>
                                                    //                         <div className={cx('radio-button')}>
                                                    //                             <input
                                                    //                                 type="radio"
                                                    //                                 name="value"
                                                    //                                 checked={selectRadioVoucher[index]}
                                                    //                             />
                                                    //                         </div>
                                                    //                     </div>
                                                    //                 </li>
                                                    //             );
                                                    //         })}
                                                    //     </ul>
                                                    // </div>
                                                    <div
                                                        className={cx(
                                                            'main-list-item-voucher',
                                                            'animate__animated animate__fadeIn',
                                                        )}
                                                    >
                                                        <span>Hiện chưa có voucher nào!</span>
                                                        <i className="fa-regular fa-face-smile"></i>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('right-main-information')}>
                                            <p>
                                                Miễn phí giao hàng áp dụng cho đơn hàng giao tận nơi từ 1.500.000VND và
                                                tất cả các đơn nhận tại cửa hàng
                                            </p>
                                        </div>
                                        <div className={cx('right-main-button')}>
                                            <button onClick={handleClickPayment}>THANH TOÁN</button>
                                            <button onClick={handleClickContinueShopping}>TIẾP TỤC MUA SẮM</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('cart-main-watched')}>
                    {/* <h1>ĐÃ XEM GẦN ĐÂY</h1> */}
                    {/* <InformationProduct children={informationCart} /> */}
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" fontSize={20} color="#7b2636">
                            Bạn có muốn xóa sản phẩm {product.name !== '' && product.name} ra khỏi giỏ hàng?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            <span style={{ color: '#000000', fontSize: '1.5rem' }}>Hủy Bỏ</span>
                        </Button>
                        <Button onClick={handleClickDeleteProductCart} autoFocus>
                            <span style={{ color: '#7b2636', fontSize: '1.5rem' }}>Đồng Ý</span>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default Cart;
