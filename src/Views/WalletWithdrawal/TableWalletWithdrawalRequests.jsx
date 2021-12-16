import React  from 'react'
import { Menu, Dropdown } from 'antd';
import icon_more from '../../images/svg/icon-more.svg'
import { separatorCurrency } from '../../utils/separator';

function TableWalletList({withdrawalRequestList , params , setUserId , setVisibleAcceptWithdrawal , setVisibleRejectWithdrawal}) {

    const menu=(id) => (
        <Menu>
            <Menu.Item key="0" onClick={()=>handleShowModalAcceptWithdrawal(id)} className="text-center">
                 تایید برداشت
            </Menu.Item >

            <Menu.Item key="1" onClick={()=>handleShowModalRejectWithdrawal(id)} className="text-center">
                رد برداشت
            </Menu.Item >
        </Menu>
    );

    // function for show modal accept withdrawal
    const handleShowModalAcceptWithdrawal = (id) => {
        setUserId(id)
        setVisibleAcceptWithdrawal(true)
    } 
    // function for show modal reject withdrawal
    const handleShowModalRejectWithdrawal = (id) => {
        setUserId(id)
        setVisibleRejectWithdrawal(true)
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

                    <th className="px-0 minWidth-action">
                        <div className="px-3 text-center">عملیات</div>
                    </th>
                </tr>
            </thead>

            <tbody>

                {withdrawalRequestList?.length ? withdrawalRequestList?.map((withdrawalRequest, index) =>
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
                     ) : <div className="d-flex text-center w-100"></div>} 
        </tbody>
    </table>


</div>
    )
}

export default TableWalletList;

