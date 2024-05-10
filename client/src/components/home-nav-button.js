import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const HomeNavButton = () => {

  let navigate = useNavigate();
  const changeRoute = () => {
    const homePageUrl = 'products?page=1&price=desc';
    navigate(homePageUrl);
  }

  return (
  <div style={{ display: 'center', alignItems: "center"}}>
    <button className= "home-btn classic" onClick={changeRoute} >Products Home</button>
  </div>
  )
}

export default HomeNavButton;