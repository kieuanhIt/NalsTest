const list_cashin = [];
export const showListCashin = (state = list_cashin,action) => {
    switch(action.type){
        case('ADD_ITEM_CASHIN'): {
            const new_list = {... state.list_cashin};
            // new_list.push(action.payload);
            // console.log(action.payload);
            return {
                ... state,
                list_cashin: new_list
            }
        }
        default:
            return state;
    }
}
export const addLishCashIn = (list_cashin) => {
    return {
        type: 'ADD_ITEM_CASHIN',
        payload :list_cashin
    }
} 