import React , {useState} from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import ModalAcceptOffer from './ModalAcceptOffer';
import ModalRejectOffer from './ModalRejectOffer';

function TableOffersHouseAuction({houseAuctionOffersList , openNotification}) {

const [visibleAcceptOffer, setVisibleAcceptOffer] = useState(false);
const [visibleRejectOffer, setVisibleRejectOffer] = useState(false);

    const menu=(id) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link to={`/sales-consuler/${id}`} >
                    مشاهده
                </Link>
            </Menu.Item >
            <Menu.Item onClick={()=>handleShowAcceptModal(id)} className="text-center">
                تایید درخواست
            </Menu.Item >
            <Menu.Item onClick={()=>handleShowRejectModal(id)} className="text-center">
                رد درخواست
            </Menu.Item >
        </Menu>
    );


    const handleShowAcceptModal = (id) => {
        setVisibleAcceptOffer(true)
    }

    const handleShowRejectModal = (id) => {
        setVisibleRejectOffer(true)
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
                        <div className=" px-3 text-center">نام خانه حراج</div>
                    </th>

                    <th className="  px-0 minWidth-email">
                        <div className=" px-3 text-center">وضعیت</div>
                    </th>

                    <th className="  px-0 minWidth-description">
                        <div className=" px-3 text-center">توضیحات</div>
                    </th>

                    <th className="  px-0 minWidth-action">
                        <div className="px-3 text-center">عملیات</div>
                    </th>
                </tr>
            </thead>

            <tbody>
                {/* {houseAuctionOffersList ? houseAuctionOffersList.map((offer, index) => */}
                    <> 
                        <tr className="spaceRow row-messages">

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
                                {/* {offer?.first_name} */}
                                1
                            </div>

                            </div>
                        </td>
                 
                        <td className="">
                            <div
                                className=" my-2 content-td">
                                <div className=" w-100 text-center"> 23</div>
                            </div>
                        </td>
                
                        <td className="">
                            <div
                          
                                className="my-2 content-td">
                                    {/* {convertTypePersian(offer?.role)} */}
                            </div>
                        </td>
                        <td className=" text-center">
                            <div className="my-2 content-td">
                                <Dropdown overlay={menu(1)}>
                                    <a className="">
                                        <img src={icon_more} alt=""/>
                                    </a>
                                </Dropdown>
                                {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}

                            </div>
                        </td>
                        </tr>

                        </>
                    {/* ) : <div className="d-flex text-center w-100">لیست خالی</div>} */}

               <ModalAcceptOffer
                    visibleAcceptOffer= {visibleAcceptOffer}
                    setVisibleAcceptOffer = {setVisibleAcceptOffer}
                    openNotification={openNotification}
               />

                <ModalRejectOffer
                    visibleRejectOffer= {visibleRejectOffer}
                    setVisibleRejectOffer = {setVisibleRejectOffer}
                    openNotification={openNotification}
               />

        </tbody>
    </table>

</div>
    )
}

export default TableOffersHouseAuction;
