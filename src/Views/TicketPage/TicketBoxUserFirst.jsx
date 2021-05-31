import React from 'react'
import momentJalaali from 'moment-jalaali';
import dark_Profiel_icon from '../../images/svg/profile-header.svg';

function TicketBoxUserFirst({ticketDetails}) {

    console.log("ticketDetails",ticketDetails);
    return (
        <React.Fragment>
           
            <div className="d-flex justify-content-start justify-content-md-end box-content-ticket-user ml-2 ml-lg-5">
                <div className="d-block ">
                    <div className="d-flex box-header-ticket-user-details">
                        <div className="col">
                            <div className="d-flex mb-2">
                                <img src={dark_Profiel_icon} alt="icon-profile"/>
                                <div className="d-block">
                                    <p className=" mb-0 mr-1 mt-1 text-right">{ ticketDetails?.user_name}</p>
                                    <p className="d-sm-none mb-0 mr-1 text-right">{ticketDetails?.created_at ? `${momentJalaali(ticketDetails?.created_at).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-block px-0 ">
                            <div className="d-flex align-items-center h-100">
                                <p className="mb-0 d-none d-sm-block">{ ticketDetails?.created_at ? `${momentJalaali(ticketDetails?.created_at).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex  box-text-ticket-admin-details">
                        <p className="text-right mb-2">{ticketDetails?.body ? ticketDetails?.body : ''}</p>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
        
    )
}

export default TicketBoxUserFirst
