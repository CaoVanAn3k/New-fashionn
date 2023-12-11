import * as React from 'react';
import classNames from 'classnames/bind';
import AddIcon from '@mui/icons-material/Add';
import styles from './FormEditAddress.module.scss';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { updateAddressDefault, changeAddressDefault, updateStateAddress } from '../../../redux/payment/payment';
const cx = classNames.bind(styles);
interface Props {
    onChangeAddress: boolean;
    handleOffChangeAddress: () => void;
    handleOnAdd: () => void;
}
interface DataAddress {
    id: number | null;
    address: string;
    status: number | null;
    province: string;
    district: string;
    wards: string;
    phonePayment: string;
    namePayment: string;
}
const FormEditAddress: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const { onChangeAddress, handleOffChangeAddress, handleOnAdd } = props;
    const { addressList, fullName, phoneNumber } = useAppSelector((state) => state.payment);
    const [checked, setChecked] = useState<boolean[]>([]);
    const [addressChanged, setAddressChanged] = useState<DataAddress>();
    useEffect(() => {
        if (addressList.length > 0) {
            setChecked(
                addressList.map((address: DataAddress) => {
                    if (address.status === 1) return true;
                    else return false;
                }),
            );
        }
    }, [addressList, addressList.length]);
    const handleChangeState = (index: number) => {
        const array = [...checked];
        const findIndex = array.findIndex((item) => item === true);
        if (findIndex !== index) {
            array[findIndex] = false;
        }
        array[index] = true;
        setChecked(array);
    };
    const handleCloseFormChangeAddress = () => {
        handleOffChangeAddress();
    };
    const handleAddNewAddress = () => {
        handleOffChangeAddress();
        handleOnAdd();
    };
    const handleUpdateAddressDefault = () => {
        if (addressChanged?.id && addressChanged?.status === 0) {
            const data = {
                address: addressChanged.address,
                wardName: addressChanged.wards,
                districtName: addressChanged.district,
                provinceName: addressChanged.province,
                status: true,
                phonePayment: addressChanged.phonePayment,
                namePayment: addressChanged.namePayment,
            };
            dispatch(updateAddressDefault(data));
            dispatch(changeAddressDefault(addressChanged));
        }
        handleCloseFormChangeAddress();
    };
    const handleClickUpdateAddress = (address: DataAddress) => {
        dispatch(updateStateAddress(address));
        handleOffChangeAddress();
        handleOnAdd();
    };
    return (
        <>
            {onChangeAddress && (
                <div className={cx('form-change', 'animate__animated animate__zoomIn')}>
                    <div className={cx('form-container')}>
                        <div className={cx('form-change-title')}>
                            <h3>Địa chỉ của tôi</h3>
                        </div>
                        <div className={cx('wrapper-address')}>
                            {addressList.length > 0 &&
                                addressList.map((address: DataAddress, index: number) => {
                                    return (
                                        <div className={cx('box-address')} key={index}>
                                            <div className={cx('box-address-left')}>
                                                <div
                                                    className={cx('box-address-left-check')}
                                                    onClick={() => {
                                                        setAddressChanged(address);
                                                        handleChangeState(index);
                                                    }}
                                                >
                                                    <div
                                                        className={cx(
                                                            'radio-button-outer-circle',
                                                            `${checked[index] ? 'checked' : ''}`,
                                                        )}
                                                    >
                                                        <div className={cx('radio-button-inner-circle')}></div>
                                                    </div>
                                                </div>
                                                <div className={cx('box-address-left-information')}>
                                                    <span className={cx('fullName-phoneNumber')}>
                                                        {fullName} | {phoneNumber}
                                                    </span>
                                                    <p>{address.address}</p>
                                                    <p>
                                                        Phường {address.wards}, Huyện {address.district},{' '}
                                                        {address.province}
                                                    </p>
                                                    {address.status === 1 && (
                                                        <div className={cx('tag-status')}>
                                                            <span>Mặc định</span>
                                                            <span>Địa chỉ lấy hàng</span>
                                                            <span>Địa chỉ trả hàng</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className={cx('box-address-right')}
                                                onClick={() => handleClickUpdateAddress(address)}
                                            >
                                                <span>Cập nhật</span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className={cx('add-address')} onClick={handleAddNewAddress}>
                            <div className={cx('add-address-button')}>
                                <AddIcon />
                                <span>Thêm địa chỉ mới</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('form-change-button')}>
                        <button className={cx('button-first')} onClick={handleCloseFormChangeAddress}>
                            Hủy
                        </button>
                        <button className={cx('button-last')} onClick={handleUpdateAddressDefault}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export default FormEditAddress;
