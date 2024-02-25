import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosUtil';
import { toast } from 'react-toastify';
interface DataProductOrder {
    orderId: number;
    productId: number;
    nameProduct: string;
    priceProduct: number;
    moneyPersonPay: number;
    color: string;
    size: string;
    image: string;
    quantity: number;
}
interface ResponseProductOrder {
    product_w_confirm: DataProductOrder[];
    product_w_delivery: DataProductOrder[];
    product_delivering: DataProductOrder[];
    product_delivered: DataProductOrder[];
    product_cancel: DataProductOrder[];
    product_return: DataProductOrder[];
}
interface ResponseDataRender {
    orderId: number | null;
    data: DataProductOrder[];
}
interface RequestCancelOrder {
    orderId: number;
    reasonCancel: string;
}
interface InitialState {
    isLoading: boolean;
    product_w_confirm: ResponseDataRender[];
    product_w_delivery: ResponseDataRender[];
    product_delivering: ResponseDataRender[];
    product_delivered: ResponseDataRender[];
    product_cancel: ResponseDataRender[];
    product_return: ResponseDataRender[];
    error: string | undefined;
}
export const getAllMyOrder = createAsyncThunk<any, number>('getAllMyOrder', async (typeId: number) => {
    try {
        const res = await axiosInstance.get(`/web/order/my-order?type=${typeId}`);
        if (res.data !== undefined) {
            return res.data;
        }
        return res;
    } catch (err: any) {
        throw new Error(err);
    }
});
export const cancelOrder = createAsyncThunk<any, RequestCancelOrder>(
    'cancelOrder',
    async (data: RequestCancelOrder) => {
        try {
            const res: string | undefined = await axiosInstance.delete(
                `/web/order/cancel-order?orderId=${data.orderId}&reasonCancel=${data.reasonCancel}`,
            );
            if (res !== undefined) {
                toast.success(res);
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err.message);
            throw new Error(err.message);
        }
    },
);
export const reOrder = createAsyncThunk<any, number>('reOrder', async (orderId: number) => {
    try {
        const res = await axiosInstance.get(`/web/order/re-order?orderId=${orderId}`);
        console.log(res);
    } catch (err: any) {
        throw new Error(err.message);
    }
});
const convertDuplicateOrderId = (response: DataProductOrder[]) => {
    let result: ResponseDataRender[] = [];
    response.forEach((product, index, arr) => {
        const isOrderId = result.find((item) => item.orderId === product.orderId);
        if (isOrderId === undefined) {
            const filterDuplicateOrderId = arr.filter((item) => product.orderId === item.orderId);
            const data = {
                orderId: filterDuplicateOrderId[0].orderId,
                data: filterDuplicateOrderId,
            };
            result.push(data);
        }
    });
    return result;
};
const initialState: InitialState = {
    isLoading: false,
    error: '',
    product_w_confirm: [],
    product_w_delivery: [],
    product_delivering: [],
    product_delivered: [],
    product_return: [],
    product_cancel: [],
};
const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        handleUpdateStateCancelOrder: (state, action: PayloadAction<number>) => {
            state.product_w_confirm = state.product_w_confirm.filter((item) => item.orderId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMyOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllMyOrder.fulfilled, (state, action: PayloadAction<ResponseProductOrder>) => {
                state.isLoading = false;
                const response = action.payload;
                if (response !== undefined) {
                    if (response.product_w_confirm !== undefined && response.product_w_confirm.length > 0) {
                        state.product_w_confirm = convertDuplicateOrderId(response.product_w_confirm);
                    }
                    if (response.product_w_delivery !== undefined && response.product_w_delivery.length > 0) {
                        state.product_w_delivery = convertDuplicateOrderId(response.product_w_delivery);
                    }
                    if (response.product_delivering !== undefined && response.product_delivering.length > 0) {
                        state.product_delivering = convertDuplicateOrderId(response.product_delivering);
                    }
                    if (response.product_delivered !== undefined && response.product_delivered.length > 0) {
                        state.product_delivered = convertDuplicateOrderId(response.product_delivered);
                    }
                    if (response.product_cancel !== undefined && response.product_cancel.length > 0) {
                        state.product_cancel = convertDuplicateOrderId(response.product_cancel);
                    }
                    if (response.product_return !== undefined && response.product_return.length > 0) {
                        state.product_return = convertDuplicateOrderId(response.product_return);
                    }
                }
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(reOrder.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getAllMyOrder.rejected, (state) => {
                state.isLoading = false;
                state.error = 'error';
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(reOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});
export const { handleUpdateStateCancelOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
