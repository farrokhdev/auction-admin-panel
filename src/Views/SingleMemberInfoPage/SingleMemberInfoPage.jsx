import React, {useEffect , useState} from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import Header from '../../components/Header';
import TableBankInfo from './TableBankInfo';
import { Form, Input, Breadcrumb, Button , Upload} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import  {fetcher} from '../../utils/common';
import { BASE_URL } from '../../utils';
import {convertTypePersian} from '../../utils/converTypePersion';
import {Link , NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import axios from '../../utils/request';
import { successNotification , failNotification} from '../../utils/notification';

const layout = {
    labelCol: {
      span: 16,
    },
    wrapperCol: {
      span: 24,
    },
  };

function SingleMemberInfoPage(props) {

    const [form] = Form.useForm();

    const [member, setMember] = useState();
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(false)



    // const normFile = (e) => {
    //     console.log('Upload event:', e);
      
    //     if (Array.isArray(e)) {
    //       return e;
    //     }
      
    //     return e && e.fileList;
    //   };



    const onFinish = (values) => {
        console.log(values);
        setLoading(true)

        let payload = {
            
            "first_name": values?.first_name,
            "last_name": values?.last_name,
            "first_name_en" : values?.first_name_en,
            "last_name_en" : values?.last_name_en,
            "postal_code": values?.postal_code,
            "national_code": values?.national_code,
            // "home_auction_location": {
            //     "point": {
            //         "latitude": point?.latitude,
            //         "longitude": point?.longitude
            //     },
            //     "address": values?.address
            // },
            // "role": "home_auction",
            "bankaccount": member?.bankAccountInfo,
              
        }

        axios.put(`${BASE_URL}/panel/users/${props.match.params.id}/` , payload).then(res => {
            if(res.data.data.statusCode !== 400  && res.data.data.statusCode !== 403){
                setLoading(false)
                successNotification("ویرایش اطلاعات" , "ویرایش اطلاعات با موفقیت انجام شد")
            }else{
                failNotification("خطا" , res.data.data.error_message[0])
            }
        }).catch(err => {
            console.error(err)
            setLoading(false)
            console.log("err.response.error_message[0] ---" , err.response.data.data.error_message[0]);
            failNotification("خطا" , err.response.data.data.error_message[0])
        })




    }
    //   const onFinishFailed = (error) => {
    //     console.log(error);
    //   };


      useEffect(() => {
                        
        axios.get(`${BASE_URL}/panel/users/${props.match.params.id}/`).then(res => {
            setMember(res.data.data.result)
            setRole(res.data.result.role)
        }).catch(err => {
            console.log(err);
        })

    }, []);



    useEffect(() => {
        form.setFieldsValue({
            first_name : member?.first_name,
            last_name : member?.last_name,
            mobile : member?.mobile,
            email : member?.email,
            national_code : member?.national_code,
            address : member?.home_auction_location?.address,
            postal_code : member?.postal_code,
            id : member?.id,

            card_number : member?.bankaccount[0]?.card_number ,
            account_number : member?.bankaccount[0]?.account_number,
            sheba_number : member?.bankaccount[0]?.sheba_number,
            bank_name : convertTypePersian(member?.bankaccount[0]?.bank_name),

            home_auction_name : member?.home_auction_name,
            home_auction_type : member?.home_auction_type,
        })
    }, [member]);


    return (
        <React.Fragment>

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
                                    <Link to="/members">لیست اعضا</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to="/members">{`${member?.first_name}${' '}${member?.last_name}`}</Link>
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
                            first_name : member?.first_name,
                            // last_name : "last_name",
                            // mobile : "mobile",
                            // email : "email",
                            // national_code : "national_code",
                            // address : "address",
                            // postal_code : "postal_code",
                            id : "id",
                            card_number : "card_number",
                            account_number : "account_number",
                            sheba_number : "sheba_number",
                            bank_name : "bank_name",
                            home_auction_name : "home_auction_name",

                            // first_name : member?.first_name,
                            last_name : member?.last_name,
                            mobile : member?.mobile,
                            email : member?.email,
                            national_code : member?.national_code,
                            address : member?.adderss,
                            postal_code : member?.postal_code,
                          }}
                    >

                        <div className="d-flex my-4">
                            <h3>اطلاعات کاربر</h3>
                        </div>


                       <div  className="d-block d-md-flex align-items-center ">
                            <div  className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                                <p className="text-right mb-0 h-100">نام فارسی </p>
                            </div>
                            <div  className="col ">
                                <div style={{verticalAlign : 'middle'}} className="d-flex h-100 align-items-center">
                                    <Form.Item
                                        className="w-100  h-100"
                                        name="first_name"
                                        rules={[{ required: true, message: 'ورودی نام خالی است!' }]}
                                    >
                                        <Input 
                                            // defaultValue = {member?.first_name}
                                            size="large"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                       </div>

                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                                <p className="text-right mb-0 h-100">نام خانوادگی فارسی</p>
                            </div>
                            <div className="col ">
                                <Form.Item
                                    className="w-100  h-100"
                                    name="last_name"
                                    rules={[{ required: true, message: 'ورودی نام خانوادگی خالی است!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>

                       <div  className="d-block d-md-flex align-items-center ">
                            <div  className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                                <p className="text-right mb-0 h-100">نام انگلیسی </p>
                            </div>
                            <div  className="col ">
                                <div style={{verticalAlign : 'middle'}} className="d-flex h-100 align-items-center">
                                    <Form.Item
                                        className="w-100  h-100"
                                        name="first_name_en"
                                        rules={[{ required: true, message: 'ورودی نام خالی است!' }]}
                                    >
                                        <Input 
                                            // defaultValue = {member?.first_name}
                                            size="large"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                       </div>

                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                                <p className="text-right mb-0 h-100">نام خانوادگی انگلیسی</p>
                            </div>
                            <div className="col ">
                                <Form.Item
                                    className="w-100  h-100"
                                    name="last_name_en"
                                    rules={[{ required: true, message: 'ورودی نام خانوادگی خالی است!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                                <p className="text-right mb-0 h-100">شماره تماس</p>
                            </div>
                            <div className="col ">
                                
                                <Form.Item
                                    className="w-100  h-100"
                                    name="mobile"
                                    rules={[{ required: true, message: 'ورودی موبایل خالی است!' }]}
                                >
                                <Input 
                                    readOnly
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                                <p className="text-right mb-0 h-100">ایمیل</p>
                            </div>
                            <div className="col">
                                <Form.Item
                                    className="w-100  h-100"
                                    name="email"
                                    rules={[{ required: true, message: 'ورودی ایمیل خالی است!' }]}
                                >
                                <Input 
                                    readOnly
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                                <p className="text-right mb-0 h-100">کد ملی</p>
                            </div>
                            <div className="col">
                                <Form.Item
                                    className="w-100"
                                    name="national_code"
                                    rules={[{ required: true, message: 'ورودی کد ملی خالی است!' }]}
                                >
                                <Input 
                                    readOnly
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                                <p className="text-right mb-0 h-100">آدرس</p>
                            </div>
                            <div className="col">
                               
                                <Form.Item
                                    className="w-100"
                                    name="address"
                                    rules={[{ required: false, message: 'ورودی آدرس خالی است!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                                <p className="text-right mb-0 h-100">کد پستی</p>
                            </div>
                            <div className="col">

                                <Form.Item
                                    className="w-100"
                                    name="postal_code"
                                    rules={[{ required: false, message: 'ورودی کد پستی خالی است!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>

                        <div className="d-flex my-4">
                            <h3>اطلاعات حساب بانکی</h3>
                        </div>

                        <TableBankInfo  
                            member={member}
                        />


                        <div className="d-flex justify-content-end">
                            <button className="btn-edit-house-auction mt-5" htmlType="submit">ویرایش اطلاعات</button>
                        </div>

                        </Form>
                    </div>
                    <div className="col-0 col-xl-1">

                    </div>
            </div>

                        </div>
                </div>
            </div>

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
  
  export default connect(mapStateToProps , mapDispatchToProps)(SingleMemberInfoPage)