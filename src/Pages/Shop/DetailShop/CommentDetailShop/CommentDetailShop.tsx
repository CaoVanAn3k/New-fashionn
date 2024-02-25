import classNames from 'classnames/bind';
import styles from './CommentDetailShop.module.scss';
import Rating from '@mui/material/Rating';
const cx = classNames.bind(styles);
interface ResponseFeedbackProduct {
    commentId: number;
    productId: number;
    nameProduct: string;
    color: string;
    size: string;
    rating: number;
    descriptionProductQuality: string;
    descriptionFeature: string;
    userName: string;
    active: boolean;
    createdAt: string | undefined;
}
interface CommentDetailChildren {
    children: ResponseFeedbackProduct[];
}
const CommentDetailShop: React.FC<CommentDetailChildren> = ({ children }) => {
    return (
        <div>
            {children.length > 0 &&
                children.map((child, index) => {
                    const date = child.createdAt ? new Date(child.createdAt) : null;
                    return (
                        <div className={cx('evaluate-main-comment')} key={index}>
                            <div className={cx('comment-body')}>
                                <div className={cx('comment-body-title')}>
                                    <div className={cx('title-left')}>
                                        <p>{child.userName}</p>
                                        <p>* * * * *</p>
                                    </div>
                                    <div className={cx('title-right')}>
                                        {date !== null && date.toISOString().split('T')[0]}
                                    </div>
                                </div>
                                <Rating
                                    name="read-only"
                                    value={child.rating}
                                    readOnly
                                    precision={0.5}
                                    sx={{ display: 'flex', fontSize: '2.5rem', color: '#f0e713' }}
                                />
                                <div className={cx('comment-body-information')}>
                                    <div className={cx('comment-information-list')}>
                                        <div className={cx('information-list-title')}>
                                            <h3>Sản phẩm: {child.nameProduct}</h3>
                                            <p>Màu sắc: {child.color}</p>
                                            <p>Kích cỡ: {child.size}</p>
                                            <p>Đánh giá chất lượng: {child.descriptionProductQuality}</p>
                                        </div>
                                        <div className={cx('information-list-item')}>
                                            <p>Đánh giá</p>
                                            <p>{child.descriptionFeature}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default CommentDetailShop;
