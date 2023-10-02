import classNames from 'classnames/bind';
import styles from './InformationShop.module.scss';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
const cx = classNames.bind(styles);

interface ShopChildren {
    id: number;
    linkimg: string;
    titleInformation: string;
    price: string;
    discount: string;
}

interface ShopProps {
    chidren: ShopChildren[];
}
const InformationShop: React.FC<ShopProps> = ({ chidren }) => {
    return (
        <div className={cx('information-shop')}>
            <div className={cx('product-main-shop')}>
                <div className={cx('main-shop-list')}>
                    {chidren.map((product) => {
                        return (
                            <div className={cx('shop-list-item')} key={product.id}>
                                {product.discount !== '' && (
                                    <div className={cx('list-discount')}>
                                        <span>{product.discount}</span>
                                    </div>
                                )}
                                <div className={cx('list-img')}>
                                    <img src={product.linkimg} alt={product.titleInformation} />
                                </div>
                                <div className={cx('list-information')}>
                                    <div className={cx('information-main')}>
                                        <h2 className={cx('information-title')}>{product.titleInformation}</h2>
                                        <div className={cx('information-content')}>
                                            <div className={cx('information-content-left')}>
                                                <p className={cx('information-price')}>{product.price}</p>
                                                <div className={cx('information-icon')}>
                                                    <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                    <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                    <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                    <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                    <i className={cx('fa-solid fa-star', 'icon-color')}></i>
                                                </div>
                                            </div>
                                            <div className={cx('information-button')}>
                                                <button className={cx('information-button-main')}>
                                                    <AddOutlinedIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('load-more')}>
                    <button className={cx('button')}>
                        <span>Xem Thêm</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InformationShop;
