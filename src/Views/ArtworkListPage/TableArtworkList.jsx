import React , {useState , useEffect} from 'react'
import { Menu, Dropdown , Collapse  , Input , Image  } from 'antd';
import { CaretDownOutlined , FilterFilled , DownOutlined} from '@ant-design/icons';
import {Link , NavLink} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';
import momentJalaali from 'moment-jalaali';
import ModalAcceptArtwork from './ModalAcceptArtwork';
import ModalRejectArtwork from './ModalRejectArtwork';
import { separatorCurrency } from '../../utils/separator';
import EmptyComponent from '../../components/EmptyComponent';
import {handleShowImage} from '../../utils/showImageProduct'

function TableArtworkList(props) {
    
    const {
        artworkList , 
        handleFilterArtwork , 
        params , 
        setvisibleShowBidsArtwork , 
        setIsCall_service_get_bids_product , 
        setProduct_id , 
        setIsCall_service_get_auctions_product , 
        setvisibleShowAuctionsArtwork,
        setSingleArtwork
    } = props


    console.log("artworkList==>>" , artworkList)
    const { Search } = Input;
    const { Panel } = Collapse;
    const onSearch = value => console.log(value);


    const [listSuggestionHomeAuctions, setListSuggestionHomeAuctions] = useState([])

    useEffect(() => {
        getHomeAuciton()
    }, [])

    const getHomeAuciton = () => {
        axios.get(`${BASE_URL}/account/home-auction/`)
        .then(res => {
            setListSuggestionHomeAuctions(res.data.data.result)
        }).catch({

        })

    
    }

    const menu=(id) => (

        <Menu>
            <Menu.Item className="text-center">
                تایید شده
            </Menu.Item >
            <Menu.Item  className="text-center">
                <Link  >
                نامشخص
                </Link>
            </Menu.Item>
            <Menu.Item className="text-center">
                <Link  >
                    غیر قابل قبول
                </Link>
            </Menu.Item>

        </Menu>
    ); 
    
    const actionMenu=(id , artwork) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link to={`/artworks/${id}`} >
                    مشاهده اثر
                </Link>
            </Menu.Item >
            <Menu.Item onClick={()=>handleShowModalBidsArtwork(id) } className="text-center">
                بیدها
            </Menu.Item >       
            <Menu.Item onClick={()=>handleShowModalAuctionsArtwork(id , artwork) } className="text-center">
                آخرین حراج
            </Menu.Item >
            <Menu.Item  className="text-center">
                <div onClick={()=>handleShowModalAsseptArtwork(id , artwork)} >
                تایید اثر هنری
                </div>
            </Menu.Item>
            <Menu.Item className="text-center">
                <div onClick={()=>handleShowModalRejectArtwork(id , artwork)}>
                    رد اثر هنری
                </div>
            </Menu.Item>
        </Menu>
    );

    const [isModalVisibleAccept, setIsModalVisibleAccept] = useState(false);
    const [isModalVisibleReject, setIsModalVisibleReject] = useState(false);
    const [detailsArtwork, setDetailsArtwork] = useState();
    const [ARTWORK_Id, setARTWORK_Id] = useState();

    const handleShowModalAsseptArtwork = (id , artwork) => {
        setIsModalVisibleAccept(true);
        setARTWORK_Id(id)
        setDetailsArtwork(artwork)
    }

    const handleShowModalRejectArtwork = (id , artwork) => {
        setIsModalVisibleReject(true);
        setARTWORK_Id(id)
        setDetailsArtwork(artwork)
    }


    const handleShowModalBidsArtwork = (id) => {
        setProduct_id(id)
        setTimeout(() => {
            setIsCall_service_get_bids_product(true)
            setvisibleShowBidsArtwork(true)
        }, 300);
    }   
    
    const handleShowModalAuctionsArtwork = (id , artwork) => {
        setProduct_id(id)
        setSingleArtwork(artwork)
        setTimeout(() => {
            setIsCall_service_get_auctions_product(true)
            setvisibleShowAuctionsArtwork(true)
        }, 300);
    }


    
    return (
        <React.Fragment>
            
            <div className="row w-100">
                <div className="col w-100 ">
                    <div className="d-flex">
                        <span className="ml-2"><FilterFilled/></span>
                        <Search className="mb-2" placeholder="جستجو" onSearch={(e)=> handleFilterArtwork(e)} style={{ width: 300 }}  />
                    </div>

                    {/* <div className="row mb-2 align-items-start  text-filter bg-light mr-3 p-3"> */}
                       
                        <div className="col-8 px-0">

                            {/* <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}> */}
                                {/* <div className="d-flex">
                                        <FilterFilled  className="ml-2"/>
                                        <RangePicker value={date} onChange={onChange}/>
                                    </div> */}
                            {/* </Form.Item> */}



                            
                            {/* <div className="d-block d-sm-flex justify-content-start">
                                <div className="d-flex align-items-center">

                                    <FilterFilled  className="ml-2 icon-filter"/>

                                    <p className="mb-0 ml-2 text-right">از تاریخ</p>

                                    <DatePicker
                                        className="date-field-filter-box"
                                        isGregorian={false}
                                        timePicker={false}
                                        onChange={valueFrom  => onChangeFrom(valueFrom)}
                                    />

                                </div>
                                <div className="d-flex mt-2 mt-sm-0">
                                    
                                    <p className="mb-0 mr-3 ml-2 mx-sm-2 pt-1 text-right">تا تاریخ</p>
                                    <DatePicker
                                        className="date-field-filter-box"
                                        isGregorian={false}
                                        timePicker={false}
                                        onChange={valueTo => onChangeTo(valueTo)}
                                    />
                                </div>
                            </div> */}


                        </div>


                        {/* <div className="col-4 px-0">
                            <div className="d-flex justify-content-start align-items-center  mt-sm-0">
                                <FilterFilled className="ml-2 icon-filter"/>
                                <Dropdown className="d-flex " overlay={menu} placement="bottomLeft" arrow>
                                    <button className="d-flex justify-content-center align-items-center btn-status-product-filter"> <p className="mb-0">وضعیت</p><CaretDownOutlined /> </button>
                                </Dropdown>
                            </div>
                        </div> */}
                    {/* </div> */}
                    <div className="d-flex justify-content-end mb-2">
                        {/* <div className="col">
                            <div className="d-flex">
                                <button onClick={()=>handleFilterArtwork()} className="btn-do-filter">اعمال فیلتر</button>
                            </div>
                        </div> */}
                        <div className="col">
                            <NavLink to="/add-artwork">
                                <button className="btn-add-new-artwork">افزودن اثر هنری</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                
            </div>
        <div collapse className="table-responsive ">
            <table className="table ">
                <thead >
                    <tr className="meassage-header-table-title">
                        <th className=" px-0 minWidth-row">
                            <div className=" px-3 text-center">ردیف</div>
                        </th>
                        <th className=" px-0 minWidth-row">
                            <div className=" px-3 text-center">تصویر</div>
                        </th>
                        <th className="  px-0 minWidth-name">
                            <div className=" px-3 text-center">نام محصول</div>
                        </th>

                        <th className="  px-0 minWidth-email">
                            <div className=" px-3 text-center">هنرمند</div>
                        </th>

                        <th className="  px-0 minWidth-email">
                            <div className=" px-3 text-center">حراج‌دار</div>
                        </th>

                        <th className="  px-0 minWidth-date">
                            <div className=" px-3 text-center">تاریخ حراج</div>
                        </th>

                        <th className="  px-0 minWidth--price">
                            <div className=" px-3 text-center">براورد قیمت (تومان)</div>
                        </th>

                        <th className="  px-0 minWidth--price">
                            <div className=" px-3 text-center"> قیمت فروش (تومان)</div>
                        </th>

                        <th className="  px-0 minWidth-action">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {artworkList?.length ? artworkList.map((artwork, index) =>
                    
                        <React.Fragment key={artwork?.id}> 
                        
                            <tr className="spaceRow row-messages">

                            <td   className="">
                                <div  className="my-2 content-td" >
                                    <div className="text-center">{params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }</div>
                                </div>
                            </td>
                            <td   className="">
                                <div  className="my-2 content-td" >
                                    <div className="text-center">
                                    <Image
                                        style={{width : '40px' , height : '30px' , cursor : 'pointer'}}
                                        className="box-image-product-list"
                                        width={40}
                                        preview ={artwork?.media?.exact_url ? artwork?.media?.exact_url : ''}
                                        src={handleShowImage(artwork)}
                                    />
                                        {/* <img  src={artwork?.media?.exact_url} alt="image_product" /> */}
                                    </div>
                                </div>
                            </td>

                            <td   className="">
                                <div   className="my-2 content-td">
                                    <div className=" text-center"> {artwork?.artwork_title}</div>

                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> 
                                        {artwork?.persian_artist_name}
                                    </div>
                                    </div>
                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> 
                                        {artwork?.latest_auction?.house?.first_name}{' '}{artwork?.latest_auction?.house?.last_name}
                                        </div>
                                    </div>
                                </div>
                                </td>
                                <td className="">
                                    <div
                                        className=" my-2 content-td">
                                        <div className=" w-100 text-center"> 
                                        {momentJalaali(artwork?.latest_auction?.start_time).format(`HH:mm  -   jYYYY/jMM/jDD`)}
                                        </div>
                                    </div>
                                </td>
                                <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> 
                                            {artwork?.max_price ? separatorCurrency(artwork?.max_price) : 0}{' - '}{artwork?.min_price ? separatorCurrency(artwork?.min_price) : 0}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" w-100 text-center"> 
                                    {artwork?.price ? separatorCurrency(artwork?.price) : 0}
                                    </div>
                                </div>
                            </td>
                     
                     
                            <td className=" text-center">
                                <div className=" my-2 content-td">
                                    <Dropdown 
                                        overlay={actionMenu(artwork?.id , artwork)}>
                                        <a className="">
                                            <img src={icon_more} alt=""/>
                                        </a>
                                    </Dropdown>
                                </div>
                            </td>
                            </tr>
                            </React.Fragment>
                        ) : <div className="d-flex text-center w-100"></div>}

                   
                        <ModalAcceptArtwork 
                            setIsModalVisibleAccept={setIsModalVisibleAccept}
                            isModalVisibleAccept={isModalVisibleAccept}
                            ARTWORK_Id={ARTWORK_Id}
                            detailsArtwork={detailsArtwork}
                            listSuggestionHomeAuctions={listSuggestionHomeAuctions}
                        />
                        <ModalRejectArtwork
                            setIsModalVisibleReject={setIsModalVisibleReject}
                            isModalVisibleReject={isModalVisibleReject}
                            ARTWORK_Id={ARTWORK_Id}
                            detailsArtwork={detailsArtwork}
                            listSuggestionHomeAuctions={listSuggestionHomeAuctions}
                        />

            </tbody>
        </table>



    </div>
        <div className="d-flex justify-content-center w-100">
            {!artworkList?.length  && <EmptyComponent text={"اثری موجود نیست"}/>}
        </div>
        </React.Fragment>
    )
}

export default TableArtworkList;
