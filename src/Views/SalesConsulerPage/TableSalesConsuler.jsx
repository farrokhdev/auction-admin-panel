import React from 'react'
import {Menu, Dropdown, Image , Tooltip} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali, {now} from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import EmptyComponent from '../../components/EmptyComponent';
import { FcCheckmark  , FcDisapprove } from "react-icons/fc";
import {handleShowImage} from '../../utils/showImageProduct'


function TableSalesConsuler({salesConsulerList, page}) {

    const menu = (id) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link to={`/sales-consuler/${id}/`}>
                    مشاهده
                </Link>
            </Menu.Item>
        </Menu>
    );


    return (
        <div collapse className="table-responsive ">
            <table className="table ">
                <thead>
                <tr className="meassage-header-table-title">
                    <th className=" px-0 minWidth-row">
                        <div className=" px-3 text-center">ردیف</div>
                    </th>
                    <th className="  px-0 minWidth-name">
                        <div className=" px-3 text-center">تصویر</div>
                    </th>
                    <th className="  px-0 minWidth-name">
                        <div className=" px-3 text-center">نام کاربر</div>
                    </th> 
                    
                    <th className="  px-0 minWidth-name">
                        <div className=" px-3 text-center">نام محصول</div>
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
                {salesConsulerList?.length ? salesConsulerList.map((salesConsuler, index) =>
                    <>
                        <tr className="spaceRow row-messages">

                            <td className="">
                                <div className="my-2 content-td">
                                    <div className="text-center">
                                        {(index + 1) + ((page - 1) * 10)}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="my-2 content-td">
                                <Image style={{width : '40px'}} height={30} className="image-thumbnail" src={handleShowImage(salesConsuler)}/>
                                </div>
                            </td>
                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" text-center">
                                        {salesConsuler?.owner?.first_name ? salesConsuler?.owner?.first_name : 'علی'}{' '}{salesConsuler?.owner?.last_name ? salesConsuler?.owner?.last_name : 'صابری'}
                                    </div>

                                </div>
                            </td>

                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" text-center">
                                        {salesConsuler?.artwork_title ? salesConsuler?.artwork_title : ''}
                                    </div>

                                </div>
                            </td>

                            <td className="">
                                <div
                                    className=" my-2 content-td">
                                    <div className=" w-100 text-center">
                                        {momentJalaali(salesConsuler?.latest_auction?.start_time ? salesConsuler?.latest_auction?.start_time : new Date()).format(`HH:mm  -   jYYYY/jMM/jDD`)}
                                    </div>
                                </div>
                            </td>

                            <td className="">
                                <div

                                    className="my-2 content-td">
                                    {salesConsuler?.is_approve === "accept" ?  
                                    <Tooltip title="تایید شده" color="green" ><FcCheckmark size={25}/></Tooltip> : 
                                    <Tooltip title="تایید نشده" color="orange" ><FcDisapprove size={25}/></Tooltip>}
                                </div>
                            </td>
                            <td className=" text-center">
                                <div className="my-2 content-td">
                                    <Dropdown
                                        overlay={menu(salesConsuler?.id, salesConsuler?.owner?.first_name)}

                                    >

                                        <img src={icon_more} alt=""/>
                                        {/* <DownOutlined/> */}

                                    </Dropdown>
                                    {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}

                                </div>
                            </td>
                        </tr>

                    </>
                ) : <div className="d-flex text-center w-100"></div>}


                </tbody>
            </table>
                        {!salesConsulerList?.length  && <EmptyComponent text={"مشاوره فروشی موجود نیست"}/>}
        </div>
    )
}

export default TableSalesConsuler;
