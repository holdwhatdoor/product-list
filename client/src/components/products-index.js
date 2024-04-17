import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCardIndex  from './product-card-index';
import { fetchProducts } from '../reducers/productsSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Header from '../components/header';
import SearchBar from './search-bar';

const ProductsIndex = () => {
  const store = useStore();
  const productsData = useSelector((state) => state.products)

  // test product returned data -- to be removed --
  console.log("product-list component state productsData _-_-_-_")
  console.log(productsData);

  const productGridRow = (products) => {
    let gridArray = [];

  }

  return (
      <div className="product-page-container" style={{ backgroundColor: 'lightgrey', position: 'absolute', height: "100%", width: "100%"}}>
        <Header />
        <SearchBar />
        <div className="product-page grid row" style={{ alignContent: "flex-start", height: "100%"}} >
          <div className="col" style={{ }}>
            <ProductCardIndex />
            <h3>${}</h3>
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