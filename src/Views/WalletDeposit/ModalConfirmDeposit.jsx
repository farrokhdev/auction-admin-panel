import React , {useState , useEffect} from 'react'
import {Modal , Form , message , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';


const { Option, getMentions } = Mentions;

function ModalConfirmDeposit({visibleCofirmDeposit , setVisibleCofirmDeposit , giftAmount , usersSelect}) {

    const handleCloseModal = () => {
        setVisibleCofirmDeposit(false);
        window.location.reload()
    }

    const handleCharge = () => {

        let payload = {
            "user": usersSelect ? usersSelect : '',
            "gift_credit": giftAmount ? giftAmount : 0
        }


        axios.post(`${BASE_URL}/panel/credit/gift/` , payload).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            <Modal
                title="شارژ هدیه"
                centered
                className="modal-confirm-deposit"
                visible={visibleCofirmDeposit}
                onOk={() => setVisibleCofirmDeposit(false)}
                onCancel={() => setVisibleCofirmDeposit(false)}
                width={600}>

                    <div className="d-flex">
                        <div className="col">

                            <div className="d-flex mb-3">
                                <p>{`شارژ هدیه به مبلغ ${giftAmount} تومان`}</p>
                            </div>


                            <div className="d-flex">
                                <div className="col px-0">
                                    <div className="d-flex">
                                        <button className="btn-close" onClick={handleCloseModal}>انصراف</button>
                                    </div>
                                </div>
                                <div className="col px-0">
                                    <div className="d-flex">
                                    <button className="btn-redirect-to-getway px-3" onClick={handleCharge} >اعمال شارژ هدیه</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
            </Modal>
        </React.Fragment>
    )
}

export default ModalConfirmDeposit;