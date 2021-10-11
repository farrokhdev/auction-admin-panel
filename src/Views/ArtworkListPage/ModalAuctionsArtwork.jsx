import React  from 'react'
import {Modal ,  Image} from 'antd';
import {Link} from 'react-router-dom';
import { convertTypePersian } from '../../utils/converTypePersion';
import EmptyComponent from '../../components/EmptyComponent';


function ModalParticipantAuctions(props) {

    const {
        setvisibleShowAuctionsArtwork , 
        visibleShowAuctionsArtwork , 
        singleArtwork , 
        setIsCall_service_get_auctions_product
    } = props


    const closeModal = () => {
        setvisibleShowAuctionsArtwork(false)
        setIsCall_service_get_auctions_product(false)
    }


    return (
        <React.Fragment>
            
        <Modal
            title="آخرین حراجی اثر"
            centered
            className="modal-bids"
            visible={visibleShowAuctionsArtwork}
            onOk={closeModal}
            onCancel={closeModal}
            width={800}>

                <div className="d-flex">
                    <div className="col">

                        <div collapse className="table-responsive ">
                            <table className="table ">
                                <thead >
                                    <tr className="meassage-header-table-title">

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
                                {singleArtwork?.latest_auction?.id ?
                                    
                                    <tr className="spaceRow row-messages">

                                        <td   className="">
                                            <div   className="my-2 content-td">
                                                <div className=" text-center"> 
                                                    <Image
                                                        width={40}
                                                        style={{height : '30px' , marginTop : '8px'}}
                                                        src={singleArtwork?.latest_auction?.media?.exact_url}
                                                    />
                                                </div>
                                            </div>
                                        </td>  

                                            <td  className="">
                                                <div   className="my-2 content-td">
                                                    <div className=" text-center"> 
                                                        <Link to={`/auctions/${singleArtwork?.latest_auction?.id}`}>
                                                            {singleArtwork?.latest_auction?.title}
                                                        </Link>       
                                                    </div>
                                                </div>
                                            </td>     
                                            
                                        
                                        <td   className="">
                                            <div   className="my-2 content-td">
                                                <div className=" text-center"> 
                                                    {convertTypePersian(singleArtwork?.latest_auction?.type)}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="">
                                            <div className="my-2 content-td">
                                                <div className=" w-100 text-center"> 
                                                {convertTypePersian(singleArtwork?.latest_auction?.status)}
                                                </div>
                                            </div>
                                        </td>

                                    </tr>

                                     : <div className="d-flex text-center w-100"></div> }

                            </tbody>
                        </table>
                        </div>

                            {!singleArtwork?.latest_auction?.id  &&  <EmptyComponent text={"این اثر در هیچ حراجی وارد نشده"}/>}

                    </div>
                </div>
        </Modal>
        
    </React.Fragment>
    )
}

export default ModalParticipantAuctions;
