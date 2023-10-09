import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosUtil';
interface ResponseProductHome {
    products_news: Array<{}>;
    products_featured: Array<{}>;
    products_selling: Array<{}>;
}
interface Product {
    productId: number;
    name: string;
    price: number;
    description: string;
    image: string;
    material: string;
    quantity: number;
    colorNames: [];
    sizeNames: [];
    categoryId: number;
    galleryImages: [];
}
interface ResponseProductById {
    product: Product;
    productSame: Product[];
}
interface initState {
    loading: boolean;
    isLoadingProductHome: boolean;
    isLoadingProductShop: boolean;
    isLoadingProductById: boolean;
    categories: [];
    products: Product[];
    productHomes: {};
    productById: {};
    productSame: Product[];
    error: string;
}
export const findProductHome = createAsyncThunk<any>('findProductHome', async () => {
    try {
        const res = await axiosInstance.get<ResponseProductHome>('/home');
        if (res) {
            return res;
        }
    } catch (err) {
        console.log(err);
    }
});
export const findAllProductShop = createAsyncThunk<any, number>('findAllProductShop', async (offSet: number) => {
    try {
        const res = await axiosInstance.get(`/shop?offset=${offSet}&limit=16`);
        if (res) {
            return res;
        }
    } catch (err: any) {
        throw new Error(err);
    }
});
export const getAllCategory = createAsyncThunk<any>('getAllCategory', async () => {
    try {
        const res = await axiosInstance.get('/category');
        if (res) {
            return res;
        }
    } catch (err: any) {
        throw new Error(err);
    }
});
export const getProductById = createAsyncThunk<ResponseProductById | any, number>(
    'getProductById',
    async (id: number) => {
        try {
            const res = await axiosInstance.get<ResponseProductById>(`/product/${id}`);
            if (res) {
                return res;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    },
);
const initialState: initState = {
    loading: false,
    categories: [],
    products: [],
    productHomes: {},
    productById: {},
    productSame: [],
    error: '',
    isLoadingProductHome: false,
    isLoadingProductShop: false,
    isLoadingProductById: false,
};

const ProductsSlice: any = createSlice({
    name: 'products',
    initialState,
    reducers: {
        deleteDataProductId: (state) => {
            state.productById = {};
            state.productSame = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findProductHome.pending, (state) => {
                state.isLoadingProductHome = true;
            })
            .addCase(findAllProductShop.pending, (state) => {
                state.isLoadingProductShop = true;
            })
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoadingProductById = true;
            })
            .addCase(findProductHome.fulfilled, (state, action: PayloadAction<ResponseProductHome>) => {
                state.isLoadingProductHome = false;
                state.productHomes = action.payload;
            })
            .addCase(findAllProductShop.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoadingProductShop = false;
                const newArr: Product[] = [...state.products, ...action.payload];
                state.products = newArr.filter((item, index, self) => {
                    return self.findIndex((t) => t.productId === item.productId) === index;
                });
            })
            .addCase(getAllCategory.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getProductById.fulfilled, (state, action: PayloadAction<ResponseProductById>) => {
                state.isLoadingProductById = false;
                state.productById = action.payload.product;
                state.productSame = action.payload.productSame;
            })
            .addCase(findProductHome.rejected, (state) => {
                state.error = 'error when get product';
                state.isLoadingProductHome = false;
            })
            .addCase(findAllProductShop.rejected, (state) => {
                state.error = 'error when get product';
                state.isLoadingProductShop = false;
            })
            .addCase(getAllCategory.rejected, (state) => {
                state.error = 'error when get category';
                state.loading = false;
            })
            .addCase(getProductById.rejected, (state) => {
                state.error = 'error when get product by id';
                state.isLoadingProductById = false;
            });
    },
});
export const { deleteDataProductId } = ProductsSlice.actions;
export default ProductsSlice.reducer;
