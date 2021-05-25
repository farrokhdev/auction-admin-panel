import React, {useEffect , useState} from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import Header from '../../components/Header';
import { Form, Input, Breadcrumb, notification , Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {fetcher} from '../../utils/common';
import axios from '../../utils/request'
import { BASE_URL } from '../../utils';
import {convertTypePersian} from '../../utils/converTypePersion';
import {Link , NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import TableInfoBankCheckMembership from './TableInfoBankCheckMembership';
import ModalConfirmAcceptMembership from './ModalConfirmAcceptMembership';
import ModalRejectMembership from './ModalRejectMembership';

const layout = {
    labelCol: {
      span: 16,
    },
    wrapperCol: {
      span: 24,
    },
  };

function CheckMembershipAuctionPage(props) {

    const [form] = Form.useForm();
    const { confirm } = Modal;
    const [member, setMember] = useState();
    const [bankAccountInfo, setBankAccountInfo] = useState([{}]);
    

    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };

      const openNotification = (state) => {
        notification.success({
          message: state ?  'تایید عضویت' : 'رد عضویت',
          description:`عضویت  با موفقیت انجام شد`,
            duration: 1.2,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };


      

    const onFinish = (values) => {
        console.log(values);
      };

      const onFinishFailed = (error) => {
        console.log(error);
      };


      useEffect(() => {
            
        // fetcher(`${BASE_URL}/panel/users/${props.match.params.id}`,{method:"GET",data:"",header:{}}).then(res => {
            
        fetcher(`${BASE_URL}/panel/users/${props.match.params.id}`,{method:"GET",data:"",header:{}}).then(res => {
            setMember(res.data.result)
            // setCountMember(res.data.count)
            setBankAccountInfo(res.data.result.bankaccount)
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
            address : member?.adderss,
            postal_code : member?.postal_code,
            id : member?.id,
            card_number : member?.bankaccount[0]?.card_number,
            account_number : member?.bankaccount[0]?.account_number,
            sheba_number : member?.bankaccount[0]?.sheba_number,
            bank_name : convertTypePersian(member?.bankaccount[0]?.bank_name),
            home_auction_name : member?.home_auction_name,
            home_auction_type : member?.home_auction_type,
        })
    }, [member]);


    const [visibleAccept, setVisibleAccept] = useState(false);
    const [visibleReject, setVisibleReject] = useState(false);


    function handleShowConfirm(state) {

        confirm({
          title: state ? 'از تایید عضویت اطمینان دارید؟' : 'از رد عضویت اطمینان دارید؟',
          icon: <ExclamationCircleOutlined />,
          content: state ? `تایید عضویت ` : `رد عضویت `,
          className : "confirm-accept-membership" ,
          okText : state ? "تایید عضویت" : "رد عضویت",
          cancelText : "انصراف",

          onOk() {
            console.log('تایید');

            let payload = {
                "is_approve": state ? "True" : "False"
            }

            
            axios.patch(`${BASE_URL}/sale/join-auction/${props.match.params.id}/`, payload).then(res => {
                
            }).catch(err => {
                console.log(err);
            })
            
            openNotification(state)
            setTimeout(() => {
                window.location.reload();
            }, 700);
          },
          onCancel() {
            console.log('انصراف');
          },

          
        });
      }


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
                            <div  className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">نام </p>
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
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">نام خانوادگی</p>
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
                       <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">شماره تماس</p>
                            </div>
                            <div className="col ">
                                
                                <Form.Item
                                    className="w-100  h-100"
                                    name="mobile"
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
                                <p className="text-right mb-0 h-100">ایمیل</p>
                            </div>
                            <div className="col">
                                <Form.Item
                                    className="w-100  h-100"
                                    name="email"
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
                                <p className="text-right mb-0 h-100">کد ملی</p>
                            </div>
                            <div className="col">
                                <Form.Item
                                    className="w-100"
                                    name="national_code"
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
                                <p className="text-right mb-0 h-100">کد پستی</p>
                            </div>
                            <div className="col">

                                <Form.Item
                                    className="w-100"
                                    name="postal_code"
                                    rules={[{ required: true, message: 'ورودی کد پستی خالی است!' }]}
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

                            <TableInfoBankCheckMembership bankAccountInfo={bankAccountInfo}/>

                        <div className="d-flex my-4">
                            <h3>محصولات مورد علاقه</h3>
                        </div>

                        <div style={{overflow : 'auto'}} className="d-flex">
                            <div style={{minWidth : '100px'}} className="col bg-danger">1</div>
                            <div style={{minWidth : '100px'}} className="col bg-danger">1</div>
                            <div style={{minWidth : '100px'}} className="col bg-danger">1</div>
                            <div style={{minWidth : '100px'}} className="col bg-danger">1</div>
                            <div style={{minWidth : '100px'}} className="col bg-danger">1</div>
                            <div style={{minWidth : '100px'}} className="col bg-danger">1</div>
                            <div style={{minWidth : '100px'}} className="col bg-danger">1</div>
                            <div style={{minWidth : '100px'}} className="col bg-danger">1</div>
                            <div style={{minWidth : '100px'}} className="col bg-danger">1</div>
                
                        </div>

                        <div className="d-flex my-4">
                            <h3>شارژ کیف پول</h3>
                        </div>

                        <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                                <div className="d-flex">
                                    <p className="mb-0">معرف</p>
                                </div>
                            </div>
                            <div className="col">

                                <Form.Item
                                        name="home_auction_name"
                                        // label="نام خانه حراج"
                                        rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                                    >
                                        <Input 
                                            // defaultValue={member?.home_auction_name}
                                        />
                                </Form.Item> 
                            </div>
                            
                        </div>

                        <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                                <div className="d-flex">
                                    <p className="mb-0 text-right">سایر مدارک</p>
                                </div>
                            </div>
                            <div className="col">

                                <Form.Item
                                    name="home_auction_type"
                                    // label="حوزه‌های فعالیت"
                                    rules={[
                                    {
                                        // type: 'email',
                                    },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            
                        </div>


                        <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                                <div className="d-flex">
                                    <p className="mb-0">فایل قرارداد</p>
                                </div>
                            </div>
                            <div className="col">

                            {/* <Form.Item
                                name="upload"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                // extra="longgggggggggggggggggggggggggggggggggg"
                            >
                                <Upload name="logo" action="/upload.do" listType="picture">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item> */}
                            </div>
                            
                        </div>

                       
                        </Form>

                        <div className="d-flex justify-content-center">

                            {/* <button onClick={()=> handleShowAcceptModal()} className="ml-2 btn-accept-membership-auction">تایید عضویت</button>  */}
                            <button onClick={()=>  handleShowConfirm(true) } className="ml-2 btn-accept-membership-auction">تایید عضویت</button> 
                            <button onClick={()=>  handleShowConfirm(false) } className="btn-eject-membership-auction"> رد عضویت</button>

                            {/* <ModalConfirmAcceptMembership 
                                setVisibleAccept={setVisibleAccept}
                                visibleAccept={visibleAccept}
                            />  */}

                            <ModalRejectMembership 
                                setVisibleReject={setVisibleReject}
                                visibleReject={visibleReject}
                            />

                       </div>
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(CheckMembershipAuctionPage)
