import React, {useEffect , useState} from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import Header from '../../components/Header';
import { Form, Input, Breadcrumb, Button , Upload , Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import  {fetcher} from '../../utils/common';
import { BASE_URL } from '../../utils';
import {convertTypePersian} from '../../utils/converTypePersion';
import {Link , NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import axios from '../../utils/request';
import momentJalaali from 'moment-jalaali';


const layout = {
    labelCol: {
      span: 16,
    },
    wrapperCol: {
      span: 24,
    },
  };

function SingleViewAuctionPage(props) {

    const [form] = Form.useForm();
    const [auctionInfo , setAuctionInfo] = useState({})
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        console.log(values);
      };

      const onFinishFailed = (error) => {
        console.log(error);
      };


      useEffect(() => {
        setLoading(true)  
        axios.get(`${BASE_URL}/sale/auctions/${props.match.params.id}/`).then(res => {
            setLoading(false)
            setAuctionInfo(res.data.data.result)

        }).catch(err => {
            console.log(err);
            setLoading(false)
        })

    }, []);

    useEffect(() => {
        form.setFieldsValue({
            title : auctionInfo?.title,
            text : auctionInfo?.text,
            address : auctionInfo?.address,
            start_time : auctionInfo?.start_time ? momentJalaali(auctionInfo?.start_time).format(`jYYYY/jMM/jDD`) : '',
            creation_time : auctionInfo?.creation_time ? momentJalaali(auctionInfo?.creation_time).format(`jYYYY/jMM/jDD`) : '',
            end_time : auctionInfo?.end_time ? momentJalaali(auctionInfo?.end_time).format(`jYYYY/jMM/jDD`) : '',
            house : auctionInfo?.house?.first_name,
        })
    }, [auctionInfo]);


    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
            <Spin indicator={antIcon} spinning={loading}  >
            <div style={{marginTop : '30px'}} className="container-fluid px-0 container-pages">

                <div  className="row m-0">
                    <div className="col">
                        <div   className="row justify-content-start pb-3 mx-0">
                    <div className="col px-0">
                        <div className="d-flex">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <NavLink 
                                        key="1"
                                        onClick={ e => props.toggleActiveNavDrawer("1")}
                                        to="/">
                                        خانه
                                    </NavLink>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to="/members"> جزئیات حراج</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {/* <Link to="/members">{`${member?.first_name}${' '}${member?.last_name}`}</Link> */}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>

                <div  className="row content-page">
               
                    <div  className="col  userInfoSection  px-lg-5 ">

                    <Form 
                        {...layout} 
                        name="nest-messages" 
                        form={form}
                        onFinish={onFinish}
                        initialValues={{
                            // title : auctionInfo?.title,
    
                          }}
                    >

                        {/* <div className="d-flex my-4">
                            <h3>اطلاعات کاربر</h3>
                        </div> */}


                       <div  className="d-block d-md-flex align-items-center mt-5">
                            <div  className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">عنوان </p>
                            </div>
                            <div  className="col ">
                                <div style={{verticalAlign : 'middle'}} className="d-flex h-100 align-items-center">
                                    <Form.Item
                                        className="w-100  h-100"
                                        name="title"
                                        rules={[{ required: true, message: 'ورودی نام خالی است!' }]}
                                    >
                                        <Input 
                                            // defaultValue = {auctionInfo?.title}
                                            size="large"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                       </div>

                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">متن </p>
                            </div>
                            <div className="col ">
                                <Form.Item
                                    className="w-100  h-100"
                                    name="text"
                                    rules={[{ required: true, message: 'ورودی نام خانوادگی خالی است!' }]}
                                >
                                <Input 
                                    size="large"

                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">تاریخ ایجاد </p>
                            </div>
                            <div className="col ">
                                
                                <Form.Item
                                    className="w-100  h-100"
                                    name="creation_time"
                                    rules={[{ required: true, message: 'ورودی موبایل خالی است!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">تاریخ آغاز</p>
                            </div>
                            <div className="col">
                                <Form.Item
                                    className="w-100  h-100"
                                    name="start_time"
                                    rules={[{ required: true, message: 'ورودی ایمیل خالی است!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">تاریخ پایان </p>
                            </div>
                            <div className="col">
                                <Form.Item
                                    className="w-100"
                                    name="end_time"
                                    rules={[{ required: true, message: 'ورودی کد ملی خالی است!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">آدرس</p>
                            </div>
                            <div className="col">
                               
                                <Form.Item
                                    className="w-100"
                                    name="address"
                                    rules={[{ required: true, message: 'ورودی آدرس خالی است!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100"> خانه حراج </p>
                            </div>
                            <div className="col">

                                <Form.Item
                                    className="w-100"
                                    name="house"
                                    rules={[{ required: true, message: 'ورودی کد پستی خالی است!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>

                        </Form>
                    </div>
                    <div className="col-0 col-xl-1">

                    </div>
            </div>

                        </div>
                </div>
            </div>
            </Spin>
    </React.Fragment>
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(SingleViewAuctionPage)