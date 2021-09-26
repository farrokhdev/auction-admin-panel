import React , {useState , useEffect} from 'react'
import {Modal , Form , message , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import momentJalaali from 'moment-jalaali';
import { successNotification , failNotification} from '../../utils/notification';
import { separatorCurrency } from '../../utils/separator';

function ModalAcceptParticipantsAuction({visibleParticipantsAuction , setVisibleParticipantsAuction ,setParticipant_id ,  participant_id}) {

    const [participant, setParticipant] = useState()

    console.log("participant_id --" , participant_id);
    console.log("participant --" , participant);
    
    useEffect(() => {
        getParticipant()
    }, []);

    // fuction call api service for get participant details
    const getParticipant = () => {
        axios.get(`${BASE_URL}/sale/join-auction/${participant_id}/`)
        .then(res => {
            setParticipant(res.data.data.result)
            
        }).catch(err => {
            
        })
    }


    // fuction call api service for reject participant in auction
    const handleRejetParticipantAuction = () => {

        let payload = {"is_approve": 'False'}
        axios.patch(`${BASE_URL}/sale/join-auction/${participant_id}/` , payload)
        .then(res => {
            if(res.data.data.statusCode !== 400){
                successNotification("رد شرکت‌کننده" , "رد شرکت‌کننده با موفقیت انجام شد")
            }else{
                failNotification("خطا" , res.data.data.error_message)
            }
        }).catch(err => {
            
        })

        setParticipant_id(null)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }   

    // fuction call api service for accept participant in auction
    const handleAcceptParticipantAuction = () => {

        let payload = {"is_approve": 'True'}
        axios.patch(`${BASE_URL}/sale/join-auction/${participant_id}/` , payload)
        .then(res => {
            if(res.data.data.statusCode !== 400){
                successNotification("تایید شرکت‌کننده" , "تایید شرکت‌کننده با موفقیت انجام شد")
            }else{
                failNotification("خطا" , res.data.data.error_message)
            }
        }).catch(err => {
            
        })
        setParticipant_id(null)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }

    const handleCancel = () =>{
        setVisibleParticipantsAuction(false)
        setParticipant_id(null)
    }

    return (
        <React.Fragment>
        <Modal
            title="مشخصات شرکت‌کننده"
            centered
            className="modal-bids"
            visible={visibleParticipantsAuction}
            onOk={() => setVisibleParticipantsAuction(false)}
            onCancel={() => setVisibleParticipantsAuction(false)}
            width={700}>

                <div className="d-flex ">
                    <div className="col ">
                        <div className="d-flex"> نام و نام خانوادگی</div>
                    </div>
                    <div className="col ">
                        <div className="d-flex"> {participant?.applicant?.first_name} {participant?.applicant?.last_name}</div>
                    </div>
                </div>             
                <div className="d-flex my-2">
                    <div className="col ">
                        <div className="d-flex"> موبایل</div>
                    </div>
                    <div className="col ">
                        <div className="d-flex"> {participant?.applicant?.mobile}</div>
                    </div>
                </div>        
                <div className="d-flex my-2">
                    <div className="col ">
                        <div className="d-flex"> ایمیل</div>
                    </div>
                    <div className="col ">
                        <div className="d-flex"> {participant?.applicant?.email}</div>
                    </div>
                </div>       
                <div className="d-flex my-2">
                    <div className="col ">
                        <div className="d-flex"> آثار انتخاب شده</div>
                    </div>
                    <div className="col ">
                        <div className="d-flex"> {participant?.product ? participant?.product?.map((item, key) => {
                        return (
                            <div className="d-flex" key={key}>
                                <Link to={`/artworks/${item.id}`}>
                                    <div className="col">
                                        <img width={50} src={item?.media?.exact_url}/>
                                        <p className="text-right">{item.artwork_title}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    }) : ""}</div>
                    </div>
                </div>
                <div className="d-flex my-2">
                    <div className="col ">
                        <div className="d-flex"> موجودی کیف پول</div>
                    </div>
                    <div className="col ">
                        <div className="d-flex"> {participant?.wallet?.inventory ? separatorCurrency(participant?.wallet?.inventory) : ''}</div>
                    </div>
                </div>              
                <div className="d-flex my-2">
                    <div className="col ">
                        <div className="d-flex"> مشخصات معرف</div>
                    </div>
                    <div className="col ">
                        <div className="d-flex"> {participant?.recommender?.first_name} {participant?.recommender?.last_name}</div>
                    </div>
                </div>

                <div className="d-flex">
                    <button onClick={handleAcceptParticipantAuction} className="btn-accept-participant">تایید </button>
                    <button onClick={handleRejetParticipantAuction} className="btn-reject-participant mx-2">رد </button>
                    <button onClick={handleCancel} className="btn-cancel-participant">انصراف </button>
                </div>

        </Modal>
    </React.Fragment>
    )
}

export default ModalAcceptParticipantsAuction;
