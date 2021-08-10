import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "./i18n/configs"
import { Provider } from "react-redux";
import store from './redux/store';
import axios from "axios";

axios.defaults.headers['x-icode'] = 'C12CC1446DC2E1B2';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

