import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RouterPublic from './components/Router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getAllProductInCart } from './redux/Cart/cart';
import { checkStateLogin } from './redux/Authentication/Authentication';
import { useAppDispatch, useAppSelector } from './redux/store';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function App() {
    const PublicRouter = RouterPublic();
    const dispatch = useAppDispatch();
    const { isLogined } = useAppSelector((state) => state.users);
    useEffect(() => {
        const accessToken: string | undefined = Cookies.get('accessToken');
        if (accessToken !== undefined && accessToken.length > 0 && window.location.pathname !== '/' && isLogined) {
            Promise.all([dispatch(checkStateLogin()), dispatch(getAllProductInCart())]);
        }
    }, [dispatch, isLogined]);
    return (
        <div className="App">
            <GoogleOAuthProvider clientId="113414924296-lofvl5t2be4ivhr84i5o3o709sp19jof.apps.googleusercontent.com">
                <Routes>
                    {PublicRouter.map((router, index) => {
                        const Page = router.component;
                        return <Route key={index} path={router.path} element={<Page />} />;
                    })}
                </Routes>
            </GoogleOAuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
