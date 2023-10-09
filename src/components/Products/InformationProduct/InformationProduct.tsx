import classNames from 'classnames/bind';
import styles from './InformationProduct.module.scss';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { deleteDataProductId } from '../../../redux/products/products';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

interface Product {
    productId: number;
    name: string;
    price: number;
    description: string;
    image: string;
    material: string;
    quantity: number;
    colorNames: [];
    sizeNames: [];
    categoryId: number;
    galleryImages: [];
}
interface ResponseData {
    content: string;
    product: Product[];
}
interface ChildrenProps {
    children: ResponseData[];
}
const HeaderTitle = [
    {
        id: 1,
        title: 'New Collections',
    },
    {
        id: 2,
        title: 'Selling Product',
    },
    {
        id: 3,
        title: 'Featured Product',
    },
];
const InformationProduct: React.FC<ChildrenProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleClickProduct = (productId: number) => {
        dispatch(deleteDataProductId());
        navigate(`/product/${productId}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const { isLoadingProductHome } = useAppSelector((state) => state.products);
    function renderSkeleton() {
        return (
            <div className={cx('skeleton-container')}>
                <Box className={cx('skeleton')}>
                    {[...Array.from(Array(4))].map((item, index) => {
                        return (
                            <Box sx={{ width: '100%' }} key={index}>
                                <Stack>
                                    <Skeleton
                                        variant="rounded"
                                        className={cx('Skeleton-image')}
                                        style={{ width: '100%' }}
                                    />
                                    <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                                </Stack>
                            </Box>
                        );
                    })}
                </Box>
            </div>
        );
    }
    return (
        <>
            {isLoadingProductHome ? (
                renderSkeleton()
            ) : (
                <>
                    {children.length > 0 &&
                        children.map((child, index) => {
                            return (
                                <div key={index} className={cx('information-product')}>
                                    <div className={cx('product-main-header')}>
                                        <div className={cx('header-title')}>
                                            <h1 className={cx('title-list')}>{HeaderTitle[index].title}</h1>
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
                                                    <div
                                                        className={cx('shop-list-item')}
                                                        key={product.productId}
                                                        onClick={() => {
                                                            handleClickProduct(product.productId);
                                                        }}
                                                    >
                                                        {/* {product.discount && (
                                                        <div className={cx('list-discount')}>
                                                            <span>{product.discount}</span>
                                                        </div>
                                                    )} */}
                                                        <div className={cx('list-img')}>
                                                            <img src={product.image} alt={product.name} />
                                                        </div>
                                                        <div className={cx('list-information')}>
                                                            <div className={cx('information-main')}>
                                                                <h2 className={cx('information-title')}>
                                                                    {product.name}
                                                                </h2>
                                                                <div className={cx('bottom')}>
                                                                    <div className={cx('content-left')}>
                                                                        <p className={cx('information-price')}>
                                                                            {product.price / 1000.0}.000 vnđ
                                                                        </p>
                                                                        <div className={cx('information-icon')}>
                                                                            <i
                                                                                className={cx(
                                                                                    'fa-solid fa-star',
                                                                                    'icon-color-yellow',
                                                                                )}
                                                                            ></i>
                                                                            <i
                                                                                className={cx(
                                                                                    'fa-solid fa-star',
                                                                                    'icon-color-yellow',
                                                                                )}
                                                                            ></i>
                                                                            <i
                                                                                className={cx(
                                                                                    'fa-solid fa-star',
                                                                                    'icon-color-yellow',
                                                                                )}
                                                                            ></i>
                                                                            <i
                                                                                className={cx(
                                                                                    'fa-solid fa-star',
                                                                                    'icon-color-yellow',
                                                                                )}
                                                                            ></i>
                                                                            <i
                                                                                className={cx(
                                                                                    'fa-solid fa-star',
                                                                                    'icon-color',
                                                                                )}
                                                                            ></i>
                                                                        </div>
                                                                    </div>
                                                                    <div className={cx('content-right')}>
                                                                        <div className={cx('information-button')}>
                                                                            <button
                                                                                className={cx(
                                                                                    'information-button-main',
                                                                                )}
                                                                            >
                                                                                <AddOutlinedIcon />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
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
            )}
        </>
    );
};

export default InformationProduct;
