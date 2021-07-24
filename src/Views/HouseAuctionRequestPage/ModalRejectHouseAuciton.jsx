import React, { useState } from 'react';
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Mentions, Form, Button , Modal , notification} from 'antd';
import { REQUESTS_HOUSE_AUCTION } from '../../utils/constant';
import { failNotification, successNotification } from '../../utils/notification';

function ModalAcceptHouseAcution({setVisibleRejectHouseAuction , visibleRejectHouseAuction , detail_Id , requestHouseAuction}) {
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
        setVisibleRejectHouseAuction(false);
    };
  
    const handleCancel = () => {
        setVisibleRejectHouseAuction(false);
    };


    const onFinish =  (values) => {
        console.log(values.coders);
        showConfirm(values.coders)
    };


    function showConfirm(description) {
        confirm({
          title: 'از رد درخواست خانه حراجی اطمینان دارید؟',
          icon: <ExclamationCircleOutlined />,
          okText : 'رد درخواست',
          cancelText : 'انصراف',
          content: ``,
          className : 'reject-confirm',

          onOk() {
            console.log('OK');

            let payload = {
                "home_auction_name": requestHouseAuction?.home_auction_name,
                "home_auction_type": requestHouseAuction?.home_auction_type,
                "activity_type": requestHouseAuction?.activity_type,
                "count": requestHouseAuction?.count,
                "home_auction_request": "reject"
            }
    
            axios.put(`${BASE_URL}${REQUESTS_HOUSE_AUCTION}${detail_Id}/`, payload).then(res => {
                successNotification("رد درخواست خانه حراجی" , "خانه حراجی با موفقیت رد شد");
                setTimeout(() => {
                    window.location.reload();
                  }, 1500);
            }).catch(err => {
                console.log(err);
                failNotification("خطا در رد خانه حراجی" , "امکان رد خانه حراجی وجود ندارد")

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
            title="رد درخواست خانه حراجی" 
            className="modal-reject-request-house-auction" 
            visible={visibleRejectHouseAuction} 
            onOk={handleOk} 
            onCancel={handleCancel}>
                

                <Form form={form} layout="horizontal" onFinish={onFinish}>
                    <div className="d-flex">
                        <p>{`رد درخواست خانه حراجی ${requestHouseAuction?.home_auction_name ? requestHouseAuction?.home_auction_name : ''}`}</p>
                    </div>
                    <button htmlType="submit" className="btn-reject-request-house-auction" >رد درخواست خانه حراجی </button>
                </Form>

            </Modal> 
        </div>
    )
}

export default ModalAcceptHouseAcution;
