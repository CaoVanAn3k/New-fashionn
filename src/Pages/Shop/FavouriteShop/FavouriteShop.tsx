import classNames from 'classnames/bind';
import styles from './FavouriteShop.module.scss';
import img2 from '../../../components/Images/Product/Green.png';
import img1 from '../../../components/Images/Product/329137040_566142755554780_5549970150105642125_n.jpg';
import SlickSlider from '../SlickSliderShop/SlickSliderShop';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useState } from 'react';
const cx = classNames.bind(styles);

const imgSlider = [
    {
        id: 1,
        img: img1,
    },
    {
        id: 2,
        img: img1,
    },
    {
        id: 3,
        img: img1,
    },
];
const favouriteList = [
    {
        id: 1,
        discount: '20%',
        img: img2,
        title: 'SẢN PHẨM MẪU SỐ 1 ',
        code: '12345',
        color: '08 Green',
        size: 'M L XL',
        price: '500.000VNĐ',
        total: '400.000VNĐ',
        date: '20/12/2023',
    },
    {
        id: 2,
        discount: '20%',
        img: img2,
        title: 'SẢN PHẨM MẪU SỐ 1 ',
        code: '12345',
        color: '08 Green',
        size: 'M L XL',
        price: '500.000VNĐ',
        total: '400.000VNĐ',
        date: '20/12/2023',
    },
    {
        id: 3,
        discount: '20%',
        img: img2,
        title: 'SẢN PHẨM MẪU SỐ 1 ',
        code: '12345',
        color: '08 Green',
        size: 'M L XL',
        price: '500.000VNĐ',
        total: '400.000VNĐ',
        date: '20/12/2023',
    },
    {
        id: 4,
        discount: '20%',
        img: img2,
        title: 'SẢN PHẨM MẪU SỐ 1 ',
        code: '12345',
        color: '08 Green',
        size: 'M L XL',
        price: '500.000VNĐ',
        total: '400.000VNĐ',
        date: '20/12/2023',
    },
    {
        id: 5,
        discount: '20%',
        img: img2,
        title: 'SẢN PHẨM MẪU SỐ 1 ',
        code: '12345',
        color: '08 Green',
        size: 'M L XL',
        price: '500.000VNĐ',
        total: '400.000VNĐ',
        date: '20/12/2023',
    },
    {
        id: 6,
        discount: '20%',
        img: img2,
        title: 'SẢN PHẨM MẪU SỐ 1 ',
        code: '12345',
        color: '08 Green',
        size: 'M L XL',
        price: '500.000VNĐ',
        total: '400.000VNĐ',
        date: '20/12/2023',
    },
    {
        id: 7,
        discount: '20%',
        img: img2,
        title: 'SẢN PHẨM MẪU SỐ 1 ',
        code: '12345',
        color: '08 Green',
        size: 'M L XL',
        price: '500.000VNĐ',
        total: '400.000VNĐ',
        date: '20/12/2023',
    },
];
function FavouriteShop() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={cx('favourite-shop')}>
            <SlickSlider children={imgSlider} />
            <div className={cx('favourite-shop-main')}>
                <div className={cx('favourite-main-list')}>
                    <div className={cx('favourite-list-title')}>
                        <div className={cx('list-title-left')}>
                            <h1>SẢN PHẨM YÊU THÍCH</h1>
                            <p>8 sản phẩm</p>
                        </div>
                        <div className={cx('list-title-right')}>
                            <h3>SẮP XẾP THEO</h3>
                            <select className={cx('title-right-select')}>
                                <option>Tiêu biểu</option>
                                <option>Tiêu biểu 1</option>
                                <option>Tiêu biểu 2</option>
                            </select>
                        </div>
                    </div>
                    <div className={cx('favourite-list-information')}>
                        {/* <div className={cx('favourite-information-main')}>
                            <div className={cx('favourite-information-list')}>
                                <div className={cx('favourite-list-left')}>
                                    <div className={cx('list-item-logo')}>
                                        <div className={cx('left-discount')}>20%</div>
                                        <div className={cx('left-img')}>
                                            <img src={img2} alt="logo" />
                                        </div>
                                        <div className={cx('left-icon')}>
                                            <i className={cx('fa-solid fa-heart')}></i>
                                        </div>
                                    </div>
                                    <div className={cx('list-item-data')}>
                                        <h3>SẢN PHẨM MẪU SỐ 1</h3>
                                        <div className={cx('list-data-information')}>
                                            <p>Mã sản phẩm:12345</p>
                                            <p>Màu sắc:color</p>
                                            <p>Kích cỡ:L</p>
                                        </div>
                                        <div className={cx('list-data-price')}>
                                            <p>500.000 VNĐ</p>
                                            <h4>400.000 VNĐ</h4>
                                        </div>
                                        <p>Giảm giá đến ngày 20/12/2023</p>
                                    </div>
                                </div>
                                <div className={cx('favourite-list-right')}>
                                    <button>Xem ngay</button>
                                </div>
                            </div>
                        </div> */}
                        {favouriteList.map((list, index) => {
                            return (
                                <div className={cx('favourite-information-main')} key={index}>
                                    <div className={cx('favourite-information-list')}>
                                        <div className={cx('favourite-list-left')}>
                                            <div className={cx('list-item-logo')}>
                                                <div className={cx('left-discount')}>{list.discount}</div>
                                                <div className={cx('left-img')}>
                                                    <img src={list.img} alt="logo" />
                                                </div>
                                                <div className={cx('left-icon')}>
                                                    <i className={cx('fa-solid fa-heart')}></i>
                                                </div>
                                            </div>
                                            <div className={cx('list-item-data')}>
                                                <h3>{list.title}</h3>
                                                <div className={cx('list-data-information')}>
                                                    <p>Mã sản phẩm:{list.code}</p>
                                                    <p>Màu sắc:{list.color}</p>
                                                    <p>Kích cỡ:{list.size}</p>
                                                </div>
                                                <div className={cx('list-data-price')}>
                                                    <p>{list.price}</p>
                                                    <h4>{list.total}</h4>
                                                </div>
                                                <p>Giảm giá đến ngày {list.date}</p>
                                            </div>
                                        </div>
                                        <div className={cx('favourite-list-right')}>
                                            <button>Xem ngay</button>
                                            <button onClick={handleClickOpen}>
                                                <DeleteForeverIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={cx('favourite-shop-border')}></div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có muốn xóa sản phẩm ? ra khỏi danh sách yêu thích?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy Bỏ</Button>
                    <Button onClick={handleClose} autoFocus>
                        Đồng Ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FavouriteShop;
