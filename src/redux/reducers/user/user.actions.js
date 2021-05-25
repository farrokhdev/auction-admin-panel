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