import classNames from 'classnames/bind';
import images from '../../Images/Product/Blue.png';
import styles from './CommentProduct.module.scss';

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

const CommentProduct: React.FC<ChildrenPropComment> = ({ children }) => {
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
                        <div className={cx('comment-left-write')}>
                            <div className={cx('left-logo')}>
                                <img src={images} alt="logo" />
                            </div>
                            <div className={cx('left-input')}>
                                <input placeholder="Viết bình luận" />
                            </div>
                        </div>
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

                        {/* button  */}
                        {/* <div className={cx('comment-right-next')}>
                            <div className={cx('right-next-page')}>
                                <div className={cx('next-page-button')}>
                                    <div className={cx('button-left')}>
                                        <i className={cx('fa-solid fa-chevron-left')}></i>
                                    </div>
                                    <div className={cx('button-list')}>
                                        <button>1</button>
                                        <button>2</button>
                                        <button>3</button>
                                    </div>
                                    <div className={cx('button-left')}>
                                        <i className={cx('fa-solid fa-chevron-right')}></i>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CommentProduct;
