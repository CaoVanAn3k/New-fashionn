import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosUtil';
interface VoucherData {
    freeShippingCodeId: number;
    code: string;
    discountPercent: number;
    discountUnit: string;
    expires: Date;
    isUsed: boolean;
}
interface InitialState {
    isLoading: boolean;
    voucherList: VoucherData[];
    error: string | undefined;
}
export const getAllVoucherOfUser = createAsyncThunk<VoucherData[]>('getAllVoucherOfUser', async () => {
    try {
        const res = await axiosInstance.get('/web/voucher/free-shipping');
        if (res.data) {
            return res.data;
        }
        return res;
    } catch (err: any) {
        return err.message;
    }
});
const initialState: InitialState = {
    isLoading: false,
    error: '',
    voucherList: [],
};
const VoucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllVoucherOfUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllVoucherOfUser.fulfilled, (state, action: PayloadAction<VoucherData[]>) => {
                state.isLoading = false;
                state.voucherList = action.payload;
            })
            .addCase(getAllVoucherOfUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});
export default VoucherSlice.reducer;
