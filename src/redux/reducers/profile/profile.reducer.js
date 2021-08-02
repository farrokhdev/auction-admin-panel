import types from './profile.types';
import {removeToken, Token} from '../../../utils/utils'
import typesAll from "../all/all.types";

const initial_state = {
    pending: false,
    error: null,
    "id": null,
    "first_name": null,
    "last_name": null,
    "username": "",
    "address": null,
    "postal_code": null,
    "email": null,
    "mobile": "",
    "national_code": null,
    "role": ""
}


const profileReducer = (state = initial_state, {type, payload={}}) => {
    switch (type) {
        case types.SET_PROFILE:
            return {
                ...state,
                ...payload,
                pending: true,
                error: null
            }
        case typesAll.CLEAR_STORAGE_ALL:
            return initial_state
        default :
            return state;
    }
}

export default profileReducer;