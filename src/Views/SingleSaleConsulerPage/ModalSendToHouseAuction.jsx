import React , {useState , useEffect} from 'react'
import {Modal, Form, message, notification, Select, Mentions, Input, Switch, Spin} from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';


const { Option, getMentions } = Mentions;

const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

// const tailLayout = {
//     wrapperCol: {
//         offset: 24,
//         span: 24
//     }
// };

function ModalSendToHouseAuction(props) {


    const [form] = Form.useForm();

    const [houseAuctionList, setHouseAuctionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [acceptState, setAcceptState] = useState(false)


    useEffect(() => {
        
        axios.get(`${BASE_URL}/account/home-auction/`).then(res => {
            console.log(res.data);
            setHouseAuctionList(res.data.data.result)

        }).catch(err => {
            console.log(err);
        })

    }, []);

    

    const onFinish = (values) => {
        console.log(values);

        let payload = {
            "is_approve" : values.is_approve ? "accept" : "reject",
            "admin_description" : values.admin_description ? values.admin_description : '',
            "auction_houses" : values.auction_houses
        }
        setLoading(true)

        axios.put(`${BASE_URL}/panel/product/approve/${props.paramsId}/` , payload).then(res => {
            console.log(res.data);
            setLoading(false)
            if(res.data.code ===200){
                message.success("درخواست شما با موفقیت ارسال شد")
                props.getSuggest()
            }
            props.setVisibleSendToHouseAuction(false)
        }).catch(err => {
            setLoading(false)
            console.log(err);
            message.error("با خطا مواجه شدید")
            props.setVisibleSendToHouseAuction(false)
        })

    }

    const onFinishFailed = (valuses) => {
        console.log(valuses);
    }

    const handleCloseModal = () => {
        props.setVisibleSendToHouseAuction(false);
        // window.location.reload()
    }



    return (
        <React.Fragment>
            <Modal
                title="ارسال پیشنهاد فروش به خانه‌های حراج"
                centered
                className="modal-send-to-house-autions"
                visible={props.visibleSendToHouseAuction}
                onOk={() => props.setVisibleSendToHouseAuction(false)}
                onCancel={() => props.setVisibleSendToHouseAuction(false)}
                width={800}>
                <Spin spinning={loading}>
                    <div className="d-flex">
                        <div className="col px-0">

                            <Form  
                            {...layout}
                            form={form}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            >

                                <div className="d-block ">

                                <div className="col">
                                    <div className="d-flex">
                                        {!!acceptState ? <p>تایید محصول </p> : <p>رد محصول </p>}
                                    </div>
                                    <div className="d-flex ">
                                        <Form.Item name="is_approve">
                                            <Switch  onChange={(e) => setAcceptState(e)}/>
                                        </Form.Item>
                                    </div>
                                </div>

                                    <div className="col">
                                        <div className="d-flex">
                                            <p className="mb-2 ">خانه‌های حراج مد نظر خود را پیدا کنید</p>    
                                        </div>
                                    </div>
                                    <div className="col">
                                        <Form.Item
                                            className="text-right input-message-send-to"
                                            name="auction_houses"
                                        
                                        rules={[
                                        {
                                            required: !!acceptState ? true : false,
                                            message: 'خانه حراجی انتخاب نکرده‌اید!',
                                            type: 'array',
                                        },
                                        ]}
                                    >
                                        <Select disabled={!acceptState} className="" mode="multiple" placeholder="مخاطب را انتخاب کنید">
                                            {houseAuctionList?.length >= 1 ? houseAuctionList?.map(houseAuction => (
                                                <React.Fragment key={houseAuction?.id}>
                                                    <Option value={`${houseAuction?.id}`}>{houseAuction?.home_auction_name}</Option>
                                                </React.Fragment>
                                            )) : <Option value=""></Option>}
                                                    
                                        </Select>
                                    </Form.Item>

                                        <div className="d-flex">
                                            <p className="mb-2">توضیحات</p>    
                                        </div>
                                        <div className="d-flex ">
                                            <div className="col px-0">
                                                <Form.Item 
                                                    name="admin_description" >
                                                    <Input.TextArea disabled={!acceptState} className=" w-100"  rows={8} />
                                                </Form.Item>
                                            </div>
                                        </div>
                                  
                                    
                                    </div>
                                </div>


                            <div className="d-block d-sm-flex mt-5">
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-end ml-sm-3">
                                        <button htmlType="submit" className="btn-send-to-house-auctions">{ !!acceptState ? "تایید محصول و ارسال پیشنهاد" : "رد محصول"}</button>
                                    </div>
                                </div>
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-start mt-2 mt-sm-0">
                                        {/* <Link to="/tickets"><button  className="btn-response-to-user">پاسخ به کاربر</button></Link> */}
                                        <button onClick={handleCloseModal} className="btn-close-send-to-house-auction">بستن</button>
                                    </div>
                                </div>
                            </div>


                        </Form>
                        </div>
                    </div>
</Spin>
            </Modal>
        </React.Fragment>
    )
}

export default ModalSendToHouseAuction;
