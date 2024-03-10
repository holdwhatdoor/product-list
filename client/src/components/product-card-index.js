import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';

const ProductCardIndex = () => {
  const store = useStore();
  const product = useSelector((state) => state);

  return (
    <div className='column'>
      <div className='column'>
        <div className='row' id="card-header" >
          <label>Category: </label>
          <label id="category-name" />
          <label id="price" />
        </div>
        <img src="" id="product-image" />
        <div className='row' id="product-name" ></div>
      </div>
    </div>
  );
}

export default ProductCardIndex;
