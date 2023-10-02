import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './ButtonScrollTop.module.scss';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const cx = classNames.bind(style);
const ButtonScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
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
