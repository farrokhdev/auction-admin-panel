import React from 'react'
import { Menu, Dropdown } from 'antd';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import {convertTypePersian} from '../../utils/converTypePersion';


function TableAuctonsList(props) {

    const menu=(id) => (
        <Menu>
            <Menu.Item 
                onClick = {(e)=>handleShowModalDetailsRequest(id)}
                 className="text-center">
                مشاهده جزئیات
            </Menu.Item >

            <Menu.Item 
                onClick = {(e)=>handleShowAcceptHouseAuction(id)}
                 className="text-center">
                تایید خانه حراجی
            </Menu.Item >         
            
            <Menu.Item 
                onClick = {(e)=>handleShowRejectHouseAuction(id)}
                 className="text-center">
                رد خانه حراجی
            </Menu.Item >

        </Menu>
    );

    const handleShowModalDetailsRequest = (id) => {
        props.setDetail_Id(id)
        setTimeout(() => {
            props.setVisibleDetailHouseAuctionRequest(true)
        }, 700);
    }

    const handleShowAcceptHouseAuction = (id) => {
        props.setDetail_Id(id)
        props.setVisibleAcceptHouseAuction(true)
    }    
    
    const handleShowRejectHouseAuction = (id) => {
        props.setDetail_Id(id)
        props.setVisibleRejectHouseAuction(true)
    }

    
    return (
        <div collapse className="table-responsive ">
            <table className="table ">
                <thead >
                    <tr className="meassage-header-table-title">
                        <th className=" px-0 minWidth-row">
                            <div className=" px-3 text-center">ردیف</div>
                        </th>

                        <th className="  px-0 minWidth-email">
                            <div className=" px-3 text-center">خانه حراج</div>
                        </th>

                        {/* <th className="  px-0 minWidth-mobile">
                            <div className=" px-3 text-center">نوع حراج</div>
                        </th>  
                        
                        <th className="  px-0 minWidth-mobile">
                            <div className=" px-3 text-center">نوع فعالیت</div>
                        </th>  
                        
                        <th className="  px-0 minWidth-mobile">
                            <div className=" px-3 text-center">تعداد خانه حراجی</div>
                        </th> */}

                        <th className="  px-0 minWidth-action">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {props.requestHouseAuctionList?.length ? props.requestHouseAuctionList.map((request, index) =>
                        <> 
                            <tr className="spaceRow row-messages">

                                <td   className="">
                                    <div  className="my-2 content-td" >
                                        <div className="text-center">{++index}</div>
                                    </div>
                                </td>

                                <td   className="">
                                    <div   className="my-2 content-td">
                                        <div className=" text-center"> {request?.home_auction_name}</div>

                                    </div>
                                </td>

                                {/* <td className="">
                                    <div className="my-2 content-td">
                                        <div className=" w-100 text-center"> {request?.home_auction_type ? request?.home_auction_type : ''}</div>
                                    </div>
                                </td> */}
{/* 
                                <td  className="">
                                    <div className="">
                                        <div className="my-2 content-td">
                                            <div className=" text-center"> 
                                            {request?.activity_type}
                                        </div>
                                        </div>
                                    </div>
                                </td>          */}
                                
                                {/* <td  className="">
                                    <div className="">
                                        <div className="my-2 content-td">
                                            <div className=" text-center"> 
                                            {request?.count}
                                        </div>
                                        </div>
                                    </div>
                                </td> */}

                                <td className=" text-center">
                                    <div className="my-2 content-td">
                                        <Dropdown overlay={menu(request?.id)}>
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
                        ) : <span className="d-flex text-center w-100"></span>}
            </tbody>
        </table>

    </div>
    )
}

export default TableAuctonsList;
