import React , {useState , useEffect} from 'react'
import {Modal , Form , message , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import momentJalaali from 'moment-jalaali';
import { separatorCurrency } from '../../utils/separator';
import EmptyComponent from '../../components/EmptyComponent';

function ModalBidsAuction({setVisibleBidsAuction , visibleBidsAuction , bidsAuction_id , setBidsAuction_id}) {

    const [bids, setBids] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/bidding/?auction=${bidsAuction_id}`).then(res => {
            console.log(res.data);
            setBids(res.data.data.result)
       
        }).catch(err => {
            console.log(err);
  
        })

    }, []);

    const handleCloseModal = () => {
        setVisibleBidsAuction(false)
        setBidsAuction_id(null)
    }

    console.log("bids --->>>" , bids);

    return (
        <React.Fragment>
        <Modal
            title="لیست بیدها"
            centered
            className="modal-bids"
            visible={visibleBidsAuction}
            onOk={handleCloseModal}
            onCancel={handleCloseModal}
            width={700}>

                <div className="d-flex">
                    <div className="col">

                        <div collapse className="table-responsive ">
                            <table className="table ">
                                <thead >
                                    <tr className="meassage-header-table-title">
                                        <th className=" px-0 minWidth-row">
                                            <div className=" px-3 text-center">ردیف</div>
                                        </th>
                                        <th className="  px-0 minWidth-name">
                                            <div className=" px-3 text-center">نام کاربر</div>
                                        </th>

                                        <th className="  px-0 minWidth-email">
                                            <div className=" px-3 text-center">اثر</div>
                                        </th>

                                        <th className="  px-0 minWidth-mobile">
                                            <div className=" px-3 text-center">قیمت</div>
                                        </th>

                                        
                                    </tr>
                                </thead>

                            <tbody>
                                    {bids?.length ? bids?.map((bid, index) =>
                                    <> 
                                    <tr className="spaceRow row-messages">

                                    <td   className="">
                                        <div  className="my-2 content-td" >
                                            <div className="text-center">{++index}</div>
                                        </div>
                                    </td>

                                    <td className="">
                                        <div   className="my-2 content-td">
                                            <div className=" text-center"> 
                                                {bid?.user?.first_name} {bid?.user?.last_name}
                                            </div>
                                        </div>
                                    </td>              
                                    
                                    <td className="">
                                        <div   className="my-2 content-td">
                                            <div className=" text-center"> 
                                                <Link to={`/artworks/${bid?.product_auction?.product?.id}`}>{bid?.product_auction?.product?.artwork_title}</Link>
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
                                    ) : <div className="d-flex justify-content-center bg-light w-100"></div>}

                            </tbody>
                        </table>

                        {!bids?.length ? <EmptyComponent text="هیچی بیدی برای این حراجی ثبت نشده است"/> : null}
                        </div>


                    </div>
                </div>
        </Modal>
    </React.Fragment>
    )
}

export default ModalBidsAuction;
