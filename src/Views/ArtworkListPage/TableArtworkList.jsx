import React , {useState} from 'react'
import { Menu, Dropdown , Collapse  , Input , Image  } from 'antd';
import { CaretDownOutlined , FilterFilled , DownOutlined} from '@ant-design/icons';
import {Link , NavLink} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';
import ModalAcceptArtwork from './ModalAcceptArtwork';
import ModalRejectArtwork from './ModalRejectArtwork';

function TableArtworkList({artworkList , countProduct , setFilterArtwork}) {
    
    const { Search } = Input;
    const { Panel } = Collapse;
    const onSearch = value => console.log(value);

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




  function onChangeFrom(value) {
    console.log('Selected Time: ', value.format('jYYYY-jM-jD') );
  }

  function onChangeTo(value) {
    console.log('Selected Time: ', value.format('jYYYY-jM-jD'));
  }
    
    return (
        <React.Fragment>
            
            <div className="row w-100">
                <div className="col w-100 ">
                    <div className="d-flex">
                        <Search className="mb-2" placeholder="جستجوی کالا" onSearch={(e)=> setFilterArtwork(e)} style={{ width: 300 }}  />
                    </div>

                    <div className="row mb-2 align-items-start  text-filter bg-light mr-3 p-3">
                       
                        <div className="col-8 px-0">

                            {/* <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}> */}
                                {/* <div className="d-flex">
                                        <FilterFilled  className="ml-2"/>
                                        <RangePicker value={date} onChange={onChange}/>
                                    </div> */}
                            {/* </Form.Item> */}
                            
                            <div className="d-block d-sm-flex justify-content-start">
                                <div className="d-flex align-items-center">

                                    <FilterFilled  className="ml-2 icon-filter"/>

                                    <p className="mb-0 ml-2 text-right">از تاریخ</p>

                                    <DatePicker
                                        className="date-field-filter-box"
                                        isGregorian={false}
                                        timePicker={false}
                                        onChange={valueFrom  => onChangeFrom(valueFrom)}
                                        // value={dateFrom}
                                    />

                                </div>
                                <div className="d-flex mt-2 mt-sm-0">
                                    
                                    <p className="mb-0 mr-3 ml-2 mx-sm-2 pt-1 text-right">تا تاریخ</p>
                                    <DatePicker
                                        className="date-field-filter-box"
                                        isGregorian={false}
                                        timePicker={false}
                                        onChange={valueTo => onChangeTo(valueTo)}
                                        // value={dateTo}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-4 px-0">
                            <div className="d-flex justify-content-start align-items-center  mt-sm-0">
                                <FilterFilled className="ml-2 icon-filter"/>
                                <Dropdown className="d-flex " overlay={menu} placement="bottomLeft" arrow>
                                    <button className="d-flex justify-content-center align-items-center btn-status-product-filter"> <p className="mb-0">وضعیت</p><CaretDownOutlined /> </button>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mb-2">
                        <NavLink to="/add-artwork">
                            <button className="btn-add-new-artwork">افزودن اثر هنری</button>
                        </NavLink>
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

                        <th className="  px-0 minWidth-date">
                            <div className=" px-3 text-center">براورد قیمت</div>
                        </th>

                        <th className="  px-0 minWidth-date">
                            <div className=" px-3 text-center">قیمت فروش</div>
                        </th>

                        <th className="  px-0 minWidth-action">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {artworkList ? artworkList.map((artwork, index) =>
                        <> 
                            <tr className="spaceRow row-messages">

                            <td   className="">
                                <div  className="my-2 content-td" >
                                    {/* <div className="text-center">{++index}</div> */}
                                    <div className="text-center">{artwork?.id}</div>
                                </div>
                            </td>
                            <td   className="">
                                <div  className="my-2 content-td" >
                                    <div className="text-center">
                                    <Image
                                        style={{width : '40px' , height : '30px' , cursor : 'pointer'}}
                                        className="box-image-product-list"
                                        width={40}
                                        preview ={artwork?.media?.exact_url}
                                        src={artwork?.media?.exact_url}
                                    />
                                        {/* <img  src={artwork?.media?.exact_url} alt="image_product" /> */}
                                    </div>
                                </div>
                            </td>

                            <td   className="">
                                <div   className="my-2 content-td">
                                    <div className=" text-center"> {artwork?.title}</div>

                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> {artwork?.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> {artwork?.email}</div>
                                    </div>
                                </div>
                                </td>
                                <td className="">
                                    <div
                                        className=" my-2 content-td">
                                        <div className=" w-100 text-center"> {momentJalaali(artwork?.date_joined).format(`HH:mm  -   jYYYY/jMM/jDD`)}</div>
                                    </div>
                                </td>
                                <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> {artwork?.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="">
                                <div className="my-2 content-td">
                                    <div className=" w-100 text-center"> {artwork?.price}</div>
                                </div>
                            </td>
                     
                     
                            <td className=" text-center">
                                <div className=" my-2 content-td">
                                    <Dropdown overlay={actionMenu(artwork?.id , artwork)}>
                                        <a className="">
                                            <img src={icon_more} alt=""/>
                                        </a>
                                    </Dropdown>
                                </div>
                            </td>
                            </tr>
                            </>
                        ) : <div className="d-flex text-center w-100">لیست خالی</div>}

                   
                        <ModalAcceptArtwork 
                            setIsModalVisibleAccept={setIsModalVisibleAccept}
                            isModalVisibleAccept={isModalVisibleAccept}
                            ARTWORK_Id={ARTWORK_Id}
                            detailsArtwork={detailsArtwork}
                        />
                        <ModalRejectArtwork
                            setIsModalVisibleReject={setIsModalVisibleReject}
                            isModalVisibleReject={isModalVisibleReject}
                            ARTWORK_Id={ARTWORK_Id}
                            detailsArtwork={detailsArtwork}
                        />

            </tbody>
        </table>

    </div>
        </React.Fragment>
    )
}

export default TableArtworkList;