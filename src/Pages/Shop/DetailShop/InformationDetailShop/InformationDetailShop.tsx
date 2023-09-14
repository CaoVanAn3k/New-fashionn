import classNames from 'classnames/bind';
import styles from './InformationDetailShop.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
interface InformationDetail {
    id: number;
    title: string;
    information: string;
    describe: string;
}
interface DetailChildren {
    children: InformationDetail[];
}
const InformationDetailShop: React.FC<DetailChildren> = ({ children }) => {
    const [informationDetail, setInformationDetail] = useState<boolean[]>(children.map(() => false));
    const handleDetail = (index: number) => {
        const newStates = [...informationDetail];
        newStates[index] = !newStates[index];
        setInformationDetail(newStates);
    };
    return (
        <div className={cx('information-detail')}>
            <div className={cx('information-detail-main')}>
                <div className={cx('detail-main-title')}>
                    <h2>MÔ TẢ</h2>
                    <p>Mã sản phẩm:12345</p>
                </div>
                <div className={cx('detail-main-list')}>
                    {children.map((child, index) => {
                        return (
                            <div className={cx('main-list-body')} key={index}>
                                <div className={cx('list-body-title')} onClick={() => handleDetail(index)}>
                                    <h3>{child.title}</h3>
                                    <button>
                                        {informationDetail[index] ? (
                                            <i className={cx('fa-solid fa-chevron-up')}></i>
                                        ) : (
                                            <i className={cx('fa-solid fa-chevron-down')}></i>
                                        )}
                                    </button>
                                </div>
                                <div className={cx('list-body-information')}>
                                    {informationDetail[index] && (
                                        <>
                                            <h5>{child.information}</h5> <p>{child.describe}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InformationDetailShop;
