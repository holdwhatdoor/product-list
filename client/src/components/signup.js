import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signup } from '../actions/index'
import { useEffect, useState } from 'react';

const Signup = () => {
  
  const navigate = useNavigate();

  const [ usernameInput, setUsernameInput ] = useState('')
  const [ passwordInput, setPasswordInput ] = useState('')
  const [ confirmPasswordInput, setConfirmPasswordInput ] = useState('')
  const [ loginMsg, setLoginMsg ] = useState('')
  const [ createAcctSuccess, setCreateAcctSuccess ] = useState(false)

  const handleUsernameInputChange = (usernameText) => {
    setUsernameInput(usernameText)
  }

  const handlePasswordInputChange = (passwordText) => {
    setPasswordInput(passwordText)
  }

  const handleConfirmPasswordInputChange = (confirmPassText) => {
    setConfirmPasswordInput(confirmPassText)
  }

    /**
   * Function to handle Create Account button click
   * @param {String} username 
   * @param {String} password 
   * @param {String} confirmPass 
   */
  const handleCreateAccountClick = (e, username, password, confirmPass) => {
    e.preventDefault()
    if(password !== confirmPass){
      setCreateAcctSuccess(false)
      return setLoginMsg("Password confirmation does not match, please make sure they match!!")
    }
    if(password.length < 8){
      setCreateAcctSuccess(false)
      return setLoginMsg("Password must be at least 8 characters long.")
    }
    setCreateAcctSuccess(true)
    setLoginMsg("Account successfully created!")

    // save username/password to mongodb with encryption, then navigate to newly created user page
    // post call to send username and password to server to add to mongodb database
    const newUser = {
      username: username,
      password: password,
      // cart: []
    }
    
    signup(newUser)
    setUsernameInput('')
    setPasswordInput('')
    setConfirmPasswordInput('')
    navigate('/')

  }

  const cancelClick = () => {
    navigate('/')
  }

  return(
    <form>
      <div>
        <h5>Create New Account: </h5>
        <label>Username: </label>
        <input 
          id="create-username-input"
          type='text'
          onChange={(event) => handleUsernameInputChange(event.target.value)}
          value={usernameInput} />
        <label>Password: </label>
        <input 
          id="create-user-password"
          type='password'
          onChange={(event) => handlePasswordInputChange(event.target.value)}
          value={passwordInput} />
        <label>Confirm password:</label>
        <input 
          id="create-user-password-confirm"
          type='password'
          onChange={(event) => handleConfirmPasswordInputChange(event.target.value)}
          value={confirmPasswordInput} />  
        <div>
          { !createAcctSuccess ?
            (<label 
              id="create-acct-error-msg"
              style={{color: "red"}}>
                {loginMsg}
            </label>)
            :
            <label 
              id="create-acct-success-msg"
              style={{color: "green"}}>
                {loginMsg}
            </label>
          }
        </div>
        <div>
          <button 
            id="create-user-submit-btn"
            onClick={(e) => handleCreateAccountClick(e, usernameInput, passwordInput, confirmPasswordInput)}
              >Create Account
          </button>
          <button 
            id="create-acct-cancel-btn" 
            onClick={cancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </form>
    ) 
  }

  export default Signup;
  