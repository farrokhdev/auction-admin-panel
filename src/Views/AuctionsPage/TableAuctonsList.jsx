import React, {useEffect, useState} from 'react'
import {Menu, Dropdown, message, Modal, Spin} from 'antd';
import {DownOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {removeAUCTION, setAUCTION} from "../../redux/reducers/auction/auction.actions";
import {DELETE_AUCTION, EDIT_AUCTION} from "../../utils/constant";
import {faPen, faTimes, faPlus} from "@fortawesome/free-solid-svg-icons";
import {BASE_URL} from "../../utils";
import axios from "../../utils/request";

function TableAuctonsList({ setBidsAuction_id , setVisibleBidsAuction , setVisibleAuctionProduct , setAuctionProduct_id}) {
    const [Auctions, setAuctions] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(30);

    const {confirm} = Modal;
    useEffect(() => {
        getProducts()

    }, [])

    function showDeleteConfirm(id) {

        confirm({
            title: 'آیا قصد حذف کردن این حراجی را دارید؟',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: 'بله',
            okType: 'danger',
            cancelText: 'خیر',
            onOk() {
                setLoading(true)
                axios.delete(`${BASE_URL}${DELETE_AUCTION(id)}`)
                    .then(resp => {
                        setLoading(false)
                        message.success("حذف حراجی با موفقیت انجام شد")
                        getProducts()
                    })
                    .catch(err => {
                        setLoading(false)
                        console.error(err);
                        if (err?.response?.data?.message)
                            message.error(err.response.data.message)
                        else if (err?.response?.data?.data?.result)
                            message.error(err.response.data.message)
                        else
                            message.error("دوباره تلاش کنید")
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    const getProducts = (page_size = pageSize) => {
        setLoading(true)
        axios.get(`${BASE_URL}/sale/auctions/?page_size=${page_size}`)
            .then(resp => {
                setLoading(false)
                if (resp.data.code === 200) {
                    setAuctions(resp.data.data.result)
                }

            })
            .catch(err => {
                setLoading(false)
                console.error(err);
            })
    }

    const dispatch = useDispatch();
    const menu = (id) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link to={`/auctions/${id}`}>
                    مشاهده
                </Link>
            </Menu.Item>

            <Menu.Item className="text-center">
                <Link to={`/auctions-participants/${id}`}>
                    شرکت کنندگان
                </Link>
            </Menu.Item>
            <Menu.Item 
                onClick={()=> handleShowAuctionProduct(id)}
                className="text-center">
      
                آثار
            </Menu.Item>
            <Menu.Item 
             className="text-center"
                onClick={()=>handleShowModalBid(id)}
             >
               بیدها
            </Menu.Item>
        </Menu>
    );

    const handleShowModalBid = (id)=> {
        setBidsAuction_id(id)
        setTimeout(() => {
            setVisibleBidsAuction(true)
        }, 700);
    }   
    
    const handleShowAuctionProduct = (id)=> {
        setAuctionProduct_id(id)
        setTimeout(() => {
            setVisibleAuctionProduct(true)
        }, 700);
    }


    return (
        <div collapse className="table-responsive ">
            <table className="table ">
                <thead>
                <tr className="meassage-header-table-title">
                    <th className=" px-0 minWidth-row">
                        <div className=" px-3 text-center">ردیف</div>
                    </th>
                    <th className="  px-0 minWidth-name">
                        <div className=" px-3 text-center">نام</div>
                    </th>

                    <th className="  px-0 minWidth-email">
                        <div className=" px-3 text-center">خانه حراج</div>
                    </th>

                    <th className="  px-0 minWidth-mobile">
                        <div className=" px-3 text-center">نوع حراج</div>
                    </th>

                    <th className="  px-0 minWidth-date">
                        <div className=" px-3 text-center">تاریخ برگزاری</div>
                    </th>

                    <th className="  px-0 minWidth-typeUser">
                        <div className=" px-3 text-center">وضعیت</div>
                    </th>
                    <th className="  px-0 minWidth-action"></th>
                    <th className="  px-0 minWidth-action">
                        <div className="px-3 text-center">عملیات</div>
                    </th>
                    <th className="  px-0 minWidth-action text-center">نمایش درسایت</th>

                </tr>
                </thead>

                <tbody>
                {Auctions ? Auctions.map((auction, index) =>
                    <>
                        <tr className="spaceRow row-messages">

                            <td className="">
                                <div className="my-2 content-td">
                                    <div className="text-center">{++index}</div>
                                </div>
                            </td>

                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" text-center"> {auction?.title}</div>

                                </div>
                            </td>
                            <td className="">

                                <div className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center">
                                            {auction?.house}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" w-100 text-center"> {convertTypePersian(auction?.type)}</div>
                                </div>
                            </td>
                            <td className="">
                                <div
                                    className=" my-2 content-td">
                                    <div
                                        className=" w-100 text-center"> {momentJalaali(auction?.date_joined).format(`HH:mm  -   jYYYY/jMM/jDD`)}</div>
                                </div>
                            </td>

                            <td className="">
                                <div className="my-2 content-td">
                                    {convertTypePersian(auction?.status)}
                                </div>
                            </td>
                            <td>
                                <div className="my-2 content-td">
                                    {auction.status !== "CLOSED" ? <>
                                        <Link onClick={() => dispatch(removeAUCTION())}
                                              to={`/add-new-auction/${auction.id}`} type="button">
                                            <FontAwesomeIcon icon={faPen} style={{color: '#007268'}}/>
                                        </Link>
                                        <button className="btn " type="button" style={{color: 'red'}}
                                                onClick={() => showDeleteConfirm(auction.id)}>
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </button>
                                    </> : ''}
                                </div>
                            </td>
                            <td className=" text-center">
                                <div className="my-2 content-td">
                                    <Dropdown overlay={menu(auction?.id)}>
                                        <a className="">
                                            <img src={icon_more} alt=""/>
                                            {/* <DownOutlined/> */}
                                        </a>
                                    </Dropdown>
                                    {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}
                                </div>
                            </td>
                            <td className="text-center">
                                <ShowCheckbox visible_in_site={auction?.visible_in_site} auctionId={auction?.id}/>
                            </td>

                        </tr>

                    </>
                ) : <div className="d-flex text-center w-100">لیست خالی</div>}
                </tbody>
            </table>

        </div>
    )
}

export default TableAuctonsList;

const ShowCheckbox = (props) => {
    const {auctionId, visible_in_site} = props;
    const [loading, setLoading] = useState(false);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setIsShow(visible_in_site)
    }, [visible_in_site])

    const handleShow = (value) => {
        setLoading(true)
        axios.patch(`${BASE_URL}${EDIT_AUCTION(auctionId)}`, {
            visible_in_site:value
        })
            .then(resp => {
                setLoading(false)
                if (resp.data.code === 200) {
                    message.success("اطلاعات نمایش در سایت با موفقیت ویرایش شد")
                    // setNext(true)
                    // dispatch(removeAUCTION())
                    setIsShow(value)
                } else {
                    console.log(resp)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err.response);

                if (err.response?.data?.message === "ok")
                    message.error(err.response?.data?.data?.error_message)
                else
                    message.error(err.response?.data?.message)

            })
    }
    return (
        <Spin spinning={loading}>
        <div className="my-2 content-td">
            <input className="form-check-input" type="checkbox"
                   checked={isShow}
                   onChange={(e) => {
                       handleShow(e.target.checked);
                       // dispatch(setAUCTION({extendable_deadline:e.target.checked}))
                   }}
                   id="checkbox413"/>
        </div>
        </Spin>
    )
}
