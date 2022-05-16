import logo from './logo.svg';
import './App.css';
import Header from './components/Header/header';
import Blog from './page/Home/index';
import BlogDetail from './page/BlogDetail/index';
import Register from './page/Register/index';
import Login from './page/Login/index';

import {ToastProvider} from 'react-toast-notifications';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';




  function App() {
    return (
        <div className="App">
           <BrowserRouter>
              <Header />
              <Route exact path="/" component={Blog} />
              <Route exact path="/blog/:id" component={BlogDetail} /> 
              <Route exact path="/register" component={Register} /> 
              <Route exact path="/login" component={Login} /> 
          </BrowserRouter>
        </div>
    );
  }

export default App;
