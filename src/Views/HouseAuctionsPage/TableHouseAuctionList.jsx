import React from 'react'
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import { Menu, Dropdown } from 'antd';

function TableHouseAuctionList({houseAuctionsList}) {


    const menu = (
        <Menu>
            <Menu.Item className="text-center">
                <Link to="/house-auctions/1" >
                    مشاهده
                </Link>
            </Menu.Item >
            <Menu.Item  className="text-center">
                <Link to="/house-auctions/auctions/1" >
                    حراج‌های فعال
                </Link>
            </Menu.Item>
            <Menu.Item  className="text-center">
                <Link to="/house-auctions-participants/1" >
                    لیست شرکت کنندگان
                </Link>
            </Menu.Item>
        </Menu>
    );


    return (
        <React.Fragment>
            <div collapse className="table-responsive ">
            <table className="table ">
                <thead >
                    <tr className="meassage-header-table-title">
                        <th  style={{minWidth : '3rem'}} className=" px-0 minWidth-titleMessage">
                            <div className=" px-3 text-center">ردیف</div>
                        </th>
                        <th style={{minWidth : '10rem'}} className="  px-0 minWidth-DateMessage">
                            <div className=" px-3 text-center">نام</div>
                        </th>

                        <th style={{minWidth : '10rem'}} className="  px-0 minWidth-status-messageRead">
                            <div className=" px-3 text-center">نام مالک</div>
                        </th>

                        <th style={{minWidth : '12rem'}} className="  px-0 minWidth-status-messageRead">
                            <div className=" px-3 text-center">ایمیل</div>
                        </th>

                        <th  style={{minWidth : '8rem'}}className="  px-0 minWidth-status-messageRead">
                            <div className=" px-3 text-center">شماره تماس</div>
                        </th>

                        <th style={{minWidth : '5rem'}} className="  px-0 minWidth-status-messageRead">
                            <div className=" px-3 text-center">وضعیت</div>
                        </th>
      

                        <th style={{minWidth : '5rem'}} className="  px-0 minWidth-status-messageRead">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {/* {houseAuctionsList ? houseAuctionsList.map((houseAuction, index) => */}
                        <> 
                            <tr 
                            // key={index} 
                            className="spaceRow row-messages">

                            <td   className="">
                                <div  className="my-2 content-td" >
                                    <div className="text-center">
                                        {/* {++index} */}
                                    </div>
                                </div>
                            </td>

                            <td   className="">
                                <div   className="my-2 content-td">
                                    <div className=" text-center"> 
                                    {/* {houseAuction?.home_auction_name} */}
                                    </div>

                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> 
                                        {/* {houseAuction?.email} */}
                                        </div>
                                    </div>
                                </div>
                            </td>
                       
                            <td className="">
                                <div
                                    className=" my-2 content-td">
                                    <div className=" w-100 text-center">
                                         {/* {momentJalaali(member?.date_joined).format(`HH:mm  -   jYYYY/jMM/jDD`)} */}
                                         </div>
                                </div>
                            </td>

                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" w-100 text-center"> 
                                        {/* {houseAuction?.mobile} */}
                                    </div>
                                </div>
                            </td>

                            <td className="">
                                <div
                            
                                    className=" my-2 content-td">

                                </div>
                            </td>
                       
                            <td className=" text-center">
                                <div className="my-2 content-td">
                                    <Dropdown overlay={menu}>
                                        <a className="">
                                            <img src={icon_more} alt=""/>
                                            {/* <DownOutlined/> */}
                                        </a>
                                    </Dropdown>
                                    {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}

                                </div>
                            </td>
                            </tr>

                            </>
                         {/* ) : <div className="d-flex text-center w-100">لیست خالی</div>} */}

                   

            </tbody>
        </table>

    </div>
        </React.Fragment>
    )
}

export default TableHouseAuctionList
