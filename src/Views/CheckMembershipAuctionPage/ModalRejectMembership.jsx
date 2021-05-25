import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Mentions, Modal, notification } from 'antd';
import React from 'react';
import { BASE_URL } from '../../utils';
import axios from "../../utils/request";


function ModalConfirmAcceptMembership(props) { 
    const { confirm } = Modal; 
    const { Option, getMentions } = Mentions;
    const [form] = Form.useForm();

    const openNotification = () => {
        notification.success({
          message: 'رد عضویت',
          description:`رد عضویت  با موفقیت انجام شد`,
            duration: 1.2,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };

    console.log("details =>>> ", props.detailsArtwork?.category);
    const handleOk = () => {
      props.setVisibleReject(false);
    };
  
    const handleCancel = () => {
      props.setVisibleReject(false);
    };


    const onFinish =  (values) => {
        console.log(values.coders);
        showConfirm(values.coders)
    };


    function showConfirm(description) {
        confirm({
          title: 'از رد عضویت اطمینان دارید؟',
          icon: <ExclamationCircleOutlined />,
          content: `رد عضویت ${props.detailsArtwork?.title}`,
          className : "confirm-accept-membership" ,
          okText : "رد عضویت",
          cancelText : "انصراف",

          onOk() {
            console.log('ok');

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
            console.log('cancel');
          },
        });
      }



    return (
        <div>
            <Modal title="رد عضویت" className="modal-confirm-artwork" visible={props.visibleReject} onOk={handleOk} onCancel={handleCancel}>
                

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
                    <button htmlType="submit" className="btn-confirm-artwork" >رد عضویت</button>
                </Form>

            </Modal>
        </div>
    )
}

export default ModalConfirmAcceptMembership;