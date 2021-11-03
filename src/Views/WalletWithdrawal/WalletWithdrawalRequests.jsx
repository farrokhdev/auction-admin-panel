import React, {useState, useEffect} from 'react';
import {BASE_URL} from '../../utils';
import {Pagination , Breadcrumb , Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import axios from '../../utils/request';
import PaginationComponent from '../../components/PaginationComponent';
import queryString from 'query-string';
import TableWalletWithdrawalRequests from './TableWalletWithdrawalRequests';
import ModalConfirmWithdrawalRequest from './ModalConfirmWithdrawalRequest';
import ModalRejectWithdrawal from './ModalRejectWithdrawal';

function WalletWithdrawalRequests(props) {

    const [withdrawalRequestList, setWithdrawalRequestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [countWithdrawalRequests, setCountWithdrawalRequests] = useState(0);
    const [visibleAcceptWithdrawal, setVisibleAcceptWithdrawal] = useState(false);
    const [visibleRejectWithdrawal, setVisibleRejectWithdrawal] = useState(false);
    const [useId, setUserId] = useState();
    const [params , setParams] = useState(
        {
            page : 1, 
            page_size : 10 , 
            transaction_type : 'decrease'

        });

    useEffect(() => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/accounting/transaction/?${queries}`).then(res => {
            setWithdrawalRequestList(res.data.data.result)
            setCountWithdrawalRequests(res.data.data.count)
            setLoading(false)
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
                                                <Breadcrumb.Item><NavLink 
                                                        key="1"
                                                        onClick={ e => props.toggleActiveNavDrawer("1")}
                                                        to="/">
                                                        خانه
                                                    </NavLink>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                   لیست درخواست‌های برداشت
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mx-0">
                                    <div className="col content-page p-4  ">
                                        
                                        <div className="row px-0 mx-0">
                                            <TableWalletWithdrawalRequests 
                                                params={params} 
                                                withdrawalRequestList={withdrawalRequestList}
                                                setVisibleAcceptWithdrawal={setVisibleAcceptWithdrawal}
                                                setVisibleRejectWithdrawal={setVisibleRejectWithdrawal}
                                                setUserId={setUserId}
                                                />
                                        </div>

                                        <PaginationComponent  
                                            count={countWithdrawalRequests} 
                                            params={params} 
                                            handeSelectPage={handeSelectPage}/>

                                    </div>
                                </div>

                                <ModalConfirmWithdrawalRequest 
                                    setVisibleAcceptWithdrawal={setVisibleAcceptWithdrawal}
                                    visibleAcceptWithdrawal={visibleAcceptWithdrawal}
                                    useId={useId}
                                />

                                <ModalRejectWithdrawal
                                    setVisibleRejectWithdrawal={setVisibleRejectWithdrawal}
                                    visibleRejectWithdrawal={visibleRejectWithdrawal}
                                    useId={useId}
                                />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </Spin>
    </React.Fragment>
    )
}

export default WalletWithdrawalRequests;
