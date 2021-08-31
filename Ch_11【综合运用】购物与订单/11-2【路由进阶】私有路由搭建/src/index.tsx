import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'; 
import "./i18n/configs"
import { Provider } from "react-redux";
// 原：import store from './redux/store';
import rootStore from './redux/store'
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.headers['x-icode'] = '8B5BFB18D4BDA097';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={rootStore.store}>
            <PersistGate persistor={rootStore.persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

