import React , {useState , useEffect} from 'react'
import {Modal , Form , message , notification , Select , Mentions  , Input } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import momentJalaali from 'moment-jalaali';
import { REQUESTS_HOUSE_AUCTION } from '../../utils/constant';
import { convertTypePersian } from '../../utils/converTypePersion';

const layout = {
    labelCol: {
      span: 16,
    },
    wrapperCol: {
      span: 24,
    },
  };

  function ModalDetailsHouseAuctionRequest({setVisibleDetailHouseAuctionRequest , visibleDetailHouseAuctionRequest , detail_Id}) {
      
      const [form] = Form.useForm();

    const [requestDetails, setRequestDetails] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(Boolean(detail_Id)){
            setLoading(true)
            axios.get(`${BASE_URL}${REQUESTS_HOUSE_AUCTION}${detail_Id}/`).then(res => {
                console.log(res.data);
                setRequestDetails(res.data.data.result)
                setLoading(false)
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
        }

    }, [detail_Id]);


    return (
        <React.Fragment>
        <Modal
            title="جزئیات درخواست"
            centered
            className="modal-bids"
            visible={visibleDetailHouseAuctionRequest}
            onOk={() => setVisibleDetailHouseAuctionRequest(false)}
            onCancel={() => setVisibleDetailHouseAuctionRequest(false)}
            width={700}>

                <div className="d-flex">
                    <div className="col">

                        
                    <div className="row">
                    <div className="col  userInfoSection  px-lg-5 ">

               <Form 
                   {...layout} 
                   name="nest-messages" 
                   form={form}
                   initialValues={{

                        home_auction_name : requestDetails?.home_auction_name,
                        home_auction_type : requestDetails?.home_auction_type,
                        activity_type : requestDetails?.activity_type,
                        count : requestDetails?.count,
                        home_auction_request : requestDetails?.home_auction_request ? convertTypePersian(requestDetails?.home_auction_request) : '',

                     }}
               >

                   {/* <div className="d-flex my-4">
                       <h3>اطلاعات کاربر</h3>
                   </div> */}


                    <div className="d-block d-md-flex align-items-center mt-5">
                       <div  className="col-12 col-md-4 pb-md-4 mb-2 mb-md-0">
                           <p className="text-right mb-0 h-100">نام خانه حراج </p>
                       </div>
                       <div  className="col ">
                           <div style={{verticalAlign : 'middle'}} className="d-flex h-100 align-items-center">
                               <Form.Item
                                   className="w-100  h-100"
                                   name="home_auction_name"
                                   rules={[{ required: true, message: 'ورودی نام خالی است!' }]}
                               >
                                   <Input 
                                       // defaultValue = {auctionInfo?.title}
                                       size="large"
                                   />
                               </Form.Item>
                           </div>
                       </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                       <div className="col-12 col-md-4 pb-md-4 mb-2 mb-md-0">
                           <p className="text-right mb-0 h-100">نوع خانه حراج </p>
                       </div>
                       <div className="col ">
                           <Form.Item
                               className="w-100  h-100"
                               name="home_auction_type"
                               rules={[{ required: true, message: 'ورودی نام خانوادگی خالی است!' }]}
                           >
                           <Input 
                               size="large"

                           />
                       </Form.Item>
                       </div>
                    </div>
                    <div className="d-block d-md-flex align-items-center">
                       <div className="col-12 col-md-4 pb-md-4 mb-2 mb-md-0">
                           <p className="text-right mb-0 h-100">نوع فعالیت خانه حراج</p>
                       </div>
                       <div className="col ">
                           
                           <Form.Item
                               className="w-100  h-100"
                               name="activity_type"
                               rules={[{ required: true, message: 'ورودی موبایل خالی است!' }]}
                           >
                           <Input 
                               
                               size="large"
                           />
                       </Form.Item>
                       </div>
                    </div>
                    <div className="d-block d-md-flex align-items-center">
                       <div className="col-12 col-md-4 pb-md-4 mb-2 mb-md-0">
                           <p className="text-right mb-0 h-100">تعداد خانه حراج</p>
                       </div>
                       <div className="col">
                           <Form.Item
                               className="w-100  h-100"
                               name="count"
                               rules={[{ required: true, message: 'ورودی ایمیل خالی است!' }]}
                           >
                           <Input 
                               
                               size="large"
                           />
                       </Form.Item>
                       </div>
                    </div>                
                    
                    <div className="d-block d-md-flex align-items-center">
                       <div className="col-12 col-md-4 pb-md-4 mb-2 mb-md-0">
                           <p className="text-right mb-0 h-100">وضعیت درخواست</p>
                       </div>
                       <div className="col">
                           <Form.Item
                               className="w-100  h-100"
                               name="home_auction_request"
                               rules={[{ required: true, message: 'ورودی ایمیل خالی است!' }]}
                           >
                           <Input 
                               
                               size="large"
                           />
                       </Form.Item>
                       </div>
                    </div>

                   </Form>
               </div>
               <div className="col-0 col-xl-1">

               </div>
       </div>


                        
                    </div>
                </div>
        </Modal>
    </React.Fragment>
    )
}

export default ModalDetailsHouseAuctionRequest;
