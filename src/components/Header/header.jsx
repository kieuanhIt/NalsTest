import React,{useState,useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Col, Container, Row} from 'reactstrap';
import './header.scss';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from "reactstrap";

function Header() {
    const dispatch = useDispatch();
    const isLogined = useSelector(state=> (state.userLogined.isLogined));
    const [ userName, setUserName ] = useState('');
    let token = "";

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
  
    // get user infomation 
    const getInfo = async () => {
        
        await axios.get('https://api-placeholder.herokuapp.com/api/v2/me',{
            contentType : 'application/json' ,
            headers: {
                Authorization: 'Bearer ' + token 
            },
       })
       .then (res => {
            dispatch({
                type: "CHANGE_LOGIN",
                payload: true
            })
            setUserName(res.data.data.name);
       })
       .catch(error => {
            refreshToken();
       })

    }
    // Logout user
    const logoutUser = async () => {
        
        await axios.delete('https://api-placeholder.herokuapp.com/api/v2/logout',{
            contentType : 'application/json' ,
            headers: {
                Authorization: 'Bearer ' + token 
            },
       })
       .then (res => {
           setTimeout(() => {
                dispatch({
                    type: "CHANGE_LOGIN",
                    payload: false
                })
           }, 500);
            
            console.log("logout");
            localStorage.setItem("token",null);  
       })
 

    }
    // refresh token
    const refreshToken = async () => {
        
        await axios.post('https://api-placeholder.herokuapp.com/api/v2/refresh_tokens',{
            contentType : 'application/json' ,
            
       })
       .then (res => {
           console.log(res);
       })

    }
    
    useEffect(() => {
        token = localStorage.getItem("token");
        if (token !== 'null') {
            getInfo();
        }  
    })
    
    return (
        <div className="header">
            <Container>
                <div className="wrap-menu">
                    <div className="left-head">
                        <Link to='/'>Home</Link>
                    </div>
                    {isLogined ? 
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>{userName}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem><Link to="/">Profile</Link></DropdownItem>
                            <DropdownItem onClick = {logoutUser}>Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    :
                    <ul className="right-head">
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                    </ul>    
                }  
                </div>
            </Container>
        </div>

    )
}

export default Header;