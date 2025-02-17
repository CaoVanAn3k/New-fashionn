import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosUtil';
import { toast } from 'react-toastify';
interface RequestFeedbackProduct {
    productId: number;
    rating: number | null;
    descriptionProductQuality: string;
    descriptionFeature: string;
    isShowUserName: boolean;
    color: string;
    size: string;
}
interface ResponseFeedbackProduct {
    commentId: number;
    productId: number;
    nameProduct: string;
    color: string;
    size: string;
    rating: number;
    descriptionProductQuality: string;
    descriptionFeature: string;
    userName: string;
    active: boolean;
    createdAt: string | undefined;
}
interface RatingResponse {
    rating: number;
    rating_count: number;
}
interface InitialState {
    isLoading: boolean;
    reviewedProduct: ResponseFeedbackProduct[];
    reviewedProductItem: ResponseFeedbackProduct[];
    ratingList: RatingResponse[];
    error: string | undefined;
}
export const saveFeedbackProduct = createAsyncThunk<any, RequestFeedbackProduct>(
    'saveFeedbackProduct',
    async (data: RequestFeedbackProduct) => {
        try {
            const res = await axiosInstance.post('/web/comment/create', data);
            if (res) {
                return res;
            }
        } catch (err: any) {
            if (err.status === 500) {
                toast.warning(err.data);
            }
            throw new Error(err.message);
        }
    },
);
export const getAllReviewedProduct = createAsyncThunk<any>('getAllReviewedProduct', async () => {
    try {
        const res = await axiosInstance.get('/web/comment/reviewed-product');
        if (res) {
            return res;
        }
    } catch (err: any) {
        throw new Error(err.message);
    }
});
export const findCommentByUserAndProduct = createAsyncThunk<any, number>(
    'findCommentByUserAndProduct',
    async (productId: number) => {
        try {
            const res = await axiosInstance.get(`/web/comment/product?productId=${productId}`);
            if (res.data) {
                return res.data;
            }
            return res;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
);
export const getAllRatingCommentByProduct = createAsyncThunk<any, number>(
    'getAllRatingCommentByProduct',
    async (productId: number) => {
        try {
            const res = await axiosInstance.get(`/web/comment/rating?productId=${productId}`);
            if (res.data) {
                return res.data;
            }
            return res;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
);
const initialState: InitialState = {
    isLoading: false,
    error: '',
    reviewedProduct: [],
    reviewedProductItem: [],
    ratingList: [],
};
const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveFeedbackProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllReviewedProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(findCommentByUserAndProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllRatingCommentByProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveFeedbackProduct.fulfilled, (state, action: PayloadAction<ResponseFeedbackProduct>) => {
                state.isLoading = false;
                state.reviewedProduct = [...state.reviewedProduct, action.payload];
            })
            .addCase(getAllReviewedProduct.fulfilled, (state, action: PayloadAction<ResponseFeedbackProduct[]>) => {
                state.isLoading = false;
                state.reviewedProduct = action.payload;
            })
            .addCase(
                findCommentByUserAndProduct.fulfilled,
                (state, action: PayloadAction<ResponseFeedbackProduct[]>) => {
                    state.isLoading = false;
                    state.reviewedProductItem = action.payload;
                },
            )
            .addCase(getAllRatingCommentByProduct.fulfilled, (state, action: PayloadAction<RatingResponse[]>) => {
                state.isLoading = false;
                state.ratingList = action.payload;
            })
            .addCase(saveFeedbackProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getAllReviewedProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(findCommentByUserAndProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getAllRatingCommentByProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});
export default CommentSlice.reducer;
