import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink,Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios' ;
import { Col, Container, Row} from 'reactstrap';
import './header.scss';

function Header() {
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