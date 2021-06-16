import React, {useState, useEffect} from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import Header from '../../components/Header';
import {Menu, Dropdown, Breadcrumb , Pagination} from 'antd';
import {NavLink} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg';
import TableHouseAuctionList from './TableHouseAuctionList';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import axios from "../../utils/request";
import Loading from '../../components/Loading';
import PaginationComponent from '../../components/PaginationComponent';

function HouseAuctionsPage(props) {

    const [houseAuctionsList , setHouseAuctionsList] = useState([]);
    const [countHouseAuction , setCountHouseAuction] = useState();
    const [currentPage , setcurrentPage] = useState(1);
    const [loading , setLoading] = useState(false);

        useEffect(() => {
            setLoading(true)
            axios.get(`${BASE_URL}/account/home-auction/`).then(res => {
                setLoading(false)
                setHouseAuctionsList(res.data.data.result.results)
                setCountHouseAuction(res.data.data.result.count)
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
                                                    <Breadcrumb.Item><NavLink 
                                                            key="1"
                                                            onClick={ e => props.toggleActiveNavDrawer("1")}
                                                            to="/">
                                                            خانه
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                       لیست خانه‌های حراجی
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">
                                            
                                            <div className="row px-0 mx-0">
                                                <TableHouseAuctionList 
                                                    houseAuctionsList={houseAuctionsList}
                                                />
                                            </div>

                                            <PaginationComponent count={countHouseAuction} handeSelectPage={handeSelectPage}/>

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
  
  export default connect(mapStateToProps , mapDispatchToProps)(HouseAuctionsPage)