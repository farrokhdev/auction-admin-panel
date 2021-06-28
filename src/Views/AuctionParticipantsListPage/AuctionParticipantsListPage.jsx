import React , {useState , useEffect} from 'react'
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import {Breadcrumb} from 'antd';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import TableAuctionParticipants from './TableAuctionParticipants';
import PaginationComponent from '../../components/PaginationComponent';


function AuctionsPage(props) {
    
    
    const [auctionParticipants , setAuctionParticipants] = useState([])
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [countParticipants , setCountParticipants] = useState(0)

    console.log("auctionParticipants =>>> " , auctionParticipants);

        useEffect(() => {
            axios.get(`${BASE_URL}/sale/join-auction/`).then(res => {

                console.log("REEEEE ",res.data.data.result);
                setLoading(false)
                setAuctionParticipants(res.data.data.result)
          
            }).catch(err => {
                // console.error(err);
                setLoading(false)
            })
        }, []);


        const handeSelectPage = (e) => {
            console.log("Log Of Pagination", e);
            setcurrentPage(e)
        }


        // const handleRedirect = () => {
        //     window.location.href = "/#add-new-auction";
        // }

    return (
        <React.Fragment>
            <Loading loading={loading}/>
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
                                                />
                                            </div>

                                            <PaginationComponent count={countParticipants} handeSelectPage={handeSelectPage}/>

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
  
  export default connect(mapStateToProps , mapDispatchToProps)(AuctionsPage)


