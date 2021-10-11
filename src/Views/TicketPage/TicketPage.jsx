import React , {useState , useEffect , useRef} from 'react';
import {Breadcrumb , Mentions, Form, Pagination} from 'antd';
import { NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';
import axios from "../../utils/request";
import Loading from '../../components/Loading';
import TableTickets from './TableTickets';
import PaginationComponent from '../../components/PaginationComponent';
import { GET_TICKETS } from '../../utils/constant';
import queryString from 'query-string';

const { Option, getMentions } = Mentions;
const scrollToRef = (ref) => window.scrollTo(20, ref.current.offsetTop)

function TicketPage(props) {

    const myRef1 = useRef(null)
    const executeScroll = (e) => scrollToRef(e)
    const [form] = Form.useForm();

    const onReset = () => {
      form.resetFields();
    };
  
    // const onFinish = async () => {
    //   try {
    //     const values = await form.validateFields();
    //     console.log('Submit:', values);
    //   } catch (errInfo) {
    //     console.log('Error:', errInfo);
    //   }
    // };
  
    // const checkMention = async (_, value) => {
    //   const mentions = getMentions(value);
  
    //   if (mentions.length < 2) {
    //     throw new Error('More than one must be selected!');
    //   }
    // };

    const [loading, setLoading] = useState(false);

    const [ticketList, setTicketList] = useState([]);
    const [countTickets , setCountTickets] = useState(0);
    const [params, setParams] = useState({
        page : 1 , 
        page_size : 10
    })

    const getTickets = () => {
        const queries = queryString.stringify(params);
        setLoading(true)

        axios.get(`${BASE_URL}${GET_TICKETS}?${queries}`).then(res => {
            setLoading(false)
            setTicketList(res.data.data.result)
            setCountTickets(res.data.data.count)
        }).catch(err => {
            setLoading(false)
            console.log(err);
        })
    }

    useEffect(() => {
        getTickets()
    }, [params]);

    const handeSelectPage = (e) => {
        setParams({...params , page : e})
    }

    

    return (
        <React.Fragment>
            <Loading loading={loading}/>
            <div className="container-fluid px-0 container-pages">

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
                                                    لیست تیکت‌ها
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <Loading loading={loading}/>
                                <div className="row  mx-0">
                                    <div className="col content-page p-4  ">
                                        <div className="row px-3 ">
                                            <TableTickets ticketList={ticketList}/>
                                         </div>
                                         <div className="row  mx-0">
                                        <div className="col  px-2  px-md-4  ">

                                            <PaginationComponent count={countTickets} handeSelectPage={handeSelectPage}/>
                                        
                                        </div>
                                    </div>



                                        <div className="d-flex d-lg-none justify-content-end mb-3 ml-3">
                                            {/* <NavLink to= "/send-message">
                                                <button className="btn-scroll-to-send-message" >ارسال پیام</button>
                                            </NavLink> */}
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(TicketPage)
