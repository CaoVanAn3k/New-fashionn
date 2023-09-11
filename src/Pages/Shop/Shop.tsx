import classNames from 'classnames/bind';
import styles from './Shop.module.scss';
import SlickSlider from '../../components/SlickSlider/SlickSlider';
import img1 from '../../components/Images/Product/329137040_566142755554780_5549970150105642125_n.jpg';
import img2 from '../../components/Images/Product/Green.png';
import MenuShop from '../../components/Menu/MenuShop';
import InformationShop from './InformationShop';
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
const informationShop = [
    {
        id: 1,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
        status: 'Còn hàng',
        button: 'Mua ngay',
    },
    {
        id: 2,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
        status: 'Còn hàng',
        button: 'Mua ngay',
    },
    {
        id: 3,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
        status: 'Còn hàng',
        button: 'Mua ngay',
    },
    {
        id: 4,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
        status: 'Còn hàng',
        button: 'Mua ngay',
    },
    {
        id: 5,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
        status: 'Còn hàng',
        button: 'Mua ngay',
    },
    {
        id: 6,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
        status: 'Còn hàng',
        button: 'Mua ngay',
    },
    {
        id: 7,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
        status: 'Còn hàng',
        button: 'Mua ngay',
    },
    {
        id: 8,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
        status: 'Còn hàng',
        button: 'Mua ngay',
    },
    {
        id: 9,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
        status: 'Còn hàng',
        button: 'Mua ngay',
    },
];
const Shop = () => {
    return (
        <div className={cx('shop-main')}>
            <SlickSlider children={imgSlider} />
            <div className={cx('page-main-tag')}></div>
            <MenuShop />
            <InformationShop chidren={informationShop} />
        </div>
    );
};
export default Shop;
