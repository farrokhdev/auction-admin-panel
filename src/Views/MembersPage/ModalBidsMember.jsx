import React , {useState , useEffect} from 'react'
import {Modal , Form , message , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import momentJalaali from 'moment-jalaali';

function ModalBidsMember({setVisibleBidsMember , visibleBidsMember}) {

    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setLoading(true)
        // axios.get(`${BASE_URL}/`).then(res => {
        //     console.log(res.data);
        //     setBids(res.data.data.result)
        //     setLoading(false)
        // }).catch(err => {
        //     console.log(err);
        //     setLoading(false)
        // })

    }, []);


    return (
        <React.Fragment>
        <Modal
            title="لیست بیدها"
            centered
            className="modal-bids"
            visible={visibleBidsMember}
            onOk={() => setVisibleBidsMember(false)}
            onCancel={() => setVisibleBidsMember(false)}
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
                                            <div className=" px-3 text-center">نام بید</div>
                                        </th>

                                        <th className="  px-0 minWidth-email">
                                            <div className=" px-3 text-center">تاریخ</div>
                                        </th>

                                        <th className="  px-0 minWidth-mobile">
                                            <div className=" px-3 text-center">قیمت</div>
                                        </th>

                                        
                                    </tr>
                                </thead>

                            <tbody>
                                    {bids ? bids.map((bid, index) =>
                                    <> 
                                    <tr className="spaceRow row-messages">

                                    <td   className="">
                                        <div  className="my-2 content-td" >
                                            <div className="text-center">{++index}</div>
                                        </div>
                                    </td>

                                    <td   className="">
                                        <div   className="my-2 content-td">
                                            <div className=" text-center"> 
                                                {/* {bid?.applicant?.first_name} */}
                                            </div>
                                        </div>
                                    </td>
                                    <td  className="">

                                        <div   className=" ">
                                            <div className="my-2 content-td">
                                                <div className=" text-center"> 
                                                {/* {bid?.creation_date ? `${momentJalaali(bid?.creation_date).format(`HH:mm  -   jYYYY/jMM/jDD`)}` : ''} */}
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
                                    ) : <div className="d-flex text-center w-100">لیست خالی</div>}

                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
        </Modal>
    </React.Fragment>
    )
}

export default ModalBidsMember;
