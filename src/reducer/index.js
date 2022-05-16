import { useReducer } from "react";
import { combineReducers } from "redux";
import { showListBlog,viewBlogDetail } from './Blog.reducer';
import { userLogined,accLogin } from './Login.reducer';
import { accRegister } from './Register.reducer';

const rootReducer = combineReducers({
    showListBlog,
    viewBlogDetail,
    userLogined,
    accLogin,
    accRegister
})
export default rootReducer;