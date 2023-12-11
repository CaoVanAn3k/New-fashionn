import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './OrderHistory.module.scss';
import MenuLink from '../../components/Menu/MenuLink';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomOrder from './CustomOrder';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAllMyOrder } from '../../redux/order/order';
import { useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const menuLink = [
    {
        id: 1,
        title: 'Bich Thuan Store',
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
const OrderHistory = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const {
        product_w_confirm,
        product_w_delivery,
        product_delivering,
        product_delivered,
        product_cancel,
        product_return,
        isLoading,
    } = useAppSelector((state) => state.order);
    useEffect(() => {
        const queryParam = new URLSearchParams(location.search);
        const typeValue: string | null = queryParam.get('type');
        if (typeValue === null) {
            dispatch(getAllMyOrder(0));
        } else {
            dispatch(getAllMyOrder(Number.parseInt(typeValue)));
        }
    }, [dispatch, location.search]);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handelChangeType = (type: number) => {
        navigate(`/order-history?type=${type}`);
    };
    return (
        <div className={cx('order-status')}>
            {isLoading ? (
                <div className={cx('custom-loader')}></div>
            ) : (
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
                                            <Tab
                                                label="Chờ xác nhận"
                                                {...a11yProps(0)}
                                                onClick={() => {
                                                    handelChangeType(0);
                                                }}
                                            />
                                            <Tab
                                                label="Chờ lấy hàng"
                                                {...a11yProps(1)}
                                                onClick={() => {
                                                    handelChangeType(1);
                                                }}
                                            />
                                            <Tab
                                                label="Đang giao"
                                                {...a11yProps(2)}
                                                onClick={() => {
                                                    handelChangeType(2);
                                                }}
                                            />
                                            <Tab
                                                label="Đã giao"
                                                {...a11yProps(3)}
                                                onClick={() => {
                                                    handelChangeType(3);
                                                }}
                                            />
                                            <Tab
                                                label="Đã hủy"
                                                {...a11yProps(4)}
                                                onClick={() => {
                                                    handelChangeType(4);
                                                }}
                                            />
                                            <Tab
                                                label="Trả hàng/Hoàn tiền"
                                                {...a11yProps(5)}
                                                onClick={() => {
                                                    handelChangeType(5);
                                                }}
                                            />
                                        </Tabs>
                                    </div>
                                </Box>
                                <CustomTabPanel value={value} index={0} isCheck={1}>
                                    {product_w_confirm.length > 0 && (
                                        <CustomOrder children={product_w_confirm} isCheck={'0'} />
                                    )}
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1} isCheck={1}>
                                    {product_w_delivery.length > 0 && (
                                        <CustomOrder children={product_w_delivery} isCheck={'1'} />
                                    )}
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2} isCheck={1}>
                                    {product_delivering.length > 0 && (
                                        <CustomOrder children={product_delivering} isCheck={'1'} />
                                    )}
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={3} isCheck={1}>
                                    {product_delivered.length > 0 && (
                                        <CustomOrder children={product_delivered} isCheck={'2'} />
                                    )}
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={4} isCheck={1}>
                                    {product_cancel.length > 0 && (
                                        <CustomOrder children={product_cancel} isCheck={'3'} />
                                    )}
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={5} isCheck={1}>
                                    {product_return.length > 0 && (
                                        <CustomOrder children={product_return} isCheck={'2'} />
                                    )}
                                </CustomTabPanel>
                            </Box>
                        </div>
                    </div>
                </div>
            )}

            <div className={cx('order-status-bader')}></div>
        </div>
    );
};

export default OrderHistory;
