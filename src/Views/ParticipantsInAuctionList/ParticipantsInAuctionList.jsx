import React , {useState , useEffect} from 'react'
import Loading from '../../components/Loading';
import TableParticipantsInAuctionList from './TableParticipantsInAuctionList';
import { Breadcrumb , Pagination } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';


function ParticipantsInAuctionList(props) {

    const [participantsList , setParticipantsList] = useState([]);
    const [loading , setLoading] = useState(false);
    const [currentPage , setcurrentPage] = useState(1);
    const [countParticipants , setCountParticipants] = useState();


    const handeSelectPage = (e) => {
        console.log("Log Of Pagination", e);
        setcurrentPage(e)
    }


    useEffect(() => {

        setLoading(true)
        axios.get(`${BASE_URL}/sale/join-auction/`).then(res => {
            setLoading(false)
            setParticipantsList(res.data.data.result.results)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })

    }, [currentPage]);
     
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
                                                    <Breadcrumb.Item>
                                                        <NavLink 
                                                            key="1"
                                                            onClick={ e => props.toggleActiveNavDrawer("1")}
                                                            to="/">
                                                        خانه
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                       لیست شرکت کنندگان در حراجی
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">
                                            
                                            <div className="row px-0 mx-0">
                                                <TableParticipantsInAuctionList participantsList={participantsList} />
                                            </div>
                                            <div className="d-none d-sm-flex justify-content-center">
                                                <Pagination
                                                    showSizeChanger={false}
                                                    onChange={(e)=>handeSelectPage(e)}
                                                    defaultCurrent={1}
                                                    total={countParticipants}
                                                    defaultPageSize={10}
                                                />
                                            </div>
                                            <div className="d-flex d-sm-none justify-content-center ">
                                                <Pagination 
                                                    onChange={(e)=>handeSelectPage(e)}
                                                    defaultCurrent={1} 
                                                    total={countParticipants} 
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

export default ParticipantsInAuctionList;
