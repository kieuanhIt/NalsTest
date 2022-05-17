import React,{useState,useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Media , Container} from 'reactstrap';
import PaginationBlog from './PaginationBlog';
import SearchBar from './Search';
import ModalAddBlog from './AddBlog';
import BlogDetail from '../BlogDetail/index';
import './blog.scss'; 

import { Link } from 'react-router-dom';
import axios from "axios";




function Blog() {
    
    const listBlog = useSelector(state=> (state.showListBlog.listBlog));
    const filteredData = useSelector(state=> (state.showFiltedBlog.filterBlog));
    const pageNumber = useSelector(state=> (state.showListBlog.pageNumber));
    const idBlog = useSelector(state=> (state.viewBlogDetail.idBlog));
    const isLogined = useSelector(state=> (state.userLogined.isLogined));
    const [ isSearch, setIsSearch ] = useState(false);
    const [ query, setQuery ] = useState('');
  
    const dispatch = useDispatch();

   

    // get blogs from api
    const getBlog = async () => {
        
         await axios.get('https://api-placeholder.herokuapp.com/api/v2/blogs',{
            contentType : 'application/json' ,
            params: {page: pageNumber}
        })
        .then (res => {
            // dispatch({
            //     type: "SHOW_LIST_BLOG",
            //     payload_list: res.data.data.items
            //     }

            // )  
            const filteredData = res.data.data.items.filter(element => {
                return element.title.toLowerCase().includes(query.toLowerCase());
              });
            dispatch({
                type: "SHOW_FILTER_BLOG",
                payload_filter: filteredData
                }

            )    
        })

    }
   
    // Handling the search feature for blog list 
    const handleInputChange = event => {
        const query = event.target.value;
        setQuery(query);
        
        
      };
    
    const txtSub = (item) => {
        if(item.length < 100)
            return item;
        else
            return item.toString().slice(3).substr(0,100)+ '...';
    }
    useEffect(() => {
        getBlog();    
    })


    return (
        <Container>
            <div className="head-blog">
                <div className="search">
                    <input type="text" placeholder="Search" onChange={handleInputChange}/>
                </div>
                { isLogined ? 
                    <ModalAddBlog />
                    :
                    ''
                }  
            </div>
             <Media list className="list-blog">
            {filteredData.map((item,index) => 
                <Media key={index} tag="li"> 
                    <Media className="thumb-blog">    
                        <Link className="title-blog"  to={`/blog/${item.id}`}>                  
                            <Media
                                object
                                src={item.image.url}
                                alt="blog"
                                width="100px"
                            />       
                        </Link>                                                             
                    </Media>
                    <Media body>
                        <Link className="title-blog"  to={`/blog/${item.id}`}>{item.title}</Link> 
                        <p>{txtSub(item.content)}</p>
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
