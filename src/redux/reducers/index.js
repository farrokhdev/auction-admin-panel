import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import panelReducer from './panel/panel.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers(
    {
        auth : authReducer,
        panel : panelReducer, 
        user : userReducer
    }
)

export default rootReducer;