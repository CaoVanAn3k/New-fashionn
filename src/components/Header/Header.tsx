import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../Images';
import { Link, useNavigate } from 'react-router-dom';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import { styled as stylist } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { logout, checkStateLogin, clearStateWhenLogout } from '../../redux/Authentication/Authentication';
import { clearSearching } from '../../redux/products/products';
import { upStatusSearch } from '../../redux/products/products';
import { clearState, getAllProductInCart } from '../../redux/Cart/cart';
import { Link as ScrollLink } from 'react-scroll';
import waiting from '../../util/waiting';
import Badge from '@mui/material/Badge';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import MenuHeader from './MenuHeader';
import SearchHeader from './SearchHeader';
const cx = classNames.bind(styles);
const BootstrapTooltip = stylist(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

interface HeaderProps {
    isChangeBackgroundHeader: boolean;
}
const ULLeft = styled.ul<{ $isChangeBackgroundHeader: boolean }>`
    & > li > a {
        color: ${(props) => (props.$isChangeBackgroundHeader ? '#7b2636' : '#ffffff')};
    }
    & > li {
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 4px;
            border-radius: 4px;
            background-color: ${(props) => (props.$isChangeBackgroundHeader ? '#742433' : '#ffffff')};
            bottom: -10px;
            left: 0;
            transform-origin: right;
            transform: scaleX(0);
            transition: transform 0.3s ease-in-out;
        }
        &:hover::before {
            transform-origin: left;
            transform: scaleX(1);
        }
    }
`;
const ULRight = styled.ul<{ $isChangeBackgroundHeader: boolean }>`
    & > li > svg,
    & > li > span {
        color: ${(props) => (props.$isChangeBackgroundHeader ? '#7b2636' : '#ffffff')};
    }
    & > li > span > span {
        background-color: ${(props) =>
            props.$isChangeBackgroundHeader ? 'var(--back-ground-red)' : 'var(--back-ground-fff)'};
        color: ${(props) => (props.$isChangeBackgroundHeader ? '#ffffff' : '#7b2636')};
    }
    & > li {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: ${(props) =>
                props.$isChangeBackgroundHeader ? 'var(--back-ground-red)' : 'var(--back-ground-fff)'};
            transition: 0.5s;
            transform: scale(0.9);
            z-index: -1;
        }
        &:hover::before {
            transform: scale(1.1);
            box-shadow: 0 0 15px
                ${(props) => (props.$isChangeBackgroundHeader ? 'var(--back-ground-red)' : 'var(--back-ground-fff)')};
        }
        &:hover {
            color: ${(props) => (props.$isChangeBackgroundHeader ? 'var(--color-red)' : 'var(--color-fff1)')};
            box-shadow: 0 0 5px
                ${(props) => (props.$isChangeBackgroundHeader ? 'var(--back-ground-red)' : 'var(--back-ground-fff)')};
            text-shadow: 0 0 5px
                ${(props) => (props.$isChangeBackgroundHeader ? 'var(--back-ground-red)' : 'var(--back-ground-fff)')};
        }
    }
`;
const ULDropDown = styled.ul<{ $isChangeBackgroundHeader: boolean }>`
    background-color: ${(props) =>
        props.$isChangeBackgroundHeader ? 'var(--back-ground-red)' : 'var(--back-ground-fff)'};
    color: ${(props) => (props.$isChangeBackgroundHeader ? 'var(--color-fff1)' : 'var(--color-red)')};
    & > li:hover {
        background-color: ${(props) => (props.$isChangeBackgroundHeader ? '#ffffff30' : '#cccccce9')};
    }
`;

const Header = ({ isChangeBackgroundHeader }: HeaderProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [activeMenu, setActiveMenu] = useState(false);
    const [colorBlack, setColorBlack] = useState(false);

    const { isLogined, userName } = useAppSelector((state) => state.users);
    const { productCarts } = useAppSelector((state) => state.carts);
    const [resultSearching, setResultSearching] = useState(false);
    const handleClickCart = () => {
        navigate('/cart');
        setActiveMenu(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isLogined) {
                    await dispatch(checkStateLogin());
                }
                if (isLogined) {
                    await dispatch(getAllProductInCart());
                }
            } catch (error) {
                console.error('Error in fetchData:', error);
            }
        };
        fetchData();
    }, [dispatch, isLogined]);
    const handleClickPerson = () => {
        const accessToken: string | undefined = Cookies.get('accessToken');
        if (accessToken !== undefined && accessToken.length > 0 && userName === '') {
            dispatch(checkStateLogin());
        }
        
        setActiveMenu(!activeMenu);
    };
    const handleClickLogin = () => {
        navigate('/login');
    };
    const handleClickRegister = () => {
        navigate('/register');
    };
    const handleClickLogout = async () => {
        const accessToken: string | undefined = Cookies.get('accessToken');
        if (accessToken !== undefined && accessToken.length > 0) {
            await dispatch(logout());
            Promise.all([dispatch(clearState()), dispatch(clearStateWhenLogout())]);
            await waiting(1000);
            navigate('/login');
        }
    };
    const handleClickOrderHistory = () => {
        navigate('/order-history');
    };
    const [searchClick, setSearchClick] = useState(false);

    const handleSearchOn = () => {
        dispatch(clearSearching());
        setSearchClick(true);
        setColorBlack(true);
        dispatch(upStatusSearch(true));
        setActiveMenu(false);
    };
