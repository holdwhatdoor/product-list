import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/index'
import { useEffect, useState } from 'react';
import Header from './header';
import ProductsIndex from './products-index';

const UserPage = () => {
  
  const navigate = useNavigate();
  const handleUserCartClick = () => {

  }
  const handleLogOut = () => {
    navigate('/login')
  }
  
  return(
    <div class="user-page">
      <div class="user-page-header row">
        <div class='col-md-4'>user placeholder text</div>
        <div class='col-md-4'></div>
        <div class='col-md-4'>
          <div 
            class='user-cart col-md-8'
            onClick={handleUserCartClick}>
              CART placeholder text
          </div>
        </div>
      </div>
      <div class='products-display col'>
        Products placeholder text
      </div>
      <div class='col-md-8'>
        <button
          id='user-page-logout-btn'
          onClick={handleLogOut}>
            Log Out
        </button>
      </div>
    </div>
  )
}

export default UserPage;
