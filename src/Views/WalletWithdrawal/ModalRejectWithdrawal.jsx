import React  from 'react';
import {Modal } from 'antd';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import { REJECT_WITHDRAWAL } from '../../utils/constant';
import { failNotification, successNotification } from '../../utils/notification';


function ModalRejectWithdrawal({visibleRejectWithdrawal , setVisibleRejectWithdrawal  , useId }) {


    const handleCloseModal = () => {
        setVisibleRejectWithdrawal(false);
        window.location.reload()
    }

    const handleAcceptWithdrawal = (id) => {
        // api service call for reject withdrawal user by admin
        axios.put(`${BASE_URL}${REJECT_WITHDRAWAL(id)}`).then(res => {
            // if statusCode of response is not equal 400 close modal confirm and show success notification
            if(res.data.data.statusCode !== 400){
                setVisibleRejectWithdrawal(false);
                setTimeout(() => {
                    successNotification( "رد برداشت" , res.data.data.result )
                }, 500);
            // if statusCode of response is equal 400 close modal confirm and show failed notification
            }else{
                setVisibleRejectWithdrawal(false);
                setTimeout(() => {
                    failNotification("خطا" , res.data.data.error_message)
                }, 500);
            }

        }).catch(err => {
            
        })
    }

    


    return (
        <React.Fragment>
            <Modal
                title="رد درخواست برداشت"
                centered
                className="modal-send-to-house-autions"
                visible={visibleRejectWithdrawal}
                onOk={() => setVisibleRejectWithdrawal(false)}
                onCancel={() => setVisibleRejectWithdrawal(false)}
                width={300}
            >

                    <div className="d-flex">
                        <div className="col">
                            <div className="d-block d-sm-flex mt-5">
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-end ml-sm-3">
                                        <button onClick={()=>handleAcceptWithdrawal(useId)} className="btn-reject-withdrawal">رد برداشت</button>
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

export default ModalRejectWithdrawal;


