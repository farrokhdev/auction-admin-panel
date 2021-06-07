import React from 'react'
import {Modal , notification } from 'antd';


function ModalConfirmWithdrawal({visibleCofirmWithdrawal , setVisibleCofirmWithdrawal , amount}) {

    const handleCloseModal = () => {
        setVisibleCofirmWithdrawal(false);
        window.location.reload()
    }

    const handleSubmitWithdrawal = () => {
        setVisibleCofirmWithdrawal(false);
        openNotification()

    }

    const openNotification = () => {
        notification.success({
          message: 'برداشت از حساب',
          description:`برداشت با موفقیت انجام شد`,
            duration: 1,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };

    return (
        <React.Fragment>
            <Modal
                title="تایید برداشت"
                centered
                className="modal-confirm-deposit"
                visible={visibleCofirmWithdrawal}
                onOk={() => setVisibleCofirmWithdrawal(false)}
                onCancel={() => setVisibleCofirmWithdrawal(false)}
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
                                        <button className="btn-redirect-to-getway" onClick={handleSubmitWithdrawal} >تایید برداشت</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
            </Modal>
        </React.Fragment>
    )
}

export default ModalConfirmWithdrawal;