import React from 'react'
import { Menu, Dropdown , Image} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import {convertTypePersian} from '../../utils/converTypePersion';
import { separatorCurrency } from '../../utils/separator';
import moment from 'moment-jalaali';

function TableOrdersList({ordersList , params}) {


    const menu=(id) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link  >
                    مشاهده
                </Link>
            </Menu.Item >
        </Menu>
    );

    // {
    //     image : '',
    //     artwork_name : 'artfition',
    //     architect_name : 'علی نامجو' ,
    //     auction_owner : 'ناصر محمدی',
    //     date_auction : '1399/02/34',
    //     buyer_name : 'زهره نبی',
    //     sale_price : '9000000',
    //     status : 'انجام شده'

    // }

    
    return (
        <div collapse className="table-responsive ">
            <table className="table ">
                <thead >
                    <tr className="meassage-header-table-title">
                        <th className=" px-0 minWidth-row">
                            <div className=" px-3 text-center">ردیف</div>
                        </th>
                        <th className="  px-0 minWidth-name">
                            <div className=" px-3 text-center">تصویر</div>
                        </th>

                        <th className="  px-0 minWidth-email">
                            <div className=" px-3 text-center">نام اثر</div>
                        </th>

                        <th className="  px-0 minWidth-mobile">
                            <div className=" px-3 text-center">هنرمند</div>
                        </th>

                        <th className="  px-0 minWidth-date">
                            <div className=" px-3 text-center">حراج‌دار</div>
                        </th>

                        <th className="  px-0 minWidth-typeUser">
                            <div className=" px-3 text-center">تاریخ حراج</div>
                        </th>

                        <th className="  px-0 minWidth-typeUser">
                            <div className=" px-3 text-center">خریدار</div>
                        </th>

                        <th className="  px-0 minWidth-typeUser">
                            <div className=" px-3 text-center">قیمت فروش</div>
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
                    {ordersList ? ordersList.map((order, index) =>
                        <> 
                            <tr className="spaceRow row-messages">

                            <td   className="">
                                <div  className="my-2 content-td" >
                                    <div className="text-center">{params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }</div>
                                </div>
                            </td>

                            <td   className="">
                                {/* <div   className="my-2 content-td">
                                    <div className=" text-center"> 
                                        {order?.image_url}
                                    </div>

                                    
                                </div> */}



                                <div  className="my-2 content-td" >
                                    <div className="text-center">
                                    <Image
                                        style={{width : '40px' , height : '30px' , cursor : 'pointer'}}
                                        className="box-image-product-list"
                                        width={40}
                                        preview ={order?.image_url}
                                        src={order?.media?.exact_url}
                                    />
                                        {/* <img  src={artwork?.media?.exact_url} alt="image_product" /> */}
                                    </div>
                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> 
                                            {order?.artwork_title}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" w-100 text-center"> 
                                        {order?.persian_artist_name}
                                    </div>
                                </div>
                            </td>

                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" w-100 text-center"> 
                                        {order?.owner?.first_name}
                                    </div>
                                </div>
                            </td>

                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" w-100 text-center"> 
                                        {`${moment(order?.end_time).format("jYYYY/jMM/jDD ")}  -  ${moment(order?.start_time).format("jYYYY/jMM/jDD")}`}
                                    </div>
                                </div>
                            </td>
                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" w-100 text-center"> 
                                        {order?.buyer_name}
                                    </div>
                                </div>
                            </td>
                            <td className="">
                                <div
                                    className=" my-2 content-td">
                                    <div className=" w-100 text-center"> 
                                        {/* {momentJalaali(order?.sale.date_joined).format(`HH:mm  -   jYYYY/jMM/jDD`)} */}
                                        {order?.price ? separatorCurrency(order?.price) : ''}
                                    </div>
                                </div>
                            </td>
                     
                            <td className="">
                                <div
                                    className="my-2 content-td">
                                        {/* {convertTypePersian(participant?.role)} */}
                                        {order?.sale_status ? <p className="mb-0">فروخته شد</p> : <p className="mb-0">فروخته نشد</p>}

                                </div>
                            </td>

                            <td className=" text-center">
                                <div className="my-2 content-td">
                                    <Dropdown overlay={menu(order?.id)}>
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
    )
}

export default TableOrdersList;

