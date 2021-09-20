import React , {useState} from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import { separatorCurrency } from '../../utils/separator';
import ModalConfirmWithdrawalRequest from './ModalConfirmWithdrawal';

function TableWalletList({withdrawalRequestList , params , setUserId , setVisibleAcceptWithdrawal}) {

 
    // const [visibleRejectOffer, setVisibleRejectOffer] = useState(false);


    // const menu=(id) => (
      
    //         <Menu>
    //             <Menu.Item key="0" onClick={()=>handleShowModalAcceptWithdrawal(id)} className="text-center">
    //                 تایید برداشت
    //             </Menu.Item >

    //             <Menu.Item key="1" className="text-center">
    //                 رد برداشت
    //             </Menu.Item >
    //         </Menu>

        
   
    // );



    const menu=(id) => (
        <Menu>
            <Menu.Item key="0" onClick={()=>handleShowModalAcceptWithdrawal(id)} className="text-center">
                 تایید برداشت
            </Menu.Item >

            <Menu.Item key="1" className="text-center">
                رد برداشت
            </Menu.Item >
        </Menu>
    );


    const handleShowModalAcceptWithdrawal = (id) => {
        setUserId(id)
        setVisibleAcceptWithdrawal(true)
    }



    return (
        <div collapse className="table-responsive ">
        <table className="table ">
            <thead >
                <tr className="meassage-header-table-title">
                    <th className="px-0 minWidth-row">
                        <div className=" px-3 text-center">ردیف</div>
                    </th>
                    <th className="px-0 minWidth-fullname">
                        <div className=" px-3 text-center">نام کاربر</div>
                    </th>

                    <th className="px-0 minWidth-email">
                        <div className=" px-3 text-center">مقدار (تومان)</div>
                    </th>

                    <th className="px-0 minWidth-tracking_code">
                        <div className=" px-3 text-center">کد پیگیری</div>
                    </th>
                    
                    {/* <th className="  px-0 minWidth-description">
                        <div className=" px-3 text-center">نوع تراکنش</div>
                    </th> */}

                    <th className="px-0 minWidth-action">
                        <div className="px-3 text-center">عملیات</div>
                    </th>
                </tr>
            </thead>

            <tbody>

                {withdrawalRequestList ? withdrawalRequestList?.map((withdrawalRequest, index) =>
                    <> 
                        <tr key={withdrawalRequest?.id} className="spaceRow row-messages">
                            <td className="">
                                <div className="my-2 content-td" >
                                    <div className="text-center">
                                        {params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }
                                    </div>
                                </div>
                            </td>

                            <td className="">
                                <div   className="my-2 content-td">
                                    <div className=" text-center"> 
                                        {withdrawalRequest?.wallet_owner}
                                    </div>

                                </div>
                            </td>
                    
                            <td className="">
                                <div className=" my-2 content-td">
                                    <div className=" w-100 text-center"> 
                                        {withdrawalRequest?.amount ? separatorCurrency(withdrawalRequest?.amount) : ''}
                                    </div>
                                </div>
                            </td>
                    
                            <td className="">
                                <div
                            
                                    className="my-2 content-td">
                                        {withdrawalRequest?.tracking_code}
                                </div>
                            </td>        
                            
                            {/* <td className="">
                                <div
                                    className="my-2 content-td">
                                        {withdrawalRequest?.transaction_type}
                                </div>
                            </td> */}
                            <td className=" text-center">
                                <div className="my-2 content-td">
                                    <Dropdown overlay={menu(withdrawalRequest?.id)}>
                                        <a className="">
                                            <img src={icon_more} alt=""/>
                                        </a>
                                    </Dropdown>
                                </div>
                            </td>
                        </tr>

                        </>
                     ) : <div className="d-flex text-center w-100">لیست خالی</div>} 


      

        </tbody>
    </table>


</div>
    )
}

export default TableWalletList;

