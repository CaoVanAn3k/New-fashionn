import classNames from 'classnames/bind';
import styles from './CustomOrder.module.scss';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { cancelOrder, handleUpdateStateCancelOrder, reOrder } from '../../../redux/order/order';
import { saveFeedbackProduct, getAllReviewedProduct } from '../../../redux/Comment/comment';
import { getAllProductInCart } from '../../../redux/Cart/cart';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useNavigate, useLocation } from 'react-router-dom';
import TagFacesIcon from '@mui/icons-material/TagFaces';
const cx = classNames.bind(styles);
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
interface ResponseFeedbackProduct {
    commentId: number;
    productId: number;
    nameProduct: string;
    color: string;
    size: string;
    descriptionProductQuality: string;
    descriptionFeature: string;
    userName: string;
    active: boolean;
}
interface ResponseDataRender {
    orderId: number | null;
    data: DataProductOrder[];
}
interface PopStatus {
    children: ResponseDataRender[];
    isCheck: string;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const labels: { [index: string]: string } = {
    0.5: 'vô dụng',
    1: 'Vô dụng+',
    1.5: 'Kém',
    2: 'Kém+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Tốt',
    4: 'Tốt+',
    4.5: 'Xuất sắc',
    5: 'Xuất Sắc+',
};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const CustomOrder: React.FC<PopStatus> = ({ children, isCheck }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [starState, setStarState] = useState<number | null>(5);
    const [hover, setHover] = useState(-1);
    const [feedbackDescription, setFeedbackDescription] = useState('');
    const [qualityProductDescription, setQualityProductDescription] = useState('');
    const [isShowUserName, setIsShowUserName] = useState(true);
    const [productFeedback, setProductFeedback] = useState<DataProductOrder>({
        orderId: 0,
        productId: 0,
        nameProduct: '',
        priceProduct: 0,
        moneyPersonPay: 0,
        color: '',
        size: '',
        image: '',
        quantity: 0,
    });
    const [orderId, setOrderId] = useState<number | null>(null);
    const [openFeedbackForm, setOpenFeedbackForm] = useState(false);
    const { userName } = useAppSelector((state) => state.users);
    const { reviewedProduct } = useAppSelector((state) => state.comment);
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const type = query.get('type');
        if (type !== null && type === '3') {
            dispatch(getAllReviewedProduct());
        }
    }, [dispatch, location.search]);
    const handleOpenFeedbackForm = (data: DataProductOrder) => {
        setProductFeedback(data);
        setOpenFeedbackForm(true);
    };
    const handleCloseFeedbackForm = () => {
        setOpenFeedbackForm(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setValue('');
        setHelperText('');
        setOpen(false);
    };
    const handleTotalMoney = (data: DataProductOrder[]) => {
        if (data.length > 0) {
            let totalMoney = data.reduce((sum: number, curr: DataProductOrder) => {
                return sum + curr.priceProduct * curr.quantity;
            }, 0);
            totalMoney += 35 * 1000;
            const formattedTotalMoney = totalMoney.toLocaleString('vi-VN', {
                useGrouping: true,
            });
            return formattedTotalMoney;
        } else {
            return 0;
        }
    };
    const handleClickCancelOrder = (checked: string, orderId: number | null) => {
        if (checked === '0') {
            if (orderId !== null) {
                setOrderId(orderId);
            }
            handleClickOpen();
        } else {
            toast.error('Đơn đã được đặt không thể hủy!');
        }
    };
    const handleSubmitCancelOrder = async () => {
        if (value === '') {
            setError(true);
            setHelperText('Vui lòng chọn lí do hủy!!!');
            return;
        } else {
            setError(false);
        }
        if (orderId !== null) {
            dispatch(handleUpdateStateCancelOrder(orderId));
            const dataCancel = {
                orderId,
                reasonCancel: value,
            };
            await dispatch(cancelOrder(dataCancel));
        }
    };
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setHelperText(' ');
        setError(false);
    };
    const handleClickButtonReOrder = async (orderId: number | null) => {
        if (orderId !== null) {
            const productsReOrder = children.find((item) => item.orderId === orderId);
            if (productsReOrder !== undefined) {
                sessionStorage.setItem('productsOrder', JSON.stringify(productsReOrder));
                await dispatch(reOrder(orderId));
                await dispatch(getAllProductInCart());
                navigate(`/cart`);
            }
        } else {
            toast.warning('Vui lòng chọn đơn hàng muốn đặt lại!!');
        }
    };
    const handleSubmitFeedback = () => {
        if (feedbackDescription !== '' && qualityProductDescription !== '' && productFeedback.nameProduct !== '') {
            setOpenFeedbackForm(false);
            const data = {
                productId: productFeedback.productId,
                rating: starState,
                descriptionProductQuality: qualityProductDescription,
                descriptionFeature: feedbackDescription,
                isShowUserName: isShowUserName,
                color: productFeedback.color,
                size: productFeedback.size,
            };
            dispatch(saveFeedbackProduct(data));
            setFeedbackDescription('');
            setIsShowUserName(true);
            setQualityProductDescription('');
        } else {
            toast.warning('vui lòng nhập đầy đủ thông tin giúp shop nhé khách!');
        }
    };
    const isReviewedProduct = (data: ResponseFeedbackProduct[], product: DataProductOrder) => {
        const isProduct = data.find((item) => item.productId === product.productId);
        if (isProduct) {
            return true;
        } else {
            return false;
        }
    };
    return (
        <div className={cx('wrapper')}>
            {children.map((list, index) => {
                return (
                    <div className={cx('favourite-information-main')} key={index}>
                        <div className={cx('favourite-information-list')}>
                            {list.data.length > 0 &&
                                list.data.map((product: DataProductOrder, indexKey: number) => {
                                    return (
                                        <>
                                            <div className={cx('favourite-list-left')} key={indexKey + 1}>
                                                <div className={cx('list-item-logo')}>
                                                    <div className={cx('left-img')}>
                                                        <img src={product.image} alt="logo" />
                                                    </div>
                                                </div>
                                                <div className={cx('list-item-data')}>
                                                    <h3>{product.nameProduct}</h3>
                                                    <div className={cx('list-data-information')}>
                                                        <p>Mã sản phẩm: {product.productId}</p>
                                                        <p>Màu sắc: {product.color}</p>
                                                        <p>Kích cỡ: {product.size}</p>
                                                        <p>
                                                            Giá:{' '}
                                                            {product.priceProduct.toLocaleString('vi-VN', {
                                                                useGrouping: true,
                                                            })}{' '}
                                                            VNĐ
                                                        </p>
                                                        <p>Số lượng: {product.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {queryParams.get('type') !== null &&
                                                queryParams.get('type') !== 'null' &&
                                                queryParams.get('type') === '3' && (
                                                    <div className={cx('favourite-list-item')} key={index + 2}>
                                                        <div className={cx('favourite-item-right')}>
                                                            <div className={cx('list-data-price')}>
                                                                <p>{handleTotalMoney(list.data)} VNĐ</p>
                                                                <h4>
                                                                    {list.data[0].moneyPersonPay.toLocaleString(
                                                                        'vi-VN',
                                                                        {
                                                                            useGrouping: true,
                                                                        },
                                                                    )}{' '}
                                                                    VNĐ
                                                                </h4>
                                                            </div>
                                                            {reviewedProduct.length > 0 &&
                                                            isReviewedProduct(reviewedProduct, product) ? (
                                                                <div
                                                                    className={cx(
                                                                        'favourite-item-check',
                                                                        'fa-button',
                                                                        'fa-check',
                                                                    )}
                                                                    style={{
                                                                        display: isCheck === '2' ? 'block' : 'none',
                                                                    }}
                                                                    onClick={() => {
                                                                        handleClickButtonReOrder(list.orderId);
                                                                    }}
                                                                >
                                                                    <button>Mua lại</button>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={cx(
                                                                        'favourite-item-check',
                                                                        'fa-button',
                                                                        'fa-check',
                                                                    )}
                                                                    style={{
                                                                        display: isCheck === '2' ? 'block' : 'none',
                                                                    }}
                                                                    onClick={() => {
                                                                        handleOpenFeedbackForm(product);
                                                                    }}
                                                                >
                                                                    <button>Góp ý đơn hàng</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                        </>
                                    );
                                })}
                        </div>
                        <div className={cx('favourite-list-item')}>
                            <div
                                className={cx('favourite-item-left', 'fa-button', 'fa-check')}
                                style={{ display: isCheck === '2' || isCheck === '3' ? 'none' : 'block' }}
                            >
                                <button>Liên hệ người bán</button>
                            </div>

                            <div className={cx('favourite-item-right')}>
                                {queryParams.get('type') !== null &&
                                    queryParams.get('type') !== 'null' &&
                                    queryParams.get('type') !== '3' && (
                                        <div className={cx('list-data-price')}>
                                            <p>{handleTotalMoney(list.data)} VNĐ</p>
                                            <h4>
                                                {list.data[0].moneyPersonPay.toLocaleString('vi-VN', {
                                                    useGrouping: true,
                                                })}{' '}
                                                VNĐ
                                            </h4>
                                        </div>
                                    )}

                                <div
                                    className={cx('favourite-item-button', 'fa-button')}
                                    style={{
                                        backgroundColor: isCheck === '0' ? 'red' : '#A7A6A6',
                                        display: isCheck === '2' || isCheck === '3' ? 'none' : 'block',
                                        cursor: isCheck === '0' ? 'pointer' : 'no-drop',
                                    }}
                                    onClick={() => {
                                        handleClickCancelOrder(isCheck, list.orderId);
                                    }}
                                >
                                    <button style={{ cursor: isCheck === '0' ? 'pointer' : 'no-drop' }}>Huỷ đơn</button>
                                </div>
                                {/* <div
                                    className={cx('favourite-item-check', 'fa-button', 'fa-check')}
                                    style={{ display: isCheck === '2' ? 'block' : 'none' }}
                                    onClick={() => {
                                        handleOpenFeedbackForm(list.data);
                                    }}
                                >
                                    <button>Góp ý đơn hàng</button>
                                </div> */}
                                <div
                                    className={cx('favourite-item-check', 'fa-button', 'fa-check')}
                                    style={{ display: isCheck === '3' ? 'block' : 'none' }}
                                    onClick={() => {
                                        handleClickButtonReOrder(list.orderId);
                                    }}
                                >
                                    <button>Đặt hàng lại</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" fontSize={20} sx={{ color: '#7b2636', fontWeight: 'bold' }}>
                    {'Hủy Đơn Hàng!!!'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" fontSize={20} sx={{ color: '#7b2636' }}>
                        Bạn có chắc là hủy đơn hàng?
                    </DialogContentText>
                    <form>
                        <FormControl sx={{ mt: 3, color: '#7b2636' }} error={error} variant="standard">
                            <FormLabel id="demo-error-radios" sx={{ color: '#7b2636', fontSize: '2rem' }}>
                                Lí do hủy đơn hàng là?
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="quiz"
                                value={value}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel
                                    value="Thay đổi địa chỉ thanh toán"
                                    control={<Radio />}
                                    label="Thay đổi địa chỉ thanh toán?"
                                />
                                <FormControlLabel
                                    value="Giá tiền không phù hợp"
                                    control={<Radio />}
                                    label="Giá tiền không phù hợp?"
                                />
                                <FormControlLabel
                                    value="Tôi không có nhu cầu mua nữa"
                                    control={<Radio />}
                                    label="Tôi không có nhu cầu mua nữa."
                                />
                                <FormControlLabel value="Lí do khác" control={<Radio />} label="Lí do khác." />
                            </RadioGroup>
                            <FormHelperText sx={{ fontSize: '1.5rem' }}>{helperText}</FormHelperText>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        <span style={{ color: '#000000', fontSize: '1.5rem' }}>Hủy Bỏ</span>
                    </Button>
                    <Button onClick={handleSubmitCancelOrder} autoFocus>
                        <span style={{ color: '#7b2636', fontSize: '1.5rem' }}>Đồng Ý</span>
                    </Button>
                </DialogActions>
            </Dialog>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openFeedbackForm}>
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        fontSize: '2rem',
                        color: '#7b2636',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                    }}
                    id="customized-dialog-title"
                >
                    Đánh Giá giúp shop với nhé khách yêu <TagFacesIcon sx={{ fontSize: '3rem', color: '#d21111' }} />
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseFeedbackForm}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        fontSize: '2rem',
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ width: '30px', height: '30px', color: 'var(--color-red)' }} />
                </IconButton>
                <DialogContent dividers>
                    <div className={cx('container')}>
                        <div className={cx('product-order')}>
                            {productFeedback.nameProduct !== '' && (
                                <div className={cx('wrapper')}>
                                    <div className={cx('product-order-image')}>
                                        <img src={productFeedback.image} alt={productFeedback.nameProduct} />
                                    </div>
                                    <div className={cx('product-order-info')}>
                                        <p>{productFeedback.nameProduct}</p>
                                        <p>Phân loại hàng: {productFeedback.color}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={cx('quality-product')}>
                            <p>Đánh giá sản phẩm: </p>
                            <div className={cx('product-feedback')}>
                                <Rating
                                    className={cx('star')}
                                    name="hover-feedback"
                                    value={starState}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                        setStarState(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <form>
                                <div className={cx('feedback-quality-product')}>
                                    <p>Chất lượng sản phẩm: </p>
                                    <TextField
                                        id="standard-basic"
                                        label="Mô tả"
                                        variant="standard"
                                        value={qualityProductDescription}
                                        onChange={(e) => {
                                            setQualityProductDescription(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className={cx('description-feedback-product')}>
                                    <p>Tính năng nổi bật: </p>
                                    <textarea
                                        id="standard-basic"
                                        value={feedbackDescription}
                                        onChange={(e) => {
                                            setFeedbackDescription(e.target.value);
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className={cx('button-checked-active-username')}>
                            <Checkbox
                                {...label}
                                checked={isShowUserName}
                                onChange={(e) => {
                                    setIsShowUserName(e.target.checked);
                                }}
                                sx={{
                                    color: 'var(--color-red)',
                                    '&.Mui-checked': {
                                        color: 'var(--color-red)',
                                    },
                                }}
                            />
                            <div className={cx('anonymous-hint')}>
                                <p>Hiển thị tên đăng nhập trên đánh giá này</p>
                                <p>Tên tài khoản sẽ được hiển thị như {userName !== '' && userName}</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleSubmitFeedback}
                        sx={{ fontSize: '2rem', color: 'var(--color-red)' }}
                    >
                        Hoàn thành
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default CustomOrder;
