import classNames from 'classnames/bind';
import styles from './DetailShop.module.scss';
import img1 from '../../../components/Images/Product/Green.png';
import img2 from '../../../components/Images/Product/Black3.png';
import img3 from '../../../components/Images/Product/Blue.png';
import img4 from '../../../components/Images/Product/Green.png';
import img5 from '../../../components/Images/Product/White.png';
import Slider from 'react-slick';
import MenuLink from '../../../components/Menu/MenuLink';
import { useState } from 'react';
import InformationDetailShop from './InformationDetailShop';
import IconEvaluate from '../../../components/IconEvaluate';
import CommentDetailShop from './CommentDetailShop';

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
        title: 'Shop',
        path: '/shop',
        icon: 'icon',
    },
    {
        id: 3,
        title: 'Sản phẩm mẫu số 1',
        path: '',
        icon: '',
    },
];
const imgDetailShop = [
    {
        id: 1,
        img: img1,
    },
    {
        id: 1,
        img: img2,
    },
    {
        id: 1,
        img: img3,
    },
    {
        id: 1,
        img: img4,
    },
    {
        id: 1,
        img: img5,
    },
    {
        id: 1,
        img: img3,
    },
];

const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 600,
    // autoplay: true,
    // autoplaySpeed: 1000,
    cssEase: 'linear',
};

const informationDetail = [
    {
        id: 1,
        title: 'Tổng quan',
        information: 'KHỞI NGUỒN VẺ ĐẸP THANH LỊCH,HIỆN ĐẠI',
        describe:
            "Từ chối những rập khuôn về thời trang hay tiêu chuẩn đương thời quen thuộc,Oh ' Lady Boutique tái định vị triết lý sáng tạo cùng bộ suil trứ danh với phiên bản đặc biệt mới  mẻ.Trong mạnh mẽ có dịu dàng,nữ tính-trong rắn rỏi có nét rực rỡ,tươi trẻ.",
    },
    {
        id: 2,
        title: 'Chất liệu',
        information: 'KHỞI NGUỒN VẺ ĐẸP THANH LỊCH,HIỆN ĐẠI',
        describe:
            "Từ chối những rập khuôn về thời trang hay tiêu chuẩn đương thời quen thuộc,Oh ' Lady Boutique tái định vị triết lý sáng tạo cùng bộ suil trứ danh với phiên bản đặc biệt mới  mẻ.Trong mạnh mẽ có dịu dàng,nữ tính-trong rắn rỏi có nét rực rỡ,tươi trẻ.",
    },
    {
        id: 3,
        title: 'Chính sách hoàn trả',
        information: 'KHỞI NGUỒN VẺ ĐẸP THANH LỊCH,HIỆN ĐẠI',
        describe:
            "Từ chối những rập khuôn về thời trang hay tiêu chuẩn đương thời quen thuộc,Oh ' Lady Boutique tái định vị triết lý sáng tạo cùng bộ suil trứ danh với phiên bản đặc biệt mới  mẻ.Trong mạnh mẽ có dịu dàng,nữ tính-trong rắn rỏi có nét rực rỡ,tươi trẻ.",
    },
];
const iconEvaluate = [
    {
        id: 1,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 2,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 3,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 4,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 5,
        color: 'yellow',
        quantity: '(10)',
    },
];
const iconEvaluate1 = [
    {
        id: 1,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 2,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 3,
        color: 'fff',
        quantity: '',
    },
    {
        id: 4,
        color: 'fff',
        quantity: '',
    },
    {
        id: 5,
        color: 'fff',
        quantity: '(0)',
    },
];

const commentDetail = [
    {
        id: 1,
        name: 'Nguyen',
        date: '07/08/2023',
        title: 'Tên sản phẩm:Sản phẩm mẫu số 1',
        color: 'Màu sắc:Green',
        size: 'Kích cỡ',
        comment: 'Quần áo có vừa không:Đúng với kích thước',
        evaluate: 'Đánh giá',
        evaluatecmt: 'Sản phẩm đẹp,lên dánh ok,sẽ ủng hộ thêm sau này !!!',
    },
    {
        id: 2,
        name: 'An',
        date: '08/08/2023',
        title: 'Tên sản phẩm:Sản phẩm mẫu số 1',
        color: 'Màu sắc:Green',
        size: 'Kích cỡ',
        comment: 'Quần áo có vừa không:Đúng với kích thước',
        evaluate: 'Đánh giá',
        evaluatecmt: 'Sản phẩm đẹp,lên dánh ok,sẽ ủng hộ thêm sau này !!!',
    },
    {
        id: 3,
        name: 'Huy',
        date: '10/08/2023',
        title: 'Tên sản phẩm:Sản phẩm mẫu số 1',
        color: 'Màu sắc:Green',
        size: 'Kích cỡ',
        comment: 'Quần áo có vừa không:Đúng với kích thước',
        evaluate: 'Đánh giá',
        evaluatecmt: 'Sản phẩm đẹp,lên dánh ok,sẽ ủng hộ thêm sau này !!!',
    },
];

