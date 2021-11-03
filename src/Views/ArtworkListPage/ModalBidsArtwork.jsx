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
import { separatorCurrency } from '../../utils/separator';

function ModalBidsArtwork(props) {

    const {
        setvisibleShowBidsArtwork , 
        visibleShowBidsArtwork , 
        product_id , 
        setIsCall_service_get_bids_product
    } = props

    const [bids, setBids] = useState([]);
    const [countBids, setCountBids] = useState(0);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({
        page : 1, 
        page_size : 10 , 
        product : product_id
    })

    useEffect(() => {
        getBidsUser()
    }, [params]);
    
  
    // function for get list of bids by a user 
    const getBidsUser = () => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/panel/bidding/?${queries}`).then(res => {
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
        setvisibleShowBidsArtwork(false)
        setIsCall_service_get_bids_product(false)
    }


    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
        <Modal
            title="لیست بیدها"
            centered
            className="modal-bids"
            visible={visibleShowBidsArtwork}
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
                             
                                        <th className="  px-0 ">
                                            <div className=" px-3 text-center">اثر</div>
                                        </th>

                                        <th className="  px-0 minWidth-date">
                                            <div className=" px-3 text-center">نام حراج</div>
                                        </th>  

                                        <th className="  px-0 minWidth-date">
                                            <div className=" px-3 text-center">تاریخ و ساعت</div>
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

                                    <td  className="text-center">
                                        <div  className=" ">
                                            <div className="my-2 content-td float-right w-100">
                                                <div className=" text-center w-100"> 
                                                    <Link to={`/artworks/${bid?.product_auction?.product_id}`}>
                                                        {bid?.product_auction?.product ? bid?.product_auction?.product?.artwork_title : ''}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td  className="">
                                        <div  className=" ">
                                            <div className="my-2 content-td">
                                                <div className=" text-center"> 
                                                    <Link to={`/auctions/${bid?.product_auction?.auction_id}`}>
                                                        {bid?.product_auction ? bid?.product_auction?.auction_name : ''}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </td>  

    
                                    <td  className="">
                                        <div  className=" ">
                                            <div className="my-2 content-td">
                                                <div className=" text-center"> 
                                                    {bid?.creation_date ? `${momentJalaali(bid?.creation_date).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>       
                                    
                                 
                                    <td className="">
                                        <div className="my-2 content-td">
                                            <div className=" w-100 text-center"> 
                                                {bid?.price ? separatorCurrency(bid?.price) : ''}
                                            </div>
                                        </div>
                                    </td>

                                    </tr>

                                    </>
                                    ) : <div className="d-flex text-center w-100"></div>}

                            </tbody>
                        </table>

                            {(!bids?.length && !loading )  && <EmptyComponent text={"هیچ بیدی برای این اثر ثبت نشده است"}/>}

                        </Spin>
                        </div>
                    </div>
                </div>
                        <PaginationComponent count={countBids} handeSelectPage={handeSelectPage}/>
        </Modal>
    </React.Fragment>
    )
}

export default ModalBidsArtwork;
