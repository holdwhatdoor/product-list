import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const HomeNavButton = () => {

  let navigate = useNavigate();
  const changeRoute = () => {
    let homePage = '/products?page=1&price=highest';
    navigate(homePage);
  }

  return (
  <div style={{ display: 'center', alignItems: "center"}}>
    <button className= "home-btn classic" onClick={changeRoute} >Products Home</button>
  </div>
  )
}

export default HomeNavButton;