function DetailShop() {
    const [sliderDetail, setSliderDetail] = useState(img1);
    const handleClickSlider = (children: string) => {
        setSliderDetail(children);
    };
    return (
        <div className={cx('detail-shop')}>
            <div className={cx('detail-shop-main')}>
                <div className={cx('detail-shop-main')}>
                    <MenuLink children={menuLink} />
                    <div className={cx('detail-shop-information')}>
                        <div className={cx('detail-information-left')}>
                            <div className={cx('information-left-img')}>
                                <img src={sliderDetail} alt="img" />
                            </div>
                            <div className={cx('information-left-icon')}>
                                <i className={cx('fa-solid fa-heart')}></i>
                            </div>
                            <div className={cx('information-left-slide')}>
                                <Slider {...settings}>
                                    {imgDetailShop.map((img, index) => {
                                        return (
                                            <div className={cx('left-slide-main')} key={index}>
                                                <div className={cx('an')}>
                                                    <div className={cx('a')} onClick={() => handleClickSlider(img.img)}>
                                                        <img src={img.img} alt="img" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>
                        </div>
                        <div className={cx('detail-information-right')}>
                            <div className={cx('information-right-main')}>
                                <h1>SẢN PHẨM MẪU SỐ 1</h1>
                                <div className={cx('information-price')}>
                                    <div className={cx('price-main')}>
                                        <p className={cx('discount')}>500.000 VND</p>
                                        <p className={cx('current')}>400.000 VND</p>
                                    </div>
                                </div>
                                <p>Giảm giá đến hết ngày 20/10/2023</p>
                                <div className={cx('information-list')}>
                                    <h3>MÀU SẮC</h3>
                                    <div className={cx('color-list')}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <div className={cx('information-list')}>
                                    <h3>KÍCH CỠ</h3>
                                    <div className={cx('size-list')}>
                                        <div>
                                            <p>S</p>
                                        </div>
                                        <div>
                                            <p>M</p>
                                        </div>
                                        <div>
                                            <p>L</p>
                                        </div>
                                        <div>
                                            <p>XL</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('information-height')}>
                                    <div className={cx('height-top-list')}>
                                        <p>KÍCH THƯỚC CHIỀU CAO</p>
                                    </div>
                                    <div className={cx('height-bottom-list')}>
                                        <i className={cx('fa-solid fa-ruler-vertical')}></i>
                                        <p>BẢNG KÍCH THƯỚC</p>
                                    </div>
                                </div>
                                <div className={cx('information-quantity')}>
                                    <div className={cx('quantity-top-list')}>
                                        <p>SỐ LƯỢNG</p>
                                        <span>Còn 10 bộ</span>
                                    </div>
                                    <div className={cx('quantity-bottom-list')}>
                                        <select>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                </div>
                                <button className={cx('information-buy')}>MUA NGAY</button>
                            </div>
                        </div>
                    </div>
                    <InformationDetailShop children={informationDetail} />
                    <div className={cx('detail-shop-evaluate')}>
                        <div className={cx('shop-evaluate-main')}>
                            <div className={cx('evaluate-main-title')}>
                                <h1>ĐÁNH GIÁ</h1>
                                <IconEvaluate children={iconEvaluate} />
                            </div>
                            <div className={cx('evaluate-main-title')}>
                                <h3>ĐÁNH GIÁ CỦA KHÁCH HÀNG</h3>
                            </div>
                            <div className={cx('evaluate-main-icon')}>
                                <IconEvaluate children={iconEvaluate} />
                                <IconEvaluate children={iconEvaluate} />
                                <IconEvaluate children={iconEvaluate} />
                                <IconEvaluate children={iconEvaluate1} />
                                <IconEvaluate children={iconEvaluate1} />
                            </div>
                            <div className={cx('evaluate-main-item')}>
                                <p>10 bài đáng giá</p>
                            </div>
                            <CommentDetailShop children={commentDetail} />
                            <button className={cx('evaluate-main-button')}>XEM THÊM</button>
                        </div>
                    </div>
                    <div className={cx('detail-shop-watched')}>
                        <div className={cx('shop-watched-title')}>
                            <h2>SẢN PHẨM TƯƠNG TỰ</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailShop;
