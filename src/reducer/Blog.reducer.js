
import axios from "axios";


const initialState = {
    listBlog : [],
    pageNumber: 1,
    blogDetail : {},
};

// reducer for Blog page
export const showListBlog = (state = initialState,action) => {
   switch(action.type){
        case "SHOW_LIST_BLOG" :
            const listBlog = action.payload_list;
            return {...state,listBlog}
        case "CHANGE_PAGE":
            const pageNumber = action.payload_number;
            return { ...state,pageNumber}
        
        default:
            break;
   }
    return {...state};
}


// reducer for Blog Detail page

export const viewBlogDetail = (state = initialState, action) => {
    switch(action.type){
        case  "VIEW_BLOG":
            const blogDetail = action.payload;
            return {...state,blogDetail};
    }
    return {...state};
}