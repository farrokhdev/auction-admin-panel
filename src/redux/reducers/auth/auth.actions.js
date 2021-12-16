import types from './auth.types';
import axios from "../../../utils/request";
import {BASE_URL} from "../../../utils";
import {REFRESH_TOKEN} from "../../../utils/constant";
import {getRefreshToken, setToken} from "../../../utils/utils";


// ----- Register --------
// export const registerStart = () => (
//     {
//         type : types.REGISTER_START
//     }
// )

// export const registerSuccess = (data) => (
//     {
//         type : types.REGISTER_SUCCESS,
//         payload : data
//     }
// )

// export const registerError = (error)=> (
//     {
//         type : types.REGISTER_ERROR,
//         payload : error
//     }
// )


export const refreshToken = () => async dispatch => {

    let refresh = getRefreshToken()
    if (refresh)
        axios.post(`${BASE_URL}/account/token/refresh/`, {refresh})
            .then(r => {
                setToken(r.data.data.result);
                console.log(r)
                return r;
            }).catch(e => {
            dispatch(clearStorage())
            // clearStorage()
            window.location.href = "#/login"
        })
    else {
        dispatch(clearStorage())
        // clearStorage()
        window.location.href = "#/login"
    }


}

export const clearStorage = () => (
    {
        type : types.CLEAR_STORAGE,
    }
)




export const setPhoneNumber = (data) => (
    {
        type : types.SET_PHONENUMBER,
        payload : data
       
    }
)

export const setProfile = (data) => (
    {
        type : types.SET_PROFILE,
        payload : data
       
    }
)



export const loginSuccess = (data) => (
    {
        type : types.LOGIN_SUCCESS,
        payload : data
    }
)

export const getOtp = (data) => (
    {
        type : types.GET_OTP,
        payload : data
    }
)
 
