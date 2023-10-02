import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'classnames/bind';
import styles from './FormAddress.module.scss';
// import { useState } from 'react';

const province = [
    {
        value: 'TINH',
        label: 'Tỉnh/Thành phố',
    },
    {
        value: 'QN',
        label: 'Quảng Nam',
    },
    {
        value: 'DN',
        label: 'Đà Nẵng',
    },
    {
        value: 'HCM',
        label: 'Hồ Chí Minh',
    },
];
const district = [
    {
        value: 'HUYEN',
        label: 'Quận/Huyện',
    },
    {
        value: 'TP',
        label: 'Tiên Phước',
    },
    {
        value: 'HC',
        label: 'Hải Châu',
    },
    {
        value: 'TK',
        label: 'Thanh Khuê',
    },
];
const commune = [
    {
        value: 'XA',
        label: 'Phường/Xã',
    },
    {
        value: 'QN',
        label: 'Quảng Nam',
    },
    {
        value: 'DN',
        label: 'Đà Nẵng',
    },
    {
        value: 'HCM',
        label: 'Hồ Chí Minh',
    },
];
const cx = classNames.bind(styles);
interface Props {
    onAdd: boolean;
    handleOffAdd: () => void;
}

const FormAddress: React.FC<Props> = (props) => {
    const { onAdd, handleOffAdd } = props;

    return (
        <>
            {onAdd && (
                <div className={cx('form-add')}>
                    <div className={cx('form-add-main')}>
                        <div className={cx('form-add-title')}>
                            <h3>Địa chỉ mới</h3>
                            <div className={cx('form-add-input-name')}>
                                <div className={cx('add-input-name')}>
                                    <input className={cx('input-name-list')} type="text" placeholder="Họ và tên" />
                                </div>
                                <div className={cx('add-input-name')}>
                                    <input className={cx('input-name-list')} type="text" placeholder="Số điện thoại" />
                                </div>
                            </div>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className={cx('form-add-input-address')}>
                                    <TextField id="outlined-select-currency" select defaultValue="TINH">
                                        {province.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField id="outlined-select-currency" select defaultValue="HUYEN">
                                        {district.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField id="outlined-select-currency" select defaultValue="XA">
                                        {commune.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Box>
                            <div className={cx('form-add-input-note')}>
                                <textarea placeholder="Địa chỉ cụ thể" />
                            </div>
                            <div className={cx('form-add-input-check')}>
                                <input id="inputcheck" type="checkbox" />
                                <label htmlFor="inputcheck">Đặt làm mặt định</label>
                            </div>
                            <div className={cx('form-add-button')}>
                                <button className={cx('button-first')} onClick={handleOffAdd}>
                                    Trở lại
                                </button>
                                <button className={cx('button-last')}>Hoàn thành</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default FormAddress;
