import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './ButtonScrollTop.module.scss';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const cx = classNames.bind(style);
const ButtonScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        // Thêm một sự kiện lắng nghe cuộn trang để kiểm tra khi nào nút nên hiển thị
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Loại bỏ sự kiện lắng nghe khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Tạo hiệu ứng cuộn mượt
        });
    };

    return (
        <>
            {isVisible && (
                <div className={cx('scroll-to-top')} onClick={scrollToTop}>
                    <ArrowUpwardIcon />
                </div>
            )}
        </>
    );
};
export default ButtonScrollTop;
