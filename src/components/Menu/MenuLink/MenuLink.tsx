import classNames from 'classnames/bind';
import styles from './MenuLink.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { findAllProductShop } from '../../../redux/products/products';
const cx = classNames.bind(styles);

interface MenuLinkProps {
    id: number;
    title: string;
    path: string;
    icon: string;
}
interface MenuLinkChildren {
    children: MenuLinkProps[];
}
const MenuLink: React.FC<MenuLinkChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const handleClick = (path: string) => {
        if (path === '/shop') {
            dispatch(findAllProductShop(0));
        }
    };
    return (
        <div className={cx('detail-link')}>
            {children.map((child, index) => {
                return (
                    <Link
                        to={child.path}
                        className={cx('detail-link-main')}
                        key={index}
                        onClick={() => handleClick(child.path)}
                    >
                        <h3>{child.title}</h3>
                        {child.icon === 'icon' && <i className={cx('fa-solid fa-chevron-right')}></i>}
                    </Link>
                );
            })}
        </div>
    );
};

export default MenuLink;
