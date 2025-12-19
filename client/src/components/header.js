import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
// header DOM component
const Header = () => {
  const navigate = useNavigate();
  
  // const [logoutAlertVisible, setLogoutAlertVisible] = useState(false); 
  // const logoutAlert = () => {
  //   return (
  //     <div id="logout-alert-window">
  //         <p>Are You sure you want to log out?</p>
  //         <button
  //           id="logout-alert-logout-btn"
  //           onClick={confirmLogoutClick}>
  //           Log Out
  //         </button>
  //         <button
  //           id="logout-alert-cancel-btn"
  //           onClick={cancelLogoutClick}>
  //           Cancel
  //         </button>
  //     </div>
  //   )
  // }

  const handleLogoutBtnClick = () => {
    navigate('/')
  }

  // const confirmLogoutClick = () => {

  // }

  // const cancelLogoutClick = () => {
  //   setLogoutAlertVisible(false)
  // }

  return (
  <div id="header" >
    <div id="header-btn-container">
      <button 
        id="products-page-logout-btn"
        onClick={handleLogoutBtnClick}>
          Logout
      </button>
    </div>
  </div>
  )
}

export default Header;
