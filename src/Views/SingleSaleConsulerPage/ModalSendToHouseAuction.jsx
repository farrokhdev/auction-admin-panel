import React , {useState , useEffect} from 'react'
import {Modal , Form , message , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';


const { Option, getMentions } = Mentions;

function ModalSendToHouseAuction({visibleSendToHouseAuction , setVisibleSendToHouseAuction}) {


    const [form] = Form.useForm();

    const [houseAuctionList, setHouseAuctionList] = useState([]);

    useEffect(() => {
        
        axios.get(`${BASE_URL}/`).then(res => {
            console.log(res.data);

            setHouseAuctionList(res.data)

        }).catch(err => {
            console.log(err);
        })

    }, []);

    const onFinish = (values) => {
        console.log(values);
    }

    const handleCloseModal = () => {
        setVisibleSendToHouseAuction(false);
        window.location.reload()
    }



    return (
        <React.Fragment>
            <Modal
                title="ارسال پیشنهاد فروش به خانه‌های حراج"
                centered
                className="modal-send-to-house-autions"
                visible={visibleSendToHouseAuction}
                onOk={() => setVisibleSendToHouseAuction(false)}
                onCancel={() => setVisibleSendToHouseAuction(false)}
                width={800}>

                    <div className="d-flex">
                        <div className="col">

                            <Form  className="pt-5" form={form} layout="horizontal" onFinish={onFinish}>

                                <div className="d-block d-xl-flex">
                                    <div className="col">
                                        <div className="d-flex">
                                            <p className="mb-2 mb-xl-0">خانه‌های حراج مد نظر خود را پیدا کنید</p>    
                                        </div>
                                    </div>
                                    <div className="col">
                                        <Form.Item
                                        className="text-right input-message-send-to"
                                        name="users"
                                        
                                        rules={[
                                        {
                                            required: true,
                                            message: 'خانه حراجی انتخاب نکرده‌اید!',
                                            type: 'array',
                                        },
                                        ]}
                                    >
                                        <Select className="" mode="multiple" placeholder="مخاطب را انتخاب کنید">
                                            {houseAuctionList.length >= 1 ? houseAuctionList.map(houseAuction => (

                                                <React.Fragment key={houseAuction?.id}>
                                                    <Option value={`${houseAuction?.id}`}>{houseAuction?.first_name}</Option>
                                                </React.Fragment>
                                            )) : <Option value=""></Option>}
                                                    
                                        </Select>
                                    </Form.Item>
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
