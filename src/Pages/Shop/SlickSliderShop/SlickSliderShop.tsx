import classNames from 'classnames/bind';
import style from './SlickSliderShop.module.scss';
import Slider from 'react-slick';

const cx = classNames.bind(style);
interface arrSlider {
    id: number;
    img: string;
}
interface ChildrenSlider {
    children: arrSlider[];
}

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
};
const SlickSlider: React.FC<ChildrenSlider> = ({ children }) => {
    return (
        <div className={cx('page-slide-slick')}>
            <Slider {...settings}>
                {children.map((child) => {
                    return (
                        <div key={child.id} className={cx('slide-slick-img')}>
                            <img src={child.img} alt={child.img} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default SlickSlider;
