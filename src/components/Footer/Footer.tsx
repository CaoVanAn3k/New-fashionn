import classNames from 'classnames/bind';
import style from './Footer.module.scss';
import img1 from '../Images/Product/bìa.jpg';
import img2 from '../Images/Product/avt.jpg';
import face from '../Images/Product/FB-f-Logo__blue_512.png';

const cx = classNames.bind(style);
function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-main')}>
                <h1 className={cx('title')}>BICH THUAN STORE</h1>
                <div className={cx('footer-main-body')}>
                    <div className={cx('footer-address')}>
                        <div className={cx('footer-address-main', 'footer-list')}>
                            <h2>HỆ THỐNG CỬA HÀNG</h2>
                            <div className={cx('address-list')}>
                                <div className={cx('list-item')}>
                                    <i className={cx('fa-solid fa-location-dot')}></i>
                                    <p>Quận 1,Thành phố Hồ Chí Minh</p>
                                </div>
                                <div className={cx('list-item')}>
                                    <i className={cx('fa-solid fa-phone')}></i>
                                    <p>0123456789</p>
                                </div>
                                <div className={cx('list-item')}>
                                    <i className={cx('fa-regular fa-envelope')}></i>
                                    <p>caovanan3k@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer-trademark')}>
                        <div className={cx('footer-trademark-main')}>
                            <h2>THƯƠNG HIỆU</h2>
                            <div className={cx('trademark-list')}>
                                <div className={cx('list-item')}>
                                    <p>Tìm hiểu</p>
                                </div>
                                <div className={cx('list-item')}>
                                    <p>Giới thiệu</p>
                                </div>
                                <div className={cx('list-item')}>
                                    <p>Chính sách đổi trả</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer-register')}>
                        <div className={cx('footer-register-main', 'footer-list')}>
                            <h2>ĐĂNG KÍ NHẬN KHUYẾN MÃI</h2>
                            <div className={cx('register-list')}>
                                <div className={cx('list-item')}>
                                    <input placeholder="Nhập email của bạn"></input>
                                    <button>Gửi</button>
                                </div>
                                <div className={cx('list-item')}>
                                    <h2>FANPAGE</h2>
                                </div>
                                <div className={cx('list-item')}>
                                    <div className={cx('register-cover')}>
                                        <div className={cx('register-img')}>
                                            <img src={img1} alt="logo" />
                                        </div>
                                        <div className={cx('register-information')}>
                                            <div className={cx('information-main')}>
                                                <div className={cx('information-title')}>
                                                    <div className={cx('title-logo')}>
                                                        <img src={img2} alt="img" />
                                                    </div>
                                                    <div className={cx('title-list')}>
                                                        <h2>Bich Thuan Store</h2>
                                                        <p>68.000.000 người theo dõi</p>
                                                    </div>
                                                </div>
                                                <div className={cx('information-button')}>
                                                    <button>
                                                        <div className={cx('img-button')}>
                                                            <img src={face} alt="face" />
                                                        </div>
                                                        <p> Theo dõi trang</p>
                                                    </button>
                                                    <button>
                                                        <i className={cx('fa-solid fa-share-nodes')}></i>
                                                        <p> Chia sẻ</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer-link')}>
                        <div className={cx('footer-link-main', 'footer-list')}>
                            <h2>ICON SOCIAL</h2>
                            <div className={cx('link-list')}>
                                <div className={cx('link-item')}>
                                    <button>
                                        <i className={cx('fa-brands fa-facebook')}></i>
                                    </button>
                                    <button>
                                        <i className={cx('fa-brands fa-instagram')}></i>
                                    </button>
                                    <button>
                                        <i className={cx('fa-brands fa-tiktok')}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
