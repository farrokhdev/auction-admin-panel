import React , {useState , useEffect} from 'react'
import {Modal , Image , message } from 'antd';
import {DeleteFilled , ExclamationCircleOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import { separatorCurrency } from '../../utils/separator';
import EmptyComponent from '../../components/EmptyComponent';
import {  DELETE_PRODUCT } from '../../utils/constant';

function ModalAuctionProducts({setVisibleAuctionProduct , visibleAuctionProduct , auctionProduct_id , setBidsAuction_id , setAuctionProduct_id}) {

    const [auctionProducts, setAuctionProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {confirm} = Modal;

    useEffect(() => {
        getAuctionProductList()
    }, []);

    // fetch list of products one auction 
    const getAuctionProductList = () => {
        axios.get(`${BASE_URL}/sale/auctions/${auctionProduct_id}/`).then(res => {
            console.log(res.data);
            setAuctionProducts(res.data.data.result.auction_product)
       
        }).catch(err => {
            console.log(err);
  
        })
    }




    // fuction for close modal when ok modal and cancel modal that set amount auction product id is null
    const handleCloseModal = () => {
        setVisibleAuctionProduct(false)
        setAuctionProduct_id(null)
    }

    const handleDeleteProduct = (id) => {
        confirm({
            title: 'آیا قصد حذف کردن این اثر را دارید؟',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: 'بله',
            okType: 'danger',
            cancelText: 'خیر',
            onOk() {
                setLoading(true)
                axios.delete(`${BASE_URL}${DELETE_PRODUCT(id)}`)
                    .then(resp => {
                        setLoading(false)
                        message.success("حذف اثر با موفقیت انجام شد")
                        getAuctionProductList()
                    })
                    .catch(err => {
                        setLoading(false)
                        console.error(err);
                        if (err?.response?.data?.message)
                            message.error(err.response.data.message)
                        else if (err?.response?.data?.data?.result)
                            message.error(err.response.data.message)
                        else
                            message.error("دوباره تلاش کنید")
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    return (
        <React.Fragment>
        <Modal
            title="لیست آثار"
            centered
            className="modal-bids"
            visible={visibleAuctionProduct}
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
                                    {auctionProducts?.length ? auctionProducts?.map((product, index) =>
                                    <> 
                                    
                                    <tr className="spaceRow row-messages">

                                        <td   className="">
                                            <div  className="my-2 content-td" >
                                                <div className="text-center">{++index}</div>
                                            </div>
                                        </td>

                                        <td   className="">
                                            <div  className="my-2 content-td" >
                                                <Link to={`/artworks/${product?.product?.id}`}>
                                                    <div className="text-center">

                                                    <Image
                                                        width={40}
                                                        style={{height : '30px' , marginTop : '8px'}}
                                                        src={product?.product?.media?.exact_url}
                                                    />

                                                    </div>
                                                </Link>
                                            </div>
                                        </td>


                                        <td className="">
                                            <div   className="my-2 content-td">
                                                <div className=" text-center"> 
                                                <Link to={`/artworks/${product?.product?.id}`}>{product?.product?.artwork_title}</Link>
                                                </div>
                                            </div>
                                        </td>              
                                        
                                        <td className="">
                                            <div   className="my-2 content-td">
                                                <div className=" text-center"> 
                                                    {product?.base_price ? separatorCurrency(product?.base_price) : ''}
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                    

                                    </>
                                    ) : <div className="d-flex justify-content-center bg-light w-100"></div>}

                            </tbody>
                        </table>
                        {!auctionProducts?.length ? <EmptyComponent text="هیچی محصولی برای این حراجی ثبت نشده است"/> : null}
                        </div>
                    </div>
                </div>
        </Modal>
    </React.Fragment>
    )
}

export default ModalAuctionProducts;
