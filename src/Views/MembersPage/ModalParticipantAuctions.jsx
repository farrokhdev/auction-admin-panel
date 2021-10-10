import React , {useState , useEffect} from 'react'
import {Modal , Spin , Image} from 'antd';
import { LoadingOutlined  } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import { convertTypePersian } from '../../utils/converTypePersion';
import queryString from 'query-string';
import PaginationComponent from '../../components/PaginationComponent';
import EmptyComponent from '../../components/EmptyComponent';


function ModalParticipantAuctions({setVisibleParticipantAuctions , visibleParticipantAuctions , memberId , is_call_service_auctions , setIs_call_service_auctions}) {

    const [listParticipantAuctions , setListParticipantAuctions] = useState([]);
    const [countParticipantAuctions , setCountParticipantAuctions] = useState();
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        page : 1, 
        page_size : 10 , 
        enrolled_user : memberId
    })

    useEffect(() => {
        if(is_call_service_auctions){
            getListParticipantAuctions()
            setParams({...params , enrolled_user : memberId})
        }
    }, [memberId]);

    // function for get list of auctions participant by a user 
    const getListParticipantAuctions = () => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/sale/auctions/?${queries}`).then(res => {
            console.log(res.data);
            setListParticipantAuctions(res.data.data.result)
            setCountParticipantAuctions(res.data.data.count)
            setLoading(false)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })
    }

    // function for change page in pagination 
    const handeSelectPage = (e) => {
        setcurrentPage(e)
        setParams({
            ...params , page : e
        })
    }

    const closeModal = () => {
        setVisibleParticipantAuctions(false)
        setIs_call_service_auctions(false)
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
            
        <Modal
            title="لیست حراج‌های کاربر"
            centered
            className="modal-bids"
            visible={visibleParticipantAuctions}
            onOk={closeModal}
            onCancel={closeModal}
            width={800}>

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

                                        <th className="  px-0 minWidth-name">
                                            <div className=" px-3 text-center">تصویر</div>
                                        </th>  

                                        <th className="  px-0 minWidth-name">
                                            <div className=" px-3 text-center">نام حراج</div>
                                        </th>    
                                        
                                        
                                        <th className="  px-0 minWidth-name">
                                            <div className=" px-3 text-center">نوع عضویت</div>
                                        </th>


                                        <th className="  px-0 minWidth-mobile">
                                            <div className=" px-3 text-center">وضعیت</div>
                                        </th>

                                        
                                    </tr>
                                </thead>

                            <tbody>
                                    {(listParticipantAuctions?.length  &&  !loading)  ?  listParticipantAuctions.map((participantAuction , index) =>
                                    <> 
                                    <tr className="spaceRow row-messages">

                                    <td   className="">
                                        <div  className="my-2 content-td" >
                                            <div className="text-center">{params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }</div>
                                        </div>
                                    </td>

                                    <td   className="">
                                        <div   className="my-2 content-td">
                                            <div className=" text-center"> 
                                                {/* {participantAuction?.media?.exact_url} */}
                                                <Image
                                                    width={40}
                                                    style={{height : '30px' , marginTop : '8px'}}
                                                    src={participantAuction?.media?.exact_url}
                                                />
                                            </div>
                                        </div>
                                    </td>  

                                        <td  className="">
                                            <div   className="my-2 content-td">
                                                <div className=" text-center"> 
                                                    <Link to={`/auctions/${participantAuction?.id}`}>
                                                        {participantAuction?.title}
                                                    </Link>       
                                                </div>
                                            </div>
                                        </td>     
                                        
                                    
                                    <td   className="">
                                        <div   className="my-2 content-td">
                                            <div className=" text-center"> 
                                                {convertTypePersian(participantAuction?.type)}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="">
                                        <div className="my-2 content-td">
                                            <div className=" w-100 text-center"> 
                                            {convertTypePersian(participantAuction?.status)}
                                            </div>
                                        </div>
                                    </td>

                                    </tr>

                                    </>
                                    ) : <div className="d-flex text-center w-100"></div> }

                            </tbody>
                        </table>
                        </Spin>
                        </div>

                            {(!listParticipantAuctions?.length   &&  !loading)  &&  <EmptyComponent text={"کاربر در هیچ حراجی شرکت نکرده است"}/>}


                        <PaginationComponent count={countParticipantAuctions} handeSelectPage={handeSelectPage}/>
                    </div>
                </div>
        </Modal>
        
    </React.Fragment>
    )
}

export default ModalParticipantAuctions;
