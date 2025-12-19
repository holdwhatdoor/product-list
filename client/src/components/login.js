import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/index'
import { useEffect, useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [ usernameInput, setUsernameInput ] = useState('')
  const [ passwordInput, setPasswordInput ] = useState('')

  const handleUsernameInputChange = (usernameText) => {
    setUsernameInput(usernameText)
  }

  const handlePasswordInputChange = (passwordText) => {
    setPasswordInput(passwordText)
  }

  const handleSubmitLogin = (e, user, password) => {
    e.preventDefault()
    login({username: user, password}, () => {
      navigate(`/auth/${user}`)
    })
  }

  const cancelClick = () => {
    navigate('/')
  }

  return(
    <form>
      <div>
        <label>Username: </label>
        <input 
          id='username-input'
          onChange={(event) => handleUsernameInputChange(event.target.value)}/>
        <label>Password: </label>
        <input 
          id="user-login-password"
          type='password' 
          onChange={(event) => handlePasswordInputChange(event.target.value)}/>
        <div>
          <button 
            id='user-login-submit-btn'
            type='button'
            onClick={(e) => handleSubmitLogin(e, usernameInput, passwordInput)}
              >Submit
          </button>
        </div>
        <div>
          <button 
            id="cancel-login-btn" 
            onClick={cancelClick}>
            Cancel
          </button>
        </div>  
      </div>
    </form>
  )
}

export default Login;