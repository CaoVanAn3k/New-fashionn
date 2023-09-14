import classNames from 'classnames/bind';
import styles from './IconEvaluate.module.scss';
const cx = classNames.bind(styles);

interface IconEvaluateProp {
    id: number;
    color: string;
    quantity: string;
}
interface IconEvaluateChildren {
    children: IconEvaluateProp[];
}
const IconEvaluate: React.FC<IconEvaluateChildren> = ({ children }) => {
    return (
        <div className={cx('information-icon')}>
            {children.map((icon, index) => {
                return (
                    <div className={cx('icon-main')} key={index}>
                        {icon.color === 'yellow' && <i className={cx('fa-solid fa-star', 'icon-color-yellow')}></i>}
                        {icon.color === 'fff' && <i className={cx('fa-solid fa-star', 'icon-color')}></i>}
                        {icon.quantity !== '' && <p>{icon.quantity}</p>}
                    </div>
                );
            })}
        </div>
    );
};

export default IconEvaluate;
