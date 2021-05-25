import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalShowDetailsMesssage = ({visibleDetailsMessage , setVisibleDetailsMessage , messageDetails , momentJalaali}) => {
  
const handleCloseDetailMessage = () => {
    setVisibleDetailsMessage(false)
    setTimeout(() => {
        window.location.reload()
    }, 500);
}

  return (
    <React.Fragment>
      <Modal
        title="جزییات پیام"
        className="modal-detail-message"
        centered
        visible={visibleDetailsMessage}
        onOk={() => setVisibleDetailsMessage(false)}
        onCancel={() => setVisibleDetailsMessage(false)}
        width={1000}
      >
        <div className="d-flex  ">
            <div className="col p-3">
                <div className="d-block d-md-flex mb-3">
                    <div className="col-md-5 px-0">
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="mb-0 titleBox-message-details">
                                {/* {messageDetails?.title} */}
                                lkjas d lkjas d lkjasdkl 
                            </p>
                        </div>
                    </div>
                    <div className="col-md-7 px-0 ">
                        <div className="d-flex justify-content-start justify-content-md-end align-items-center">
                            <p className="mb-0 date-message-details ">
                                {/* {messageDetails?.created_at ? `${momentJalaali(messageDetails?.created_at).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''} */}
                                1123 2165 85789 354564 
                            </p>
                        </div>
                    </div>
                </div>
                    <div className="d-flex">
                        <span  style={{whiteSpace: "pre-line"}} className=" text-details-message text-right">
                            {/* {messageDetails?.body} */}
                            klajsd laksjdf  asldkjf l jlaksdjf lk laksdjflk asjdf lkajsdlk laksdjfl asdf
                        </span>
                    </div>
            <div className="d-flex mt-5">
                <button onClick={handleCloseDetailMessage} className="btn-close-detail-message">بستن پیام</button>
            </div>
            </div>

            
        </div>
      
      </Modal>
    </React.Fragment>
  );
};

export default ModalShowDetailsMesssage;