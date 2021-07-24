import {notification} from 'antd';

export  const failNotification  = ( titleMessage , message) => {
    notification.error({
      message: `${titleMessage}`,
      description:`${message}`,
        duration: 1.2,
        className: 'custom-class',
        style : {
            backgroundColor : '#f9faf5'
        }
    });
  }


  export const  successNotification = (titleMessage , message) => {
    notification.success({
      message: `${titleMessage}`,
      description:`${message}`,
        duration: 1.2,
        className: 'custom-class',
        style : {
            backgroundColor : '#f9faf5'
        }
    });
  };

  export default notification;