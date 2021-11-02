import React , {useState , useEffect} from 'react'
import TableApplicantsMembershipAuciton from './TableApplicantsMembershipAuciton'
import axios from '../../utils/request';
import {BASE_URL} from '../../utils/index';
import { Spin , Breadcrumb} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import PaginationComponent from '../../components/PaginationComponent';
import queryString from 'query-string';

function ApplicantsMembershipInAuctionList(props) {


    const [applicantsList , setApplicantsList] = useState([]);
    const [countApplicants, setCountApplicants] = useState(0);
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [params , setParams] = useState(
        {
            page : 1, 
            page_size : 10 , 
            is_approve : "True" 
        });

        useEffect(() => {
            const queries = queryString.stringify(params);
            axios.get(`${BASE_URL}/sale/join-auction/?${queries}`).then(res => {
                setLoading(false)
                setApplicantsList(res.data.data.result)
                setCountApplicants(res.data.data.count)
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
        }, [params]);


        const handeSelectPage = (e) => {
            setParams({
                ...params , page : e
            })
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
                                                   لیست درخواست کنندگان
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mx-0">
                                    <div className="col content-page p-4  ">
                                        
                                        <div className="row px-0 mx-0">
                                            <TableApplicantsMembershipAuciton applicantsList={applicantsList} params={params}/>
                                        </div>

                                       <PaginationComponent count={countApplicants} handeSelectPage={handeSelectPage}/>
                                       
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

export default ApplicantsMembershipInAuctionList;
