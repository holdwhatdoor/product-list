import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCardIndex  from './product-card-index';
import { fetchProducts } from '../reducers/productsSlice';
import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import Header from '../components/header';
import SearchBar from './search-bar';

const ProductsIndex = () => {
  const store = useStore();
  // const products = useSelector((state) => state)

  const productGridRow = (products) => {
    let gridArray = [];

  }

  return (
    // <div className="main-products-page">
      <div className="product-page-container" style={{ backgroundColor: 'lightgrey', position: 'absolute', height: "100%", width: "100%"}}>
        <Header />
        <SearchBar />
        <div className="product-page grid row" style={{ alignContent: "flex-start", height: "100%"}} >
          <div className="col" style={{ }}>
            <ProductCardIndex />
          </div>
          <div className="col">
            <ProductCardIndex />
          </div>
          <div className="col">
            <ProductCardIndex />
          </div>
        </div>
      </div>  
  );

}

export default ProductsIndex;