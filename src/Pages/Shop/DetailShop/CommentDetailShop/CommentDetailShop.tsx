import classNames from 'classnames/bind';
import styles from './CommentDetailShop.module.scss';
import IconEvaluate from '../../../../components/IconEvaluate';
const cx = classNames.bind(styles);
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
        quantity: '',
    },
];
interface CommentDetail {
    id: number;
    name: string;
    date: string;
    title: string;
    color: string;
    size: string;
    comment: string;
    evaluate: string;
    evaluatecmt: string;
}
interface CommentDetailChildren {
    children: CommentDetail[];
}
const CommentDetailShop: React.FC<CommentDetailChildren> = ({ children }) => {
    return (
        <div>
            {children.map((child, index) => {
                return (
                    <div className={cx('evaluate-main-comment')} key={index}>
                        <div className={cx('comment-body')}>
                            <div className={cx('comment-body-title')}>
                                <div className={cx('title-left')}>
                                    <p>{child.name}</p>
                                    <p>* * * * *</p>
                                </div>
                                <div className={cx('title-right')}>
                                    <p>{child.date}</p>
                                </div>
                            </div>
                            <IconEvaluate children={iconEvaluate} />
                            <div className={cx('comment-body-information')}>
                                <div className={cx('comment-information-list')}>
                                    <div className={cx('information-list-title')}>
                                        <h3>{child.title}</h3>
                                        <p>{child.color}</p>
                                        <p>{child.size}</p>
                                        <p>{child.comment}</p>
                                    </div>
                                    <div className={cx('information-list-item')}>
                                        <p>{child.evaluate}</p>
                                        <p>{child.evaluatecmt}</p>
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
