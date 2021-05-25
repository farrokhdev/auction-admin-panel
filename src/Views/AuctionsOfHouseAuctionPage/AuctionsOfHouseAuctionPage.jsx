import React, {useState, useEffect} from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import Header from '../../components/Header';
import {Menu, Dropdown, Breadcrumb , Pagination} from 'antd';
import {NavLink} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg';
import TableAuctionOfHouseAuctionsPage from './TableAuctionOfHouseAuctionsPage';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import axios from "../../utils/request";


function AuctionsOfHouseAuctionPage(props) {

    const [auctionsInHouseAuction , setAuctionsInHouseAuction] = useState([]);
    const [countAuctionsInHouseAuction, setCountAuctionsInHouseAuction] = useState();
    const [currentPage,setcurrentPage] = useState(1);
        console.log("auctionsInHouseAuction =>>>> ", auctionsInHouseAuction);

        useEffect(() => {
            axios.get(`${BASE_URL}/account/home-auction/1`).then(res => {
                console.log(res.data.data.result.count);
                setAuctionsInHouseAuction(res.data.data.result.results)
                setCountAuctionsInHouseAuction(res.data.data.result.count)
            }).catch(err => {
                console.log(err);
            })
        }, []);


        const handeSelectPage = (e) => {
            console.log("Log Of Pagination", e);
            setcurrentPage(e)
        }


    return (


        <React.Fragment>
            <div  className="container-fluid px-0 container-pages">
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
                                                            onClick={ e => props.toggleActiveNavDrawer("1")}
                                                            to="/">
                                                            خانه
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                        <NavLink 
                                                            key="5"
                                                            onClick={ e => props.toggleActiveNavDrawer("1")}
                                                            to="/house-auctions">
                                                            خانه‌های حراجی
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                     خانه های فعال
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">
                                            
                                            <div className="row px-0 mx-0">
                                                <TableAuctionOfHouseAuctionsPage 
                                                    auctionsInHouseAuction={auctionsInHouseAuction}
                                                />
                                            </div>
                                            <div className="d-none d-sm-flex justify-content-center">
                                                <Pagination
                                                    showSizeChanger={false}
                                                    onChange={(e)=>handeSelectPage(e)}
                                                    defaultCurrent={1}
                                                    total={countAuctionsInHouseAuction}
                                                    defaultPageSize={5}
                                                />
                                            </div>
                                            <div className="d-flex d-sm-none justify-content-center ">
                                                <Pagination 
                                                    onChange={(e)=>handeSelectPage(e)}
                                                    defaultCurrent={1} 
                                                    total={countAuctionsInHouseAuction} 
                                                    defaultPageSize={5}
                                                    size="small"
                                                />
                                             </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div style={{maxWidth : '300px'}} className="col-2 box-drawer-panel px-0">
                        <DrawerMenu/>
                    </div>
                    <div className="col p-4 contentPage">
                        <TableMemberList memberList={memberList}/>
                        <div className="d-none  d-sm-flex justify-content-center mt-5">
                            <Pagination
                            onChange={(e)=>handeSelectPage(e)}
                            defaultCurrent={1}
                            total={countMember}
                            defaultPageSize={5}
                            />
                     </div>
                    </div>
                </div> */}

            </div>
        </React.Fragment>
    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        toggleActiveNavDrawer : (data) => dispatch(toggleActiveNavDrawer(data)),
    }
  }
  
  const mapStateToProps = (store) => {
    return {
        panel: store.panelReducer
    }
  }
  
  export default connect(mapStateToProps , mapDispatchToProps)(AuctionsOfHouseAuctionPage)