<<<<<<< HEAD

=======
    const handleSearchOff = () => {
        setSearchClick(false);
        dispatch(clearSearching());
    };
    const handleChangeInput = (e: any) => {
        if (e.target.value !== '') {
            const hasSpecialCharacters = /[!@#$%^&*()?":{}|<>]/.test(e.target.value);
            if (!hasSpecialCharacters) {
                setResultSearching(true);
                dispatch(findProductBySearching(e.target.value));
            } else {
                setResultSearching(true);
                dispatch(clearSearching());
            }
        } else {
            setResultSearching(false);
            dispatch(clearSearching());
        }
    };
    const handleClickProductName = (productId: number) => {
        setSearchClick(false);
        dispatch(clearSearching());
        navigate(`/product/${productId}`);
    };
>>>>>>> 3e0f9900ea71c3fecc720228c8d2ed358d1e0d64
    const handleQuantityCart = () => {
        return (
            productCarts.length > 0 &&
            productCarts.reduce((sum: number) => {
                return sum + 1;
            }, 0)
        );
    };
    const handleSearchOff = () => {
        setSearchClick(false);
        setColorBlack(false);
        dispatch(clearSearching());
    };

    const handleCloseBlack = () => {
        setColorBlack(false);
        setSearchClick(false);
        dispatch(upStatusSearch(false));
    };

    return (
        <div className={cx('header')}>
            <div className={cx('header-main')}>
                <div className={cx('header-main-left')}>
                    <Link to="/" className={cx('main-left-body')}>
                        <div className={cx('main-left-logo')}>
                            <img src={images.logo} alt={images.logo} />
                        </div>
                        <div className={cx('main-left-title')}>
                            <h3>Bich Thuan Stote</h3>
                        </div>
                    </Link>
                </div>
                <div className={cx('menu-drawer')}>
                    <MenuHeader handleSearchOn={handleSearchOn} />
                </div>
                <div
                    className={cx('header-main-right')}
                    style={{ backgroundColor: `${isChangeBackgroundHeader ? '#ffffff' : '#742433'}` }}
                >
                    <div className={cx('main-right-body')}>
                        <ULLeft className={cx('main-right-list')} $isChangeBackgroundHeader={isChangeBackgroundHeader}>
                            <li>
                                <Link to="/" onClick={() => setActiveMenu(false)}>
                                    Trang Chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop" onClick={() => setActiveMenu(false)}>
                                    Cửa Hàng
                                </Link>
                            </li>
                            <li>
                                <ScrollLink
                                    onClick={() => {
                                        navigate('/');
                                        setActiveMenu(false);
                                    }}
                                    to={`${isChangeBackgroundHeader ? '' : 'information-shop'}`}
                                    smooth={true}
                                    duration={1000}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Thông Tin
                                </ScrollLink>
                            </li>
                        </ULLeft>
                        <ULRight className={cx('main-right-icon')} $isChangeBackgroundHeader={isChangeBackgroundHeader}>
                            <li
                                onClick={() => {
                                    handleSearchOn();
                                }}
                            >
                                <SearchIcon />
                            </li>
                            <li className={cx('right-cart')}>
                                <BootstrapTooltip
                                    title={`Cart ${productCarts.length > 0 ? handleQuantityCart() : 0} items`}
                                    placement="bottom-start"
                                    onClick={() => handleClickCart()}
                                >
                                    <Badge
                                        color="secondary"
                                        badgeContent={productCarts.length > 0 && handleQuantityCart()}
                                        className={cx('custom-badge')}
                                        invisible={productCarts.length === 0 ? true : false}
                                    >
                                        <LocalMallOutlinedIcon />
                                    </Badge>
                                </BootstrapTooltip>
                            </li>
                            <li className={cx('right-person', 'dropdown')} onClick={() => handleClickPerson()}>
                                <PersonIcon />
                                {activeMenu && (
                                    <ULDropDown
                                        className={cx('dropdown-menu')}
                                        $isChangeBackgroundHeader={isChangeBackgroundHeader}
                                    >
                                        {isLogined ? (
                                            <>
                                                <li>
                                                    <AccountBoxIcon />
                                                    <span>chào {userName}</span>
                                                </li>
                                                <li onClick={handleClickOrderHistory}>
                                                    <span>Lịch sử mua hàng</span>
                                                </li>
                                                <li onClick={handleClickLogout}>
                                                    <LogoutIcon />
                                                    <span>Đăng xuất</span>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li onClick={() => handleClickLogin()}>
                                                    <LoginIcon />
                                                    <span>đăng nhập</span>
                                                </li>
                                                <li onClick={() => handleClickRegister()}>
                                                    <PersonAddAlt1Icon />
                                                    <span>đăng kí</span>
                                                </li>
                                            </>
                                        )}
                                    </ULDropDown>
                                )}
                            </li>
                        </ULRight>
                    </div>
                </div>
            </div>
            {searchClick && (
                <div className={cx('header-main-search')}>
<<<<<<< HEAD
                    <SearchHeader handleSearchOffMenu={handleSearchOff} />
=======
                    <div className={cx('head-search-main')}>
                        <div className={cx('head-search-left')}>
                            <div className={cx('search-left')}>
                                <img src={logo} alt="logo" />
                            </div>
                            <div className={cx('search-input')}>
                                <div className={cx('search-input-main')}>
                                    <div className={cx('search-input-top')}>
                                        <i className={cx('fa-solid fa-magnifying-glass')}></i>
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm"
                                            onChange={(e) => handleChangeInput(e)}
                                        />
                                    </div>
                                    {isSearching ? (
                                        <div className={cx('custom-loader')}></div>
                                    ) : (
                                        <>
                                            {productSearches.length > 0 ? (
                                                <div className={cx('search-result')}>
                                                    <p>Kết quả tìm kiếm</p>
                                                    <ul>
                                                        {productSearches.map((product: Product) => {
                                                            return (
                                                                <li
                                                                    key={product.productId}
                                                                    onClick={() =>
                                                                        handleClickProductName(product.productId)
                                                                    }
                                                                >
                                                                    {product.name}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <>
                                                    {resultSearching ? (
                                                        <div className={cx('search-result')}>
                                                            <p>Không tìm thấy sản phẩm</p>
                                                        </div>
                                                    ) : (
                                                        <div className={cx('search-result')}>
                                                            <p>Cụm từ tìm kiếm phổ biến</p>
                                                            <ul>
                                                                <li>JUMSUIT Liền thân</li>
                                                                <li>Đầm ngắn</li>
                                                                <li>Đầm dài</li>
                                                                <li>Set bộ rời</li>
                                                                <li>Vest</li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={cx('search-right')} onClick={handleSearchOff}>
                                <p>Tắt tìm kiếm</p>
                            </div>
                        </div>
                    </div>
>>>>>>> 3e0f9900ea71c3fecc720228c8d2ed358d1e0d64
                </div>
            )}
            {colorBlack && <div className={cx('menu-black')} onClick={handleCloseBlack}></div>}
        </div>
    );
};

export default Header;
