import React from 'react'
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import { Menu, Dropdown } from 'antd';

function TableAuctionOfHouseAuctionsPage({auctionsInHouseAuction , houseAuciton}) {


    const menu = (
        <Menu>
            <Menu.Item className="text-center">
                <Link >
                    مشاهده
                </Link>
            </Menu.Item >
            <Menu.Item  className="text-center">
                <Link  >
                شرکت کنندگان
                </Link>
            </Menu.Item>
            <Menu.Item className="text-center">
                <Link  >
                    آثار
                </Link>
            </Menu.Item>
            <Menu.Item className="text-center">
                <Link >
                    بیدها
                </Link>
            </Menu.Item>
        </Menu>
    );


    
    function messageStatusTypePersian(value) {

        switch(value){
            case 'LIVE':
                return 'زنده'
            case 'ONLINE':
                return 'آنلاین'
            case 'PERIODIC':
                return 'PERIODIC'
            case 'HIDDEN':
                return 'HIDDEN'
            case 'SECOND_HIDDEN':
                return 'SECOND_HIDDEN'
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
                        <th style={{minWidth : '3rem'}} className=" px-0 ">
                            <div className="  text-center">ردیف</div>
                        </th>
                        <th style={{minWidth : '10rem'}} className="  px-0 minWidth-DateMessage">
                            <div className=" text-center">نام</div>
                        </th>

                        <th style={{minWidth : '7rem'}} className="  px-0 minWidth-status-messageRead">
                            <div className="  text-center">خانه حراج</div>
                        </th>

                        <th style={{minWidth : '6rem'}} className="  px-0 minWidth-status-messageRead">
                            <div className="  text-center">نوع حراج</div>
                        </th>

                        <th style={{minWidth : '10rem'}} className="  px-0 minWidth-status-messageRead">
                            <div className="  text-center">تاریخ برگزاری</div>
                        </th>

                        {/* <th  style={{minWidth : '5rem'}}className="  px-0 minWidth-status-messageRead">
                            <div className="  text-center">وضعیت</div>
                        </th> */}
      

                        <th  style={{minWidth : '5rem'}}className="  px-0 minWidth-status-messageRead">
                            <div className=" text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {auctionsInHouseAuction ? auctionsInHouseAuction.map((auction, index) =>
                        <> 
                            <tr
                            //  key={index} 
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
                                        {auction?.sale?.title}
                                    </div>

                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> 
                                            {houseAuciton ? houseAuciton : ''}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="">
                                <div className=" my-2 content-td">
                                    {auction?.sale?.type ? messageStatusTypePersian(auction?.sale?.type) : ''}
                                </div>
                            </td>
                       
                            <td className="">
                                <div
                                    className=" my-2 content-td">
                                    <div className=" w-100 text-center">
                                        {momentJalaali(auction?.date_joined).format(`HH:mm  -   jYYYY/jMM/jDD`)}
                                    </div>
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
                     ) : <div className="d-flex text-center w-100">لیست خالی</div>} 

                   

            </tbody>
        </table>

    </div>
        </React.Fragment>
    )
}

export default TableAuctionOfHouseAuctionsPage;
