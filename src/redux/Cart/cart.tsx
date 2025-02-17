import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosUtil';
import { toast } from 'react-toastify';
import waiting from '../../util/waiting';
interface ProductCart {
    productCartId: number;
    productId: number;
    name: string;
    color: string;
    size: string;
    price: number;
    image: string;
    quantity: number;
}
interface initState {
    loading: boolean;
    isLoadingChangeQuantity: boolean;
    isLoadingAddToCart: boolean;
    productCarts: ProductCart[];
    error: string;
}
interface DataRequest {
    id: number;
    color: string;
    size: string;
    quantity: number;
}

export const addToCart = createAsyncThunk<any, DataRequest>('addToCart', async (data: DataRequest) => {
    try {
        const { id, ...values } = data;
        const res: any = await axiosInstance.post(`/web/cart/products/addToCart/${id}`, values);
        if (res) {
            toast.success(res);
            const updateCart = await axiosInstance.get('/web/cart/products');
            if (updateCart !== null) {
                return updateCart;
            }
        }
    } catch (err: any) {
        toast.error(err.data);
        await waiting(3000);
        if (err.status === 401) {
            window.location.href = '/login';
        }
        throw new Error(err.message);
    }
});
export const getAllProductInCart = createAsyncThunk<any>('getAllProductInCart', async () => {
    try {
        const res = await axiosInstance.get('/web/cart/products');
        if (res.data !== undefined) {
            return res.data;
        }
        return res;
    } catch (err: any) {
        throw new Error(err.message);
    }
});
export const incrementProductCart = createAsyncThunk('incrementProductCart', async (data: ProductCart) => {
    try {
        const { productCartId, ...value } = data;
        const res = await axiosInstance.put(`/web/cart/products/increase/${productCartId}`, value);
        if (res) {
            return res;
        }
    } catch (err: any) {
        if (err.status === 400) {
            toast.error(err.data);
        }
        throw new Error(err.message);
    }
});
export const decrementProductCart = createAsyncThunk<any, ProductCart>(
    'decrementProductCart',
    async (data: ProductCart) => {
        try {
            const { productCartId, ...value } = data;
            if (value.quantity === 1) {
                const res = await axiosInstance.delete(`/web/cart/products/delete/${productCartId}`);
                return {
                    message: res,
                    product: data,
                };
            } else {
                const res = await axiosInstance.put<ProductCart>(`/cart/products/decrease/${productCartId}`, value);
                return res;
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    },
);
export const deleteProductCart = createAsyncThunk<any, ProductCart>('deleteProductCart', async (data: ProductCart) => {
    try {
        const { productCartId } = data;
        const res: string | undefined = await axiosInstance.delete(`/web/cart/products/delete/${productCartId}`);
        if (res !== undefined) {
            toast.success(res);
            return {
                message: res,
                product: data,
            };
        }
    } catch (err: any) {
        throw new Error(err);
    }
});
const initialState: initState = {
    loading: false,
    isLoadingChangeQuantity: false,
    error: '',
    productCarts: [],
    isLoadingAddToCart: false,
};
const CartSlice: any = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        updateCart: (state, action) => {
            state.productCarts = action.payload;
        },
        clearState: (state) => {
            state.productCarts = [];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.isLoadingAddToCart = true;
            })
            .addCase(getAllProductInCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(incrementProductCart.pending, (state) => {
                state.isLoadingChangeQuantity = true;
            })
            .addCase(decrementProductCart.pending, (state) => {
                state.isLoadingChangeQuantity = true;
            })
            .addCase(deleteProductCart.pending, (state) => {
                state.isLoadingChangeQuantity = true;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isLoadingAddToCart = false;
                state.productCarts = action.payload;
            })
            .addCase(getAllProductInCart.fulfilled, (state, action: PayloadAction<ProductCart[]>) => {
                state.loading = false;
                state.productCarts = action.payload;
            })
            .addCase(incrementProductCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoadingChangeQuantity = false;
                const updateCart = state.productCarts.map((product) => {
                    if (product.productCartId === action.payload.productCartId) {
                        return action.payload;
                    }
                    return product;
                });
                state.productCarts = updateCart;
            })
            .addCase(decrementProductCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoadingChangeQuantity = false;
                if (action.payload.message !== undefined) {
                    state.productCarts = state.productCarts.filter(
                        (product) => product.productCartId !== action.payload.product.productCartId,
                    );
                } else {
                    const updateCart = state.productCarts.map((product) => {
                        if (product.productCartId === action.payload.productCartId) {
                            return action.payload;
                        }
                        return product;
                    });
                    state.productCarts = updateCart;
                }
            })
            .addCase(deleteProductCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoadingChangeQuantity = false;
                state.productCarts = state.productCarts.filter(
                    (item) => item.productCartId !== action.payload.product.productCartId,
                );
            })
            .addCase(addToCart.rejected, (state) => {
                state.loading = false;
                state.isLoadingAddToCart = false;
                state.error = 'error when add product in cart';
            })
            .addCase(getAllProductInCart.rejected, (state) => {
                state.loading = false;
                state.error = 'error when get all product in cart';
            })
            .addCase(incrementProductCart.rejected, (state) => {
                state.isLoadingChangeQuantity = false;
                state.error = 'error when increase product in cart';
            })
            .addCase(decrementProductCart.rejected, (state) => {
                state.isLoadingChangeQuantity = false;
                state.error = 'error when decrease product in cart';
            })
            .addCase(deleteProductCart.rejected, (state) => {
                state.isLoadingChangeQuantity = false;
                state.error = 'error when delete product in cart';
            });
    },
});
export const { updateCart, clearState } = CartSlice.actions;
export default CartSlice.reducer;
