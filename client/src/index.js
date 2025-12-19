import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import './index.css';
import UserPage from './components/user-page'
import ProductsIndex from './components/products-index';
import ProductDetail from './components/product-detail';
import reportWebVitals from './reportWebVitals';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ Home }/>
        <Route path='/signup' Component={ Signup } />
        <Route path='/auth/login' Component={ Login } />
        <Route path='/auth/:user' Component={ UserPage } />
        <Route path="/auth/:user/products" Component={ ProductsIndex }/>
        <Route path="/auth/:user/products/:product" Component={ ProductDetail }/>
        <Route path="/auth/:user/products/:product/reviews" Component={ ProductDetail }/>
        <Route path="/auth/:user/products/:product/reviews/:review" Component={ ProductDetail }/>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
