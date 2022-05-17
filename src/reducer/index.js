import { useReducer } from "react";
import { combineReducers } from "redux";
import { showListBlog,viewBlogDetail,showFiltedBlog } from './Blog.reducer';
import { userLogined } from './Login.reducer';
import { accRegister } from './Register.reducer';

const rootReducer = combineReducers({
    showListBlog,
    viewBlogDetail,
    userLogined,
    accRegister,
    showFiltedBlog
})
export default rootReducer;