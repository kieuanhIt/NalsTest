import React,{useState,useEffect,useCallback} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import './blog.scss'; 
import axios from "axios";


function PaginationBlog() {
    const [pageCount,setPageCount] = useState(1);
    const pageNumber = useSelector(state=> (state.showListBlog.pageNumber));
    const dispatch = useDispatch();

    // get the total page of blog
    const getTotalPage = () => {
        axios.get('https://api-placeholder.herokuapp.com/api/v2/blogs',{
            contentType : 'application/json' ,
        })
        .then (res => {
            setPageCount(res.data.pagination.total);
        })
    }
    const handlePageClick = ({ selected }) => {
        dispatch({
            type: "CHANGE_PAGE", 
            payload_number: selected + 1
        })
    };
    
    useEffect(() => {
        getTotalPage();
      
    })

    return(
        <div className="wrap-pagination">
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
            />
        </div>
        
    )
}
export default PaginationBlog;