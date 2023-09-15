import classNames from 'classnames/bind';
import styles from './CommentProduct.module.scss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);
interface CommentShop {
    idd: number;
    logoShop: string;
    titleShop: string;
    commentShop: string;
}
interface CommentProducts {
    id: number;
    imgClient: string;
    titleClient: string;
    commentClient: string;
    like: string;
    commentShops: CommentShop[];
}
interface ChildrenPropComment {
    children: CommentProducts[];
}
const array = [1, 2, 3, 4, 5];
const CommentProduct: React.FC<ChildrenPropComment> = ({ children }) => {
    const [activePage, setActivePage] = useState(1);
    // const [showPage, setShowPage] = useState(3);
    const showPage = useRef(3);
    const visiblePages = array.slice(activePage - 1, activePage - 1 + showPage.current);
    const handleNextClick = () => {
        if (activePage < array.length) {
            setActivePage(activePage + 1);
        }
    };
    const handlePreviousClick = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
        }
    };
    return (
        <div className={cx('comment-product')}>
            <div className={cx('comment-product-main')}>
                <div className={cx('comment-head')}>
                    <div className={cx('head-product-left')}>
                        <p>100 Bình luận</p>
                    </div>
                    <div className={cx('head-product-right')}>
                        <div className={cx('product-right-sort')}>
                            <p>Sắp xếp theo</p>
                        </div>
                        <select className={cx('product-right-list')}>
                            <option>Hàng đầu</option>
                            <option>Nhiều lượt thích</option>
                        </select>
                    </div>
                </div>
                <div className={cx('comment-body')}>
                    <div className={cx('comment-body-left')}>
                        {/* <div className={cx('comment-left-write')}>
                            <div className={cx('left-logo')}>
                                <img src={images} alt="logo" />
                            </div>
                            <div className={cx('left-input')}>
                                <input placeholder="Viết bình luận" />
                            </div>
                        </div> */}
                    </div>

                    <div className={cx('comment-body-right')}>
                        {children.map((child) => {
                            return (
                                <div className={cx('comment-right-list')} key={child.id}>
                                    <div className={cx('comment-right-client')}>
                                        <div className={cx('client-right-list')}>
                                            <div className={cx('client-list-logo')}>
                                                <img src={child.imgClient} alt={child.titleClient} />
                                            </div>
                                            <div className={cx('client-list-information')}>
                                                <div className={cx('client-information-main')}>
                                                    <div className={cx('information-name')}>
                                                        <h4>{child.titleClient}</h4>
                                                    </div>
                                                    <div className={cx('information-comment')}>
                                                        <p>{child.commentClient}</p>
                                                    </div>
                                                    <div className={cx('information-icon')}>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>
                                                        <i className={cx('fa-solid fa-star', 'icon-color')}></i>
                                                    </div>
                                                    <div className={cx('information-feedback')}>
                                                        <div className={cx('feedback-left')}>
                                                            <p>Thích</p>
                                                            <p>-</p>
                                                            <p>Phản hồi</p>
                                                        </div>
                                                        <div className={cx('feedback-between')}>
                                                            <i className={cx('fa-solid fa-heart')}></i>
                                                            <p>25</p>
                                                        </div>
                                                        <div className={cx('feedback-right')}>
                                                            <p>15 giờ trước</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {child.commentShops.map((shop) => {
                                        return (
                                            <div className={cx('comment-right-shop')} key={shop.idd}>
                                                <div className={cx('comment-shop-list')}>
                                                    <div className={cx('shop-right-list')}>
                                                        <div className={cx('shop-list-logo')}>
                                                            <img src={shop.logoShop} alt="logoshop" />
                                                        </div>
                                                        <div className={cx('shop-list-information')}>
                                                            <div className={cx('shop-information-client')}>
                                                                <div className={cx('information-name')}>
                                                                    <h4>{shop.titleShop}</h4>
                                                                </div>
                                                                <div className={cx('information-comment')}>
                                                                    <p>{shop.commentShop}</p>
                                                                </div>
                                                                <div className={cx('information-feedback-shop')}>
                                                                    <div className={cx('feedback-left')}>
                                                                        <p>Phản hồi</p>
                                                                        <p>-</p>
                                                                        <p>12 giờ trước</p>
                                                                    </div>
                                                                </div>
                                                                <div className={cx('information-border')}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('comment-paging')}>
                    <div className={cx('paging')}>
                        {activePage > 1 && (
                            <>
                                <span className={cx('dot')}>...</span>
                            </>
                        )}
                        {visiblePages.map((item, index) => {
                            return (
                                <span
                                    className={cx(item === activePage ? 'active' : '')}
                                    key={index + 1}
                                    onClick={() => {
                                        setActivePage(item);
                                    }}
                                >
                                    {item}
                                </span>
                            );
                        })}
                        {activePage + 2 < array.length && (
                            <>
                                <span className={cx('dot')}>...</span>
                            </>
                        )}
                    </div>
                    <div className={cx('button-control')}>
                        <div
                            className={cx('button-previous')}
                            onClick={() => {
                                handlePreviousClick();
                            }}
                        >
                            <NavigateBeforeIcon />
                        </div>
                        <div
                            className={cx('button-next')}
                            onClick={() => {
                                handleNextClick();
                            }}
                        >
                            <NavigateNextIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CommentProduct;
