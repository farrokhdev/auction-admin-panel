import {createStore, combineReducers, applyMiddleware} from "redux";
import  authReducer from '../redux/reducers/auth/auth.reducer';
import  panelReducer from '../redux/reducers/panel/panel.reducer';
import  userReducer from '../redux/reducers/user/user.reducer';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import auctionReducer from "./reducers/auction/auction.reducer";
import profileReducer from '../redux/reducers/profile/profile.reducer';
import allReducer from "./reducers/all/all.reducer";

const middleware = [thunk];
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    authReducer,
    panelReducer, 
    userReducer,
    profileReducer,
    auctionReducer,
    allReducer,
}));
let store = createStore(
    persistedReducer, 
    composeWithDevTools(applyMiddleware(...middleware))

);
let persistor = persistStore(store);
export default store;
export {persistor};