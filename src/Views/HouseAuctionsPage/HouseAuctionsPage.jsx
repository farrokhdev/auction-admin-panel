import React, {useState, useEffect} from 'react';
import {Breadcrumb , Input } from 'antd';
import {NavLink} from 'react-router-dom';
import TableHouseAuctionList from './TableHouseAuctionList';
import {BASE_URL} from '../../utils';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import axios from "../../utils/request";
import Loading from '../../components/Loading';
import PaginationComponent from '../../components/PaginationComponent';
import queryString from 'query-string';





function HouseAuctionsPage(props) {

    const { Search } = Input;
    // const menu=(id) => (

    //     <Menu>
    //         <Menu.Item onClick={(e)=> handleSetState("پذیرفته شده")} className="text-center">
    //              پذیرفته شده
    //         </Menu.Item >
       
    //         <Menu.Item onClick={(e)=> handleSetState("پذیرفته نشده")} className="text-center">
    //               پذیرفته نشده
    //         </Menu.Item>

    //     </Menu>
    // ); 

    const [houseAuctionsList , setHouseAuctionsList] = useState([]);
    const [countHouseAuction , setCountHouseAuction] = useState();
    const [currentPage , setcurrentPage] = useState(1);
    const [loading , setLoading] = useState(false);
    const [params , setParams] = useState(
        {
            page : 1 , 
            page_size : 5 , 
            search : '' , 
        });

        console.log("params " , params);

        useEffect(() => {
            setLoading(true)
            const queries = queryString.stringify(params);
            axios.get(`${BASE_URL}/account/home-auction/?${queries}`).then(res => {
                setLoading(false)
                setHouseAuctionsList(res.data.data.result)
                setCountHouseAuction(res.data.data.count)
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
        }, [params]);


        const handeSelectPage = (e) => {
            setcurrentPage(e);
            setParams({
                ...params , page : e
            })
        }
        

        // const handleSetState = (valuState) => {
        //     setParams({...params , house_status : valuState })
        // }
    
        const handleSetMemberFilter = (value) => {
            setParams({...params , search : value })
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

                                        <div className="d-block d-lg-flex mb-2">
                                                
                                                <div className="col">
                                                    <div className="d-flex">
                                                        <Search className="mb-2" placeholder="جستجوی کاربر" 
                                                        onSearch={(e)=> handleSetMemberFilter(e)} 
                                                        style={{ width: 300 }}  />
                                                    </div>
                                                </div>

                                                {/* <div className="col">
                                                    <div className="d-flex align-items-center  h-100 mt-2 mt-lg-0">
                                                        <p className="mb-0 ml-2 text-right">وضعیت</p>
                                                        <Dropdown className="d-flex " overlay={menu} placement="bottomLeft" arrow>
                                                            <button className="d-flex justify-content-center align-items-center btn-status-product-filter"> 
                                                            <p className="mb-0">{params?.house_status ? params?.house_status : "انتخاب وضعیت"}</p><CaretDownOutlined /> </button>
                                                        </Dropdown>
                                                    </div>
                                                </div> */}
                                            </div>
                                            
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