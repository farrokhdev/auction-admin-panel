import React from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali, { now } from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';



function TableSalesConsuler({salesConsulerList}) {

    const menu=(id , name) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link to={`/sales-consuler/${id}/${name}`} >
                    مشاهده
                </Link>
            </Menu.Item >
        </Menu>
    );


    return (
        <div collapse className="table-responsive ">
        <table className="table ">
            <thead >
                <tr className="meassage-header-table-title">
                    <th className=" px-0 minWidth-row">
                        <div className=" px-3 text-center">ردیف</div>
                    </th>
                    <th className="  px-0 minWidth-name">
                        <div className=" px-3 text-center">نام کاربر</div>
                    </th>

                    <th className="  px-0 minWidth-email">
                        <div className=" px-3 text-center">تاریخ ایجاد</div>
                    </th>

                    <th className="  px-0 minWidth-mobile">
                        <div className=" px-3 text-center">وضعیت</div>
                    </th>

                    <th className="  px-0 minWidth-action">
                        <div className="px-3 text-center">عملیات</div>
                    </th>
                </tr>
            </thead>

            <tbody>
                {salesConsulerList ? salesConsulerList.map((salesConsuler, index) =>
                    <> 
                        <tr className="spaceRow row-messages">

                        <td   className="">
                            <div  className="my-2 content-td" >
                                <div className="text-center">
                                    {++index}
                                </div>
                            </div>
                        </td>

                        <td   className="">
                            <div   className="my-2 content-td">
                                <div className=" text-center"> 
                                {salesConsuler?.owner?.first_name ? salesConsuler?.owner?.first_name : 'علی'}{' '}{salesConsuler?.owner?.last_name ? salesConsuler?.owner?.last_name : 'صابری'}
                                </div>

                            </div>
                        </td>
                 
                        <td className="">
                            <div
                                className=" my-2 content-td">
                                <div className=" w-100 text-center"> 
                                {momentJalaali(salesConsuler?.date_joined ? salesConsuler?.date_joined : new Date()).format(`HH:mm  -   jYYYY/jMM/jDD`)}
                                </div>
                            </div>
                        </td>
                
                        <td className="">
                            <div
                          
                                className="my-2 content-td">
                                    {salesConsuler?.is_approve === true ? "تایید شده" : "تایید نشده"}
                            </div>
                        </td>
                        <td className=" text-center">
                            <div className="my-2 content-td">
                                <Dropdown 
                                overlay={menu(salesConsuler?.id , salesConsuler?.owner?.first_name)}
                             
                                >
                                    
                                        <img src={icon_more} alt=""/>
                                        {/* <DownOutlined/> */}
                                    
                                </Dropdown>
                                {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}

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

export default TableSalesConsuler;
