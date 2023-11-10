import classNames from 'classnames/bind';
import styles from './PageProduct.module.scss';
import { useState, useEffect } from 'react';
import InformationProduct from './InformationProduct/InformationProduct';
import ReasonProduct from './ReasonProduct/ReasonProduct';
import GoogleMap from '../GoogleMap/GoogleMap';
import { useAppSelector } from '../../redux/store';
const cx = classNames.bind(styles);
const reasonProduct = [
    {
        id: 1,
        title: 'TUỔI ĐỜI THƯƠNG HIỆU CỦA BÍCH THUẬN STORE',
        describe:
            // eslint-disable-next-line no-multi-str
            'Chào mừng bạn đến với Bích Thuận Store - một thương hiệu với hơn 10 năm kinh nghiệm trong ngành thời trang. Chúng tôi tự hào về lịch sử dài lâu và đẳng cấp của mình, mang đến cho bạn những bộ trang phục thời thượng và đáng yêu.',
    },
    {
        id: 2,
        title: 'ĐỘI NGŨ NHÂN VIÊN CHUYÊN NGHIỆP',
        describe:
            // eslint-disable-next-line no-multi-str
            'Bích Thuận Store luôn tự hào về đội ngũ nhân viên chuyên nghiệp và đầy đam mê. Chúng tôi cam kết đảm bảo bạn có trải nghiệm mua sắm thoải mái và thú vị nhất, với sự tư vấn chuyên nghiệp từ đội ngũ của chúng tôi.',
    },
    {
        id: 3,
        title: 'CHẤT LIỆU SẢN PHẨM ĐẠT CHUẨN',
        describe:
            // eslint-disable-next-line no-multi-str
            'Sự chất lượng là ưu tiên hàng đầu tại Bích Thuận Store. Tất cả sản phẩm của chúng tôi được lựa chọn kỹ càng và chất lượng sản phẩm đạt chuẩn cao. Chúng tôi cam kết mang đến cho bạn những bộ trang phục không chỉ đẹp mắt mà còn bền đẹp.',
    },
    {
        id: 4,
        title: 'TƯ VẤN THIẾT KẾ NHIỆT TÌNH',
        describe:
            // eslint-disable-next-line no-multi-str
            'Bạn đang tìm kiếm một bộ trang phục hoàn hảo cho một dịp đặc biệt hay một sự cải tiến cho tủ quần áo của bạn? Chúng tôi sẽ tư vấn với tâm huyết và nhiệt tình, giúp bạn chọn lựa những thiết kế phù hợp nhất với phong cách và sở thích của bạn.',
    },
    {
        id: 5,
        title: 'HỖ TRỢ KHÁCH HÀNG 24/7',
        describe:
            // eslint-disable-next-line no-multi-str
            'Tại Bích Thuận Store, chúng tôi luôn lắng nghe và đồng hành cùng bạn. Với dịch vụ hỗ trợ khách hàng 24/7, chúng tôi sẵn sàng trả lời mọi câu hỏi, giải quyết mọi vấn đề, và đảm bảo bạn luôn hài lòng với trải nghiệm mua sắm của mình.',
    },
];
const PageProduct: React.FC = () => {
    const { productHomes } = useAppSelector((state) => state.products);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        if (productHomes) {
            const convertArray: any = Object.entries(productHomes).map(([key, value]) => {
                return {
                    product: value,
                };
            });
            setProduct(convertArray);
        }
    }, [productHomes]);
    return (
        <div className={cx('home-page-product')}>
            <InformationProduct children={product} />
            <ReasonProduct children={reasonProduct} />
            <GoogleMap />
        </div>
    );
};

export default PageProduct;
