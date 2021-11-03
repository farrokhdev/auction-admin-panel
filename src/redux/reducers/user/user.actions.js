import types from './user.types';

export const getCountUnReadMessages = (payload) => (
    {
        type : types.COUNT_UNREAD_MESSAGE ,
        payload : payload
    }
)

export const getStatusMessages = () => (
    {
        type : types.STATUS_MESSAGE ,
    }
)

export const setUserForSaleConsulerResponse = (payload) => (
    {
        type : types.SET_USER_FOR_SALSE_CONSULER_RESPONSE ,
        payload : payload
    }
)