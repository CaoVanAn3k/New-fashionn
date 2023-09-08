import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RouterPublic from './components/Router/Router';

function App() {
    const PublicRouter = RouterPublic();
    return (
        <div className="App">
            <Routes>
                {PublicRouter.map((router, index) => {
                    const Page = router.component;
                    return <Route key={index} path={router.path} element={<Page />} />;
                })}
            </Routes>
        </div>
    );
}

export default App;
