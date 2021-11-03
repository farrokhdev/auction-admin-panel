import React , {useState , useEffect} from 'react'
import {Modal , Form , message , notification , Spin , Image } from 'antd';
import { LoadingOutlined  } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import momentJalaali from 'moment-jalaali';
import { separatorCurrency } from '../../utils/separator';
import EmptyComponent from '../../components/EmptyComponent';
import PaginationComponent from '../../components/PaginationComponent';

function ModalFavoriteArtwork({visibleFavoriteArtwork , setVisibleFavoriteArtwork , memberId , setIs_call_service_favoriteArtwork}) {

    const [listFavoriteArtwork, setListFavoriteArtwork] = useState([]);
    const [countFavoriteArtwork, setCountFavoriteArtwork] = useState(0);
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        page : 1, 
        page_size : 10 , 
        enrolled_user : memberId
    })

    useEffect(() => {
        getListFavoriteArtworkUser()
    }, [params]);

    // function for get list of favorite artworks by a user 
    const getListFavoriteArtworkUser = () => {
        setLoading(true)
      axios.get(`${BASE_URL}/panel/users/${memberId}/favorite_products/`).then(res => {
            console.log(res.data);
            setListFavoriteArtwork(res.data.data.result);
            setCountFavoriteArtwork(res.data.data.count);
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
        setVisibleFavoriteArtwork(false)
        setIs_call_service_favoriteArtwork(false)
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


    return (
        <React.Fragment>
            
        <Modal
            title="لیست آثار مورد علاقه"
            centered
            className="modal-bids"
            visible={visibleFavoriteArtwork}
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

                                        <th className="  px-0 minWidth-email">
                                            <div className=" px-3 text-center">تصویر</div>
                                        </th>

                                        <th className="  px-0 minWidth-name">
                                            <div className=" px-3 text-center">نام اثر</div>
                                        </th>


                                        <th className="  px-0 minWidth-mobile">
                                            <div className=" px-3 text-center">قیمت</div>
                                        </th>

                                        
                                    </tr>
                                </thead>

                            <tbody>
                                    {(listFavoriteArtwork?.length && !loading ) ? listFavoriteArtwork.map((favoriteArtwork , index) =>
                                    <> 
                                    <tr className="spaceRow row-messages">

                                    <td   className="">
                                        <div  className="my-2 content-td" >
                                            <div className="text-center">{params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }</div>
                                        </div>
                                    </td>

                                    <td className="">
                                        <div className=" ">
                                            <div className="my-2 content-td">
                                                <div className=" text-center"> 
                                                {!!favoriteArtwork?.media && 
                                                    <Image
                                                        width={40}
                                                        style={{height : '30px' , marginTop : '8px'}}
                                                        src={favoriteArtwork?.media?.exact_url}
                                                    />
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td  className="">
                                        <div   className="my-2 content-td">
                                            <div className=" text-center"> 
                                                <Link to={`/artworks/${favoriteArtwork?.id}`}>
                                                    {favoriteArtwork?.artwork_title}
                                                </Link>
                                            </div>
                                        </div>
                                    </td>

                     
                                    <td className="">
                                        <div className="my-2 content-td">
                                            <div className=" w-100 text-center"> 
                                                {favoriteArtwork?.price && separatorCurrency(favoriteArtwork?.price)}
                                            </div>
                                        </div>
                                    </td>

                                    </tr>

                                    </>
                                    ) : <div className="d-flex text-center w-100"></div>}

                            </tbody>
                        </table>
                            </Spin>
                        </div>


                        {(!listFavoriteArtwork?.length && !loading )  && <EmptyComponent text={"لیست علاقه‌مندی کاربر خالی است"}/>}
                    </div>

                </div>
                    <PaginationComponent count={countFavoriteArtwork} handeSelectPage={handeSelectPage}/>
        </Modal>
        
    </React.Fragment>
    )
}

export default ModalFavoriteArtwork;
