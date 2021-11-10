import React , {useState , useEffect} from 'react'
import Loading from '../../components/Loading';
import TableParticipantsInAuctionList from './TableParticipantsInAuctionList';
import { Breadcrumb , Pagination , Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import PaginationComponent from '../../components/PaginationComponent';
import queryString from 'query-string';

function ParticipantsInAuctionList(props) {

    const [participantsList , setParticipantsList] = useState([]);
    const [loading , setLoading] = useState(false);
    const [currentPage , setcurrentPage] = useState(1);
    const [countParticipants , setCountParticipants] = useState();
    const [params , setParams] = useState(
        {
            page : 1, 
            page_size : 10 , 

        });

        const handeSelectPage = (e) => {
            setParams({
                ...params , page : e
            })
        }


    useEffect(() => {
        getListParicipants()
    }, [params]);


    const getListParicipants = () => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/sale/join-auction/?${queries}`).then(res => {
            setLoading(false)
            setParticipantsList(res.data.data.result)
            setCountParticipants(res.data.data.count)
        }).catch(err => {
            console.log(err);
            setLoading(false)
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
                                                <TableParticipantsInAuctionList getListParicipants={getListParicipants} participantsList={participantsList} params={params} />
                                            </div>

                                            <div className="d-flex mt-4 justify-content-center">
                                                <PaginationComponent count={countParticipants} handeSelectPage={handeSelectPage}/>
                                            </div>

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

export default ParticipantsInAuctionList;
