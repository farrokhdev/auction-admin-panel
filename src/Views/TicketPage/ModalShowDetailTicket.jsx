import React from 'react'
import { Modal , Form , Divider , Input , notification} from 'antd';
import {BASE_URL} from '../../utils';
import axios from '../../utils/request';
import TicketContentDetails from './TicketContentDetails';




const layout = {
    labelCol: {
      span:24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 23,
      span: 24,
    },
  };


function ModalShowDetailTicket(props) {

    const [form] = Form.useForm();


    const openNotification = () => {
      notification.success({
        message: 'ارسال تیکت',
        description:`تیکت با موفقیت ارسال شد`,
          duration: 0,
          className: 'custom-class',
          style : {
              backgroundColor : '#f9faf5'
          }
      });
    };


    const onFinish = (values) => {
        console.log('Success:', values);
    
        let payload = {
          "body": values.body,
        }
    
        axios.post(`${BASE_URL}/panel/ticket/${props.ticketDetails?.id}/reply/` , payload).then(res => {
    
          if(res.data.code === 403){
              form.setFields([
                {
                    name: 'body',
                    errors: ['شما یک تیکت پاسخ داده نشده دارید!']
                }
              ])
              return
            }else{
    
              props.setVisibleDetailTicket(false);
              setTimeout(() => {
                openNotification()
              }, 500);
    
              setTimeout(() => {
                window.location.reload()
            }, 1000);
            }
    
             
           
    
          }).catch(err => {
              console.log(err);
          })
    
       
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
      const handleCancel = ()=>{
        props.setVisibleDetailTicket(false)
        window.location.reload();
      }

    // const handleCloseTicket = (e) => {
    //     e.preventDefault()
    //       axios.get(`${BASE_URL}/ticketing/${props.ticketDetails?.id}/close`).then(res => {
    //           }).catch(err => {
    //               console.log(err);
    //           })
    //       props.setVisibleDetailTicket(false)
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 500);
    //     };

    return (
        <Modal
          centered
          closable = {false}
          visible={props.visibleDetailTicket}
          onOk={() => props.setVisibleDetailTicket(false)}
          onCancel={() => props.setVisibleDetailTicket(false)}
          width={1100}
          footer={null}
        >
            <div className="px-lg-4">
                <div className="d-flex">
                    <span className="lineTitle"></span>
                    <p>{props.ticketDetails?.title}</p>
                </div>

                <div style={{overflow : 'auto' , width : '100%' , height : '400px'}} className="mt-4" >

                {props.ticketDetails ? 
                      <TicketContentDetails ticketDetails={props.ticketDetails}/>
                  : <div></div>}

                </div>
                <Divider className="mt-3 "/>
                {props.ticketDetails?.state !== "close" ?
                <Form 
                  {...layout} 
                  form={form} 
                  name="nest-messages" 
                  onFinish={onFinish} >

                      <Form.Item  name="body" 
                        label = "ارسال تیکت" 
                         rules={[{ 
                          required: true ,
                          message: 'تیکتی وارد نکرده‌اید!'
                        }]}
                      >
                        <Input.TextArea style={{minHeight : '100px'}} className="text-box-ticket" rows={6}/>
                      </Form.Item>
                      
                    <div className="d-flex justify-content-end  pt-3 ">
                          <button onClick={handleCancel} className="btn-cancel-send-ticket ml-2"> انصراف</button>  
                          {/* <button className="btn-close-ticket" onClick={handleCloseTicket}>بستن تیکت</button> */}
                          <button htmlType="submit" className="btn-send-new-ticket mr-2" >ارسال تیکت</button>  
                    </div>
                </Form>
                : <div></div> }
                
            </div>
        </Modal>
    )
}

export default ModalShowDetailTicket;
