const detailUser = [];
 export const showDetailUser = (state = detailUser,action) => {
     switch(action.type){
        case('UPDATE_USER'):
            const newList = {... detailUser};
            return {
                detailUser: newList,
            }
        default:
            return state;
     }
 }
 export const UpdateUser = (detailUser) => {
    return {
        type : "UPDATE_USER",
        payload: detailUser
    }    
    
 }