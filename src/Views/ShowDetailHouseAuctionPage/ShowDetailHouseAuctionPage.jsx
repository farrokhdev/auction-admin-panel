import React, {useEffect , useState} from 'react';
import TableBankInfo from './TableBankInfo';
import { Form, Input, Breadcrumb} from 'antd';
import  {fetcher} from '../../utils/common';
import { BASE_URL } from '../../utils';
import {Link , NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import MapComponent from '../../components/MapComponent';

const layout = {
    labelCol: {
      span: 16,
    },
    wrapperCol: {
      span: 24,
    },
  };

function ShowDetailHouseAuctionPage(props) {

    const [form] = Form.useForm();

    const [member, setMember] = useState();
    const [bankAccountInfo, setBankAccountInfo] = useState([
        {
            account_number: "3333333333",
            bank_name: "رسالت",
            card_number: "6037776700972010",
            id: "1",
            sheba_number: "IR530700052400114950030001"
        },
        {
            account_number: "5555555555",
            bank_name: "ملی",
            card_number: "6037776700972032",
            id: "2",
            sheba_number: "IR530700052400114950030004"
        }
        ,
        {
            account_number: "8888888888",
            bank_name: "پاسارگاد",
            card_number: "6037776700972403",
            id: "3",
            sheba_number: "IR530700052400114950030008"
        }
    ]);


    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };

    const onFinish = (values) => {
        console.log(values);
      };

      const onFinishFailed = (error) => {
        console.log(error);
      };


      useEffect(() => {

        // fetcher(`${BASE_URL}/panel/users/${props.match.params.id}`,{method:"GET",data:"",header:{}}).then(res => {
        fetcher(`${BASE_URL}/panel/users/${props.match.params.id}/`,{method:"GET",data:"",header:{}}).then(res => {
            setMember(res.data.result)
            // setCountMember(res.data.count)
            // setBankAccountInfo(res.data.result.bankaccount)
        }).catch(err => {
            console.log(err);
        })

    }, []);

    useEffect(() => {
        form.setFieldsValue({
            first_name : member?.first_name,
            last_name : member?.last_name,
            mobile : member?.mobile,
            email : member?.email ? member?.email : 'acution_house@gmail.com',
            national_code : member?.national_code ? member?.national_code : '0123456789',
            address : member?.address,
            count : member?.count,
            postal_code : member?.postal_code,
            id : member?.id,
            card_number : member?.bankaccount[0]?.card_number,
            account_number : member?.bankaccount[0]?.account_number,
            sheba_number : member?.bankaccount[0]?.sheba_number,
            bank_name : member?.bankaccount[0]?.bank_name,
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
                        name="house-auction-details" 
                        form={form}
                        initialValues={{ 
                            remember: true,
                        }}
                        // onValuesChange = {onValuesChange}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        // initialValues={{
                        //     first_name : member?.first_name,
                          
                        //     id : "id",
                        //     card_number : "card_number",
                        //     account_number : "account_number",
                        //     sheba_number : "sheba_number",
                        //     bank_name : "bank_name",
                        //     home_auction_name : "home_auction_name",
                        //     last_name : member?.last_name,
                        //     mobile : member?.mobile,
                        //     email : member?.email,
                        //     national_code : member?.national_code,
                        //     address : member?.adderss,
                        //     postal_code : member?.postal_code,
                        //   }}

                    >

                        <div className="d-flex my-4">
                            <h3>اطلاعات خانه حراج</h3>
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

                        <TableBankInfo  member={member} bankAccountInfo={bankAccountInfo}/>


                        <div className="d-flex my-4">
                            <h3>اطلاعات خانه حراج</h3>
                        </div>

                        <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                                <div className="d-flex">
                                    <p className="mb-0">نام خانه حراج</p>
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
                                    <p className="mb-0 text-right">حوزه‌های فعالیت</p>
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
                                    <p className="mb-0 text-right">تعداد محصولات جهت فروش</p>
                                </div>
                            </div>
                            <div className="col">

                                <Form.Item
                                    name="count"
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
                                    <p className="mb-0">آدرس</p>
                                </div>
                            </div>
                            <div className="col">

                                <Form.Item
                                    name="address"
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
                                    <p className="mb-0">لوکیشن</p>
                                </div>
                            </div>
                            <div className="col">

                                <MapComponent/>

                                {/* <Form.Item
                                    name="location"
                                    rules={[
                                    {
                                    },
                                    ]}
                                >
                                    <Input />
                                </Form.Item> */}
                            </div>
                            
                        </div>
                      
                        {/* <div className="d-block d-md-flex align-items-center">
                            <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                                <div className="d-flex">
                                    <p className="mb-0">شماره تماس خانه حراج</p>
                                </div>
                            </div>
                            <div className="col">

                                <Form.Item
                                    name="6"
                                    rules={[
                                    {
                                    },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            
                        </div> */}

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

                        {/* <Button type="primary" htmlType="submit">
                            Submit
                        </Button> */}

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
  
  export default connect(mapStateToProps , mapDispatchToProps)(ShowDetailHouseAuctionPage)