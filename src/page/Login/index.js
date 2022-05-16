import React,{useState,useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Form,FormGroup,Input,Label,Button,Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
            <h4>Please enter all the fields</h4>
        </div>
      );
    };
   
    return (
      <Container>
          <div className="wrap-form">
            <div className="cont-form">
              <h3>Login</h3>
   
              {/* Calling to the methods */}
              <div className="messages">
                {errorMessage()}
                {successMessage()}
              </div>
              <Form className="form">
                  <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                      onChange={handleEmail} className="input"
                      value={email} type="email"
                      placeholder="Enter your email"
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                      onChange={handlePassword} className="input"
                      value={password} type="password"
                      placeholder="Enter your password"
                      />

                  </FormGroup>
                  <Button onClick={handleSubmit} className="btn btn-form" type="submit">
                      Submit
                  </Button>
                </Form>
            </div>
            
        </div>
      </Container>
    );
  }