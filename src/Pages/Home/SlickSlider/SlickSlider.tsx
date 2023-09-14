import classNames from 'classnames/bind';
import style from './SlickSlider.module.scss';

const cx = classNames.bind(style);
interface arrSlider {
    id: number;
    img: string;
    backgroundColor: string;
}
interface ChildrenSlider {
    children: arrSlider[];
}
const SlickSlider: React.FC<ChildrenSlider> = ({ children }) => {
    return (
        <div className={cx('page-slide-slick')}>
            {children.map((child, index) => {
                return (
                    <div key={child.id} className={cx('slide-slick-img', `slide-${index + 1}`)} tabIndex={index + 1}>
                        <img
                            src={child.img}
                            alt={child.img}
                            style={{
                                backgroundColor: `${child.backgroundColor}`,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default SlickSlider;
