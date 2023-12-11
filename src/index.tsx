import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import DefaultLayout from './components/DefaultLayouts/DefaultLayout';
import ReactGA from 'react-ga4';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
ReactGA.initialize('G-F9L6MRWQNG');
ReactGA.send({ hitType: 'pageview', page: '/', title: 'Custom Title' });
root.render(
    <GlobalStyles>
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <DefaultLayout>
                        <App />
                    </DefaultLayout>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    </GlobalStyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
