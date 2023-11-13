import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../util/axiosUtil';
import { toast } from 'react-toastify';
interface ResponseProductHome {
    products_news: Array<{}>;
    products_featured: Array<{}>;
    products_selling: Array<{}>;
}
interface SortData {
    sortName: string;
    offset: number;
}
interface CategoryData {
    categoryName: string;
    offset: number;
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
    isLoadingProductCategory: boolean;
    checkStateClickCategory: boolean;
    isSearching: boolean;
    categories: [];
    products: Product[];
    productHomes: {};
    productById: {};
    productSame: Product[];
    productCategoryId: Product[];
    productSearches: Product[];
    sortName: string;
    categoryName: string;
    offsetState: number;
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
export const findAllProductShopBySortPrice = createAsyncThunk<any, SortData>(
    'findAllProductShopBySortPrice',
    async (data: SortData) => {
        try {
            const res = await axiosInstance.get(
                `/shop/products/sort?sortName=${data.sortName}&offset=${data.offset}&limit=16`,
            );
            if (res) {
                return res;
            }
        } catch (error: any) {
            throw new Error(error);
        }
    },
);
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
            const res = await axiosInstance.get<ResponseProductById>(`/products/${id}`);
            if (res) {
                return res;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    },
);
export const findProductByCategoryId = createAsyncThunk<any, number>('findProductByCategoryId', async (id: number) => {
    try {
        const res = await axiosInstance.get(`/shop/products?categoryId=${id}`);
        if (res) {
            return res;
        }
    } catch (err: any) {
        throw new Error(err);
    }
});
export const findProductBySearching = createAsyncThunk<any, string>('findProductBySearching', async (data: string) => {
    try {
        const res = await axiosInstance.get(`/products/search?searchName=${data}`);
        if (res) {
            return res;
        }
    } catch (err: any) {
        throw new Error(err);
    }
});
export const findAllProductByCategoryName = createAsyncThunk<any, CategoryData>(
    'findAllProductByCategoryName',
    async (data: CategoryData) => {
        try {
            const res = await axiosInstance.get(
                `/shop/products/category?categoryName=${data.categoryName}&offset=${data.offset}&limit=16`,
            );
            if (res) {
                return res;
            }
        } catch (error: any) {
            toast.error(error.data);
            throw new Error(error);
        }
    },
);
const initialState: initState = {
    categories: [],
    products: [],
    productHomes: {},
    productById: {},
    productSame: [],
    productCategoryId: [],
    productSearches: [],
    error: '',
    loading: false,
    isLoadingProductHome: false,
    isLoadingProductShop: false,
    isLoadingProductById: false,
    isLoadingProductCategory: false,
    checkStateClickCategory: false,
    isSearching: false,
    sortName: '',
    categoryName: '',
    offsetState: 0,
};

const ProductsSlice: any = createSlice({
    name: 'products',
    initialState,
    reducers: {
        deleteDataProductId: (state) => {
            state.productById = {};
            state.productSame = [];
        },
        deleteDataProducts: (state) => {
            state.products = [];
        },
        checkStateGetProductByCategoryId: (state, action) => {
            state.checkStateClickCategory = true;
            state.categoryName = action.payload;
        },
        deleteDataProductByCategoryId: (state) => {
            state.productCategoryId = [];
            state.checkStateClickCategory = false;
            state.categoryName = '';
            state.offsetState = 0;
        },
        clearSearching: (state) => {
            state.productSearches = [];
        },
        updateStateSortName: (state, action) => {
            state.sortName = action.payload;
        },
        updateStateOffset: (state) => {
            state.offsetState = state.offsetState + 16;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findProductHome.pending, (state) => {
                state.isLoadingProductHome = true;
            })
            .addCase(findAllProductShop.pending, (state) => {
                state.isLoadingProductShop = true;
                state.checkStateClickCategory = false;
            })
            .addCase(findAllProductShopBySortPrice.pending, (state) => {
                state.isLoadingProductShop = true;
                state.checkStateClickCategory = false;
            })
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoadingProductById = true;
            })
            .addCase(findProductByCategoryId.pending, (state) => {
                state.isLoadingProductCategory = true;
            })
            .addCase(findProductBySearching.pending, (state) => {
                state.isSearching = true;
            })
            .addCase(findAllProductByCategoryName.pending, (state) => {
                state.isLoadingProductShop = true;
            })
            .addCase(findProductHome.fulfilled, (state, action: PayloadAction<ResponseProductHome>) => {
                state.isLoadingProductHome = false;
                state.productHomes = action.payload;
            })
            .addCase(findAllProductShop.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoadingProductShop = false;
                state.productCategoryId = [];
                const newArr: Product[] = [...state.products, ...action.payload];
                state.products = newArr.filter((item, index, self) => {
                    return self.findIndex((t) => t.productId === item.productId) === index;
                });
            })
            .addCase(findAllProductShopBySortPrice.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoadingProductShop = false;
                state.productCategoryId = [];
                let newArr: Product[] = [];
                if (state.sortName !== '') {
                    newArr = [...state.products, ...action.payload];
                } else {
                    newArr = action.payload;
                }
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
            .addCase(findProductByCategoryId.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoadingProductCategory = false;
                state.checkStateClickCategory = true;
                const newArr: Product[] = [...state.productCategoryId, ...action.payload];
                state.productCategoryId = newArr.filter((item, index, self) => {
                    return self.findIndex((t) => t.productId === item.productId) === index;
                });
            })
            .addCase(findProductBySearching.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isSearching = false;
                state.productSearches = action.payload;
            })
            .addCase(findAllProductByCategoryName.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoadingProductShop = false;
                const newArr: Product[] = [...state.productCategoryId, ...action.payload];
                state.productCategoryId = newArr.filter((item, index, self) => {
                    return self.findIndex((t) => t.productId === item.productId) === index;
                });
            })
            .addCase(findProductHome.rejected, (state) => {
                state.error = 'error when get product';
                state.isLoadingProductHome = false;
            })
            .addCase(findAllProductShop.rejected, (state) => {
                state.error = 'error when get product';
                state.isLoadingProductShop = false;
            })
            .addCase(findAllProductShopBySortPrice.rejected, (state) => {
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
            })
            .addCase(findProductByCategoryId.rejected, (state) => {
                state.error = 'error when get products by categoryId';
                state.isLoadingProductCategory = false;
            })
            .addCase(findProductBySearching.rejected, (state) => {
                state.error = 'error when get products by search';
                state.isSearching = false;
            })
            .addCase(findAllProductByCategoryName.rejected, (state) => {
                state.error = 'error when get products by search';
                state.isLoadingProductShop = false;
            });
    },
});
export const {
    deleteDataProductId,
    deleteDataProducts,
    checkStateGetProductByCategoryId,
    deleteDataProductByCategoryId,
    clearSearching,
    updateStateSortName,
    updateStateOffset,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
