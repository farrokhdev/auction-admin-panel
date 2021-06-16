import React from 'react'
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import { Menu, Dropdown } from 'antd';
import classnames from 'classnames';


function TableHouseAuctionList({houseAuctionsList}) {


    const menu = (id , home_auction_name) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link to={`/house-auctions/${id}`} >
                    مشاهده
                </Link>
            </Menu.Item >
            <Menu.Item  className="text-center">
                <Link to={`/house-auctions/auctions/${id}/${home_auction_name}`} >
                    حراج‌های فعال
                </Link>
            </Menu.Item>
            <Menu.Item  className="text-center">
                <Link to={`/house-auctions-participants/${id}`} >
                    لیست شرکت کنندگان
                </Link>
            </Menu.Item>
            <Menu.Item  className="text-center">
                <Link to={`/house-auctions-applicants/${id}`} >
                    لیست درخواست کنندگان
                </Link>
            </Menu.Item>
        </Menu>
    );

    function messageStatusTypePersian(value) {

        switch(value){
            case 'pending':
                return 'در حال بررسی'
            case 'reject':
                return 'رد شده'
            case 'accept':
                return 'پذیرفته شده'
            case 'create':
                return 'ثبت شده'
            default:
                return ''
        }
    }


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

                        <th style={{minWidth : '5rem'}} className="  px-0 minWidth-status">
                            <div className=" px-3 text-center">وضعیت</div>
                        </th>
      

                        <th style={{minWidth : '5rem'}} className="  px-0 minWidth-status-messageRead">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {houseAuctionsList ? houseAuctionsList.map((houseAuction, index) =>
                        <> 
                            <tr 
                            // key={index} 
                            className="spaceRow row-messages">

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
                                    {houseAuction?.first_name}
                                    </div>

                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> 
                                            {houseAuction?.home_auction_name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                       
                            <td className="">
                                <div
                                    className=" my-2 content-td">
                                    <div className=" w-100 text-center">
                                        {houseAuction?.email ? houseAuction?.email : 'mail@gmail.com'}
                                    </div>
                                </div>
                            </td>

                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" w-100 text-center"> 
                                        {houseAuction?.mobile}
                                    </div>
                                </div>
                            </td>

                            <td className="">
                                <div  className={classnames("my-2", "content-td", {
                                        "text-state-pending": houseAuction?.home_auction_request === "pending",
                                        "text-state-fail": houseAuction?.home_auction_request === "reject",
                                        "text-state-done": houseAuction?.home_auction_request === "accept",
                                        "text-state-submit": houseAuction?.home_auction_request === "create",
                                    })}>
                                    {houseAuction?.home_auction_request ? messageStatusTypePersian(houseAuction?.home_auction_request) : ''}
                                </div>
                            </td>
                       
                            <td className=" text-center">
                                <div className="my-2 content-td">
                                    <Dropdown overlay={menu(houseAuction?.id , houseAuction?.home_auction_name)}>
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
                       ) : <div className="d-flex text-center w-100">لیست خالی</div>} 

                   

            </tbody>
        </table>

    </div>
        </React.Fragment>
    )
}

export default TableHouseAuctionList
