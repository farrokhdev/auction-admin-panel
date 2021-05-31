import React , {useState , useEffect} from 'react'
import TableApplicantsMembershipAuciton from './TableApplicantsMembershipAuciton'
import axios from '../../utils/request';
import {BASE_URL} from '../../utils/index';
import Loading from '../../components/Loading';
import { Form, Input, Breadcrumb, Pagination} from 'antd';
import {NavLink} from 'react-router-dom';

function ApplicantsMembershipInAuctionList(props) {


    const [applicantsList , setApplicantsList] = useState([]);
    const [countApplicants, setCountApplicants] = useState();
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            axios.get(`${BASE_URL}/sale/join-auction/`).then(res => {
                setLoading(false)
                setApplicantsList(res.data.data.result.results)
                setCountApplicants(res.data.data.result.count)
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
        }, []);


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
                                                   لیست درخواست کنندگان
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mx-0">
                                    <div className="col content-page p-4  ">
                                        
                                        <div className="row px-0 mx-0">
                                            <TableApplicantsMembershipAuciton applicantsList={applicantsList}/>
                                        </div>
                                        <div className="d-none d-sm-flex justify-content-center">
                                            <Pagination
                                                showSizeChanger={false}
                                                onChange={(e)=>handeSelectPage(e)}
                                                defaultCurrent={1}
                                                total={countApplicants}
                                                defaultPageSize={10}
                                            />
                                        </div>
                                        <div className="d-flex d-sm-none justify-content-center ">
                                                    <Pagination 
                                                        onChange={(e)=>handeSelectPage(e)}
                                                        defaultCurrent={1} 
                                                        total={countApplicants} 
                                                        defaultPageSize={10}
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

export default ApplicantsMembershipInAuctionList;
