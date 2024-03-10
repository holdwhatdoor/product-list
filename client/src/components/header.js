import React from "react";
// header DOM component
const Header = (props) => (
  <div>
    <div className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">Product List</h1>
      </div>
    </div>
    <div className="container">{props.children}</div>
  </div>
);

export default Header;
