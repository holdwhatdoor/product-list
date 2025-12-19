import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  let navigate = useNavigate();
  const defaultHomeRoute = () => {
    const homePageUrl = 'products?page=1&price=desc';
    navigate(homePageUrl);
  }

  const loginRoute = () => {
    const loginURL = '/auth/login'
    navigate(loginURL)
  }

  const createAcctRoute = () => {
    navigate('signup')
  }

  return (
  <div style={{ display: 'center', alignItems: "center"}}>
    <button className= "home-btn classic" onClick={defaultHomeRoute} >Products Home</button>
    <button class="login-btn classic" onClick={loginRoute}>Login</button>
    <button class='create-acct-btn classic' onClick={createAcctRoute}>Create Account</button>
  </div>
  )
}

export default Home;