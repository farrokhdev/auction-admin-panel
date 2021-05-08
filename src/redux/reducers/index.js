import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import panelReducer from './panel/panel.reducer';

const rootReducer = combineReducers(
    {
        auth : authReducer,
        panel : panelReducer
    }
)

export default rootReducer;