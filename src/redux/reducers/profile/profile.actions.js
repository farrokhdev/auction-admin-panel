import types from './profile.types';
import axios from "../../../utils/request";
import {BASE_URL} from "../../../utils";
import {EDIT_PROFILE} from "../../../utils/constant";

// ----- Register --------
export const setProfile = (payload) => (
    {
        type: types.SET_PROFILE,
        payload
    }
)


export const getProfile = () => {
    return (dispatch) => {
        axios.get(`${BASE_URL}${EDIT_PROFILE}`)
            .then(r => {
                if(r?.data.code===200)
            dispatch(setProfile(r.data.data.result))
        }).catch(e => {

        })
    }
}



