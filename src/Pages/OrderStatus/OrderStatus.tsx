import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './OrderStatus.module.scss';
import MenuLink from '../../components/Menu/MenuLink';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import img1 from '../../components/Images/Product/Green.png';
import CustomOrder from './CustomOrder';
const cx = classNames.bind(styles);
const menuLink = [
    {
        id: 1,
        title: 'Oh’Lady Boutique',
        path: '/',
        icon: 'icon',
    },
    {
        id: 2,
        title: 'Đơn hàng',
        path: '',
        icon: '',
    },
];
const informationStatus = [
    {
        id: 1,
        discount: '20%',
        img: img1,
        title: 'SẢN PHẨM MẪU SỐ 1 ',
        code: '12345',
        color: '08 Green',
        size: 'M L XL',
        price: '500.000VNĐ',
        total: '400.000VNĐ',
    },
    {
        id: 2,
        discount: '20%',
        img: img1,
        title: 'SẢN PHẨM MẪU SỐ 1 ',
        code: '12345',
        color: '08 Green',
        size: 'M L XL',
        price: '500.000VNĐ',
        total: '400.000VNĐ',
    },
];
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    isCheck: number;
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, isCheck, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const OrderStatus = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div className={cx('order-status')}>
            <div className={cx('order-status-main')}>
                <div className={cx('order-main-link')}>
                    <MenuLink children={menuLink} />
                </div>
                <div className={cx('order-main-status')}>
                    <div className={cx('main-status-list')}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <div className={cx('status-button-main')}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        textColor="secondary"
                                        indicatorColor="secondary"
                                        aria-label="secondary tabs example"
                                    >
                                        <Tab label="Chờ xác nhận" {...a11yProps(0)} />
                                        <Tab label="Chờ lấy hàng" {...a11yProps(1)} />
                                        <Tab label="Đang giao" {...a11yProps(2)} />
                                        <Tab label="Đã giao" {...a11yProps(3)} />
                                        <Tab label="Trả hàng/Hoàn tiền" {...a11yProps(4)} />
                                    </Tabs>
                                </div>
                            </Box>
                            <CustomTabPanel value={value} index={0} isCheck={1}>
                                <CustomOrder children={informationStatus} isCheck={'0'} />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1} isCheck={1}>
                                <CustomOrder children={informationStatus} isCheck={'1'} />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2} isCheck={1}>
                                <CustomOrder children={informationStatus} isCheck={'1'} />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={3} isCheck={1}>
                                <CustomOrder children={informationStatus} isCheck={'2'} />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={4} isCheck={1}>
                                <CustomOrder children={informationStatus} isCheck={'2'} />
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
            </div>
            <div className={cx('order-status-bader')}></div>
        </div>
    );
};

export default OrderStatus;
