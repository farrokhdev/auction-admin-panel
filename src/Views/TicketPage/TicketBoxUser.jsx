import React from 'react'
import dark_Profiel_icon from '../../images/svg/profile-header.svg';
import momentJalaali from 'moment-jalaali';

function TicketBoxUser(props) {

    console.log("******User_Tickets ****** =>>>", props.ticket);
    return (
        <div className="d-flex justify-content-start box-content-ticket-user ml-2 ml-lg-5">
            <div className="d-block ">
                <div className="d-flex box-header-ticket-user-details">
                    <div className="col">
                        <div className="d-flex mb-2">
                            <img src={dark_Profiel_icon} alt="icon-profile"/>
                            <div className="d-block">
                                <p className=" mb-0 mr-1 mt-1 text-right">{`${props.ticket?.owner?.last_name} ${' '} ${props.ticket?.owner?.first_name}`}</p>
                                <p className="d-sm-none mb-0 mr-1 text-right">{props.ticket?.created_at ? `${momentJalaali(props.ticket?.created_at).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-block px-0 ">
                        <div className="d-flex align-items-center h-100">
                            <p className="mb-0 d-none d-sm-block">{props.ticket?.created_at ? `${momentJalaali(props.ticket?.created_at).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex  box-text-ticket-user-details">
                    <p className="text-right mb-2">{props.ticket?.body}</p>
                </div>
            </div>
        </div>
    )
}

export default TicketBoxUser;
