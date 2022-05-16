import React,{useState,useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Media , Container} from 'reactstrap';
import axios from "axios";

export default function Login() {
    
    const dispatch = useDispatch();
    // States for login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [txtError, setTxtError] = useState(false);
   
   
    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };
   
    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Api to Login
    const submitLogin =  () => {
        
        axios.post(`https://api-placeholder.herokuapp.com/api/v2/login/`,{
            email : email,
            password : password,
           contentType : 'application/json'
       })
       .then (res => {
            // localStorage.setItem("isLogined", true);
            localStorage.setItem("token", res.data.data.token);
            setTimeout(() => {
                window.location = '/';
            }, 1000);
       })
       .catch ( error => {
           console.log(error)
            setTxtError(error.response.data.message);
            
       })
    }
    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if ( email === '' || password === '') {
            setError(true);              
        } 
        else {
            setSubmitted(true);
            setError(false);
            submitLogin();
        }
    };
   
    // Showing notification message when submit form
    const successMessage = () => {
      return (
        <div
            style={{
                display: submitted ? '' : 'none',
            }}>
            {txtError == ''? <h3 className="txt-success"> </h3> 
            :
            <h3>{txtError}</h3>}
          
        </div>
      );
    };
   
    // Showing error message if error is true
    const errorMessage = () => {
      return (
        <div
            className="error"
            style={{
                display: error ? '' : 'none',
            }}>
            <h1>Please enter all the fields</h1>
        </div>
      );
    };
   
    return (
      <div className="form">
        <div>
          <h1>Login</h1>
        </div>
   
        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
   
        <form>
          {/* Labels and inputs for form data */}
         
            <div className="group-input">
                <label className="label">Email</label>
                <input onChange={handleEmail} className="input"
                value={email} type="email" />
            </div>

            <div className="group-input">
                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                    value={password} type="password" />
            </div>
          
          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }