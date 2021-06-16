import React , {useState , useEffect} from 'react'
import classnames from 'classnames';
import axios from "../../utils/request";
import {BASE_URL} from '../../utils';
import momentJalaali from 'moment-jalaali';
// import iconRead from '../../images/svg/read.svg';
// import iconUnRead from '../../images/svg/unread.svg';
// import iconDoing from '../../images/svg/loading.svg';
// import iconFail from '../../images/svg/cancel-24px.svg';
import ModalShowDetailsMesssage from './ModalShowDetailsMesssage';
import {connect} from 'react-redux';
import {getCountUnReadMessages , getStatusMessages} from '../../redux/reducers/user/user.actions';


function TableInboxMessage(props) {


    const [modalMessageDetails , setModalMessageDetails] = useState(false);
    const [selectShowDetailsMessage , setSelectShowDetailsMessage] = useState();
    const [messageDetails, setmessageDetails] = useState({
        title : 'اعتبار شارژ',
        receiver : 'نادری',
        sender : 'قربانی',
        date_send : '1400/03/04',
        date_update : '1400/03/23',
        type : 'مشاهده شده'});
    const [visibleDetailsMessage, setVisibleDetailsMessage] = useState(false);


    function messageStatusTypePersian(value) {

        if(value){
            return (<span >
                {/* <img className="ml-2" src={iconRead}/> */}
                مشاهده شده</span>)
        }else{
             return (<span >
                 {/* <img className="ml-2" src={iconUnRead}/> */}
                 مشاهده نشده</span>)
        }
      
    }

    const handleClickShowDetailsMessage = (id) => {
        
       axios.get(`${BASE_URL}/users/messaging/${id}/`).then(res => {

           if(true){
                axios.get(`${BASE_URL}/messaging/unread_count`).then(res => {
                    props.getCountUnReadMessages(res.data.result.count_unread)
                    props.getStatusMessages()
                }).catch(err => {
                    console.log(err);
                })
           }
        // props.handleChangeStatusMessage(id)
        setmessageDetails(res.data.data.result);
    }).catch(err => {
        console.log(err);
 
    })
    setTimeout(() => {
        setVisibleDetailsMessage(true)
    }, 700);

    }

    return (
        <React.Fragment>

             <div collapse className="table-responsive">
                    <table className="table borderTable">
                        <thead >
                            <tr className="meassage-header-table-title">
                                <th  className="px-0 minWidth-titleMessage">
                                    <div className="  text-center">عنوان پیام</div>
                                </th>
                                <th  className="px-0 minWidth-titleMessage">
                                    <div className="  text-center">دریافت کننده</div>
                                </th>
                                <th  className="px-0 minWidth-titleMessage">
                                    <div className="  text-center">ارسال کننده</div>
                                </th>
                                <th  className="border-0 px-0 minWidth-DateMessage">
                                    <div className="  text-center">زمان ارسال</div>
                                </th>
                                <th  className="border-0 px-0 minWidth-DateMessage">
                                    <div className="  text-center">زمان بروزرسانی</div>
                                </th>
                              
                                <th  className="border-0 px-0 minWidth-type">
                                    <div className="  text-center">نوع</div>
                                </th>  
                                {/* <th  className="border-0 px-0 minWidth-status">
                                    <div className="  text-center">وضعیت</div>
                                </th>  */}
                     
                                <th  className="border-0 px-0 minWidth-details">
                                    <div className="text-center">عملیات</div>
                                </th>
                                     
                            </tr>
                        </thead>

                        {/* {
            title : 'تاییدیه',
            receiver : 'محمدی',
            sender : 'سعیدی',
            date_send : '1400/02/22',
            date_update : '1400/03/24',
        }, */}

                        <tbody>

                                {props.messageList?.map(message => (
                                    <>
                                        <tr 
                                            key={message.message?.id}  
                                        className="spaceRow row-messages">

                                        <td>
                                            <div  className=" py-3 contentTd my-1 border-row-message-right">
                                                <div className="border-left text-center w-100">
                                                    {message?.title ? message?.title : ''}
                                                </div>
                                            </div>
                                        </td>
                                

                                        <td>
                                            <div className=" py-3 contentTd my-1 ">
                                                <div className="border-left text-center w-100"> 
                                                    {/* {message?.additional_data?.receiver ? message?.additional_data?.receiver : ''} */}
                                                    {message?.receiver ? message?.receiver : ''}
                                        
                                                </div>
                                                
                                            </div>
                                        </td>

                                        <td>
                                            <div className=" py-3 contentTd my-1 ">
                                                <div className="border-left text-center w-100"> 
                                                    {/* {message?.additional_data?.sender ? message?.additional_data?.sender : ''} */}
                                                    {message?.sender ? message?.sender : ''}
                                                </div>
                                                
                                            </div>
                                        </td>
                                        <td>
                                            <div className=" py-3 contentTd my-1 ">
                                                <div className="border-left text-center w-100"> 
                                                    {message?.date_send ? `${momentJalaali(message?.date_send).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''}
                                                </div>
                                                
                                            </div>
                                        </td>
                                        <td>
                                            <div className=" py-3 contentTd my-1 ">
                                                <div className="border-left text-center w-100">
                                                {message?.date_update ? `${momentJalaali(message?.date_update).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''}
                                                    
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className=" py-3 contentTd my-1 ">
                                                <div className="border-left text-center w-100">
                                                    {message?.type ? messageStatusTypePersian(message?.type) : ''}
                                                </div>
                                            </div>
                                        </td>
                                 
                                
                                        <td>
                                            <div style={{height : '59px'}} className=" px-0 py-2 contentTd minWidth-trade border-row-left my-1 ">
                                                <button
                                                    className="btn-show-detail-message"
                                                    onClick={()=>handleClickShowDetailsMessage(message?.id)}
                                                >جزییات</button>
                                                
                                            </div>
                                        </td>
                                </tr>
                            
                                    </>
                               ))}   

                                    <ModalShowDetailsMesssage 
                                        setVisibleDetailsMessage = {setVisibleDetailsMessage}
                                        visibleDetailsMessage = {visibleDetailsMessage}
                                        messageDetails = {messageDetails}
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
        getCountUnReadMessages : (data) => dispatch(getCountUnReadMessages(data)),
        getStatusMessages : () => dispatch(getStatusMessages()),
}}

const mapStateToProps = (store) => {
    return {
        user : store.userReducer
}}

 export default connect(mapStateToProps, mapDispatchToProps)(TableInboxMessage);

