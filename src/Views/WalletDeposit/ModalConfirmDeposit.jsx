import React , {useState , useEffect} from 'react'
import {Modal , Form , message , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';


const { Option, getMentions } = Mentions;

function ModalConfirmDeposit({visibleCofirmDeposit , setVisibleCofirmDeposit , amount}) {

    const handleCloseModal = () => {
        setVisibleCofirmDeposit(false);
        window.location.reload()
    }

    const handleRedirectGetway = () => {
        window.location.href = "/"
    }

    return (
        <React.Fragment>
            <Modal
                title="تایید واریز و انتقال به درگاه"
                centered
                className="modal-confirm-deposit"
                visible={visibleCofirmDeposit}
                onOk={() => setVisibleCofirmDeposit(false)}
                onCancel={() => setVisibleCofirmDeposit(false)}
                width={400}>

                    <div className="d-flex">
                        <div className="col">

                            <div className="d-flex mb-3">
                                <p>{`شارژ کیف پول به مبلغ ${amount} تومان`}</p>
                            </div>


                            <div className="d-flex">
                                <div className="col">
                                    <div className="d-flex">
                                        <button className="btn-close" onClick={handleCloseModal}>انصراف</button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex">
                                    <button className="btn-redirect-to-getway" onClick={handleRedirectGetway} >انتقال به درگاه</button>
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