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
import { useState } from 'react';
import { incrementProductCart, decrementProductCart, deleteProductCart } from '../../redux/Cart/cart';
import waiting from '../../util/waiting';
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
    const { productCarts, loading } = useAppSelector((state) => state.carts);
    const [checkInputList, setCheckInputList] = useState(productCarts.length > 0 ? productCarts.map(() => false) : []);
    const [totalPayment, setTotalPayment] = useState<ProductCart[]>([]);
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
    const handleTotalMoneyPayment = () => {
        const totalMoney = totalPayment.reduce((sum: number, product: ProductCart) => {
            return sum + product.quantity * product.price;
        }, 0);
        const formattedTotalMoney = totalMoney.toLocaleString('vi-VN', {
            useGrouping: true,
        });
        return formattedTotalMoney;
    };
    const handleIncreaseProductCart = (product: ProductCart) => {
        dispatch(incrementProductCart(product));
    };
    const handleDecreaseProductCart = (product: ProductCart) => {
        dispatch(decrementProductCart(product));
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
                                                                id="inputcheck"
                                                                type="checkbox"
                                                                onChange={() => handleClickCheckBox(index)}
                                                                checked={checkInputList[index]}
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
                                            <h3>{handleTotalMoneyPayment()} VNĐ</h3>
                                            <p>35.000 VNĐ</p>
                                            <p>0 VNĐ</p>
                                            <p>0 VNĐ</p>
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
