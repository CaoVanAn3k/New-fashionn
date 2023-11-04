import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RouterPublic from './components/Router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    const PublicRouter = RouterPublic();
    return (
        <div className="App">
            <Routes>
                {PublicRouter.map((router, index) => {
                    const Pages = router.component;
                    return <Route key={index} path={router.path} element={<Pages />} />;
                })}
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
