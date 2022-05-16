const inState = {
    isLogined : false
};

// set user logined already or not
export const userLogined = (state = inState,action) => {
    switch(action.type){
        case("CHANGE_LOGIN"):
        const isLogined = action.payload;
            return {
                ...state,
                isLogined
            }
        default :
            return {...state};
    }
}
