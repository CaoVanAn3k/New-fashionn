import classNames from 'classnames/bind';
import styles from './SearchHeader.module.scss';
import logo from '../../Images/Product/logo.svg';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { findProductBySearching, clearSearching, upStatusSearch } from '../../../redux/products/products';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
const cx = classNames.bind(styles);
interface Children {
    handleSearchOffMenu: () => void;
}
const SearchHeader: React.FC<Children> = ({ handleSearchOffMenu }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);
    interface Product {
        productId: number;

        name: string;
    }

    const { isSearching, productSearches, statusSearch } = useAppSelector((state) => state.products);
    const handleChangeInput = (e: any) => {
        if (e.target.value !== '') {
            dispatch(findProductBySearching(e.target.value));
        } else {
            dispatch(clearSearching());
        }
    };
    const handleClickProductName = (productId: number) => {
        handleSearchOffMenu();
        dispatch(clearSearching());
        navigate(`/product/${productId}`);
    };

    const handleOffSearch = () => {
        handleSearchOffMenu();
        dispatch(upStatusSearch(false));
    };

    useEffect(() => {
        const hanleForcusInput = () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        };
        hanleForcusInput();
    }, []);
    return (
        <div>
            {statusSearch && (
                <div className={cx('header-main-search')}>
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
                                            ref={inputRef}
                                            placeholder="Tìm kiếm"
                                            onChange={(e) => handleChangeInput(e)}
                                        />
                                    </div>
                                    {isSearching ? (
                                        <div className={cx('custom-loader')}></div>
                                    ) : (
                                        <>
                                            {productSearches.length > 0 ? (
                                                <>
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
                                                </>
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
                                </div>
                            </div>
                            <div className={cx('search-right')} onClick={handleOffSearch}>
                                <p>Tắt tìm kiếm</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default SearchHeader;
