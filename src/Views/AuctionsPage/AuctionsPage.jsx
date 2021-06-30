import React , {useState , useEffect} from 'react'
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import {Pagination , Breadcrumb} from 'antd';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import TableAuctonsList from './TableAuctonsList';
import PaginationComponent from '../../components/PaginationComponent';


function AuctionsPage(props) {
    
    const [auctionsList , setAuctionsList] = useState([
        {
            title : 'title',
            house : 'house',
            type : 'type',
            date_joined : 'date_joined',
            status : 'status',
            id : 'id',

        },
        {
            title : 'title',
            house : 'house',
            type : 'type',
            date_joined : 'date_joined',
            status : 'status',
            id : 'id',

        }
        ,
        {
            title : 'title',
            house : 'house',
            type : 'type',
            date_joined : 'date_joined',
            status : 'status',
            id : 'id',

        }
        ,
        {
            title : 'title',
            house : 'house',
            type : 'type',
            date_joined : 'date_joined',
            status : 'status',
            id : 'id',

        }
        ,
        {
            title : 'title',
            house : 'house',
            type : 'type',
            date_joined : 'date_joined',
            status : 'status',
            id : 'id',

        }
        ,
        {
            title : 'title',
            house : 'house',
            type : 'type',
            date_joined : 'date_joined',
            status : 'status',
            id : 'id',

        }
    ]);
    const [countAuction, setCountAuction] = useState();
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

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
                                                />
                                            </div>

                                            <PaginationComponent count={countAuction} handeSelectPage={handeSelectPage}/>

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
  
  export default connect(mapStateToProps , mapDispatchToProps)(AuctionsPage)