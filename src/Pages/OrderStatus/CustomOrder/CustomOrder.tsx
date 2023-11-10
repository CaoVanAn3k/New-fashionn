import classNames from 'classnames/bind';
import styles from './CustomOrder.module.scss';
const cx = classNames.bind(styles);
interface PopStatus {
    children: {
        id: number;
        discount: string;
        img: string;
        title: string;
        code: string;
        color: string;
        size: string;
        price: string;
        total: string;
    }[];
    isCheck: string;
}

const CustomOrder: React.FC<PopStatus> = ({ children, isCheck }) => {
    return (
        <div>
            {children.map((list, index) => {
                return (
                    <div className={cx('favourite-information-main')} key={index}>
                        <div className={cx('favourite-information-list')}>
                            <div className={cx('favourite-list-left')}>
                                <div className={cx('list-item-logo')}>
                                    <div className={cx('left-discount')}>{list.discount}</div>
                                    <div className={cx('left-img')}>
                                        <img src={list.img} alt="logo" />
                                    </div>
                                    <div className={cx('left-icon')}>
                                        <i className={cx('fa-solid fa-heart')}></i>
                                    </div>
                                </div>
                                <div className={cx('list-item-data')}>
                                    <h3>{list.title}</h3>
                                    <div className={cx('list-data-information')}>
                                        <p>Mã sản phẩm:{list.code}</p>
                                        <p>Màu sắc:{list.color}</p>
                                        <p>Kích cỡ:{list.size}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('favourite-list-item')}>
                                <div
                                    className={cx('favourite-item-left', 'fa-button', 'fa-check')}
                                    style={{ display: isCheck === '2' ? 'none' : 'block' }}
                                >
                                    <button>Liên hệ người bán</button>
                                </div>

                                <div className={cx('favourite-item-right')}>
                                    <div className={cx('list-data-price')}>
                                        <p>{list.price}</p>
                                        <h4>{list.total}</h4>
                                    </div>
                                    <div
                                        className={cx('favourite-item-button', 'fa-button')}
                                        style={{
                                            backgroundColor: isCheck === '0' ? 'red' : '#A7A6A6',
                                            display: isCheck === '2' ? 'none' : 'block',
                                        }}
                                    >
                                        <button>Huỷ đơn</button>
                                    </div>
                                    <div
                                        className={cx('favourite-item-check', 'fa-button', 'fa-check')}
                                        style={{ display: isCheck === '2' ? 'block' : 'none' }}
                                    >
                                        <button>Góp ý đơn hàng</button>
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

export default CustomOrder;
