import React , {useState , useEffect} from 'react'
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import {Breadcrumb} from 'antd';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import TableAuctonsList from './TableAuctonsList';
import PaginationComponent from '../../components/PaginationComponent';
import ModalBidsMember from '../MembersPage/ModalBidsMember';
import ModalBidsAuction from './ModalBidsAuction';
import ModalAuctionProducts from './ModalAuctionProducts';


function AuctionsPage(props) {
    
    const [auctionsList , setAuctionsList] = useState([]);
    const [countAuction, setCountAuction] = useState(0);
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [visibleBidsAuction, setVisibleBidsAuction] = useState(false);
    const [visibleAuctionProduct, setVisibleAuctionProduct] = useState(false);
    const [bidsAuction_id, setBidsAuction_id] = useState()
    const [auctionProduct_id, setAuctionProduct_id] = useState()

    

        useEffect(() => {
            axios.get(`${BASE_URL}/sale/auctions/`).then(res => {
                setLoading(false)
                setAuctionsList(res.data.data.result)
                setCountAuction(res.count)
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
        }, []);


        const handeSelectPage = (e) => {
            console.log("Log Of Pagination", e);
            setcurrentPage(e)
        }


        const handleRedirect = () => {
            window.location.href = "/#add-new-auction";
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
                                                           حراج‌ها
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">

                                            <button className="btn-redirect-to-add-auction" onClick={handleRedirect}>افزودن حراج جدید</button>
                                            
                                            <div className="row px-0 mx-0 mt-3">
                                                <TableAuctonsList 
                                                    auctionsList={auctionsList}
                                                    setVisibleBidsAuction={setVisibleBidsAuction}
                                                    setBidsAuction_id={setBidsAuction_id}
                                                    setAuctionProduct_id={setAuctionProduct_id}
                                                    visibleAuctionProduct={visibleAuctionProduct}
                                                    setVisibleAuctionProduct={setVisibleAuctionProduct}
                                                />
                                            </div>

                                            <PaginationComponent count={countAuction} handeSelectPage={handeSelectPage}/>

                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

                {!!bidsAuction_id  ? 
                    <ModalBidsAuction
                    setVisibleBidsAuction={setVisibleBidsAuction}
                    visibleBidsAuction={visibleBidsAuction}
                    bidsAuction_id={bidsAuction_id}
                    setBidsAuction_id={setBidsAuction_id}
                />
                : null}          
                
                {!!auctionProduct_id  ? 
                    <ModalAuctionProducts
                    setVisibleAuctionProduct={setVisibleAuctionProduct}
                    visibleAuctionProduct={visibleAuctionProduct}
                    auctionProduct_id={auctionProduct_id}
                    setAuctionProduct_id={setAuctionProduct_id}
                />
                : null}

                

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
  
  export default connect(mapStateToProps , mapDispatchToProps)(AuctionsPage)