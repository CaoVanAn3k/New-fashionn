import classNames from 'classnames/bind';
import styles from './DetailShop.module.scss';
import Slider from 'react-slick';
import MenuLink from '../../../components/Menu/MenuLink';
import { useState, useEffect } from 'react';
import InformationDetailShop from './InformationDetailShop';
import IconEvaluate from '../../../components/IconEvaluate';
import CommentDetailShop from './CommentDetailShop';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { deleteDataProductId, getProductById } from '../../../redux/products/products';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
const cx = classNames.bind(styles);
interface galleryThumbnail {
    id: number;
    image: string;
}
interface colors {
    colorId: number;
    name: string;
    colorCode: string;
}
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
let menuLink = [
    {
        id: 1,
        title: 'BichThuan Store',
        path: '/',
        icon: 'icon',
    },
    {
        id: 2,
        title: 'Shop',
        path: '/shop',
        icon: 'icon',
    },
];

const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 600,
    // autoplay: true,
    // autoplaySpeed: 1000,
    cssEase: 'linear',
};

const informationDetail = [
    {
        id: 1,
        title: 'Tổng quan',
        information: 'KHỞI NGUỒN VẺ ĐẸP THANH LỊCH,HIỆN ĐẠI',
        describe:
            "Từ chối những rập khuôn về thời trang hay tiêu chuẩn đương thời quen thuộc,Oh ' Lady Boutique tái định vị triết lý sáng tạo cùng bộ suil trứ danh với phiên bản đặc biệt mới  mẻ.Trong mạnh mẽ có dịu dàng,nữ tính-trong rắn rỏi có nét rực rỡ,tươi trẻ.",
    },
    {
        id: 2,
        title: 'Chất liệu',
        information: 'KHỞI NGUỒN VẺ ĐẸP THANH LỊCH,HIỆN ĐẠI',
        describe:
            "Từ chối những rập khuôn về thời trang hay tiêu chuẩn đương thời quen thuộc,Oh ' Lady Boutique tái định vị triết lý sáng tạo cùng bộ suil trứ danh với phiên bản đặc biệt mới  mẻ.Trong mạnh mẽ có dịu dàng,nữ tính-trong rắn rỏi có nét rực rỡ,tươi trẻ.",
    },
    {
        id: 3,
        title: 'Chính sách hoàn trả',
        information: 'KHỞI NGUỒN VẺ ĐẸP THANH LỊCH,HIỆN ĐẠI',
        describe:
            "Từ chối những rập khuôn về thời trang hay tiêu chuẩn đương thời quen thuộc,Oh ' Lady Boutique tái định vị triết lý sáng tạo cùng bộ suil trứ danh với phiên bản đặc biệt mới  mẻ.Trong mạnh mẽ có dịu dàng,nữ tính-trong rắn rỏi có nét rực rỡ,tươi trẻ.",
    },
];
const iconEvaluate = [
    {
        id: 1,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 2,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 3,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 4,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 5,
        color: 'yellow',
        quantity: '(10)',
    },
];
const iconEvaluate1 = [
    {
        id: 1,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 2,
        color: 'yellow',
        quantity: '',
    },
    {
        id: 3,
        color: 'fff',
        quantity: '',
    },
    {
        id: 4,
        color: 'fff',
        quantity: '',
    },
    {
        id: 5,
        color: 'fff',
        quantity: '(0)',
    },
];

