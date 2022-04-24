import React, { useState } from 'react'
import { Breadcrumb, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TableContentList from './TableContentList';

function ShowContentPage() {

    const [loading, setLoading] = useState(false);
    const { toggleActiveNavDrawer } = useSelector((state) => state.panelReducer);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


    const handleRedirect = () => {
        window.location.href = "#/create-content"
    }

    return (
        <>
            <Spin indicator={antIcon} spinning={loading}  >
                <div className="container-fluid px-0 container-pages">
                    <div className="row m-0">
                        <div className="col">
                            <div className="row ">
                                <div className="col content-panel-pages px-0 mx-0">
                                    <div className="row justify-content-start pb-3 mx-0">
                                        <div className="col">
                                            <div className="d-flex">
                                                <Breadcrumb>
                                                    <Breadcrumb.Item>
                                                        <NavLink
                                                            key="1"
                                                            onClick={e => toggleActiveNavDrawer("1")}
                                                            to="/">
                                                            خانه
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                        <NavLink
                                                            key="5"
                                                            onClick={e => toggleActiveNavDrawer("1")}
                                                            to="/house-auctions">
                                                           محتوا
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">

                                            <button className="btn-redirect-to-add-auction" onClick={handleRedirect}>افزودن محتوا جدید</button>

                                            <div className="row px-0 mx-0 mt-3">
                                                <TableContentList
                                                    // auctionsList={auctionsList}
                                                    // setVisibleBidsAuction={setVisibleBidsAuction}
                                                    // setBidsAuction_id={setBidsAuction_id}
                                                    // setAuctionProduct_id={setAuctionProduct_id}
                                                    // visibleAuctionProduct={visibleAuctionProduct}
                                                    // setVisibleAuctionProduct={setVisibleAuctionProduct}
                                                    // countAuction={countAuction}
                                                    setLoading={setLoading}

                                                />
                                            </div>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </>
    )
}

export default ShowContentPage;