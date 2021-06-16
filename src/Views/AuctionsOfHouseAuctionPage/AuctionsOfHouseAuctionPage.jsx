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
import Loading from '../../components/Loading'
import PaginationComponent from '../../components/PaginationComponent';

function AuctionsOfHouseAuctionPage(props) {

    const [auctionsInHouseAuction , setAuctionsInHouseAuction] = useState([
        {
            title : 'سپید',
            house_auction_name : 'mohammad',
            type : 'Online',
            date_joined : '1400/03/25',
        },
        {
            title : 'نارنج',
            house_auction_name : 'mohammad',
            type : 'Online',
            date_joined : '1400/03/25',
        },
        {
            title : 'بهار',
            house_auction_name : 'mohammad',
            type : 'Online',
            date_joined : '1400/03/25',
        }
    ]);
    const [countAuctionsInHouseAuction, setCountAuctionsInHouseAuction] = useState();
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            axios.get(`${BASE_URL}/sale/join-auction/?sale__house__id=${props.match.params.id}`).then(res => {
                setLoading(false)
                // setAuctionsInHouseAuction(res.data.data.result.results)
                setCountAuctionsInHouseAuction(res.data.data.result.count)
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
        }, []);


        const handeSelectPage = (e) => {
            console.log("Log Of Pagination", e);
            setcurrentPage(e)
        }


    return (


        <React.Fragment>
            <Loading loading={loading}/>
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
                                                           خانه‌های حراج
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                        <NavLink 
                                                            key="5"
                                                            onClick={ e => props.toggleActiveNavDrawer("1")}
                                                            to="/house-auctions">
                                                           {props.match.params.name}
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                     حراج‌های فعال
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
                                                    houseAuciton={props.match.params.name}
                                                />
                                            </div>
                                            
                                             <PaginationComponent count={countAuctionsInHouseAuction} handeSelectPage={handeSelectPage} />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

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