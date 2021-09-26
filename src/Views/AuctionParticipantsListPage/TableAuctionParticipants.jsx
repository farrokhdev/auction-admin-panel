import React from 'react';
import { Tooltip} from 'antd';

function TableAuctionParticipants({auctionParticipants , setVisibleParticipantsAuction , setParticipant_id , params}) {


    const handleClickShowDetails = (id) => {
        setParticipant_id(id)
        setTimeout(() => {
            setVisibleParticipantsAuction(true)
        }, 500);
    }

     
    return (
        <div collapse className="table-responsive ">
            <table className="table ">
                <thead >
                    <tr className="meassage-header-table-title">
                        <th className=" px-0 minWidth-row">
                            <div className=" px-3 text-center">ردیف</div>
                        </th>
                        <th className="  px-0 minWidth-name">
                            <div className=" px-3 text-center">نام</div>
                        </th>


                        <th className="  px-0 minWidth-typeUser">
                            <div className=" px-3 text-center">وضعیت </div>
                        </th>

                        <th className="  px-0 minWidth-action">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {Boolean(auctionParticipants) ? auctionParticipants?.map(( item, index) =>
                        <> 
                            <tr className="spaceRow row-messages">

                            <td   className="">
                                <div  className="my-2 content-td" >
                                    <div className="text-center">{params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }</div>
                                </div>
                            </td>

                            <td   className="">
                                <div   className="my-2 content-td">
                                    <div className=" text-center"> {item?.applicant?.last_name}{" "}{item?.applicant?.first_name}</div>

                                </div>
                            </td>

               
                            <td className="">
                                <div className="my-2 content-td">
                                    {console.log("item?.applicant?.is_approve ---" , item?.is_approve)}
                                    {!!item?.is_approve ? <button className="btn-status-accept">تایید شده</button> : <button className="btn-status-reject"> رد شده</button>}
                                </div>
                            </td>

                            <td className=" text-center">
                                <div className="my-2 content-td">
                                    <Tooltip title="مشاهده جزییات، تایید و رد شرکت کننده" >
                                        <button onClick={()=>handleClickShowDetails(item?.id) } className="btn-show-detail-participant">مشاهده جزییات</button>
                                    </Tooltip>
                                </div>
                            </td>
                            </tr>

                            </>
                        ) : <div className="d-flex text-center w-100"></div>}
            </tbody>
        </table>

    </div>
    )
}

export default TableAuctionParticipants;
