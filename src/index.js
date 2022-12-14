import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store, {persistor} from 'redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import '../node_modules/antd/dist/antd.css';
// import  './assets/style/mainFront.scss'
import  './assets/style/main.scss'
import  './assets/style/antd.scss'
import  './assets/style/custom.scss'
ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
