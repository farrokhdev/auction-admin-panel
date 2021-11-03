import React , {useState , useEffect} from 'react'
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import {Pagination , Breadcrumb , Spin} from 'antd';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import TableRequestHouseAuctionList from './TableRequestHouseAuctionList';
import PaginationComponent from '../../components/PaginationComponent';
import ModalDetailsHouseAuctionRequest from './ModalDetailsHouseAuctionRequest';
import { REQUESTS_HOUSE_AUCTION } from '../../utils/constant';
import ModalAcceptHouseAcution from './ModalAcceptHouseAcution';
import ModalRejectHouseAuction from './ModalRejectHouseAuciton';
import {LoadingOutlined} from '@ant-design/icons';

function HouseAuctionRequestPage(props) {


    const [visibleDetailHouseAuctionRequest , setVisibleDetailHouseAuctionRequest] = useState(false)
    const [visibleAcceptHouseAuction, setVisibleAcceptHouseAuction] = useState(false)
    const [visibleRejectHouseAuction, setVisibleRejectHouseAuction] = useState(false)
    const [detail_Id, setDetail_Id] = useState()
    
    const [requestHouseAuctionList , setRequestHouseAuctionList] = useState([
        // {
        //     home_auction_name : 'house',
        //     home_auction_type : 'ONLINE',
        //     activity_type : 'نقاشی',
        //     count : 2 ,
        //     id : 35,

        // },
        // {
        //     home_auction_name : 'house',
        //     home_auction_type : 'ONLINE',
        //     activity_type : 'خطاطی',
        //     count : 5 ,
        //     id : 2,

        // },
        // {
        //     home_auction_name : 'house',
        //     home_auction_type : 'HIDDEN',
        //     activity_type : 'خوشنویسی',
        //     count : 7 ,
        //     id : 3,

        // },
        // {
        //     home_auction_name : 'house',
        //     home_auction_type : 'SECOND_HIDDEN',
        //     activity_type : 'نقاشی',
        //     count : 8 ,
        //     id : 4,

        // },
        // {
        //     home_auction_name : 'house',
        //     home_auction_type : 'LIVE',
        //     activity_type : 'خطاطی',
        //     count : 9 ,
        //     id : 5,

        // },
        // {
        //     home_auction_name : 'house',
        //     home_auction_type : 'ONLINE',
        //     activity_type : 'خطاطی',
        //     count : 12 ,
        //     id : 6,

        // },
        
    ]);

    console.log("requestHouseAuctionList =>>> ", requestHouseAuctionList);
    const [countRequestHouseAuctionList, setCountRequestHouseAuctionList] = useState(0);
    const [currentPage,setcurrentPage] = useState();
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            axios.get(`${BASE_URL}${REQUESTS_HOUSE_AUCTION}`).then(res => {
                setLoading(false)
                setRequestHouseAuctionList(res.data.data.result)
                setCountRequestHouseAuctionList(res.data.data.count)
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
        }, []);


        const handeSelectPage = (e) => {
            console.log("Log Of Pagination", e);
            setcurrentPage(e)
        }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


    return (
        <React.Fragment>
      <Spin indicator={antIcon} spinning={loading}  >
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
                                                           لیست درخواست‌های خانه حراجی
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">

                                            
                                            <div className="row px-0 mx-0 mt-3">
                                                <TableRequestHouseAuctionList 
                                                    requestHouseAuctionList={requestHouseAuctionList}
                                                    visibleDetailHouseAuctionRequest={visibleDetailHouseAuctionRequest}
                                                    setVisibleAcceptHouseAuction={setVisibleAcceptHouseAuction}
                                                    setVisibleDetailHouseAuctionRequest={setVisibleDetailHouseAuctionRequest}
                                                    setVisibleRejectHouseAuction={setVisibleRejectHouseAuction}
                                                    setDetail_Id={setDetail_Id}
                                                />
                                            </div>

                                            <PaginationComponent count={countRequestHouseAuctionList} handeSelectPage={handeSelectPage}/>

                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <ModalDetailsHouseAuctionRequest
                        setVisibleDetailHouseAuctionRequest={setVisibleDetailHouseAuctionRequest}
                        visibleDetailHouseAuctionRequest={visibleDetailHouseAuctionRequest}
                        detail_Id={detail_Id}
                    />

                    <ModalAcceptHouseAcution 
                        setVisibleAcceptHouseAuction={setVisibleAcceptHouseAuction}
                        visibleAcceptHouseAuction={visibleAcceptHouseAuction}
                        detail_Id={detail_Id}
                        requestHouseAuction={requestHouseAuctionList[detail_Id]}
                    />

                    <ModalRejectHouseAuction
                        setVisibleRejectHouseAuction={setVisibleRejectHouseAuction}
                        visibleRejectHouseAuction={visibleRejectHouseAuction}
                        detail_Id={detail_Id}
                        requestHouseAuction={requestHouseAuctionList[detail_Id]}
                    />
            </div>
            </Spin>
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(HouseAuctionRequestPage)