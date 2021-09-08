import React , {useState , useEffect} from 'react';
import {Breadcrumb, Spin} from 'antd';
import { LoadingOutlined  } from '@ant-design/icons';
import { NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import {BASE_URL} from '../../utils';
import axios from "../../utils/request";
import Loading from '../../components/Loading';
import TableOrdersList from './TableOrdersList';
import PaginationComponent from '../../components/PaginationComponent';

function OrdersListPage(props) {

    const [ordersList, setOrdersList] = useState([]);
    const [countOrders, setCountOrders] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [loading, setloading] = useState(false);
    const [params , setParams] = useState(
        {
            page : 1, 
            page_size : 10 ,           
        });
  
    useEffect(() => {
        getOrders()
    }, [params]);

    const getOrders = () => {
        setloading(true)
        axios.get(`${BASE_URL}/sale/product/?sale_status=True`).then(res => {
            setOrdersList(res.data.data.result)
            setCountOrders(res.data.count)
            setloading(false)
        }).catch(err => {
            console.log(err);
            setloading(false)
        })
    }

    const handeSelectPage = (e) => {
        setcurrentPage(e)
        setParams({
            ...params , page : e
        })
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
            {/* <Loading loading={loading} /> */}
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
                                                <TableOrdersList ordersList={ordersList} params={params}/>
                                            </div>
                                     
                                            <PaginationComponent count={countOrders} handeSelectPage={handeSelectPage}/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(OrdersListPage)