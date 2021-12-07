import React, { useState } from 'react';
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Mentions, Form, Button , Modal , notification} from 'antd';


function ModalConfirmAcceptMembership(props) { 
    const { confirm } = Modal; 
    const { Option, getMentions } = Mentions;
    const [form] = Form.useForm();

    const openNotification = () => {
        notification.success({
          message: 'تایید عضویت',
          description:`عضویت  با موفقیت انجام شد`,
            duration: 1.2,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };

    const handleOk = () => {
      props.setVisibleAccept(false);
    };
  
    const handleCancel = () => {
      props.setVisibleAccept(false);
    };


    const onFinish =  (values) => {
        console.log(values.coders);
        showConfirm(values.coders)
    };


    function showConfirm(description) {
        confirm({
          title: 'از تایید عضویت اطمینان دارید؟',
          icon: <ExclamationCircleOutlined />,
          content: `تایید عضویت ${props.detailsArtwork?.title}`,
          className : "confirm-accept-membership" ,
          okText : "تایید",
          cancelText : "انصراف",

          onOk() {
            console.log('تایید');

            let payload = {
                "title" : props.detailsArtwork?.title,
                "category": props.detailsArtwork?.category,
                "description": props.detailsArtwork?.description,
                "is_approve":"True",
                "admin_description": description
            }
    
            axios.put(`${BASE_URL}/panel/product/approve/${props.ARTWORK_Id}/`, payload).then(res => {
    
            }).catch(err => {
                console.log(err);
            })

            openNotification('topLeft')
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
          },
          onCancel() {
            console.log('انصراف');
          },
        });
      }



    return (
        <div>
            <Modal title="تایید عضویت" className="modal-accept-membership" visible={props.visibleAccept} onOk={handleOk} onCancel={handleCancel}>
                

                <Form form={form} layout="horizontal" onFinish={onFinish}>
                    {/* <Form.Item
                        name="coders"
                        label="توضیحات"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        // rules={[{ validator: checkMention }]}
                    >
                        <Mentions rows={4} className="text-right">
                        </Mentions>
                    </Form.Item> */}
                    <button htmlType="submit" className="btn-confirm-artwork" >تایید عضویت</button>
                </Form>

            </Modal>
        </div>
    )
}

export default ModalConfirmAcceptMembership;