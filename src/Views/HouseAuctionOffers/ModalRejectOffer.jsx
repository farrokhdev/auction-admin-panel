import React , {useState , useEffect} from 'react';
import {Modal , Form , message , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';


const { Option, getMentions } = Mentions;

function ModalAcceptOffer({visibleRejectOffer , setVisibleRejectOffer , openNotification}) {


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
        setVisibleRejectOffer(false);
        window.location.reload()
    }

    const handleRejectOffer = (state) => {
        openNotification(state)
    }



    return (
        <React.Fragment>
            <Modal
                title="رد درخواست"
                centered
                className="modal-send-to-house-autions"
                visible={visibleRejectOffer}
                onOk={() => setVisibleRejectOffer(false)}
                onCancel={() => setVisibleRejectOffer(false)}
                width={300}>

                    <div className="d-flex">
                        <div className="col">

                            <div className="d-block d-sm-flex mt-5">
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-end ml-sm-3">
                                        <button onClick={()=>handleRejectOffer(false)} className="btn-reject-offer">رد درخواست</button>
                                    </div>
                                </div>
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-start mt-2 mt-sm-0">
                                        <button onClick={handleCloseModal} className="btn-cancel-reject-offer">انصراف</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
            </Modal>
        </React.Fragment>
    )
}

export default ModalAcceptOffer;

