import React , {useState , useEffect} from 'react'
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import {Breadcrumb , Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import TableAuctionParticipants from './TableAuctionParticipants';
import PaginationComponent from '../../components/PaginationComponent';
import ModalAcceptParticipantsAuction from './ModalAcceptParticipantsAuction';


function AuctionsPage(props) {
    
    
    const [auctionParticipants , setAuctionParticipants] = useState([])
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [countParticipants , setCountParticipants] = useState(0)
    const [participant_id, setParticipant_id] = useState()
    const [params , setParams] = useState(
        {
            page : 1, 
            page_size : 10 , 
        });

    const [visibleParticipantsAuction, setVisibleParticipantsAuction] = useState(false)

        useEffect(() => {
            axios.get(`${BASE_URL}/sale/join-auction/?sale__id=${props.match.params.id}`).then(res => {

                setLoading(false)
                setAuctionParticipants(res.data.data.result)
                setCountParticipants(res.data.data.count)
            }).catch(err => {
                setLoading(false)
            })
        }, []);


        const handeSelectPage = (e) => {
            setcurrentPage(e)
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
                                                    <Breadcrumb.Item>
                                                        <NavLink 
                                                            key="1"
                                                            onClick={ e => props.toggleActiveNavDrawer("1")}
                                                            to="/">
                                                            خانه
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                        <NavLink to="/auctions">
                                                            حراج‌ها
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                       
                                                        
                                                           شرکت کنندگان
                                                       
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">

                                            
                                            <div className="row px-0 mx-0 mt-3">
                                                <TableAuctionParticipants
                                                    auctionParticipants = {auctionParticipants}
                                                    setVisibleParticipantsAuction={setVisibleParticipantsAuction}
                                                    setParticipant_id={setParticipant_id}
                                                    params={params}
                                                    setLoading={setLoading}
                                                    loaging={loading}
                                                />
                                            </div>

                                            <PaginationComponent count={countParticipants} handeSelectPage={handeSelectPage}/>

                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            {!!participant_id ?    
                <ModalAcceptParticipantsAuction 
                    auctionParticipants={auctionParticipants}
                    visibleParticipantsAuction={visibleParticipantsAuction}
                    setVisibleParticipantsAuction={setVisibleParticipantsAuction}
                    participant_id={participant_id}
                    setParticipant_id={setParticipant_id}
                /> : null}

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
  
  export default connect(mapStateToProps , mapDispatchToProps)(AuctionsPage)


