import React, { useState } from 'react';
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Mentions, Form, Button , Modal , notification} from 'antd';
import { failNotification } from '../../utils/notification';


function ModalAcceptArtwork(props) { 
    const { confirm } = Modal; 
    const { Option, getMentions } = Mentions;
    const [form] = Form.useForm();


    

    const openNotification = () => {
        notification.success({
          message: 'تایید اثر',
          description:`${props.detailsArtwork?.artwork_title} با موفقیت تایید شد`,
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
        showConfirm(values.admin_description)
    };


    let list_id_homeAuciton_suggestions = [];
    props.listSuggestionHomeAuctions?.map(item => list_id_homeAuciton_suggestions.push(item?.id) )

console.log("llllll --->>>" , list_id_homeAuciton_suggestions);
console.log("props.detailsArtwork --->>>" , props.detailsArtwork);

    function showConfirm(description) {
        confirm({
          title: 'از تایید اثر اطمینان دارید؟',
          icon: <ExclamationCircleOutlined />,
          content: `تایید اثر ${props.detailsArtwork?.artwork_title}`,

          onOk() {
            console.log('OK');

            let payload = {
                // "title" : props.detailsArtwork?.artwork_title,
                // "category": props.detailsArtwork?.category,
                // "description": props.detailsArtwork?.description,
                // "is_approve":"True",
                // "admin_description": description


                "is_approve": "accept",
                "auction_houses": props.detailsArtwork?.owner?.role !== "home_auction" ?  list_id_homeAuciton_suggestions : [],
                "admin_description": description
            }

            
    
            axios.put(`${BASE_URL}/panel/product/approve/${props.ARTWORK_Id}/`, payload).then(res => {

              if(res.data.data.statusCode !== 400){
                openNotification('topLeft')
                // setTimeout(() => {
                //     window.location.reload();
                // }, 400);
              }else{
                failNotification("خطا" , res.data.message)
              }

            
    
            }).catch(err => {
                console.log(err);
            })

    
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
                        name="admin_description"
                        label="توضیحات"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        // rules={[{ validator: checkMention }]}
                    >
                        <Mentions name="admin_description" rows={4} className="text-right">
                        </Mentions>
                    </Form.Item>
                    <button htmlType="submit" className="btn-confirm-artwork" >تایید اثر هنری</button>
                </Form>

            </Modal>
        </div>
    )
}

export default ModalAcceptArtwork;
