import React, {useState, useEffect} from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import Header from '../../components/Header';
import {Menu, Dropdown, Breadcrumb} from 'antd';
import {NavLink} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg';
import TableHouseAuctionList from './TableHouseAuctionList';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';



function HouseAuctionsPage(props) {

    const [houseAuctions,
        setHouseAuctions] = useState([]);
    console.log("houseAuctions =>>>> ", houseAuctions);

    useEffect(() => {

        fetcher(`${BASE_URL}/panel/request/`, {
            method: "GET",
            data: "",
            header: {}
        }).then(res => {
            setHouseAuctions(res.data.result.results)
        }).catch(err => {
            console.log(err);
        })

    }, []);

    return (
        <React.Fragment>
            <div className="container-fluid ">

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
                                    خانه‌های حراج
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col">
                        <TableHouseAuctionList/>
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