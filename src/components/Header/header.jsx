import React,{useState,useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { NavLink,Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Container, Row} from 'reactstrap';
import './header.scss';
import axios from "axios";


function Header() {
    // const isLogined = useSelector(state=> (state.userLogined));
    const dispatch = useDispatch();
    // localStorage.setItem("isLogined", false);
    if (typeof localStorage.getItem("isLogined") !== 'undefined') {
        console.log(localStorage.getItem("isLogined"));
    }
    else {
        localStorage.setItem("isLogined",false);
    }

    // get user infomation 
    const getBlog = async () => {
        
        await axios.get('https://api-placeholder.herokuapp.com/api/v2/me',{
           contentType : 'application/json' ,
       })
       .then (res => {
           dispatch({
               type: "SHOW_LIST_BLOG",
               payload_list: res.data.data.items
               }

           )
       })

   }
    return (
        <div className="header">
            <Container>
                <div className="wrap-menu">
                    <div className="left-head">
                        <Link to='/'>Home</Link>
                    </div>
                    
                    <ul className="right-head">
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                    </ul>
                </div>
            </Container>
        </div>

    )
}

export default Header;