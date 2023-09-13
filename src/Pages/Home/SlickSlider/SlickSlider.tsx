import classNames from 'classnames/bind';
import style from './SlickSlider.module.scss';
import { useEffect, useState } from 'react';

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
    const [changeImage, setChangeImage] = useState(children);
    useEffect(() => {
        const updateGallery = () => {
            if (changeImage.length > 0) {
                const tmp = changeImage.shift();
                if (tmp !== undefined) {
                    setChangeImage((previousChange) => [...previousChange, tmp]);
                }
            }
        };
        const interval = setInterval(() => {
            // updateGallery();
        }, 3000);
        return () => clearInterval(interval);
    }, [changeImage, children.length]);
    return (
        <div className={cx('page-slide-slick')}>
            {changeImage.map((child, index) => {
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
