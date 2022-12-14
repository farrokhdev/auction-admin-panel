import React, { useState, useEffect } from 'react'
import { Input, Breadcrumb, Image, Table, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { NavLink, Link } from 'react-router-dom';
import { BASE_URL } from '../../utils';
import axios from "../../utils/request";
import { connect } from 'react-redux';
import ModalSendToHouseAuction from './ModalSendToHouseAuction';
import { toggleActiveNavDrawer } from '../../redux/reducers/panel/panel.actions';
import { setUserForSaleConsulerResponse } from '../../redux/reducers/user/user.actions';
import Loading from '../../components/Loading';
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DEFAULT_URL_IMAGE } from '../../utils/defaultImage';
import {handleShowImage} from '../../utils/showImageProduct'


function SingleSaleConsulerPage(props) {

    const { TextArea } = Input;
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
            if (res.data.data.result)
                setArtwork(res.data.data.result)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err);
        })
    }
    const getSuggest = () => {
        setLoadingSuggest(true)
        axios.get(`${BASE_URL}/panel/suggest/home-auction/?product__id=${props.match.params.id}`).then(res => {
            setSuggestHomeAuction(res.data.data.result)
            setLoadingSuggest(false)
        }).catch(err => {
            setLoadingSuggest(false)
            console.log(err);
        })
    }


    const handleRedirectToSendMessage = (label, value) => {
        console.log("lable : ", label, "id : ", value);
        props.setUserForSaleConsulerResponse({ label: label, value: value })
        setTimeout(() => {
            window.location.href = "#/send-message"
        }, 300);
    }



    // const handleShowImage = (item) => {
    //     return (
    //         (item?.product?.media?.length && item?.product?.media?.filter(item => item?.is_default === true)[0]?.exact_url) ?
    //             item?.product?.media?.filter(item => item?.is_default === true)[0]?.exact_url :
    //             DEFAULT_URL_IMAGE
    //     )
    // }




    const { Column, ColumnGroup } = Table;

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
                                                        ????????
                                                    </NavLink>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item></Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    {`???????????? ????????`}
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>

                                <div className="row content-page ">

                                    <div className="col pt-5">

                                        <div className="d-block d-lg-flex ">
                                            <div className="col-12 col-lg-4">
                                                <p className="text-right">?????????? ????????</p>
                                            </div>
                                            <div className="col-12 col-lg-8">
                                                <div className="d-flex">

                                                    <Image
                                                        width={200}
                                                        height={200}
                                                        src={handleShowImage(artwork)}
                                                        fallback={artwork?.media?.media_path}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex mt-5">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right">?????? ?????????? ?????????????? ??????????</p>
                                            </div>
                                            <div className="col">
                                                <Input
                                                    value={artwork?.owner?.first_name ? artwork?.owner?.first_name : ''} />
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right">?????? ??????</p>
                                            </div>
                                            <div className="col">
                                                <Input value={artwork?.artwork_title} />
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right">?????? ????????????</p>
                                            </div>
                                            <div className="col">
                                                <Input value={artwork?.english_artist_name} />
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right"> ?????????? ???????? (??????????)</p>
                                            </div>
                                            <div className="col">
                                                <Input value={artwork?.price} />
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>
                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right"> ???????? ???????? ??????????</p>
                                            </div>
                                            <div className="col">
                                                {artwork?.category?.length ? <Input value={artwork?.category.map((t) => t.title)} /> : ''}
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>
                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right"> ?????????? ??????</p>
                                            </div>
                                            <div className="col">
                                                <Input value={artwork?.technique} />
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>
                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right"> ?????? ??????</p>
                                            </div>
                                            <div className="col">
                                                <Input value={artwork?.artwork_length} />
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>
                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right"> ???????????? ??????</p>
                                            </div>
                                            <div className="col">
                                                <Input value={artwork?.artwork_height} />
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>
                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right"> ?????? ??????</p>
                                            </div>
                                            <div className="col">
                                                <Input value={artwork?.artwork_width} />
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex mt-4">
                                            <div className="col col-lg-4">
                                                <p className="mb-2 mb-lg-0 text-right ">??????????????</p>
                                            </div>
                                            <div className="col">
                                                <TextArea value={artwork?.persian_description} style={{ minHeight: '150px' }}
                                                    rows={8}
                                                // value={artwork?.persian_description ? artwork?.persian_description : ''}
                                                />
                                            </div>
                                            <div className="col-0 col-lg-2">

                                            </div>
                                        </div>


                                        <Spin indicator={antIcon} spinning={loading || loadingSuggest}  >
                                            {artwork?.product?.offer_home_auction !== "required" ? <>
                                                <div className="d-block d-lg-flex mt-4">
                                                    <div className="col">
                                                        <p className="mb-2 mb-lg-0 text-right">???????? ?????????????????? ???? ???????? ????????</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3">

                                                    <Table dataSource={suggestHomeAuction}>

                                                        <Column title="?????? ???????? ?????????? " render={(text, record) => <span>{record.auction_house.home_auction_name}</span>} />
                                                        <Column title="?????? ???????? ???????????????? " render={(text, record) => <span>{record.auction_house.first_name + ' ' + record.auction_house.last_name}</span>} />
                                                        <Column title="?????????? ???????????? " render={(text, record) => <span>{record.auction_house.mobile}</span>} />

                                                        <Column title="  ???????????? ???????? ?????????? "
                                                            render={(text, record) => <span>{record.is_selected ? <span className="text-success">
                                                                <FontAwesomeIcon className="ms-1"
                                                                    icon={faCheck} />
                                                            </span> : '???????????? ????????'}</span>} />
                                                        <Column title="???????? ???????? ??????????" render={(text, record) => <>
                                                            <span>{record.homeauction_sugesstion_status === "accept" && <span className="text-success">  <FontAwesomeIcon className="ms-1"
                                                                icon={faCheck} /></span>}</span>
                                                            <span>{record.homeauction_sugesstion_status === "unseen" && ' ???????? ????????'}</span>
                                                            <span>{record.homeauction_sugesstion_status === "seen" && ' ???????? ??????'}</span>
                                                            <span>{record.homeauction_sugesstion_status === "reject" && <span className="text-danger">  <FontAwesomeIcon className="ms-1"
                                                                icon={faTimes} /></span>}</span>
                                                        </>
                                                        } />

                                                    </Table>
                                                </div>
                                            </> : null}


                                            <div className="d-block d-sm-flex mt-5">
                                                <div className="col px-0">
                                                    <div
                                                        className="d-flex justify-content-center justify-content-sm-end ml-sm-3">
                                                        <button onClick={handleShowModal}
                                                            className="btn-send-to-house-auctions">?????????? ?????????????? ???? ?????????????????
                                                            ????????
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col px-0">
                                                    <div
                                                        className="d-flex justify-content-center justify-content-sm-start mt-2 mt-sm-0">

                                                        <button onClick={() => handleRedirectToSendMessage(`${artwork?.owner?.first_name} ${artwork?.owner?.last_name}`, artwork?.owner?.id)} className="btn-response-to-user">???????? ???? ??????????</button>

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
                        setVisibleSendToHouseAuction={setVisibleSendToHouseAuction} />

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
        user: store.userReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleSaleConsulerPage)
