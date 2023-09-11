import classNames from 'classnames/bind';
import styles from './InformationProduct.module.scss';

const cx = classNames.bind(styles);

interface Product {
    idd: number;
    linkimg: string;
    titleInformation: string;
    price: string;
    discount: string;
    button: string;
}
interface HeaderChildren {
    id: number;
    titleHead: string;
    product: Product[];
}
interface ChildrenProps {
    children: HeaderChildren[];
}
const InformationProduct: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <>
            {children.map((child, index) => {
                return (
                    <div key={index} className={cx('information-product')}>
                        <div className={cx('product-main-header')}>
                            <div className={cx('header-title')}>
                                <h1 className={cx('title-list')}>{child.titleHead}</h1>

                                <i className={cx('fa-sharp fa-solid fa-star-of-life', 'icon')}></i>
                            </div>
                            <div className={cx('header-button')}>
                                <button className={cx('button-list')}>
                                    XEM TẨT CẢ
                                    <i className={cx('fa-solid fa-arrow-right')}></i>
                                </button>
                            </div>
                        </div>
                        <div className={cx('product-main-shop')}>
                            <div className={cx('main-shop-list')}>
                                {child.product.map((product) => {
                                    return (
                                        <div className={cx('shop-list-item')} key={product.idd}>
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
                                                    <h2 className={cx('information-title')}>
                                                        {product.titleInformation}
                                                    </h2>
                                                    <p className={cx('information-price')}>{product.price}</p>

                                                    <div className={cx('information-icon')}>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color')}></i>
                                                    </div>
                                                    <button className={cx('information-button')}>
                                                        {product.button}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default InformationProduct;
