import classNames from 'classnames/bind';
import styles from './InformationShop.module.scss';

const cx = classNames.bind(styles);

interface ShopChildren {
    id: number;
    linkimg: string;
    titleInformation: string;
    price: string;
    discount: string;
    status: string;
    button: string;
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
                                        <p className={cx('information-price')}>{product.price}</p>

                                        <div className={cx('information-icon')}>
                                            <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                            <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                            <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                            <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                            <i className={cx('fa-solid fa-star', 'icon-color')}></i>
                                        </div>
                                        <div className={cx('information-status')}>
                                            <p>Tình trạng</p>
                                            <p>{product.status}</p>
                                        </div>
                                        <button className={cx('information-button')}>{product.button}</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={cx('information-padding')}></div>
        </div>
    );
};

export default InformationShop;
