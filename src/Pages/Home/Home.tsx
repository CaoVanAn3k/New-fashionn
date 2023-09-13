import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '../../components/Images';
import PageProduct from '../../components/Products';
import SlickSlider from './SlickSlider/SlickSlider';
import img1 from '../../components/Images/Product/Blue.png';
import img3 from '../../components/Images/Product/Black3.png';
import img4 from '../../components/Images/Product/White.png';
import img5 from '../../components/Images/Product/Green.png';

const cx = classNames.bind(styles);

const imgSlider = [
    {
        id: 1,
        img: img1,
        backgroundColor: '#3651a0',
    },
    {
        id: 2,
        img: img3,
        backgroundColor: '#151414',
    },
    {
        id: 3,
        img: images.homeimg,
        backgroundColor: '#802a3a',
    },
    {
        id: 4,
        img: img4,
        backgroundColor: '#a8aaa8',
    },
    {
        id: 5,
        img: img5,
        backgroundColor: '#788028 ',
    },
];

const Home = () => {
    return (
        <>
            <div className={cx('home-page')}>
                <div className={cx('home-page-heading')}>
                    <div className={cx('page-heading-img')}>
                        <img src={images.homeimg} alt="homeimg" />
                    </div>
                </div>
                <div className={cx('home-page-main')}>
                    <div className={cx('page-main-left')}>
                        <div className={cx('main-left-body')}>
                            <h2 className={cx('main-left-title')}>New</h2>
                            <div className={cx('main-left-information')}>
                                <h4 className={cx('left-information-title')}>
                                    SẮC ĐỎ MÊ HOẶC CHO VẺ ĐẸP THÊM THĂNG HOA
                                </h4>
                                <p className={cx('left-information-describe')}>
                                    Gửi lại mùa hè sắc màu nóng bỏng của những đóa hồng quyến rũ, Bích Thuận Store dẫn
                                    lối nàng hòa mình vào những êm ái, ngọt ngào bên trong diện mạo điệu đà, mĩ miều với
                                    chiếc váy tôn vinh sự sang trọng của người phụ nữ, đủ nổi bật đủ tinh tế để nàng tự
                                    tin tỏa sáng trong mọi khoảnh khắc xa hoa.
                                </p>
                                <button className={cx('left-information-button')}>
                                    <p className={cx('button-title')}>Xem thêm</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('page-main-right')}>
                        <div className={cx('main-right-body')}>
                            <h2 className={cx('main-right-title')}>Collection</h2>
                        </div>
                    </div>
                </div>
                <div className={cx('page-main-tag')}></div>
                <div className={cx('home-page-slide')}>
                    <div className={cx('page-slide-table')}>
                        <table className={cx('product-table-body')}>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('page-slide-information')}>
                        <div className={cx('slide-information-main')}>
                            <div className={cx('slide-information-list')}>
                                <i className={cx('fa-sharp fa-solid fa-star-of-life', 'icon')}></i>
                                <h1 className={cx('information-title')}>Product Highlight</h1>
                                <h4 className={cx('information-describe')}>
                                    CHẤT THƠ VÀ SỰ DỊU DÀNG TRONG TỪNG ĐIỂM CHẠM
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className={cx('page-slide-slick')}>
                        <SlickSlider children={imgSlider} />
                    </div>
                </div>

                <PageProduct />
            </div>
        </>
    );
};
export default Home;
