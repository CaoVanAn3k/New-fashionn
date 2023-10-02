import classNames from 'classnames/bind';
import styles from './Shop.module.scss';
import SlickSlider from './SlickSliderShop/SlickSliderShop';
import img1 from '../../components/Images/Product/329137040_566142755554780_5549970150105642125_n.jpg';
import img2 from '../../components/Images/Product/Green.png';
import img3 from '../../components/Images/Product/Green.png';
import img4 from '../../components/Images/Product/yellow.png';
import img5 from '../../components/Images/Product/Black3.png';
import logo from '../../components/Images/Product/logo.svg';

import MenuShop from '../../components/Menu/MenuShop';
import InformationShop from './InformationShop';
import CommentProduct from '../../components/Products/CommentProduct';
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
        titleInformation: 'SẢN PHẨM MẪU SỐ 124444444421424325534',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 2,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 3,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 4,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 5,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 6,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 7,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 8,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 9,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 10,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 11,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
    {
        id: 12,
        linkimg: img2,
        titleInformation: 'SẢN PHẨM MẪU SỐ 1',
        price: '$50.00',
        discount: '%20',
    },
];
const commentProduct = [
    {
        id: 1,
        imgClient: img3,
        titleClient: 'Nguyễn Văn Hiếu',
        commentClient: ' Tư vấn rất nhiệt tình, chất liệu mình thấy khá oke, mua về tặng vợ rất hợp lý =))',
        like: '26',
        commentShops: [
            {
                idd: 1,
                logoShop: logo,
                titleShop: 'Bích Thuận Store',
                commentShop:
                    'Cảm ơn bạn đã quan tâm và ủng hộ Shop, Nếu có bất kì thắc mắc, liên hệ với Shop qua Hotline 0989.696.393.',
            },
        ],
    },
    {
        id: 2,
        imgClient: img4,
        titleClient: 'Nguyễn Huy',
        commentClient: ' Tư vấn rất nhiệt tình, chất liệu mình thấy khá oke, mua về tặng vợ rất hợp lý =))',
        like: '26',
        commentShops: [],
    },
    {
        id: 3,
        imgClient: img5,
        titleClient: 'Tuấn Vỹ',
        commentClient: ' Tư vấn rất nhiệt tình, chất liệu mình thấy khá oke, mua về tặng vợ rất hợp lý =))',
        like: '26',
        commentShops: [
            {
                idd: 1,
                logoShop: logo,
                titleShop: 'Bích Thuận Store',
                commentShop:
                    'Cảm ơn bạn đã quan tâm và ủng hộ Shop, Nếu có bất kì thắc mắc, liên hệ với Shop qua Hotline 0989.696.393.',
            },
        ],
    },
    {
        id: 4,
        imgClient: img3,
        titleClient: 'Nguyễn Văn Hiếu',
        commentClient: ' Tư vấn rất nhiệt tình, chất liệu mình thấy khá oke, mua về tặng vợ rất hợp lý =))',
        like: '26',
        commentShops: [],
    },
];
const Shop = () => {
    return (
        <div className={cx('shop-main')}>
            <SlickSlider children={imgSlider} />
            <div className={cx('page-main-tag')}></div>
            <MenuShop />
            <InformationShop chidren={informationShop} />
            <CommentProduct children={commentProduct} />
        </div>
    );
};
export default Shop;
