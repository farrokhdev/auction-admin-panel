import types from './auth.types';
import {removeToken , Token} from '../../../utils/utils';

const initial_state ={
    // user : null,
    // data : "",
    pending : false,
    error: null,
    is_approved : null,
    // first_name : "",
    // last_name : "",
    username : null,
    mobile : null ,
    otp : null,
    is_logged_in : Boolean(Token())
}




const authReducer = (state = initial_state , {type , payload})=> {
    switch(type){
        case types.LOGIN_START:
            console.log('LOGIN_START')
            return {
                ...state,
                pending: true ,
                error: null
            }

        // case types.REGISTER_START:
        //     console.log('REGISTER_START')
        //     return {
        //         ...state,
        //         pending: true ,
        //         data: null,
        //         error: null
        //     }

        case types.SET_PHONENUMBER :
            console.log('SET_PHONENUMBER')
            return {
                    ...state, 
                    mobile : payload.mobile
                }


        case types.LOGIN_SUCCESS:
            console.log('LOGIN_SUCCESS')
            return {
                ...state , 
                pending: false,
                // data: { ...state.data , ...payload },
                // username : payload.username,
                is_logged_in : true
            }


        // case types.REGISTER_SUCCESS:
        //     console.log('REGISTER_SUCCESS')
            
        //     return {
        //         ...state , 
        //         pending: false,
        //         data: { ...state.data , ...payload },
                

        //     }
        case types.LOGIN_ERROR:
        // case types.REGISTER_ERROR:
            console.log('REGISTER_ERROR')

            return {
                ...state,
                pending: false,
                error: payload
            }

        case types.CLEAR_STORAGE:
        console.log('CLEAR_STORAGE')
        removeToken()
            return {
                ...state,
                pending: false ,
                // data: null,
                error: null,
                username : null,
                is_approved : null,
                is_logged_in : false
            }

        case types.SET_PROFILE : 
        console.log('Set Profile Done', payload)
                return {
                    ...state,
                    // data : payload,
                    // is_approved : payload.is_approved,
                    // first_name : payload.first_name,
                    // last_name : payload.last_name,
                    username : payload.username,
                    
                }

        case types.GET_OTP : 
        console.log('Get Otp Code Done', payload)
            return {
                ...state,
                otp : payload.otp,
                            
        }
            
        default :
        return state;
    }
}

export default authReducer;