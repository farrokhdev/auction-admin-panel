import React , {useState , useEffect} from 'react';
import TableSalesConsuler from './TableSalesConsuler';
import {Pagination , Breadcrumb} from 'antd';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import PaginationComponent from '../../components/PaginationComponent';
import queryString from 'query-string';

function SalesConsulerPage(props) {

    const [salesConsulerList, setsalesConsulerList] = useState([]);
    const [countSalesConsuler, setCountSalesConsuler] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [params , setParams] = useState(
        {
            page : 1, 
            page_size : 10 ,
        });

    useEffect(() => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/sale/product/?${queries}`).then(res => {
        // axios.get(`${BASE_URL}/auction-house/suggest/?${queries}`).then(res => {
            setLoading(false)
            setsalesConsulerList(res.data.data.result)
            setCountSalesConsuler(res.data.data.count)
        }).catch(err => {
            console.error(err);
            setLoading(false)
        })
     
    }, [params]);

    const handeSelectPage = (e) => {
        console.log("Log Of Pagination", e);
        setCurrentPage(e)
        setParams({...params , page : e})
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
                                                       لیست مشاوره‌های فروش
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">
                                            
                                            <div className="row px-0 mx-0">
                                                <TableSalesConsuler page={params.page}  salesConsulerList={salesConsulerList} />
                                            </div>

                                            <PaginationComponent count={countSalesConsuler} handeSelectPage={handeSelectPage}/>
                                            
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(SalesConsulerPage)
