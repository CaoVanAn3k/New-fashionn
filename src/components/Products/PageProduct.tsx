import classNames from 'classnames/bind';
import styles from './PageProduct.module.scss';
import img1 from '../Images/Product/Blue.png';
import img3 from '../Images/Product/Green.png';
import img4 from '../Images/Product/yellow.png';
import img5 from '../Images/Product/Black3.png';
import logo from '../Images/Product/logo.svg';

import InformationProduct from './InformationProduct/InformationProduct';
import ReasonProduct from './ReasonProduct/ReasonProduct';
import CommentProduct from './CommentProduct';
import Footer from '../Footer';
const cx = classNames.bind(styles);

const informationProduct = [
    {
        id: 1,
        titleHead: 'New Collection',
        product: [
            {
                idd: 1,
                linkimg: img1,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '%20',
                button: 'Mua ngay',
            },
            {
                idd: 2,
                linkimg: img5,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '',
                button: 'Mua ngay',
            },
            {
                idd: 3,
                linkimg: img3,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '%20',
                button: 'Mua ngay',
            },
            {
                idd: 4,
                linkimg: img4,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '',
                button: 'Mua ngay',
            },
        ],
    },
    {
        id: 2,
        titleHead: 'Selling Product',
        product: [
            {
                idd: 1,
                linkimg: img1,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '%20',
                button: 'Mua ngay',
            },
            {
                idd: 2,
                linkimg: img5,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '',
                button: 'Mua ngay',
            },
            {
                idd: 3,
                linkimg: img3,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '%20',
                button: 'Mua ngay',
            },
            {
                idd: 4,
                linkimg: img4,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '',

                button: 'Mua ngay',
            },
        ],
    },
    {
        id: 3,
        titleHead: 'Featured Product',
        product: [
            {
                idd: 1,
                linkimg: img1,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '%20',
                button: 'Mua ngay',
            },
            {
                idd: 2,
                linkimg: img5,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '',
                button: 'Mua ngay',
            },
            {
                idd: 3,
                linkimg: img3,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '%20',

                button: 'Mua ngay',
            },
            {
                idd: 4,
                linkimg: img4,
                titleInformation: 'SẢN PHẨM MẪU SỐ 1',
                price: '$50.00',
                discount: '',
                button: 'Mua ngay',
            },
        ],
    },
];
const reasonProduct = [
    {
        id: 1,
        title: 'TUỔI ĐỜI THƯƠNG HIỆU CỦA BÍCH THUẬN STORE',
        describe:
            // eslint-disable-next-line no-multi-str
            ' Được thành lập vào năm 2010, khi thị trường thời trang mặc nhà còn chưa \
        được chú trọng. Ohlady chính là cái tên đặt bước tiến tiên phong trong\
        lĩnh vực này. Sau hơn 12 năm phát triển, hiện Ohlady vẫn có tầm nhìn trở\
        thành Thương hiệu dẫn đầu thị trường dòng thời trang ứng dụng, lifewear\
        tại Việt Nam.',
    },
    {
        id: 2,
        title: 'ĐỘI NGŨ NHÂN VIÊN CHUYÊN NGHIỆP',
        describe:
            // eslint-disable-next-line no-multi-str
            ' Được thành lập vào năm 2010, khi thị trường thời trang mặc nhà còn chưa được chú trọng. \
            Ohlady chính là cái tên đặt bước tiến tiên phong trong lĩnh vực này. Sau hơn 12 năm phát triển,\
             hiện Ohlady vẫn có tầm nhìn trở thành Thương hiệu dẫn đầu thị trường dòng thời trang ứng dụng,\
              lifewear tại việt Nam..',
    },
    {
        id: 3,
        title: 'CHẤT LIỆU SẢN PHẨM ĐẠT CHUẨN',
        describe:
            // eslint-disable-next-line no-multi-str
            ' Được thành lập vào năm 2010, khi thị trường thời trang mặc nhà còn chưa được chú trọng. \
            Ohlady chính là cái tên đặt bước tiến tiên phong trong lĩnh vực này. Sau hơn 12 năm phát triển,\
             hiện Ohlady vẫn có tầm nhìn trở thành Thương hiệu dẫn đầu thị trường dòng thời trang ứng dụng,\
              lifewear tại việt Nam..',
    },
    {
        id: 4,
        title: 'TƯ VẤN THIẾT KẾ NHIỆT TÌNH',
        describe:
            // eslint-disable-next-line no-multi-str
            ' Được thành lập vào năm 2010, khi thị trường thời trang mặc nhà còn chưa được chú trọng. \
            Ohlady chính là cái tên đặt bước tiến tiên phong trong lĩnh vực này. Sau hơn 12 năm phát triển,\
             hiện Ohlady vẫn có tầm nhìn trở thành Thương hiệu dẫn đầu thị trường dòng thời trang ứng dụng,\
              lifewear tại việt Nam..',
    },
    {
        id: 5,
        title: 'HỖ TRỢ KHÁCH HÀNG 24/7',
        describe:
            // eslint-disable-next-line no-multi-str
            ' Được thành lập vào năm 2010, khi thị trường thời trang mặc nhà còn chưa được chú trọng. \
            Ohlady chính là cái tên đặt bước tiến tiên phong trong lĩnh vực này. Sau hơn 12 năm phát triển,\
             hiện Ohlady vẫn có tầm nhìn trở thành Thương hiệu dẫn đầu thị trường dòng thời trang ứng dụng,\
              lifewear tại việt Nam..',
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
const PageProduct: React.FC = () => {
    return (
        <div className={cx('home-page-product')}>
            <InformationProduct children={informationProduct} />
            <ReasonProduct children={reasonProduct} />
            <CommentProduct children={commentProduct} />
            <Footer />
        </div>
    );
};

export default PageProduct;
