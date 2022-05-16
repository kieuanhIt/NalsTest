import React,{useState,useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Media , Container} from 'reactstrap';
import axios from "axios";

export default function Register() {
 
    // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [txtError, setTxtError] = useState(false);
    const [errorDetail, setErrorDetail] = useState(0);
   
    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };
   
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
    // Handling the confirm password
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setSubmitted(false);
    };

    // Api to register
    const submitRegister =  () => {
        
        axios.post(`https://api-placeholder.herokuapp.com/api/v2/users/`,{
            user: {name : name,email : email,password : password}, 
           contentType : 'application/json'
       })
       .then (res => {
            setTimeout(() => {
                window.location = '/login';
            }, 1000);
       })
       .catch ( error => {
            setTxtError(error.response.data.errors[0].message);
            
       })
    }
    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setError(true);              
        } 
        else if(name.length > 50) setErrorDetail(1)
        else if(password.length < 8 ) setErrorDetail(2)
        else if(password !== confirmPassword ) setErrorDetail(3)
        else {
            setSubmitted(true);
            setError(false);
            submitRegister();
        }
    };
   
    // Showing notification message when submit form
    const successMessage = () => {
      return (
        <div
            style={{
                display: submitted ? '' : 'none',
            }}>
            {txtError == ''? <h3 className="txt-success">User {name} successfully registered!!</h3> 
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
          <h1>User Registration</h1>
        </div>
   
        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
   
        <form>
          {/* Labels and inputs for form data */}
            <div className="group-input">
                <label className="label">Name</label>
                <input onChange={handleName} className="input"
                    value={name} type="text" />
                {errorDetail == 1 ? <span>You exceeded the maximum number (50) of Text characters!!</span> : '' }
            </div>
         
            <div className="group-input">
                <label className="label">Email</label>
                <input onChange={handleEmail} className="input"
                value={email} type="email" />
            </div>

            <div className="group-input">
                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                    value={password} type="password" />
                {errorDetail == 2 ? <span>At least 8 characters</span> : '' }
            </div>
            <div className="group-input">
                <label className="label">Confirm Password</label>
                <input onChange={handleConfirmPassword} className="input"
                    value={confirmPassword} type="password" />
                {errorDetail == 3 ? <span>Passwords don't match.</span> : '' }
            </div>

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }