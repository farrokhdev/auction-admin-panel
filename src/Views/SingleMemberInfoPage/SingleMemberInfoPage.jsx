import React, {useEffect , useState} from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import Header from '../../components/Header';
import TableBankInfo from './TableBankInfo';
import { Form, Input, Breadcrumb, Button , Upload} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import  {fetcher} from '../../utils/common';
import { BASE_URL } from '../../utils';
import {convertTypePersian} from '../../utils/converTypePersion';
import {Link} from 'react-router-dom';

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
    const [bankAccountInfo, setBankAccountInfo] = useState([{}]);
    console.log("member",member);
    console.log("bankAccountInfo",bankAccountInfo);

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
            
        fetcher(`${BASE_URL}/panel/users/3`,{method:"GET",data:"",header:{}}).then(res => {
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


    return (
        <React.Fragment>
            <div className="container-fluid ">

                <div className="row justify-content-start pb-3 mx-0">
                    <div className="col">
                        <div className="d-flex">
                            <Breadcrumb>
                                <Breadcrumb.Item>خانه</Breadcrumb.Item>
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

                <div className="row content-page">
               
                    <div style={{margin : '0px 80px'}} className="col  userInfoSection">

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


                       <div className="d-flex align-items-center">
                            <div className="col-2 h-100">
                                <p className="text-right mb-0 h-100">نام</p>
                            </div>
                            <div className="col">

                            <Form.Item
                                className="w-100"
                                name="first_name"
                                rules={[{ required: true, message: 'Please input your firstname!' }]}
                            >
                                <Input 
                                    // defaultValue = {member?.first_name}
                                    size="large"
                                />
                            </Form.Item>

                                
                                
                            </div>
                       </div>
                       <div className="d-flex align-items-center my-1">
                            <div className="col-2 h-100">
                                <p className="text-right mb-0 h-100">نام خانوادگی</p>
                            </div>
                            <div className="col">
                                <Form.Item
                                    className="w-100"
                                    name="last_name"
                                    rules={[{ required: true, message: 'Please input your lastname!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-flex align-items-center">
                            <div className="col-2 h-100">
                                <p className="text-right mb-0 h-100">شماره تماس</p>
                            </div>
                            <div className="col">
                                
                                <Form.Item
                                    className="w-100"
                                    name="mobile"
                                    rules={[{ required: true, message: 'Please input your mobile!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-flex align-items-center my-1">
                            <div className="col-2 h-100">
                                <p className="text-right mb-0 h-100">ایمیل</p>
                            </div>
                            <div className="col">
                                <Form.Item
                                    className="w-100"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-flex align-items-center">
                            <div className="col-2 h-100">
                                <p className="text-right mb-0 h-100">کد ملی</p>
                            </div>
                            <div className="col">
                                <Form.Item
                                    className="w-100"
                                    name="national_code"
                                    rules={[{ required: true, message: 'Please input your national code!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-flex align-items-center my-1">
                            <div className="col-2 h-100">
                                <p className="text-right mb-0 h-100">آدرس</p>
                            </div>
                            <div className="col">
                               
                                <Form.Item
                                    className="w-100"
                                    name="address"
                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                <Input 
                                    
                                    size="large"
                                />
                            </Form.Item>
                            </div>
                       </div>
                       <div className="d-flex align-items-center">
                            <div className="col-2 h-100">
                                <p className="text-right mb-0 h-100">کد پستی</p>
                            </div>
                            <div className="col">

                                <Form.Item
                                    className="w-100"
                                    name="postal_code"
                                    rules={[{ required: true, message: 'Please input your postal_code!' }]}
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

                        <div className="d-flex">
                            <div className="col-3">
                                <div className="d-flex">
                                    <p>نام خانه حراج</p>
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

                        <div className="d-flex">
                            <div className="col-3">
                                <div className="d-flex">
                                    <p>حوزه‌های فعالیت</p>
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

                           
                        <div className="d-flex">
                            <div className="col-3">
                                <div className="d-flex">
                                    <p>تعداد محصولات جهت فروش</p>
                                </div>
                            </div>
                            <div className="col">

                                <Form.Item
                                    name="3"
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


                        <div className="d-flex">
                            <div className="col-3">
                                <div className="d-flex">
                                    <p>آدرس</p>
                                </div>
                            </div>
                            <div className="col">

                                <Form.Item
                                    name="4"
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
                 
                        <div className="d-flex">
                            <div className="col-3">
                                <div className="d-flex">
                                    <p>لوکیشن</p>
                                </div>
                            </div>
                            <div className="col">

                                <Form.Item
                                    name="5"
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
                      
                        <div className="d-flex">
                            <div className="col-3">
                                <div className="d-flex">
                                    <p>شماره تماس خانه حراج</p>
                                </div>
                            </div>
                            <div className="col">

                                <Form.Item
                                    name="6"
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

                        <div className="d-flex">
                            <div className="col-3">
                                <div className="d-flex">
                                    <p>فایل قرارداد</p>
                                </div>
                            </div>
                            <div className="col">

                            <Form.Item
                                name="upload"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                // extra="longgggggggggggggggggggggggggggggggggg"
                            >
                                <Upload name="logo" action="/upload.do" listType="picture">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>
                            </div>
                            
                        </div>

                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Form>
                    </div>
            </div>
        </div>
    </React.Fragment>
    )
}

export default SingleMemberInfoPage;
