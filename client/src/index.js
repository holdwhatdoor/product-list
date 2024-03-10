import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import './index.css';
import App from './App';
import Header from './components/header';
import SearchBar from './components/search-bar';
import ProductsIndex from './components/products-index';
import reportWebVitals from './reportWebVitals';
import ProductCardIndex from './components/product-card-index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <SearchBar />
      <Routes>
        {/* <Route path="/" Component={ ProductsIndex } /> */}
        <Route path="/products" Component={ ProductsIndex }/>
        <Route path="/products/:product" Component={ ProductCardIndex }/>
        <Route path="/products/:product/reviews" Component={ ProductsIndex }/>
        <Route path="/reviews/:review" Component={ ProductsIndex }/>
      </Routes>
    </BrowserRouter>
  </Provider>
  // ,
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
