
import types from './user.types';

const initial_state = {
    count_message_unRead : 0 ,
    status_message : false ,
    user_to_saleconsuler_response : {label : '' , value : '' }
}

const userReducer = (state = initial_state, {type, payload}) => {
    switch (type) {

    case types.COUNT_UNREAD_MESSAGE:
        return {
            ...state,
            count_message_unRead : payload
        }

    case types.STATUS_MESSAGE:
        return {
            ...state,
            status_message : true
        }

    case types.SET_USER_FOR_SALSE_CONSULER_RESPONSE:
        console.log("SET_USER_FOR_SALSE_CONSULER_RESPONSE----->>>>" , payload );
        return {
            ...state,
            user_to_saleconsuler_response : payload
        }



    default:
            return state;
    }
}

export default userReducer;