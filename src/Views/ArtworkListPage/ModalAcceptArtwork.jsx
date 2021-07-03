import React, { useState } from 'react';
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Mentions, Form, Button , Modal , notification} from 'antd';


function ModalAcceptArtwork(props) { 
    const { confirm } = Modal; 
    const { Option, getMentions } = Mentions;
    const [form] = Form.useForm();

    const openNotification = () => {
        notification.success({
          message: 'تایید اثر',
          description:`${props.detailsArtwork?.title} با موفقیت تایید شد`,
            duration: 1,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };

    const handleOk = () => {
      props.setIsModalVisibleAccept(false);
    };
  
    const handleCancel = () => {
      props.setIsModalVisibleAccept(false);
    };


    const onFinish =  (values) => {
        console.log(values.coders);
        showConfirm(values.coders)
    };


    function showConfirm(description) {
        confirm({
          title: 'از تایید اثر اطمینان دارید؟',
          icon: <ExclamationCircleOutlined />,
          content: `تایید اثر ${props.detailsArtwork?.title}`,

          onOk() {
            console.log('OK');

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
            setTimeout(() => {
                window.location.reload();
            }, 700);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }



    return (
        <div>
            <Modal title="تایید اثر هنری" className="modal-confirm-artwork" visible={props.isModalVisibleAccept} onOk={handleOk} onCancel={handleCancel}>
                

                <Form form={form} layout="horizontal" onFinish={onFinish}>
                    <Form.Item
                        name="coders"
                        label="توضیحات"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        // rules={[{ validator: checkMention }]}
                    >
                        <Mentions rows={4} className="text-right">
                        </Mentions>
                    </Form.Item>
                    <button htmlType="submit" className="btn-confirm-artwork" >تایید اثر هنری</button>
                </Form>

            </Modal>
        </div>
    )
}

export default ModalAcceptArtwork;
