import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCardIndex  from './product-card-index';
import { fetchProducts } from '../reducers/productsSlice';
import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';

const ProductsIndex = () => {
  const store = useStore();
  const products = useSelector((state) => state)

  return (
    <div>
      <h3>Products Index</h3>
      <div>
         <ProductCardIndex />
      </div>
    </div>  
  );

}

export default ProductsIndex;