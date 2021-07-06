import React , {useState , useEffect} from 'react'
import {Input, Breadcrumb , Image} from 'antd';
import {NavLink , Link} from 'react-router-dom';
import {BASE_URL} from '../../utils';
import axios from "../../utils/request";
import {connect} from 'react-redux';
import ModalSendToHouseAuction from './ModalSendToHouseAuction';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';


function SingleSaleConsulerPage(props) {

    const { TextArea } = Input;
    const [visibleSendToHouseAuction, setVisibleSendToHouseAuction] = useState(false);
    const [artwork, setArtwork] = useState();

      useEffect(() => {

        axios.get(`${BASE_URL}/sale/product/${props.match.params.id}/`).then(res => {
            setArtwork(res.data.data.result)
        }).catch(err => {
            console.log(err);
        })

    }, []);

    const handleShowModal = () => {
        setVisibleSendToHouseAuction(true);
    }


    return (
        <div>
            <React.Fragment>

                <div
                    style={{
                    marginTop: '30px'
                }}
                    className="container-fluid px-0 container-pages">

                    <div className="row m-0">
                        <div className="col">
                            <div className="row justify-content-start pb-3 mx-0">
                                <div className="col px-0">
                                    <div className="d-flex">
                                        <Breadcrumb>
                                            <Breadcrumb.Item>
                                                <NavLink key="1" onClick={e => props.toggleActiveNavDrawer("1")} to="/">
                                                    خانه
                                                </NavLink>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item></Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                {/* {`مشاوره فروش ${props.match.params.name}`} */}
                                                {`مشاوره فروش`}
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                </div>
                            </div>

                            <div className="row content-page ">

                                <div className="col pt-5">

                                    <div className="d-block d-lg-flex ">
                                        <div className="col-12 col-lg-2">
                                            <p className="text-right">تصویر اصلی</p>
                                        </div>
                                        <div className="col-12 col-lg-8">
                                            <div className="d-flex">

                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={artwork?.media ? artwork?.media?.media_path : 'error'}
                                                    // fallback="data:image/png;base64,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"/>
                                                    fallback={artwork?.media?.media_path}/>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-5">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right">نام کاربر درخواست کننده</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.owner?.first_name ? artwork?.owner?.first_name : 'سعیدی'} />
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right">نام اثر</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.artwork_title} />
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right">نام هنرمند</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.english_artist_name} />
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right">  تخمین قیمت (تومان)</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.price} />
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right">توضیحات</p>
                                        </div>
                                        <div className="col">
                                            <TextArea value={artwork?.persian_description ? artwork?.persian_description : '.... توضیحات ....'} style={{minHeight : '150px'}} rows={8} 
                                            // value={artwork?.persian_description ? artwork?.persian_description : ''} 
                                        /> 
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div>

                                    {/* <div className="d-block d-lg-flex mt-4">
                                        <div className="col col-lg-4">
                                            <p className="mb-2 mb-lg-0 text-right">خانه‌های حراج جهت ارسال</p>
                                        </div>
                                        <div className="col">
                                            <Input value={artwork?.mobile} />
                                        </div>
                                        <div className="col-0 col-lg-2">

                                        </div>
                                    </div> */}

                                    <div className="d-block d-sm-flex mt-5">
                                        <div className="col px-0">
                                            <div className="d-flex justify-content-center justify-content-sm-end ml-sm-3">
                                                <button onClick={handleShowModal} className="btn-send-to-house-auctions">ارسال پیشنهاد به خانه‌های حراج</button>
                                            </div>
                                        </div>
                                        <div className="col px-0">
                                            <div className="d-flex justify-content-center justify-content-sm-start mt-2 mt-sm-0">
                                                <Link to="/tickets"><button className="btn-response-to-user" >پاسخ به کاربر</button></Link>
                                            </div>
                                        </div>
                                    </div>
                          
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <ModalSendToHouseAuction 
                    paramsId={props.match.params.id}
                    visibleSendToHouseAuction={visibleSendToHouseAuction}
                    setVisibleSendToHouseAuction={setVisibleSendToHouseAuction}/>
            </React.Fragment>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        toggleActiveNavDrawer : (data) => dispatch(toggleActiveNavDrawer(data)),
    }
  }
  
  const mapStateToProps = (store) => {
    return {
        panel: store.panelReducer
    }
  }
  
  export default connect(mapStateToProps , mapDispatchToProps)(SingleSaleConsulerPage)