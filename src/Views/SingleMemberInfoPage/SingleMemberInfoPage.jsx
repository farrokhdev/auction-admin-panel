import React, {useEffect , useState} from 'react';
import TableBankInfo from './TableBankInfo';
import { Form, Input, Breadcrumb, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
    const [loading, setLoading] = useState(false)
    const [bankAccountInfo, setBankAccountInfo] = useState([]);

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
            "home_auction_location": {
                "address": values?.address
            }

              
        }

        axios.put(`${BASE_URL}/panel/users/${props.match.params.id}/` , payload).then(res => {
            if(res.data.data.statusCode !== 400  && res.data.data.statusCode !== 403){
                setLoading(false)
                successNotification("ویرایش اطلاعات" , "ویرایش اطلاعات با موفقیت انجام شد")
                setTimeout(() => {
                    window.location.reload()
                }, 1200);
            }else{
                failNotification("خطا" , res.data.data.error_message[0])
            }
        }).catch(err => {
            console.error(err)
            setLoading(false)
            failNotification("خطا" , err.response.data.data.error_message[0])
        })
    }



      useEffect(() => {
                        
        axios.get(`${BASE_URL}/panel/users/${props.match.params.id}/`).then(res => {
            setMember(res.data.data.result)
            setBankAccountInfo(res.data.data.result.bankaccount);
        }).catch(err => {
            console.log(err);
        })

    }, []);



    useEffect(() => {
        form.setFieldsValue({
            first_name : member?.first_name,
            last_name : member?.last_name,
            first_name_en: member?.first_name_en,
            last_name_en: member?.last_name_en,
            mobile : member?.mobile,
            email : member?.email,
            national_code : member?.national_code,
            address : member?.home_auction_location?.address,
            postal_code : member?.postal_code,

            card_number : member?.bankaccount[0]?.card_number ,
            account_number : member?.bankaccount[0]?.account_number,
            sheba_number : member?.bankaccount[0]?.sheba_number,
            bank_name : convertTypePersian(member?.bankaccount[0]?.bank_name),
            home_auction_name : member?.home_auction_name,
            home_auction_type : member?.home_auction_type,
        })
    }, [member]);


    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
            <Spin indicator={antIcon} spinning={loading}>
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
                                        rules={[
                                        {
                                            required: false,
                                            message: "ورودی نام خالی است!",
                                        },

                                        {
                                            pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                            message: "کاراکتر انگلیسی مجاز نیست!",
                                        },
                                        ]}
                                    >
                                        <Input 
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
                                    rules={[
                                      {
                                        required: false,
                                        message: "ورودی نام خانوادگی خالی است!",
                                      },
          
                                      {
                                        pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                        message: "کاراکتر انگلیسی مجاز نیست!",
                                      },
                                    ]}
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
                                        rules={[
                                            { 
                                                required: false,
                                                message: 'ورودی نام انگلیسی خالی است!' 
                                            },
                                            {
                                              pattern:
                                                /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                              message: "کاراکتر فارسی مجاز نیست!",
                                            },
                                        ]}
                                    >
                                        <Input 
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
                                    rules={[    
                                        { 
                                            required: false, 
                                            message: 'ورودی نام خانوادگی انگلیسی خالی است!' 
                                        } ,
                                        {
                                          pattern:
                                            /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                          message: "کاراکتر فارسی مجاز نیست!",
                                        }, 
                                ]}
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
                                    rules={[{ required: false, message: 'ورودی موبایل خالی است!' }]}
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
                                    rules={[{ required: false, message: 'ورودی ایمیل خالی است!' }]}
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
                                    rules={[{ required: false, message: 'ورودی کد ملی خالی است!' }]}
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
                            setBankAccountInfo={setBankAccountInfo}
                            bankAccountInfo={bankAccountInfo}
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(SingleMemberInfoPage)