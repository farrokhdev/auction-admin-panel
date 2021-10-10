import React , {useState , useEffect} from 'react'
import {Modal , Spin } from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import momentJalaali from 'moment-jalaali';
import EmptyComponent from '../../components/EmptyComponent';
import queryString from 'query-string';
import PaginationComponent from '../../components/PaginationComponent';

function ModalBidsMember({setVisibleBidsMember , visibleBidsMember , memberId , setIs_call_service_bids}) {

    const [bids, setBids] = useState([]);
    const [countBids, setCountBids] = useState(0);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({
        page : 1, 
        page_size : 10 , 
        enrolled_user : memberId
    })
    
    useEffect(() => {
        getBidsUser()
        setParams({...params , enrolled_user : memberId})
    }, [memberId]);

    // function for get list of bids by a user 
    const getBidsUser = () => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/sale/auctions/?${queries}`).then(res => {
            console.log(res.data);
            setBids(res.data.data.result)
            setCountBids(res.data.data.count)
            setLoading(false)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })
    }

    // function for change page in pagination 
    const handeSelectPage = (e) => {
        setParams({
            ...params , page : e
        })
    }


    const closeModal = () => {
        setVisibleBidsMember(false)
        setIs_call_service_bids(false)
    }


    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
        <Modal
            title="لیست بیدها"
            centered
            className="modal-bids"
            visible={visibleBidsMember}
            onOk={closeModal}
            onCancel={closeModal}
            width={900}>

                <div className="d-flex">
                    <div className="col">

                        <div collapse className="table-responsive ">
                        <Spin indicator={antIcon} spinning={loading}  >
                            <table className="table ">
                                <thead >
                                    <tr className="meassage-header-table-title">
                                        <th className=" px-0 minWidth-row">
                                            <div className=" px-3 text-center">ردیف</div>
                                        </th>
                             

                                        <th className="  px-0 minWidth-date">
                                            <div className=" px-3 text-center">تاریخ و ساعت</div>
                                        </th>     
                                        
                                        <th className="  px-0 minWidth-description">
                                            <div className=" px-3 text-center">توضیحات</div>
                                        </th>

                                        <th className="  px-0 minWidth--price">
                                            <div className=" px-3 text-center">قیمت</div>
                                        </th>

                                        
                                    </tr>
                                </thead>

                            <tbody>
                                    {(bids?.length && !loading) ? bids.map((bid, index) =>
                                    <> 
                                    <tr className="spaceRow row-messages">

                                    <td   className="">
                                        <div  className="my-2 content-td" >
                                            <div className="text-center">{params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }</div>
                                        </div>
                                    </td>

    
                                    <td  className="">

                                        <div   className=" ">
                                            <div className="my-2 content-td">
                                                <div className=" text-center"> 
                                                {bid?.creation_time ? `${momentJalaali(bid?.creation_time).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>         
                                    
                                    <td  className="text-right">
                                        <div  className=" ">
                                            <div className="my-2 content-td float-right w-100">
                                                <div className=" text-right w-100"> 
                                                {/* {bid?.description ? bid?.description : ''} */}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="">
                                        <div className="my-2 content-td">
                                            <div className=" w-100 text-center"> 
                                                {/* {bid?.applicant?.mobile} */}
                                            </div>
                                        </div>
                                    </td>

                                    </tr>

                                    </>
                                    ) : <div className="d-flex text-center w-100"></div>}

                            </tbody>
                        </table>

                            {(!bids?.length && !loading )  && <EmptyComponent text={"کاربر هیچ بیدی ثبت نکرده است"}/>}

                        </Spin>
                        </div>
                    </div>
                </div>
                        <PaginationComponent count={countBids} handeSelectPage={handeSelectPage}/>
        </Modal>
    </React.Fragment>
    )
}

export default ModalBidsMember;
