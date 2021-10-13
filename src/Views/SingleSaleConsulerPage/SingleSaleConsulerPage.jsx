import React, {useState, useEffect} from 'react'
import {Input, Breadcrumb, Image, Table , Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {NavLink, Link} from 'react-router-dom';
import {BASE_URL} from '../../utils';
import axios from "../../utils/request";
import {connect} from 'react-redux';
import ModalSendToHouseAuction from './ModalSendToHouseAuction';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {setUserForSaleConsulerResponse} from '../../redux/reducers/user/user.actions';
import Loading from '../../components/Loading';
import {faCheck, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function SingleSaleConsulerPage(props) {

    const {TextArea} = Input;
    const [visibleSendToHouseAuction, setVisibleSendToHouseAuction] = useState(false);
    const [artwork, setArtwork] = useState({});
    const [suggestHomeAuction, setSuggestHomeAuction] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSuggest, setLoadingSuggest] = useState(false);

    useEffect(() => {
        getData()
        getSuggest()
    }, []);

    const handleShowModal = () => {
        setVisibleSendToHouseAuction(true);
    }



    const getData = () => {
        setLoading(true)
        axios.get(`${BASE_URL}/sale/product/${props.match.params.id}/`).then(res => {
            if(res.data.data.result)
            setArtwork(res.data.data.result)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err);
        })
    }
    const getSuggest = () => {
        setLoadingSuggest(true)
        axios.get(`${BASE_URL}/auction-house/suggest/?product__id=${props.match.params.id}`).then(res => {
            setSuggestHomeAuction(res.data.data.result)
            setLoadingSuggest(false)
        }).catch(err => {
            setLoadingSuggest(false)
            console.log(err);
        })
    }


    const handleRedirectToSendMessage = (label , value) => {
        console.log("lable : " , label , "id : " , value);
        props.setUserForSaleConsulerResponse({label : label , value : value})
        setTimeout(() => {
            window.location.href = "#/send-message"
        }, 300);
    }





    const {Column, ColumnGroup} = Table;

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div>
            <React.Fragment>
            <Spin indicator={antIcon} spinning={loading}  >
                <div
                    style={{
                        marginTop: '30px'
                    }}
                    className="container-fluid px-0 container-pages">

                    <div className="row m-0">
                        <div className="col">
                            <div className="row justify-content-start pb-3 mx-0">
                                <div className="col px-0">
                                    <div className="d-flex">
                                        <Breadcrumb>
                                            <Breadcrumb.Item>
                                                <NavLink key="1" onClick={e => props.toggleActiveNavDrawer("1")} to="/">
                                                    خانه
                                                </NavLink>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item></Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                {`مشاوره فروش`}
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                </div>
                            </div>

                            <div className="row content-page ">

                                <div className="col pt-5">

                                    <div className="d-block d-lg-flex ">
                                        <div className="col-12 col-lg-4">
                                            <p className="text-right">تصویر اصلی</p>
                                        </div>
                                        <div className="col-12 col-lg-8">
                                            <div className="d-flex">

                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={artwork?.media?.exact_url}
                                                    fallback={artwork?.media?.media_path}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-5">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right">نام کاربر درخواست کننده</p>
                                        </div>
                                        <div className="col">
                                            <Input
                                                value={artwork?.owner?.first_name ? artwork?.owner?.first_name : ''}/>
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right">نام اثر</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.artwork_title}/>
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right">نام هنرمند</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.english_artist_name}/>
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right"> تخمین قیمت (تومان)</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.price}/>
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>
                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right"> دسته بندی عمومی</p>
                                        </div>
                                        <div className="col">
                                            {artwork?.category?.length ? <Input value={artwork?.category.map((t) => t.title)}/> : ''}
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>
                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right"> تکنیک اثر</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.technique}/>
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>
                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right"> طول اثر</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.artwork_length}/>
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>
                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right"> ارتفاع اثر</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.artwork_height}/>
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>
                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right"> عرض اثر</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.artwork_width}/>
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right ">توضیحات</p>
                                        </div>
                                        <div className="col">
                                            <TextArea  value={artwork?.persian_description} style={{minHeight: '150px'}}
                                                      rows={8}
                                                // value={artwork?.persian_description ? artwork?.persian_description : ''}
                                            />
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>


                                 <Spin indicator={antIcon} spinning={loading || loadingSuggest}  >
                                    { artwork?.owner?.role !== "home_auction" ? <>
                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col">
                                                <p className="mb-2 mb-lg-0 text-right">لیست پیشنهادات به خانه حراج</p>
                                            </div>
                                        </div>
                                        <div className="mt-3">

                                            <Table dataSource={suggestHomeAuction}>

                                                <Column title="نام خانه حراجی " render={(text, record) => <span>{record.auction_house.home_auction_name}</span>}/>
                                                <Column title="نام ونام خانوادگی " render={(text, record) => <span>{record.auction_house.first_name + ' ' + record.auction_house.last_name}</span>}/>
                                                <Column title="شماره موبایل " render={(text, record) => <span>{record.auction_house.mobile }</span>}/>

                                                <Column title="  انتخاب توسط کاربر "
                                                        render={(text, record) => <span>{record.is_selected ? <span className="text-success">
                                                            <FontAwesomeIcon className="ms-1"
                                                                            icon={faCheck}/>
                                                        </span> : 'انتخاب نشده'}</span>}/>
                                                <Column title="پاسخ خانه حراجی" render={(text, record) => <>
                                                    <span>{record.homeauction_sugesstion_status === "accept" &&  <span className="text-success">  <FontAwesomeIcon className="ms-1"
                                                                                                                                                                icon={faCheck}/></span>}</span>
                                                    <span>{record.homeauction_sugesstion_status === "unseen" && ' دیده نشده'}</span>
                                                    <span>{record.homeauction_sugesstion_status === "seen" && ' دیده شده'}</span>
                                                    <span>{record.homeauction_sugesstion_status === "reject" && <span className="text-danger">  <FontAwesomeIcon className="ms-1"
                                                                                                                                                                icon={faTimes}/></span>}</span>
                                                </>
                                                }/>

                                            </Table>
                                        </div>
                                    </> : null}
                                    

                                    <div className="d-block d-sm-flex mt-5">
                                        <div className="col px-0">
                                            <div
                                                className="d-flex justify-content-center justify-content-sm-end ml-sm-3">
                                                <button onClick={handleShowModal}
                                                        className="btn-send-to-house-auctions">ارسال پیشنهاد به خانه‌های
                                                    حراج
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col px-0">
                                            <div
                                                className="d-flex justify-content-center justify-content-sm-start mt-2 mt-sm-0">
                                               
                                                <button onClick={()=>handleRedirectToSendMessage(`${artwork?.owner?.first_name} ${artwork?.owner?.last_name}` , artwork?.owner?.id)} className="btn-response-to-user">پاسخ به کاربر</button>
                                             
                                            </div>
                                        </div>
                                    </div>
                                </Spin>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <ModalSendToHouseAuction
                    paramsId={props.match.params.id}
                    getSuggest={getSuggest}
                    visibleSendToHouseAuction={visibleSendToHouseAuction}
                    setVisibleSendToHouseAuction={setVisibleSendToHouseAuction}/>

                </Spin>
            </React.Fragment>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        toggleActiveNavDrawer: (data) => dispatch(toggleActiveNavDrawer(data)),
        setUserForSaleConsulerResponse: (data) => dispatch(setUserForSaleConsulerResponse(data)),
    }
}

const mapStateToProps = (store) => {
    return {
        panel: store.panelReducer,
        user : store.userReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleSaleConsulerPage)
