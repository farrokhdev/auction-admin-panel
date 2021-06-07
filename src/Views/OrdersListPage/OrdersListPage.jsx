import React , {useState , useEffect} from 'react';
import {Breadcrumb, Pagination} from 'antd';
import { NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import {BASE_URL} from '../../utils';
import axios from "../../utils/request";
import Loading from '../../components/Loading';import TableOrdersList from './TableOrdersList';

function OrdersListPage(props) {

    const [ordersList, setOrdersList] = useState([]);
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
                                            <div className="d-none d-sm-flex justify-content-center">
                                                <Pagination
                                                    showSizeChanger={false}
                                                    onChange={(e)=>handeSelectPage(e)}
                                                    defaultCurrent={1}
                                                    total={countOrders}
                                                    defaultPageSize={5}
                                                />
                                            </div>
                                            <div className="d-flex d-sm-none justify-content-center ">
                                                <Pagination 
                                                    onChange={(e)=>handeSelectPage(e)}
                                                    defaultCurrent={1} 
                                                    total={countOrders} 
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