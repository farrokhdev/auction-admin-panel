import React , {useState} from 'react';
import axios from "../../utils/request";
import {BASE_URL} from '../../utils';
import momentJalaali from 'moment-jalaali';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions'
import {connect} from 'react-redux';
import ModalShowDetailTicket from './ModalShowDetailTicket';
import classnames from 'classnames';

function TableTickets(props) {

    const [visibleDetailTicket, setVisibleDetailTicket] = useState(false);
    const [ticketDetails, setTicketDetails] = useState();

    const handleClickShowDetailsTicket = (id) => {

        axios.get(`${BASE_URL}/panel/ticket/${id}/`).then(res => {
            setTicketDetails(res.data.data.result);
            props.decreaseCountUnredTicket()

        }).catch(err => {
            console.log(err);
        })

        setVisibleDetailTicket(true);
    }

    function messageStatusTypePersian(value) {

        switch(value){
            case 'pending':
                return 'در انتظار پاسخ'
            case 'close':
                return 'بسته شده'
            case 'read':
                return 'پاسخ داده شده'
            case 'unread':
                return 'پاسخ داده شده'
            default:
                return ''
        }
    }

    return (
        <React.Fragment>

             <div collapse className="table-responsive">
                    <table className="table borderTable">
                        <thead >
                            <tr className="meassage-header-table-title">
                                <th  className="px-0 minWidth-titleMessage">
                                    <div className="  text-center">عنوان تیکت</div>
                                </th>

                                <th  className="border-0 px-0 minWidth-DateMessage">
                                    <div className="  text-center">زمان ارسال</div>
                                </th>
                              
                                <th  className="border-0 px-0 minWidth-type">
                                    <div className="  text-center">وضعیت</div>
                                </th>  
                     
                                <th  className="border-0 px-0 minWidth-details">
                                    <div className="text-center">عملیات</div>
                                </th>
                                     
                            </tr>
                        </thead>

                        <tbody>

                                {props.ticketList?.map(ticket => (
                                    <>
                                        <tr 
                                            key={ticket?.id}  
                                            className="spaceRow row-messages">

                                        <td>
                                            <div  className=" py-3 contentTd my-1 border-row-message-right">
                                                <div className="border-left text-center w-100">
                                                    {ticket?.title ? ticket?.title : ''}
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className=" py-3 contentTd my-1 ">
                                                <div className="border-left text-center w-100"> 
                                                    {ticket?.creation_date ? `${momentJalaali(ticket?.creation_date).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''}
                                                </div>
                                                
                                            </div>
                                        </td>
                                        
                                        <td>
                                            <div className=" py-3 contentTd my-1 ">
                                                <div    
                                                className={classnames("border-left", "text-center", "w-100", {
                                                    "text-state-pending": ticket?.state === "pending",
                                                    "text-state-fail": ticket?.state === "close",
                                                    "text-state-done": ticket?.state === "read",
                                                    "text-state-submit": ticket?.state === "unread",
                                                })}>
                                                    {ticket?.state ? messageStatusTypePersian(ticket?.state) : ''}
                                                </div>
                                            </div>
                                        </td>
                                 
                                
                                        <td>
                                            <div style={{height : '59px'}} className=" px-0 py-2 contentTd minWidth-trade border-row-left my-1 ">
                                                <button
                                                    className="btn-show-detail-message"
                                                    onClick={()=>handleClickShowDetailsTicket(ticket?.id)}
                                                >جزییات</button>
                                                
                                            </div>
                                        </td>
                                </tr>
                            
                                    </>
                               ))}   

                                    <ModalShowDetailTicket 
                                        setVisibleDetailTicket = {setVisibleDetailTicket}
                                        visibleDetailTicket = {visibleDetailTicket}
                                        ticketDetails={ticketDetails}
                                        momentJalaali = {momentJalaali}
                                    />
                                
                        </tbody>
                    </table>
                </div>

        </React.Fragment>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        toggleActiveNavDrawer : (data) => dispatch(toggleActiveNavDrawer(data)),
    }
  }
  
  const mapStateToProps = (store) => {
    return {
        panel: store.panelReducer
    }
  }
  
  export default connect(mapStateToProps , mapDispatchToProps)(TableTickets)