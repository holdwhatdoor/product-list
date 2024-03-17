import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';

const ProductCardIndex = () => {
  const store = useStore();
  const product = useSelector((state) => state);

  return (
    <div className="card-container" style={{width: '95%', height: '90%', padding: '5%' }}>
      <div className='header' style={{ width: "100%", backgroundColor: 'white', borderColor: 'white', display: 'inline-block' }}>
        <label className='card-header col-sm-3' style={{fontSize: 15, backgroundColor: 'white', textAlign: "center", verticalAlign: "text-bottom", marginLeft: '3%'  }}>
          Category: 
        </label>
        <label className='card-header col-sm-4' style={{fontSize: 15, backgroundColor: 'white', fontWeight: 'bold'}} id="category-name" >
          TOOLS
        </label>
        <label className='card-header col-sm-4' style={{ backgroundColor: 'white', textAlign: "right"  }} id="price">
          <h3>700</h3>
        </label>        
      </div>
      <div className='card-body media' style={{padding:'1% 5% 1% 5%', backgroundColor: 'white', display: 'block'}}>
        <div className="image-container" style={{ backgroundColor: "grey", height: "100%", verticalAlign: 'middle', textAlign: 'center' }}>
          <img className='card-body' src='' id="product" alt="Product Image" />
        </div>
      </div>  
      <div className='card-footer' id="product-name" style={{ padding: '5%', backgroundColor: 'white'}}>
        <h3 id="product-name">Product Name</h3>
      </div>
    </div>
  );
}

export default ProductCardIndex;
