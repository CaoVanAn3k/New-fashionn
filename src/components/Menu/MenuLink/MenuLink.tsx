import classNames from 'classnames/bind';
import styles from './MenuLink.module.scss';
import { Link } from 'react-router-dom';

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
    return (
        <div className={cx('detail-link')}>
            {children.map((child, index) => {
                return (
                    <Link to={child.path} className={cx('detail-link-main')} key={index}>
                        <h3>{child.title}</h3>
                        {child.icon === 'icon' && <i className={cx('fa-solid fa-chevron-right')}></i>}
                    </Link>
                );
            })}
        </div>
    );
};

export default MenuLink;
