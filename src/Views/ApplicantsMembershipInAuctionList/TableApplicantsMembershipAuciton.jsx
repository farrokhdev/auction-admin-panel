import React, { useState, useEffect } from 'react'
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import momentJalaali from 'moment-jalaali';
import { convertTypePersian } from '../../utils/converTypePersion';
import icon_more from '../../images/svg/icon-more.svg';
import EmptyPlaceholder from '../../components/EmptyPlaceholder/EmptyPlaceholder';

function TableApplicantsMembershipAuciton({ applicantsList }) {

    const menu = (id) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link  >
                    مشاهده
                </Link>
            </Menu.Item >
        </Menu>
    );

    console.log("applicantsList ", applicantsList);

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

                        {/* <th className="  px-0 minWidth-date">
                            <div className=" px-3 text-center">تاریخ عضویت</div>
                        </th> */}

                        {/* <th className="  px-0 minWidth-typeUser">
                            <div className=" px-3 text-center">نوع کاربر</div>
                        </th> */}

                        <th className="  px-0 minWidth-action">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {applicantsList ? applicantsList.map((applicant, index) =>
                        <>
                            <tr className="spaceRow row-messages">

                                <td className="">
                                    <div className="my-2 content-td" >
                                        <div className="text-center">{++index}</div>
                                    </div>
                                </td>

                                <td className="">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> {applicant?.applicant?.first_name}</div>

                                    </div>
                                </td>
                                <td className="">

                                    <div className=" ">
                                        <div className="my-2 content-td">
                                            <div className=" text-center"> {applicant?.applicant?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="">
                                    <div className="my-2 content-td">
                                        <div className=" w-100 text-center"> {applicant?.applicant?.mobile}</div>
                                    </div>
                                </td>
                                {/* <td className="">
                                <div
                                    className=" my-2 content-td">
                                    <div className=" w-100 text-center"> {momentJalaali(applicant?.date_joined).format(`HH:mm  -   jYYYY/jMM/jDD`)}</div>
                                </div>
                            </td> */}
                                {/* <td className="">
                                <div
                            
                                    className=" my-2 content-td">

                                </div>
                            </td> */}
                                {/* <td className="">
                                <div
                              
                                    className="my-2 content-td">
                                        {convertTypePersian(applicant?.role)}
                                </div>
                            </td> */}
                                <td className=" text-center">
                                    <div className="my-2 content-td">
                                        <Dropdown overlay={menu(applicant?.id)}>
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

            {!applicantsList?.length && <EmptyPlaceholder />}
        </div>
    )
}

export default TableApplicantsMembershipAuciton
