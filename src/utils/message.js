
import { message } from 'antd';

export const messageSuccess = (messageTitle) => {
    message.success({
        content: `${' '}${messageTitle}`,
        className: 'text-success',
        style: {
            marginTop: '10vh',
        },
    })
}


export const messageFailed = (messageTitle) => {
    message.error({
        content: `${' '}${messageTitle}`,
        className: 'text-danger',
        style: {
            marginTop: '10vh',
        },
    })
}