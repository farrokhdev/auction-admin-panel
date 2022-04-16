import React from 'react';
import { Menu, Dropdown , notification , Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import axios from '../../utils/request'
import { BASE_URL } from '../../utils';
import EmptyComponent from '../../components/EmptyComponent';
import { convertBtnBystateParticipantsAuction } from '../../utils/converTypePersion';

function TableParticipantsInAuctionList({getListParicipants ,  participantsList , params }) {

    const { confirm } = Modal;
    const menu = (id , user_id) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link to={`/check-membership-auctions/${id}`} >
                    مشاهده
                </Link>
            </Menu.Item >    
            <Menu.Item  onClick={() => handleShowConfirm(true , user_id)} className="text-center">
               تایید عضویت
            </Menu.Item>
            <Menu.Item onClick={() => handleShowConfirm(false , user_id)} className="text-center">
               رد عضویت
            </Menu.Item>
        </Menu>
    );


    function handleShowConfirm(state , user_id) {

        confirm({
            title: state ? 'از تایید عضویت اطمینان دارید؟' : 'از رد عضویت اطمینان دارید؟',
            icon: <ExclamationCircleOutlined />,
            content: state ? `تایید عضویت ` : `رد عضویت `,
            className: "confirm-accept-membership",
            okText: state ? "تایید عضویت" : "رد عضویت",
            cancelText: "انصراف",

            onOk() {
                console.log('تایید');

                let payload = {
                    "is_approve": state ? "True" : "False"
                }


                axios.patch(`${BASE_URL}/sale/join-auction/${user_id}/`, payload).then(res => {

                }).catch(err => {
                    console.log(err);
                })

                openNotification(state)
                getListParicipants()
            },
            onCancel() {
                console.log('انصراف');
            },


        });
    }

    const openNotification = (state) => {
        notification.success({
            message: state ? 'تایید عضویت' : 'رد عضویت',
            description: `عضویت  با موفقیت انجام شد`,
            duration: 1.2,
            className: 'custom-class',
            style: {
                backgroundColor: '#f9faf5'
            }
        });
    };



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
                    {participantsList?.length ? participantsList?.map((participant, index) =>
                        <>
                            <tr className="spaceRow row-messages">

                                <td className="">
                                    <div className="my-2 content-td" >
                                        <div className="text-center">{params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }</div>
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
                                        {convertBtnBystateParticipantsAuction(participant?.is_approve)}
                                    </div>
                                </td>
                                <td className=" text-center">
                                    <div className="my-2 content-td">
                                        <Dropdown overlay={menu(participant?.applicant?.id , participant?.id)}>
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

            {!participantsList?.length && <EmptyComponent text="شرکننده‌ای برای این خانه حراجی ثبت نشده" />}
        </div>
    )
}

export default TableParticipantsInAuctionList;
