import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// const Api_url = process.env.REACT_APP_API_URL;
export const findAllProducts = createAsyncThunk('findAllProducts', async (data) => {});
const initialState = {
    loading: false,
    products: [],
    error: '',
};
const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});
export default ProductsSlice.reducer;
