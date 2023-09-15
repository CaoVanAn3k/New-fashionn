/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import styles from './GoogleMap.module.scss';
import MapIcon from '@mui/icons-material/Map';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import ShareIcon from '@mui/icons-material/Share';
const cx = classNames.bind(styles);
const GoogleMap = () => {
    return (
        <div className={cx('contact')}>
            <div className={cx('information')}>
                <div className={cx('title')}>
                    <h5>CONTACT</h5>
                    <p>
                        <span>NEED HELP?</span>
                        <span>CONTACT US</span>
                    </p>
                </div>
            </div>
            <div id="map" className={cx('google-map')}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3919.9544026412796!2d106.71825347481733!3d10.737997789408434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1694782397961!5m2!1svi!2s"
                    width="700"
                    height="450"
                    style={{ border: '0' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className={cx('contact-method')}>
                <div className={cx('container')}>
                    <div className={cx('box-contact')}>
                        <div className={cx('box-icon')}>
                            <MapIcon />
                        </div>
                        <div className={cx('box-text')}>
                            <h3>Our Address</h3>
                            <p>118/10 Nguyễn Thị Thập, Quận 7, Thành phố Hồ Chí Minh</p>
                        </div>
                    </div>
                    <div className={cx('box-contact')}>
                        <div className={cx('box-icon')}>
                            <EmailIcon />
                        </div>
                        <div className={cx('box-text')}>
                            <h3>Email Us</h3>
                            <p>contact@gmail.com</p>
                        </div>
                    </div>
                    <div className={cx('box-contact')}>
                        <div className={cx('box-icon')}>
                            <CallIcon />
                        </div>
                        <div className={cx('box-text')}>
                            <h3>Call Us</h3>
                            <p>0987654321</p>
                        </div>
                    </div>
                    <div className={cx('box-contact')}>
                        <div className={cx('box-icon')}>
                            <ShareIcon />
                        </div>
                        <div className={cx('box-text')}>
                            <h3>Opening Hours</h3>
                            <p>Mon-Sat: 8AM - 10PM; Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GoogleMap;