const commentDetail = [
    {
        id: 1,
        name: 'Nguyen',
        date: '07/08/2023',
        title: 'Tên sản phẩm:Sản phẩm mẫu số 1',
        color: 'Màu sắc:Green',
        size: 'Kích cỡ',
        comment: 'Quần áo có vừa không:Đúng với kích thước',
        evaluate: 'Đánh giá',
        evaluatecmt: 'Sản phẩm đẹp,lên dánh ok,sẽ ủng hộ thêm sau này !!!',
    },
    {
        id: 2,
        name: 'An',
        date: '08/08/2023',
        title: 'Tên sản phẩm:Sản phẩm mẫu số 1',
        color: 'Màu sắc:Green',
        size: 'Kích cỡ',
        comment: 'Quần áo có vừa không:Đúng với kích thước',
        evaluate: 'Đánh giá',
        evaluatecmt: 'Sản phẩm đẹp,lên dánh ok,sẽ ủng hộ thêm sau này !!!',
    },
    {
        id: 3,
        name: 'Huy',
        date: '10/08/2023',
        title: 'Tên sản phẩm:Sản phẩm mẫu số 1',
        color: 'Màu sắc:Green',
        size: 'Kích cỡ',
        comment: 'Quần áo có vừa không:Đúng với kích thước',
        evaluate: 'Đánh giá',
        evaluatecmt: 'Sản phẩm đẹp,lên dánh ok,sẽ ủng hộ thêm sau này !!!',
    },
];
const DetailShop = () => {
    const { id } = useParams<string>();
    const navigate = useNavigate();
    const { productById, isLoadingProductById, productSame } = useAppSelector((state) => state.products);
    const [sizeState, setSizeState] = useState<boolean[]>(
        productById.productId !== undefined && productById.sizeNames.length > 0
            ? productById.sizeNames.map(() => false)
            : [],
    );
    const [isProductAddedToMenuLink, setIsProductAddedToMenuLink] = useState(false);
    const dispatch = useAppDispatch();
    const [sliderDetail, setSliderDetail] = useState(productById.image);
    const handleClickSlider = (children: string) => {
        setSliderDetail(children);
    };
    useEffect(() => {
        if (id) {
            menuLink = menuLink.filter((item) => item.id !== 3);
            dispatch(getProductById(Number(id)));
        }
    }, [dispatch, id]);
    useEffect(() => {
        if (productById.name !== undefined && !isProductAddedToMenuLink) {
            menuLink = menuLink.filter((item) => item.id !== 3);
            menuLink.push({
                id: 3,
                title: `${productById.name}`,
                path: '',
                icon: '',
            });
            setIsProductAddedToMenuLink(true);
        } else {
            setIsProductAddedToMenuLink(false);
        }
    }, [isProductAddedToMenuLink, productById.name]);
    function renderSkeleton() {
        return (
            <div className={cx('skeleton-container')}>
                <Box sx={{ width: '100%' }} className={cx('skeleton-main')}>
                    <Stack>
                        <Skeleton variant="rounded" className={cx('Skeleton-image')} style={{ width: '100%' }} />
                    </Stack>
                </Box>
                <Box className={cx('skeleton-list-image')}>
                    {[...Array.from(Array(6))].map((item, index) => {
                        return (
                            <Box sx={{ width: '100%' }} key={index}>
                                <Stack>
                                    <Skeleton
                                        variant="rounded"
                                        className={cx('Skeleton-image')}
                                        style={{ width: '100%' }}
                                    />
                                </Stack>
                            </Box>
                        );
                    })}
                </Box>
            </div>
        );
    }
    const toggleSizeProduct = (index: number) => {
        const newState = [...sizeState];
        const findIndexSizeState = sizeState.findIndex((state) => state === true);
        if (findIndexSizeState !== -1 && findIndexSizeState !== index) {
            newState[findIndexSizeState] = false;
        }
        newState[index] = !newState[index];
        setSizeState(newState);
    };
    const handleClickProduct = (productId: number) => {
        dispatch(deleteDataProductId());
        navigate(`/product/${productId}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cx('detail-shop')}>
            <div className={cx('detail-shop-main')}>
                <MenuLink children={menuLink} />
                <div className={cx('detail-shop-information')}>
                    <div className={cx('detail-information-left')}>
                        {isLoadingProductById ? (
                            renderSkeleton()
                        ) : (
                            <>
                                <div className={cx('information-left-img')}>
                                    <img
                                        src={sliderDetail ? sliderDetail : productById.image}
                                        alt={`${productById.name}`}
                                    />
                                </div>
                                <div className={cx('information-left-icon')}>
                                    <i className={cx('fa-solid fa-heart')}></i>
                                </div>
                                <div className={cx('information-left-slide')}>
                                    <Slider {...settings}>
                                        {productById.productId !== undefined &&
                                            productById.galleryImages.length > 0 &&
                                            productById.galleryImages.map((item: galleryThumbnail, index: number) => {
                                                return (
                                                    <div className={cx('left-slide-main')} key={index}>
                                                        <div className={cx('slider-main-list')}>
                                                            <div
                                                                className={cx('main-list-img')}
                                                                onClick={() => handleClickSlider(item.image)}
                                                            >
                                                                <img src={item.image} alt="img" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </Slider>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={cx('detail-information-right')}>
                        {isLoadingProductById ? (
                            <div className={cx('custom-loader')}></div>
                        ) : (
                            <>
                                <div className={cx('information-right-main')}>
                                    <h1>{productById.name}</h1>
                                    <div className={cx('information-price')}>
                                        <div className={cx('price-main')}>
                                            <p className={cx('discount')}>500.000 VND</p>
                                            <p className={cx('current')}>{productById.price / 1000.0}.000 VND</p>
                                        </div>
                                    </div>
                                    <p>Giảm giá đến hết ngày 20/12/2023</p>
                                    <div className={cx('information-list')}>
                                        <h3>MÀU SẮC</h3>
                                        <div className={cx('color-list')}>
                                            {productById.productId !== undefined &&
                                                productById.colorNames.length > 0 &&
                                                productById.colorNames.map((item: colors, index: number) => {
                                                    return (
                                                        <div
                                                            style={{ backgroundColor: `${item.colorCode}` }}
                                                            key={index}
                                                        ></div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                    <div className={cx('information-list')}>
                                        <h3>KÍCH CỠ</h3>
                                        <div className={cx('size-list')}>
                                            {productById.productId !== undefined &&
                                                productById.sizeNames.length > 0 &&
                                                productById.sizeNames.map((size: string, index: number) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                toggleSizeProduct(index);
                                                            }}
                                                            className={cx(`${sizeState[index] ? 'active' : ''}`)}
                                                        >
                                                            <p>{size}</p>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                    <div className={cx('information-height')}>
                                        <div className={cx('height-top-list')}>
                                            <p>KÍCH THƯỚC CHIỀU CAO</p>
                                        </div>
                                        <div className={cx('height-bottom-list')}>
                                            <i className={cx('fa-solid fa-ruler-vertical')}></i>
                                            <p>BẢNG KÍCH THƯỚC</p>
                                        </div>
                                    </div>
                                    <div className={cx('information-quantity')}>
                                        <div className={cx('quantity-top-list')}>
                                            <p>SỐ LƯỢNG</p>
                                            <span>Còn {productById.quantity} bộ</span>
                                        </div>
                                        <div className={cx('quantity-bottom-list')}>
                                            <select>
                                                {[...Array.from(Array(productById.quantity))].map((item, index) => {
                                                    return <option key={index}>{index + 1}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={cx('button-control')}>
                                        <button className={cx('button-cart')}>Thêm Vào Giỏ Hàng</button>
                                        <button className={cx('button-payment')}>MUA NGAY</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <InformationDetailShop children={informationDetail} />
                <div className={cx('detail-shop-evaluate')}>
                    <div className={cx('shop-evaluate-main')}>
                        <div className={cx('evaluate-main-title')}>
                            <h1>ĐÁNH GIÁ</h1>
                            <IconEvaluate children={iconEvaluate} />
                        </div>
                        <div className={cx('evaluate-main-title')}>
                            <h3>ĐÁNH GIÁ CỦA KHÁCH HÀNG</h3>
                        </div>
                        <div className={cx('evaluate-main-icon')}>
                            <IconEvaluate children={iconEvaluate} />
                            <IconEvaluate children={iconEvaluate} />
                            <IconEvaluate children={iconEvaluate} />
                            <IconEvaluate children={iconEvaluate1} />
                            <IconEvaluate children={iconEvaluate1} />
                        </div>
                        <div className={cx('evaluate-main-item')}>
                            <p>10 bài đáng giá</p>
                        </div>
                        <CommentDetailShop children={commentDetail} />
                        <button className={cx('evaluate-main-button')}>XEM THÊM</button>
                    </div>
                </div>
                <div className={cx('detail-shop-watched')}>
                    <div className={cx('shop-watched-title')}>
                        <h2>SẢN PHẨM TƯƠNG TỰ</h2>
                    </div>
                    <div className={cx('shop-watched-products')}>
                        {productSame.map((product: Product) => {
                            return (
                                <div
                                    className={cx('shop-watched-product-item')}
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
                                            <h2 className={cx('information-title')}>{product.name}</h2>
                                            <div className={cx('bottom')}>
                                                <div className={cx('content-left')}>
                                                    <p className={cx('information-price')}>
                                                        {product.price / 1000.0}.000 vnđ
                                                    </p>
                                                    <div className={cx('information-icon')}>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color')}></i>
                                                    </div>
                                                </div>
                                                <div className={cx('content-right')}>
                                                    <div className={cx('information-button')}>
                                                        <button className={cx('information-button-main')}>
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
            <div className={cx('detail-shop-border')}></div>
        </div>
    );
};

export default DetailShop;
