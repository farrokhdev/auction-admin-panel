import types from './auction.types';
import {removeToken, Token} from '../../../utils/utils'
import typesAll from "../all/all.types";
import moment from "moment-jalaali";

const initial_state = {
    pending: false,
    error: null,
    "currency": "toman",
    products: {},
    productsArrayDate: [],
    productsDate: {},
    steps: [],
    validations_auction: [],
    selectComponent: 1,
    payment_method: "OFFLINE",
    extendable_deadline: false,
    has_recommendation: false,
    admin_confirmation: false,
    add_previous_buyer: false,
    choose_product_daily: false,
    other: false,
    is_send_invitation: false,
    has_gallery: false,
    start_clock: moment("08:00", "HH:mm"),
    end_clock: moment("20:00", "HH:mm"),
    gallery_start_clock: moment("08:00", "HH:mm"),
    gallery_end_clock: moment("20:00", "HH:mm"),
    house_id: null,
}


const auctionReducer = (state = initial_state, {type, payload = {}}) => {
    switch (type) {
        case types.SET_ADD_AUCTION:
            return {
                ...state,
                ...payload,
                pending: true,
                error: null
            }
        case typesAll.CLEAR_STORAGE_ALL:
            return initial_state
        case types.REMOVE_ADD_AUCTION:
            return initial_state;
        default :
            return state;
    }
}

export default auctionReducer;