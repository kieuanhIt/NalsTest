const account = {
    username : '',
    email:'',
    password : ''
}

// set account register
export const accRegister = (state = account, action) => {
    switch(action.type){
        case("REGISTER"):
            return{ 
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password
            }
        default:
            return state;
    }
}