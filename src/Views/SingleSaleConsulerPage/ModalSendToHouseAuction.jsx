import React , {useState , useEffect} from 'react'
import {Modal , Form , message , notification , Select , Mentions , Input , Switch} from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';


const { Option, getMentions } = Mentions;

const layout = {
    labelCol: {
        span: 16
    },
    wrapperCol: {
        span: 24
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 16,
        span: 24
    }
};

function ModalSendToHouseAuction(props) {


    const [form] = Form.useForm();

    const [houseAuctionList, setHouseAuctionList] = useState([]);

    useEffect(() => {
        
        axios.get(`${BASE_URL}/account/home-auction/`).then(res => {
            console.log(res.data);
            setHouseAuctionList(res.data.data.result.results)

        }).catch(err => {
            console.log(err);
        })

    }, []);

    

    const onFinish = (values) => {
        console.log(values);

        let payload = {
            "is_approve" : values.is_approve ? values.is_approve : false,
            "admin_description" : values.admin_description ? values.admin_description : '',
            "auction_houses" : values.auction_houses
        }


        axios.put(`${BASE_URL}/panel/product/approve/${props.paramsId}/` , payload).then(res => {
            console.log(res.data);

        }).catch(err => {
            console.log(err);
        })

    }

    const onFinishFailed = (valuses) => {
        console.log(valuses);
    }

    const handleCloseModal = () => {
        props.setVisibleSendToHouseAuction(false);
        window.location.reload()
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

                    <div className="d-flex">
                        <div className="col">

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
                                        <p>تایید </p>
                                    </div>
                                    <div className="d-flex mr-2">
                                        <Form.Item name="is_approve">
                                            <Switch />
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
                                            required: true,
                                            message: 'خانه حراجی انتخاب نکرده‌اید!',
                                            type: 'array',
                                        },
                                        ]}
                                    >
                                        <Select  className="" mode="multiple" placeholder="مخاطب را انتخاب کنید">
                                            {houseAuctionList.length >= 1 ? houseAuctionList.map(houseAuction => (
                                                <React.Fragment key={houseAuction?.id}>
                                                    <Option value={`${houseAuction?.id}`}>{houseAuction?.home_auction_name}</Option>
                                                </React.Fragment>
                                            )) : <Option value=""></Option>}
                                                    
                                        </Select>
                                    </Form.Item>

                                    <div className="col">
                                        <div className="d-flex">
                                            <p className="mb-2">توضیحات</p>    
                                        </div>
                                        <div className="d-flex">
                                            <Form.Item 
                                                name="admin_description" >
                                                <Input.TextArea style={{minHeight : '150px' , minWidth : '300px' }} rows={8} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    
                                    </div>
                                </div>


                            <div className="d-block d-sm-flex mt-5">
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-end ml-sm-3">
                                        <button htmlType="submit" className="btn-send-to-house-auctions">ارسال پیشنهاد</button>
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
            </Modal>
        </React.Fragment>
    )
}

export default ModalSendToHouseAuction;
