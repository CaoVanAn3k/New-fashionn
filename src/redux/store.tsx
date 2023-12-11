import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from './products/products';
import AuthenticationProvider from './Authentication/Authentication';
import CartsProvider from './Cart/cart';
import PaymentProvider from './payment/payment';
import VoucherProvider from './voucher/voucher';
import OrderProvider from './order/order';
import { useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        users: AuthenticationProvider,
        carts: CartsProvider,
        payment: PaymentProvider,
        voucher: VoucherProvider,
        order: OrderProvider,
    },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: (selector: (state: RootState) => any) => any = useSelector;
