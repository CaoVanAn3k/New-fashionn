import classNames from 'classnames/bind';
import styles from './InformationShop.module.scss';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { deleteDataProductId, findAllProductShop } from '../../../redux/products/products';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
const cx = classNames.bind(styles);

interface Product {
    productId: number;
    name: string;
    price: number;
    description: string;
    image: string;
    material: string;
    colorId: [];
    sizeId: [];
    categoryId: number;
    galleryThumbnail: [];
}
const InformationShop: React.FC<any> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { products, isLoadingProductShop } = useAppSelector((state) => state.products);
    const [offsetPage, setOffsetPage] = useState(0);
    const [stateLoadMore, setStateLoadMore] = useState(false);
    const fetchProductsMemoized = useCallback(
        (offsetPage: number) => {
            dispatch(findAllProductShop(offsetPage));
        },
        [dispatch],
    );
    useEffect(() => {
        fetchProductsMemoized(offsetPage);
    }, [fetchProductsMemoized, offsetPage]);
    useEffect(() => {
        if (!isLoadingProductShop) {
            setStateLoadMore(false);
        }
    }, [isLoadingProductShop]);
    const handleClickProduct = (productId: number) => {
        dispatch(deleteDataProductId());
        navigate(`/product/${productId}`);
    };
    const handleClickLoadMore = () => {
        if (products.length >= offsetPage) {
            setStateLoadMore(true);
            setOffsetPage((previous) => previous + 16);
        }
    };

    function renderSkeleton() {
        return (
            <div className={cx('skeleton-container')}>
                <Box className={cx('skeleton')}>
                    {[...Array.from(Array(16))].map((item, index) => {
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
        <div className={cx('information-shop')}>
            <div className={cx('product-main-shop')}>
                {isLoadingProductShop && !stateLoadMore ? (
                    renderSkeleton()
                ) : (
                    <div className={cx('main-shop-list')}>
                        {products.length > 0 &&
                            products.map((product: Product) => {
                                return (
                                    <div
                                        className={cx('shop-list-item')}
                                        key={product.productId}
                                        onClick={() => {
                                            handleClickProduct(product.productId);
                                        }}
                                    >
                                        <div className={cx('list-discount')}>
                                            <span>%20</span>
                                        </div>
                                        <div className={cx('list-img')}>
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <div className={cx('list-information')}>
                                            <div className={cx('information-main')}>
                                                <h2 className={cx('information-title')}>{product.name}</h2>
                                                <div className={cx('information-content')}>
                                                    <div className={cx('information-content-left')}>
                                                        <p className={cx('information-price')}>
                                                            {product.price / 1000.0}.000 vnđ
                                                        </p>
                                                        <div className={cx('information-icon')}>
                                                            <i
                                                                className={cx('fa-solid fa-star', 'icon-color-yellow')}
                                                            ></i>
                                                            <i
                                                                className={cx('fa-solid fa-star', 'icon-color-yellow')}
                                                            ></i>
                                                            <i
                                                                className={cx('fa-solid fa-star', 'icon-color-yellow')}
                                                            ></i>
                                                            <i
                                                                className={cx('fa-solid fa-star', 'icon-color-yellow')}
                                                            ></i>
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
                )}
                {stateLoadMore && <div className={cx('custom-loader')}></div>}
                <div className={cx('load-more')}>
                    <button className={cx('button')} onClick={handleClickLoadMore}>
                        <span>Xem Thêm</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InformationShop;
