import React , {useState , useEffect} from 'react';
import {Modal , Form , message , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import { ACCEPT_WITHDRAWAL } from '../../utils/constant';
import { failNotification, successNotification } from '../../utils/notification';


const { Option, getMentions } = Mentions;

function ModalAcceptOffer({visibleAcceptWithdrawal , setVisibleAcceptWithdrawal  , useId }) {


    const handleCloseModal = () => {
        setVisibleAcceptWithdrawal(false);
        window.location.reload()
    }

    const handleAcceptWithdrawal = (id) => {

        axios.put(`${BASE_URL}${ACCEPT_WITHDRAWAL(id)}`).then(res => {

            if(res.data.data.statusCode !== 400){
                setVisibleAcceptWithdrawal(false);
                setTimeout(() => {
                    successNotification( "تایید برداشت" , res.data.data.result )
                }, 500);
            }else{
                setVisibleAcceptWithdrawal(false);
                setTimeout(() => {
                    failNotification("خطا" , res.data.data.error_message)
                }, 500);
            }

        }).catch(err => {
            console.error(err.response);
            
        })
    }

    
    return (
        <React.Fragment>
            <Modal
                title="پذیرش درخواست برداشت"
                centered
                className="modal-send-to-house-autions"
                visible={visibleAcceptWithdrawal}
                onOk={() => setVisibleAcceptWithdrawal(false)}
                onCancel={() => setVisibleAcceptWithdrawal(false)}
                width={300}
            >

                    <div className="d-flex">
                        <div className="col">
                            <div className="d-block d-sm-flex mt-5">
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-end ml-sm-3">
                                        <button onClick={()=>handleAcceptWithdrawal(useId)} className="btn-accept-withdrawal">تایید برداشت</button>
                                    </div>
                                </div>
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-start mt-2 mt-sm-0">
                                        <button onClick={handleCloseModal} className="btn-cancel-accept-offer">انصراف</button>
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

