import React,{useState,useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Media , Container} from 'reactstrap';
import PaginationBlog from './PaginationBlog';
import SearchBar from './Search';
import BlogDetail from '../BlogDetail/index';
import './blog.scss'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import axios from "axios";

function Blog() {
    
    const listBlog = useSelector(state=> (state.showListBlog.listBlog));
    const pageNumber = useSelector(state=> (state.showListBlog.pageNumber));
    const idBlog = useSelector(state=> (state.viewBlogDetail.idBlog));
    const [ isSearch, setIsSearch ] = useState(false);

    const dispatch = useDispatch();

    // get blogs from api
    const getBlog = async () => {
        
         await axios.get('https://api-placeholder.herokuapp.com/api/v2/blogs',{
            contentType : 'application/json' ,
            params: {page: pageNumber}
        })
        .then (res => {
            dispatch({
                type: "SHOW_LIST_BLOG",
                payload_list: res.data.data.items
                }

            )
        })

    }
    
    // Handling the search feature for blog list 

    const filterPosts = (listBlog, query) => {
        if (!query) {
            return listBlog;
        }
    
        return listBlog.filter((post) => {
            const postName = post.title.toLowerCase();
            return postName.includes(query);
        });
    };
    // const { search } = window.location;
    // const query = new URLSearchParams(search).get('s');
    // const [searchQuery, setSearchQuery] = useState(query || '');
    // const filteredPosts = filterPosts(listBlog, query);
    // function clearFilter() {
    //     document.getElementById("searchFilter").value = "";
    //   }
    function searchList(event) {
        var updatedList = listBlog;
        var currentVal = event.target.value;
        updatedList = updatedList.filter(function(item){
          return item.title.toLowerCase().search(currentVal.toLowerCase()) !== -1;
        });
        setTimeout(() => {
            dispatch({
                type: "SHOW_LIST_BLOG",
                payload_list: updatedList
                }
            )
            console.log(listBlog,updatedList)
        }, 300);
        
        setIsSearch(true);
        
      }
    
    
      
    useEffect(() => {
        // setTimeout(() => {
        //     ;
        // }, 0);
        getBlog();    
    })
    return (
        <Container>
             <input type="text" placeholder="Search" onChange={searchList}/>
            <Media list className="list-blog">
            {listBlog.map((item,index) => 
                <Media key={index} tag="li"> 
                    <Media className="thumb-blog">                      
                        <Media
                            object
                            src={item.image.url}
                            alt="blog"
                            width="100px"
                        />                                                                    
                    </Media>
                    <Media body>
                        <Link className="title-blog"  to={`/blog/${item.id}`}>{item.title}</Link> 
                        <p>{item.content}</p>
                    </Media> 
                </Media>
            )   
            } 
            </Media>  
            <PaginationBlog />
        </Container>
    )
}

export default Blog;
