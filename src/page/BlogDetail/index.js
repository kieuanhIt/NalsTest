import React,{useState,useEffect,useCallback} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import ModalEditBlog from './EditBlog';
import { Container} from 'reactstrap';
import axios from "axios";

function BlogDetail() {
    const { id } = useParams();
    const blogDetail = useSelector(state=> (state.viewBlogDetail.blogDetail));
    const isLogined = useSelector(state=> (state.userLogined.isLogined));
    const dispatch = useDispatch();

    const [loadedBlog, setLoadedBlog] = useState(false);

    // get blog detail form api
    const getBlog =  () => {
        
        axios.get(`https://api-placeholder.herokuapp.com/api/v2/blogs/${id}`,{
           contentType : 'application/json'
       })
       .then (res => {
           dispatch({
               type: "VIEW_BLOG",
               payload: res.data.data
               }
           )
          
        setLoadedBlog(true);
         
           
       })
    }
    useEffect (() => {
        getBlog();
       
    })
   
    return(
        <Container className="wrap-detail">
            <div className="head-blog">
                
                { (isLogined && loadedBlog)? 
                    <ModalEditBlog />
                    :
                    ''
                }  
            </div>
            <h3 className="text-center">{blogDetail.title}</h3>
            <p className="text-left">{blogDetail.content}</p>
        </Container>
    )
}
export default BlogDetail;