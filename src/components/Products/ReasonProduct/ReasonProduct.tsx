import classNames from 'classnames/bind';
import images from '../../Images/Product/Red.png';

import styles from './ReasonProduct.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

interface Reason {
    id: number;
    title: string;
    describe: string;
}
interface ReasonChildren {
    children: Reason[];
}
const ReasonProduct: React.FC<ReasonChildren> = ({ children }) => {
    const [informationStates, setInformationStates] = useState<boolean[]>(children.map(() => false));
    const toggleInformation = (index: number) => {
        const newStates = [...informationStates];
        newStates[index] = !newStates[index];
        setInformationStates(newStates);
    };
    return (
        <div className={cx('reason-product')}>
            <div className={cx('reason-product-main')}>
                <div className={cx('header-reason-product')}>
                    <h1>VÌ SAO BẠN NÊN CHỌN SẢN PHẨM CỦA CHÚNG TÔI ?</h1>
                </div>
                <div className={cx('body-reason-product')}>
                    <div className={cx('body-product-list')}>
                        <div className={cx('product-list-left')}>
                            <div className={cx('list-left-icon')}>
                                <i className={cx('fa-sharp fa-solid fa-star-of-life', 'icon')}></i>
                            </div>

                            {children.map((child, index) => {
                                return (
                                    <div className={cx('list-left-main')} key={child.id}>
                                        <div className={cx('product-left-title')}>
                                            <h3>{child.title}</h3>
                                        </div>
                                        <div className={cx('product-left-information')}>
                                            {informationStates[index] && (
                                                <div className={cx('left-information-list')}>
                                                    <p>{child.describe}</p>
                                                </div>
                                            )}
                                            <div className={cx('left-button-list')}>
                                                <button onClick={() => toggleInformation(index)}>
                                                    {informationStates[index] ? (
                                                        <i className={cx('fa-solid fa-caret-up')}></i>
                                                    ) : (
                                                        <i className={cx('fa-solid fa-caret-down')}></i>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('product-list-right')}>
                            <div className={cx('list-right-img')}>
                                <img src={images} alt="logo" />
                            </div>
                        </div>
                        <div className={cx('page-slide-table')}>
                            <table className={cx('product-table-body')}>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReasonProduct;
