import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'classnames/bind';
import styles from './FormAddress.module.scss';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './../../../redux/store';
import { saveAddress } from '../../../redux/Authentication/Authentication';
import {
    updateStateAddressDefault,
    clearStateAddress,
    updateAddress,
    finishUpdateAddress,
} from '../../../redux/payment/payment';
const cx = classNames.bind(styles);
interface Props {
    onAdd: boolean;
    handleOffAdd: () => void;
}
interface DataAddress {
    id: number | null;
    address: string | undefined;
    status: number | null;
    province: string;
    district: string;
    wards: string;
    phonePayment: string;
    namePayment: string;
}
interface ProvinceData {
    full_name: string;
    id: number;
    name: string;
    name_en: string;
    region_id: number;
    type: string;
}
interface DistrictData {
    name: string;
    full_name: string;
    name_en: string;
    id: number;
    type: string;
    province_id: number | undefined;
}
interface WardsData {
    name: string;
    full_name: string;
    name_en: string;
    id: number;
    district_id: number;
    province_id: number;
    type: string;
}
interface SearchWardsData {
    name: string;
    full_name: string;
    name_en: string;
    id: number;
    type: string;
    district: {
        name: string;
        full_name: string;
        name_en: string;
        id: number;
        type: string;
        province_id: number | undefined;
    };
    province: ProvinceData;
}
const FormAddress: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputFullNameRef = useRef<HTMLInputElement | null>(null);
    const inputPhoneNumberRef = useRef<HTMLInputElement | null>(null);
    const [checkErrorFullName, setCheckErrorFullName] = useState(false);
    const [checkErrorPhoneNumber, setCheckErrorPhoneNumber] = useState(false);
    const { phoneNumber, addressChange, isUpdate } = useAppSelector((state) => state.payment);
    const { onAdd, handleOffAdd } = props;
    const [listProvinces, setListProvince] = useState<ProvinceData[]>([]);
    const [listDistricts, setListDistricts] = useState<DistrictData[]>([]);
    const [listWards, setListWards] = useState<WardsData[]>([]);
    const [province, setProvince] = useState<ProvinceData>({
        full_name: '',
        id: 0,
        name: '',
        name_en: '',
        region_id: 0,
        type: '',
    });
    const [district, setDistrict] = useState<DistrictData>({
        name: '',
        full_name: '',
        name_en: '',
        id: 0,
        type: '',
        province_id: 0,
    });
    const [wards, setWards] = useState<WardsData>({
        name: '',
        full_name: '',
        name_en: '',
        id: 0,
        type: '',
        district_id: 0,
        province_id: 0,
    });
    const [fullName, setFullName] = useState(addressChange.namePayment !== '' ? addressChange.namePayment : '');
    const [address, setAddress] = useState(addressChange.address !== '' ? addressChange.address : '');
    const [phoneInput, setPhoneInput] = useState(
        addressChange.phonePayment !== '' ? addressChange.phonePayment : phoneNumber !== '' ? phoneNumber : '',
    );
    const [inputDefaultCheck, setInputDefaultCheck] = useState(false);
    useEffect(() => {
        if (
            addressChange.id !== null &&
            addressChange.phonePayment !== '' &&
            addressChange.namePayment !== '' &&
            addressChange.address !== ''
        ) {
            setPhoneInput(addressChange.phonePayment);
            setFullName(addressChange.namePayment);
            setAddress(addressChange.address);
            setInputDefaultCheck(addressChange.status === 1 ? true : false);
        } else {
            setInputDefaultCheck(false);
        }
    }, [
        addressChange.address,
        addressChange.id,
        addressChange.namePayment,
        addressChange.phonePayment,
        addressChange.status,
    ]);
    const fetchDataDistricts = async (province: ProvinceData) => {
        const res = await axios.get(
            `https://vnprovinces.pythonanywhere.com/api/districts/?province_id=${province.id}&basic=true&limit=100`,
        );
        if (res.data.results.length > 0) {
            const dataDefaultDistrict = {
                name: 'Quận/Huyện',
                full_name: '',
                name_en: '',
                id: 0,
                type: '',
                province_id: 0,
            };
            setListDistricts([dataDefaultDistrict, ...res.data.results]);
        }
    };
    const fetchDataWards = async (district: DistrictData) => {
        const res = await axios.get(
            `https://vnprovinces.pythonanywhere.com/api/wards/?district_id=${district.id}&basic=true&limit=100`,
        );
        if (res.data.results.length > 0) {
            const dataDefaultWards = {
                name: 'Phường/Xã',
                full_name: '',
                name_en: '',
                id: 0,
                type: '',
                district_id: 0,
                province_id: 0,
            };
            setListWards([dataDefaultWards, ...res.data.results]);
        }
    };
    useEffect(() => {
        const fetchData = async (addressChange: DataAddress) => {
            const res = await axios.get(
                `https://vnprovinces.pythonanywhere.com/api/wards/?search=${addressChange.wards}&limit=100`,
            );
            if (res.data.results.length > 0) {
                const data: SearchWardsData | undefined = res.data.results.find((address: SearchWardsData) => {
                    return addressChange.province === address.province.name;
                });
                if (data !== undefined) {
                    data.district.province_id = data.province.id;
                    setProvince(data.province);
                    setDistrict(data.district);
                    setWards({
                        name: data.name,
                        full_name: data.full_name,
                        name_en: data.name_en,
                        id: data.id,
                        type: data.type,
                        district_id: data.district.id,
                        province_id: data.province.id,
                    });
                    fetchDataDistricts(data?.province);
                    fetchDataWards(data?.district);
                }
            }
        };
        if (addressChange.id !== null) {
            fetchData(addressChange);
        }
    }, [addressChange, addressChange.id]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100');
            if (res.data.results.length > 0) {
                const dataDefault = {
                    full_name: '',
                    id: 0,
                    name: 'Tỉnh',
                    name_en: '',
                    region_id: 0,
                    type: '',
                };
                setListProvince([dataDefault, ...res.data.results]);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (province.name !== '') {
            fetchDataDistricts(province);
        }
    }, [province]);
    useEffect(() => {
        if (province.name !== '' && district.name !== '') {
            fetchDataWards(district);
        }
    }, [district, district.name, province.name]);
    const handleSelectProvince = (province: ProvinceData) => {
        if (province.name !== 'Tỉnh') {
            setProvince(province);
        } else {
            setProvince({
                full_name: '',
                id: 0,
                name: '',
                name_en: '',
                region_id: 0,
                type: '',
            });
        }
    };
    const handleSelectDistrict = (district: DistrictData) => {
        if (district.name !== 'Quận/Huyện') {
            setDistrict(district);
        } else {
            setDistrict({
                name: '',
                full_name: '',
                name_en: '',
                id: 0,
                type: '',
                province_id: 0,
            });
        }
    };
    const handleSelectWard = (ward: WardsData) => {
        if (ward.name !== 'Phường/Xã') {
            setWards(ward);
        } else {
            setWards({
                name: '',
                full_name: '',
                name_en: '',
                id: 0,
                type: '',
                district_id: 0,
                province_id: 0,
            });
        }
    };
    const handleChangeInputAddress = (e: any) => {
        setAddress(e.target.value);
    };
    const handleCloseFormAddress = () => {
        dispatch(clearStateAddress());
        setAddress('');
        setFullName('');
        setPhoneInput('');
        handleOffAdd();
    };
    const isValidFullName = (fullName: string | undefined) => {
        if (fullName !== undefined) {
            const hasSpecialCharacters = /[!@#$%^&*()?":{}|<>]/.test(fullName);
            if (!hasSpecialCharacters) {
                const words = fullName.split(' ');
                return words.length >= 2;
            } else {
                return false;
            }
        }
        return false;
    };
    const isVaLidPhoneNumber = (phoneNumber: string | undefined) => {
        if (phoneNumber !== undefined) {
            const length = phoneNumber.length;
            const validNumber = /(0)(\d){9}\b/.test(phoneNumber);
            if (validNumber && length === 10) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    const handleCheckInputFullName = () => {
        if (isValidFullName(inputFullNameRef.current?.value)) {
            setCheckErrorFullName(false);
        } else {
            setCheckErrorFullName(true);
        }
    };
    const handleCheckPhoneNumber = () => {
        if (isVaLidPhoneNumber(inputPhoneNumberRef.current?.value)) {
            setCheckErrorPhoneNumber(false);
        } else {
            setCheckErrorPhoneNumber(true);
        }
    };
    const isCheckInput = () => {
        if (
            province.name !== '' &&
            district.name !== '' &&
            wards.name !== '' &&
            address !== '' &&
            fullName !== '' &&
            phoneInput !== '' &&
            !checkErrorFullName &&
            !checkErrorPhoneNumber
        ) {
            return true;
        } else return false;
    };
    const handleFinishInput = () => {
        if (isCheckInput()) {
            const hasSpecialCharacters = /[!@#$%^&*()?":{}|<>]/.test(address);
            const checkFullNumber = /[a-zA-Z]/.test(address);
            if (!checkFullNumber) {
                toast.error('Địa chỉ không thể nào là số, vui lòng nhập địa chỉ chính xác để shop giao hàng đến bạn.');
                return;
            }
            if (!hasSpecialCharacters) {
                const data = {
                    address,
                    wardName: wards.name,
                    districtName: district.name,
                    provinceName: province.name,
                    status: inputRef.current?.checked,
                    phonePayment: phoneInput,
                    namePayment: fullName,
                };
                dispatch(saveAddress(data));
                dispatch(updateStateAddressDefault(data));
                handleCloseFormAddress();
            } else {
                toast.error('Địa chỉ không được nhập kí tự đặc biệt!');
            }
        } else {
            toast.error('Điền đầy đủ thông tin và hợp lệ');
        }
    };

    const handleFinishInputUpdate = () => {
        if (isCheckInput()) {
            const hasSpecialCharacters = /[!@#$%^&*()?":{}|<>]/.test(address);

            if (!hasSpecialCharacters) {
                const data = {
                    id: addressChange.id,
                    address,
                    wardName: wards.name,
                    districtName: district.name,
                    provinceName: province.name,
                    status: inputRef.current?.checked,
                    phonePayment: phoneInput,
                    namePayment: fullName,
                };
                dispatch(finishUpdateAddress(data));
                dispatch(updateAddress(data));
                handleCloseFormAddress();
            } else {
                toast.error('Địa chỉ không được nhập kí tự đặc biệt!');
            }
        } else {
            toast.error('Điền đầy đủ thông tin và hợp lệ');
        }
    };
    return (
        <>
            {onAdd && (
                <div className={cx('form-add', 'animate__animated animate__zoomIn')}>
                    <div className={cx('form-add-main')}>
                        <div className={cx('form-add-title')}>
                            <h3>Địa chỉ mới</h3>
                            <div className={cx('form-add-input-name')}>
                                <div className={cx('box-input')}>
                                    <div className={cx('add-input-name')}>
                                        <input
                                            className={cx('input-name-list')}
                                            ref={inputFullNameRef}
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            placeholder="Họ và tên"
                                            value={fullName}
                                            onChange={(e) => {
                                                setFullName(e.target.value);
                                            }}
                                            onBlur={handleCheckInputFullName}
                                        />
                                    </div>
                                    {checkErrorFullName && <p>ít nhất 2 kí tự trở lên và không chứa kí tự đặc biệt</p>}
                                </div>

                                <div className={cx('box-input')}>
                                    <div className={cx('add-input-name')}>
                                        <input
                                            className={cx('input-name-list')}
                                            type="text"
                                            id="phoneNumber"
                                            ref={inputPhoneNumberRef}
                                            name="phoneNumber"
                                            placeholder="Số điện thoại"
                                            value={phoneInput}
                                            onChange={(e) => {
                                                setPhoneInput(e.target.value);
                                            }}
                                            onBlur={handleCheckPhoneNumber}
                                        />
                                    </div>
                                    {checkErrorPhoneNumber && <p>nhập số điện thoại hợp lệ</p>}
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
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        defaultValue={`${addressChange.id !== null ? addressChange.province : 'Tỉnh'}`}
                                    >
                                        {listProvinces.length > 0 &&
                                            listProvinces.map((province) => (
                                                <MenuItem
                                                    key={province.id}
                                                    value={province.name}
                                                    onClick={() => {
                                                        handleSelectProvince(province);
                                                    }}
                                                >
                                                    {province.name}
                                                </MenuItem>
                                            ))}
                                    </TextField>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        defaultValue={`${
                                            addressChange.id !== null ? addressChange.district : 'Quận/Huyện'
                                        }`}
                                    >
                                        {province.full_name !== '' && listDistricts.length > 0 ? (
                                            listDistricts.map((district) => (
                                                <MenuItem
                                                    key={district.id}
                                                    value={district.name}
                                                    onClick={() => {
                                                        handleSelectDistrict(district);
                                                    }}
                                                >
                                                    {district.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem
                                                value={`${
                                                    addressChange.id !== null ? addressChange.district : 'Quận/Huyện'
                                                }`}
                                            >
                                                {addressChange.id !== null ? addressChange.district : 'Quận/Huyện'}
                                            </MenuItem>
                                        )}
                                    </TextField>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        defaultValue={`${
                                            addressChange.id !== null ? addressChange.wards : 'Phường/Xã'
                                        }`}
                                    >
                                        {province.full_name !== '' &&
                                        district.full_name !== '' &&
                                        listWards.length > 0 ? (
                                            listWards.map((ward) => (
                                                <MenuItem
                                                    key={ward.id}
                                                    value={ward.name}
                                                    onClick={() => {
                                                        handleSelectWard(ward);
                                                    }}
                                                >
                                                    {ward.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem
                                                value={`${
                                                    addressChange.id !== null ? addressChange.wards : 'Phường/Xã'
                                                }`}
                                            >
                                                {addressChange.id !== null ? addressChange.wards : 'Phường/Xã'}
                                            </MenuItem>
                                        )}
                                    </TextField>
                                </div>
                            </Box>
                            <div className={cx('form-add-input-note')}>
                                <input
                                    placeholder="Số nhà, tên đường, thôn/tổ"
                                    onChange={(e) => handleChangeInputAddress(e)}
                                    value={address}
                                />
                            </div>
                            <div className={cx('form-add-input-check')}>
                                <input
                                    id="inputcheck"
                                    type="checkbox"
                                    value="1"
                                    ref={inputRef}
                                    checked={inputDefaultCheck}
                                    onChange={() => {
                                        setInputDefaultCheck(!inputDefaultCheck);
                                    }}
                                />
                                <label htmlFor="inputcheck">Đặt làm mặt định</label>
                            </div>
                            <div className={cx('form-add-button')}>
                                <button className={cx('button-first')} onClick={handleCloseFormAddress}>
                                    Trở lại
                                </button>
                                {isUpdate ? (
                                    <button className={cx('button-last')} onClick={handleFinishInputUpdate}>
                                        Cập nhật
                                    </button>
                                ) : (
                                    <button className={cx('button-last')} onClick={handleFinishInput}>
                                        Hoàn thành
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default FormAddress;
