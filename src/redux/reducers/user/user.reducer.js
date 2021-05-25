
import types from './user.types';

const initial_state = {
    count_message_unRead : 0 ,
    status_message : false ,
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



    default:
            return state;
    }
}

export default userReducer;