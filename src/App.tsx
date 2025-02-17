import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RouterPublic from './components/Router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    const PublicRouter = RouterPublic();
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
