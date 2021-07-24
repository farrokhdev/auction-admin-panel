import React, { useState } from 'react';
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Mentions, Form, Button , Modal , notification} from 'antd';
import { REQUESTS_HOUSE_AUCTION } from '../../utils/constant';
import { failNotification, successNotification } from '../../utils/notification';

function ModalAcceptHouseAcution({setVisibleAcceptHouseAuction , visibleAcceptHouseAuction , detail_Id , requestHouseAuction}) {
    const { confirm } = Modal; 
    const { Option, getMentions } = Mentions;
    const [form] = Form.useForm();

    // const openNotification = () => {
    //     notification.success({
    //       message: 'رد اثر',
    //       description:`${props.detailsArtwork?.title} با موفقیت رد شد`,
    //         duration: 1,
    //         className: 'custom-class',
    //         style : {
    //             backgroundColor : '#f9faf5'
    //         }
    //     });
    //   };

    const handleOk = () => {
      setVisibleAcceptHouseAuction(false);
    };
  
    const handleCancel = () => {
      setVisibleAcceptHouseAuction(false);
    };


    const onFinish =  (values) => {
        console.log(values.coders);
        showConfirm(values.coders)
    };


    function showConfirm(description) {
        confirm({
          title: 'از تایید درخواست خانه حراجی اطمینان دارید؟',
          icon: <ExclamationCircleOutlined />,
          okText : 'تایید درخواست',
          cancelText : 'انصراف',
          content: ``,

          onOk() {
            console.log('OK');

            let payload = {
                "home_auction_name": requestHouseAuction?.home_auction_name,
                "home_auction_type": requestHouseAuction?.home_auction_type,
                "activity_type": requestHouseAuction?.activity_type,
                "count": requestHouseAuction?.count,
                "home_auction_request": "accept"
            }
    
            axios.put(`${BASE_URL}${REQUESTS_HOUSE_AUCTION}${detail_Id}/`, payload).then(res => {
              successNotification("تایید خانه حراجی" , "خانه حراجی با موفقیت تایید شد")
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }).catch(err => {
                console.log(err);
                failNotification("خطا در تایید خانه حراجی" , "امکان تایید خانه حراجی وجود ندارد")

            })

            // openNotification('topLeft')
            // setTimeout(() => {
            //     window.location.reload();
            // }, 700);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }


    return (
        <div>
           <Modal 
            title="تایید درخواست خانه حراجی" 
            className="modal-confirm-request-house-auction" 
            visible={visibleAcceptHouseAuction} 
            onOk={handleOk} 
            onCancel={handleCancel}>
                

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

                    <div className="d-flex">
                        <p>{`تایید درخواست خانه حراجی ${requestHouseAuction?.home_auction_name  ? requestHouseAuction?.home_auction_name  : ''}`}</p>
                    </div>
                    <button htmlType="submit" className="btn-accept-request-house-auction" >تایید درخواست خانه حراجی </button>
                </Form>

            </Modal> 
        </div>
    )
}

export default ModalAcceptHouseAcution;
