import React from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';


function TableMemberList(props) {
 const {
    memberList , 
    params ,  
    setIs_call_service_auctions , 
    setIs_call_service_favoriteArtwork , 
    setIs_call_service_bids , 
    setVisibleParticipantAuctions , 
    setVisibleBidsMember , 
    setMemberId , 
    setVisibleFavoriteArtwork
} = props


    const menu=(id , wallet_id , role) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link to={ role !== "home_auction" ?   `/members/${id}/` : `/house-auctions/${id}/`} >
                    مشاهده
                </Link>
            </Menu.Item >
            <Menu.Item  onClick={()=>handleClickBids(id)} className="text-center">
                بیدها
            </Menu.Item>
            <Menu.Item onClick={()=>handleClickAucitons(id)} className="text-center">
               حراج‌ها
            </Menu.Item>
            <Menu.Item onClick={()=> handleClickArtworkFavorite(id)} className="text-center">
                آثار مورد علاقه
            </Menu.Item>
            <Menu.Item className="text-center">
                <Link to={`/wallets/${wallet_id}/`}>
                    کیف پول
                </Link>
            </Menu.Item>
        </Menu>
    );

    const handleClickBids = (id) => {
        setMemberId(id)
        setTimeout(() => {
            // set variable to 'true', for check that api call service or not
            setIs_call_service_bids(true)
            // set variable to 'true', for show  modal
            setVisibleBidsMember(true)
        }, 300);
    } 


    const handleClickAucitons = (id) => {
        setMemberId(id)
        setTimeout(() => {
            // set variable to 'true', for check that api call service or not
            setIs_call_service_auctions(true)
            // set variable to 'true', for show  modal
            setVisibleParticipantAuctions(true)
        }, 300);
    }   
    
    const handleClickArtworkFavorite = (id) => {
        setMemberId(id)
        setTimeout(() => {
            // set variable to 'true', for check that api call service or not
            setIs_call_service_favoriteArtwork(true)
            // set variable to 'true', for show  modal
            setVisibleFavoriteArtwork(true)
        }, 300);
    }

    
    return (
        <div collapse className="table-responsive ">
            <table className="table ">
                <thead >
                    <tr className="meassage-header-table-title">
                        <th className=" px-0 minWidth-row">
                            <div className=" px-3 text-center">ردیف</div>
                        </th>
                        <th className="  px-0 minWidth-name">
                            <div className=" px-3 text-center">نام</div>
                        </th>

                        <th className="  px-0 minWidth-email">
                            <div className=" px-3 text-center">ایمیل</div>
                        </th>

                        <th className="  px-0 minWidth-mobile">
                            <div className=" px-3 text-center">شماره تماس</div>
                        </th>

                        <th className="  px-0 minWidth-date">
                            <div className=" px-3 text-center">تاریخ عضویت</div>
                        </th>

                        <th className="  px-0 minWidth-typeUser">
                            <div className=" px-3 text-center">نوع کاربر</div>
                        </th>

                        <th className="  px-0 minWidth-action">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {memberList?.length ? memberList.map((member, index) =>
                        <React.Fragment key={member?.id}> 
                            <tr className="spaceRow row-messages">

                                <td   className="">
                                    <div  className="my-2 content-td" >
                                        <div className="text-center">{params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }</div>
                                    </div>
                                </td>

                                <td   className="">
                                    <div   className="my-2 content-td">
                                        <div className=" text-center"> {member?.first_name}{' '}{member?.last_name}</div>

                                    </div>
                                </td>
                                <td  className="">
                                    <div   className=" ">
                                        <div className="my-2 content-td">
                                            <div className=" text-center"> {member?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="">
                                    <div className="my-2 content-td">
                                        <div className=" w-100 text-center"> {member?.mobile}</div>
                                    </div>
                                </td>
                                <td className="">
                                    <div
                                        className=" my-2 content-td">
                                        <div className=" w-100 text-center"> {momentJalaali(member?.date_joined).format(`HH:mm  -   jYYYY/jMM/jDD`)}</div>
                                    </div>
                                </td>

                                <td className="">
                                    <div
                                
                                        className="my-2 content-td">
                                            {convertTypePersian(member?.role)}
                                    </div>
                                </td>
                                <td className=" text-center">
                                    <div className="my-2 content-td">
                                        <Dropdown overlay={menu(member?.id , member?.wallet_id , member?.role)}>
                                            <a className="">
                                                <img src={icon_more} alt=""/>
                                                {/* <DownOutlined/> */}
                                            </a>
                                        </Dropdown>
                                        {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}

                                    </div>
                                </td>
                            </tr>

                            </React.Fragment>
                        ) : <div className="d-flex text-center w-100"></div>}

                   

            </tbody>
        </table>

    </div>
    )
}

export default TableMemberList;
