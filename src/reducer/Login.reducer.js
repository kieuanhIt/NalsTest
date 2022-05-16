const inState = {
    isLogined : false
};
const account = {
    username : '',
    password : ''
}

// set user logined already or not
export const userLogined = (state = inState,action) => {
    switch(action.type){
        case("CHANGE_LOGIN"):
            return {
                ...state,
                isLogin: action.payload
            }
        default :
            return state;
    }
}
// set account login
export const accLogin = (state = account, action) => {
    switch(action.type){
        case("LOGINED"):
            return{ 
                ...state,
                username: action.payload.username,
                password: action.payload.password
            }
        default:
            return state;
    }
}