import React from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import { convertTypePersian } from '../../utils/converTypePersion';
import EmptyPlaceholder from '../../components/EmptyPlaceholder/EmptyPlaceholder';

function TableParticipantsInAuctionList({ participantsList }) {


    const menu = (id) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link to={`/check-membership-auctions/${id}`} >
                    بررسی عضویت در حراج
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
                            <div className=" px-3 text-center">وضعیت</div>
                        </th>

                        <th className="  px-0 minWidth-action">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {participantsList ? participantsList.map((participant, index) =>
                        <>
                            <tr className="spaceRow row-messages">

                                <td className="">
                                    <div className="my-2 content-td" >
                                        <div className="text-center">{++index}</div>
                                    </div>
                                </td>

                                <td className="">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> {participant?.applicant?.first_name}</div>

                                    </div>
                                </td>
                                <td className="">

                                    <div className=" ">
                                        <div className="my-2 content-td">
                                            <div className=" text-center"> {participant?.applicant?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="">
                                    <div className="my-2 content-td">
                                        <div className=" w-100 text-center"> {participant?.applicant?.mobile}</div>
                                    </div>
                                </td>
                                <td className="">
                                    <div
                                        className=" my-2 content-td">
                                        <div className=" w-100 text-center"> {momentJalaali(participant?.sale.date_joined).format(`HH:mm  -   jYYYY/jMM/jDD`)}</div>
                                    </div>
                                </td>

                                <td className="">
                                    <div

                                        className="my-2 content-td">
                                        {/* {convertTypePersian(participant?.role)} */}
                                    </div>
                                </td>
                                <td className=" text-center">
                                    <div className="my-2 content-td">
                                        <Dropdown overlay={menu(participant?.id)}>
                                            <a className="">
                                                <img src={icon_more} alt="" />
                                                {/* <DownOutlined/> */}
                                            </a>
                                        </Dropdown>
                                        {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}

                                    </div>
                                </td>
                            </tr>

                        </>
                    ) : ''}
                </tbody>
            </table>

            {!participantsList?.length && <EmptyPlaceholder />}
        </div>
    )
}

export default TableParticipantsInAuctionList;
