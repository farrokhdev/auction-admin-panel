import React , {useState , useEffect} from 'react';
import {Breadcrumb, Pagination} from 'antd';
import { NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import {BASE_URL} from '../../utils';
import axios from "../../utils/request";
import Loading from '../../components/Loading';import TableOrdersList from './TableOrdersList';
import PaginationComponent from '../../components/PaginationComponent';

function OrdersListPage(props) {

    const [ordersList, setOrdersList] = useState([
        {
            image_url : 'https://picsum.photos/200/300',
            artwork_name : 'artfition',
            artist_name : 'علی نامجو' ,
            auction_owner : 'ناصر محمدی',
            date_auction : '1399/02/06',
            buyer_name : 'زهره نبی',
            sale_price : '9000000',
            status : 'انجام شده'

        },
        {
            image_url : 'https://picsum.photos/200/300',
            artwork_name : 'fit',
            artist_name : 'علی سعیدی' ,
            auction_owner : 'علیرضا صابری',
            date_auction : '1400/01/02',
            buyer_name : 'زهره کاویان فر',
            sale_price : '870000',
            status : 'در حال بررسی'

        },
        {
            image_url : 'https://picsum.photos/200/300',
            artwork_name : 'artwork',
            artist_name : 'سعید جفعری' ,
            auction_owner : 'کریم قاسم‌زاده',
            date_auction : '1398/05/12',
            buyer_name : 'سید جلال پورابراهیم‌زاده',
            sale_price : '500000',
            status : 'کنسل شده'

        },
        {
            image_url : 'https://picsum.photos/200/300',
            artwork_name : 'artfition',
            artist_name : 'علی نامجو' ,
            auction_owner : 'ناصر محمدی',
            date_auction : '1399/02/06',
            buyer_name : 'زهره نبی',
            sale_price : '9000000',
            status : 'انجام شده'

        },
        {
            image_url : 'https://picsum.photos/200/300',
            artwork_name : 'fit',
            artist_name : 'علی سعیدی' ,
            auction_owner : 'علیرضا صابری',
            date_auction : '1400/01/02',
            buyer_name : 'زهره کاویان فر',
            sale_price : '870000',
            status : 'در حال بررسی'

        },
        {
            image_url : 'https://picsum.photos/200/300',
            artwork_name : 'artwork',
            artist_name : 'سعید جفعری' ,
            auction_owner : 'کریم قاسم‌زاده',
            date_auction : '1398/05/12',
            buyer_name : 'سید جلال پورابراهیم‌زاده',
            sale_price : '500000',
            status : 'کنسل شده'

        },
    ]);
    const [countOrders, setCountOrders] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [loading, setloading] = useState(false);
  
    useEffect(() => {
        setloading(true)
        axios.get(`${BASE_URL}/panel/ticket=${currentPage}&page_size=5`).then(res => {
            setOrdersList(res.data.data.result.results)
            setCountOrders(res.data.count)
            setloading(false)
        }).catch(err => {
            console.log(err);
            setloading(false)
        })


    }, [currentPage]);

    const handeSelectPage = (e) => {
        console.log("Log Of Pagination", e);
        setcurrentPage(e)
    }


    return (
        <React.Fragment>
            <Loading loading={loading} />
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
                                                       لیست سفارشات
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">
                                            
                                            <div className="row px-0 mx-0">
                                                <TableOrdersList ordersList={ordersList}/>
                                            </div>
                                     
                                            <PaginationComponent count={countOrders} handeSelectPage={handeSelectPage}/>
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(OrdersListPage)