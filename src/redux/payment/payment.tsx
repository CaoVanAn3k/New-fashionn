import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosUtil';
import { toast } from 'react-toastify';

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
interface ResponseAddress {
    fullName: string;
    phoneNumber: string;
    addresses: DataAddress[];
}
interface RequestAddress {
    address: string;
    districtName: string;
    wardName: string;
    provinceName: string;
    status: boolean | undefined;
    phonePayment: string;
    namePayment: string;
}
interface ProductPaymentData {
    productCartId: number;
    productId: number;
    name: string;
    color: string;
    size: string;
    price: number;
    image: string;
    quantity: number;
}
interface RequestPayment {
    address: string;
    statusOrder: number;
    isOrdered: boolean;
    phonePersonOrder: string;
    pricePersonPay: number;
    personNote: string;
    productsPayment: ProductPaymentData[];
}

interface InitialState {
    isLoading: boolean;
    isUpdate: boolean;
    isPendingUpdate: boolean;
    isPendingPayment: boolean;
    isPayment: boolean;
    addressList: DataAddress[];
    productsPayment: ProductPaymentData[];
    fullName: string;
    phoneNumber: string;
    addressDefault: DataAddress | undefined;
    addressChange: DataAddress | undefined;
    status: number | null;
    statusError: number;
    error: string | undefined;
}
const initialState: InitialState = {
    isLoading: false,
    addressList: [],
    addressDefault: {
        id: null,
        address: '',
        status: null,
        province: '',
        district: '',
        wards: '',
        phonePayment: '',
        namePayment: '',
    },
    status: null,
    error: '',
    fullName: '',
    phoneNumber: '',
    isUpdate: false,
    addressChange: {
        id: null,
        address: '',
        status: null,
        province: '',
        district: '',
        wards: '',
        phonePayment: '',
        namePayment: '',
    },
    isPendingUpdate: false,
    productsPayment: [],
    isPayment: false,
    statusError: 0,
    isPendingPayment: false,
};
export const findAddressDefaultByUser = createAsyncThunk<any>('findAddressDefaultByUser', async () => {
    try {
        const res: ResponseAddress = await axiosInstance.get(`/address/user`);
        if (res.fullName !== null && res.addresses.length > 0) {
            return res;
        } else {
            return null;
        }
    } catch (err: any) {
        return err.message;
    }
});
export const updateAddressDefault = createAsyncThunk<any, RequestAddress>(
    'updateAddressDefault',
    async (data: RequestAddress) => {
        try {
            const res: DataAddress = await axiosInstance.put('/address/edit', data);
            if (res) {
                toast.success('cập nhật thành công!');
            }
        } catch (err: any) {
            if (err.status === 400) {
                toast.error(err.message);
            }
            return err.message;
        }
    },
);
export const updateAddress = createAsyncThunk<RequestAddress, any>('updateAddress', async (data: any) => {
    try {
        const res = await axiosInstance.put(`/address/update-address/${data.id}`, data);
        if (res) {
            return res;
        }
    } catch (err: any) {
        if (err.status === 400) {
            toast.error(err.message);
        }
        return err.message;
    }
});
export const orderPayment = createAsyncThunk<any, RequestPayment>('orderPayment', async (data: RequestPayment) => {
    try {
        const res: string | undefined = await axiosInstance.post('/order/create', data);
        if (res !== undefined) {
            return res;
        }
    } catch (err: any) {
        if (err.status === 400) {
            toast.error(err.data);
        }
        if (err.status === 402) {
            toast.error(err.data);
        }
        throw new Error(err.status);
    }
});
const PaymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        updateStateAddressDefault: (state, action: PayloadAction<RequestAddress>) => {
            if (state.addressList.length === 0) {
                const data = {
                    id: 0,
                    address: action.payload.address,
                    status: 1,
                    province: action.payload.provinceName,
                    district: action.payload.districtName,
                    wards: action.payload.wardName,
                    phonePayment: action.payload.phonePayment,
                    namePayment: action.payload.namePayment,
                };
                state.addressDefault = data;
                state.addressList = [...state.addressList, data];
            }
        },
        changeAddressDefault: (state, action: PayloadAction<DataAddress>) => {
            const data = {
                id: action.payload.id,
                address: action.payload.address,
                status: 1,
                province: action.payload.province,
                district: action.payload.district,
                wards: action.payload.wards,
                phonePayment: action.payload.phonePayment,
                namePayment: action.payload.namePayment,
            };
            state.addressDefault = data;
            state.addressList = state.addressList.map((address) => {
                if (address.id === data.id) return data;
                else {
                    address.status = 0;
                    return address;
                }
            });
        },
        updateStateAddress: (state, action: PayloadAction<DataAddress>) => {
            state.isUpdate = true;
            state.addressChange = action.payload;
        },
        clearStateAddress: (state) => {
            state.addressChange = {
                id: null,
                address: '',
                status: null,
                province: '',
                district: '',
                wards: '',
                phonePayment: '',
                namePayment: '',
            };
            state.isUpdate = false;
        },
        finishUpdateAddress: (state, action: PayloadAction<any>) => {
            const data = {
                id: action.payload.id,
                address: action.payload.address,
                status: action.payload.status ? 1 : 0,
                province: action.payload.provinceName,
                district: action.payload.districtName,
                wards: action.payload.wardName,
                phonePayment: action.payload.phonePayment,
                namePayment: action.payload.namePayment,
            };
            if (state.addressDefault?.id === data.id && data.status === 0) {
                state.addressDefault = {
                    id: null,
                    address: '',
                    status: null,
                    province: '',
                    district: '',
                    wards: '',
                    phonePayment: '',
                    namePayment: '',
                };
            } else {
                state.addressDefault = data;
            }

            state.addressList = state.addressList.map((address) => {
                if (address.id === data.id) return data;
                else return address;
            });
            state.isUpdate = false;
        },
        updateProductNeedPayment: (state, action: PayloadAction<ProductPaymentData[]>) => {
            state.productsPayment = action.payload;
        },
        handleActiveLoadingPayment: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        clearStatePayment: (state) => {
            state.isPayment = false;
            state.productsPayment = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAddressDefaultByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAddressDefault.pending, (state) => {
                state.isPendingUpdate = true;
            })
            .addCase(updateAddress.pending, (state) => {
                state.isPendingUpdate = true;
            })
            .addCase(orderPayment.pending, (state) => {
                state.isPendingPayment = true;
                state.isPayment = true;
            })
            .addCase(findAddressDefaultByUser.fulfilled, (state, action: PayloadAction<ResponseAddress>) => {
                state.isLoading = false;
                if (action.payload !== null) {
                    const isAddressDefault: DataAddress | undefined | boolean =
                        action.payload?.addresses.length > 0 &&
                        action.payload?.addresses.find((address) => {
                            return address.status === 1;
                        });
                    if (isAddressDefault !== undefined && isAddressDefault) {
                        state.addressDefault = isAddressDefault;
                    }
                    state.fullName = action.payload?.fullName;
                    state.phoneNumber = action.payload?.phoneNumber;
                    state.addressList = action.payload?.addresses;
                }
            })
            .addCase(updateAddressDefault.fulfilled, (state, action: PayloadAction<any>) => {
                state.isPendingUpdate = false;
            })
            .addCase(updateAddress.fulfilled, (state, action: PayloadAction<any>) => {
                state.isPendingUpdate = false;
            })
            .addCase(orderPayment.fulfilled, (state, action: PayloadAction<any>) => {
                state.isPendingPayment = false;
            })
            .addCase(findAddressDefaultByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateAddressDefault.rejected, (state, action) => {
                state.isPendingUpdate = false;
                state.error = action.error.message;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.isPendingUpdate = false;
                state.error = action.error.message;
            })
            .addCase(orderPayment.rejected, (state, action) => {
                state.isPendingPayment = false;
                if (action.error.message !== undefined) {
                    state.statusError = Number.parseInt(action.error.message);
                }
                state.error = action.error.message;
            });
    },
});
export const {
    updateStateAddressDefault,
    changeAddressDefault,
    updateStateAddress,
    clearStateAddress,
    finishUpdateAddress,
    updateProductNeedPayment,
    handleActiveLoadingPayment,
    clearStatePayment,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
