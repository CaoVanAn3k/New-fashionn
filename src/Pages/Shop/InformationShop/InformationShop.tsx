import classNames from 'classnames/bind';
import styles from './InformationShop.module.scss';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
    deleteDataProductId,
    findAllProductShop,
    findAllProductShopBySortPrice,
    findAllProductByCategoryName,
    updateStateOffset,
} from '../../../redux/products/products';
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
interface PropsData {
    children: Product[];
}
const InformationShop: React.FC<PropsData> = ({ children }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoadingProductShop, isLoadingProductCategory, sortName, categoryName, offsetState } = useAppSelector(
        (state) => state.products,
    );
    const [stateLoadMore, setStateLoadMore] = useState(false);
    const fetchProductsMemoized = useCallback(
        (offsetPage: number) => {
            if (sortName !== '') {
                if (offsetPage >= children.length) {
                    const data = {
                        sortName: sortName,
                        offset: offsetPage,
                    };
                    dispatch(findAllProductShopBySortPrice(data));
                }
            } else if (categoryName !== '') {
                const data = {
                    categoryName: categoryName,
                    offset: offsetPage,
                };
                dispatch(findAllProductByCategoryName(data));
            } else {
                dispatch(findAllProductShop(offsetPage));
            }
        },
        [categoryName, children.length, dispatch, sortName],
    );
    useEffect(() => {
        if (offsetState !== 0) {
            fetchProductsMemoized(offsetState);
        }
    }, [fetchProductsMemoized, offsetState]);
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
        if (children.length >= offsetState) {
            setStateLoadMore(true);
            dispatch(updateStateOffset());
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
                {isLoadingProductCategory && <div className={cx('custom-loader')}></div>}
                {isLoadingProductShop && !stateLoadMore ? (
                    renderSkeleton()
                ) : (
                    <div className={cx('main-shop-list')}>
                        {children.length > 0 &&
                            children.map((product: Product) => {
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
