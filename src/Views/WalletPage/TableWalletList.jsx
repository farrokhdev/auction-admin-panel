import React , {useState} from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';


function TableWalletList({walletList}) {


    const menu=(id) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link  >
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
                        <div className=" px-3 text-center">نام</div>
                    </th>

                    <th className="  px-0 minWidth-email">
                        <div className=" px-3 text-center">اعتبار نقدی (تومان)</div>
                    </th>

                    <th className="  px-0 minWidth-description">
                        <div className=" px-3 text-center">اعتبار هدیه (تومان)</div>
                    </th>

                    <th className="  px-0 minWidth-action">
                        <div className="px-3 text-center">عملیات</div>
                    </th>
                </tr>
            </thead>

            <tbody>
                {walletList ? walletList.map((wallet, index) =>
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
                                {wallet?.user_name}
                            </div>

                            </div>
                        </td>
                 
                        <td className="">
                            <div
                                className=" my-2 content-td">
                                <div className=" w-100 text-center"> 
                                    {wallet?.inventory}
                                </div>
                            </div>
                        </td>
                
                        <td className="">
                            <div
                          
                                className="my-2 content-td">
                                    {wallet?.gift_credit}
                            </div>
                        </td>
                        <td className=" text-center">
                            <div className="my-2 content-td">
                                <Dropdown overlay={menu(wallet?.id)}>
                                    <a className="">
                                        <img src={icon_more} alt=""/>
                                    </a>
                                </Dropdown>
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

export default TableWalletList;

