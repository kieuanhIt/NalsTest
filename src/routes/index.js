import React,{useState,useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header/header';
import Login from '../components/Login/index';
import BlogDetail from '../page/BlogDetail/index';
import {ToastProvider} from 'react-toast-notifications'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

function Routes() {
    const data = useSelector(state=> (state.showListBlog.listBlog));
    // const BlogDetail = ({item}) => {

    //      return (
          
    //         <h4 className='text-dark'>hihihi</h4>
    //  )
    //  }
    return(
        <BrowserRouter>
            <Route exact path="/"><Header/></Route>
            <Route path="/login" component={Login} />
            {/* <Route path="/blog/:id" component={({ match }) => ( 
                <BlogDetail item={data.find((item) => String(item.id) === String(match.params.id))} />
            )} /> */}
            <Route path='/blog' component={BlogDetail}>  </Route>
            {/* <Route path="/cash-in" >
                <ToastProvider
                    >
                    <CashIn />
                </ToastProvider>
            </Route> */}
        </BrowserRouter>
    )
}
export default Routes;