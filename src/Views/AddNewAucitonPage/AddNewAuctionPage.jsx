import React , {useState , useEffect , useRef } from 'react';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils/index';
import { UploadOutlined  , MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import { Form, Input, InputNumber , Breadcrumb , Select  , Checkbox , Upload , Button , message} from 'antd';
import {NavLink} from 'react-router-dom';
import Loading from '../../components/Loading';
import DatePicker from 'react-datepicker2';
import momentJalaali from 'moment-jalaali';
import { BsFillTrashFill } from "react-icons/bs";

const layout = {
    labelCol: {
        span: 16
    },
    wrapperCol: {
        span: 24
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 16,
        span: 24
    }
};
const scrollToRef = (ref) => window.scrollTo(20, ref.current.offsetTop)

function AddNewAuctionPage(props) {

    const [form] = Form.useForm();

    const myRef1 = useRef(null)
    const myRef2 = useRef(null)
    const myRef3 = useRef(null)
    const myRef4 = useRef(null)
    const myRef5 = useRef(null)
    const refArray = [myRef1, myRef2, myRef3, myRef4 , myRef5]
    const executeScroll = (e) => scrollToRef(e)

    const { Option } = Select;
    // const { RangePicker } = DatePicker;

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };

      function handleChange(value) {
        console.log(`selected ${value}`);
      }

      const rangeConfig = {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'زمان انتخاب نشده است!',
          },
        ],
      };

      const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'زمان انتخاب نشده است!',
          },
        ],
      };

      const formItemLayout = {
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 12,
        },
      };

      function validatePrimeNumber(number) {
        if (number) {
          return {
            validateStatus: 'success',
            errorMsg: null,
          };
        }
      
        return {
          validateStatus: 'error',
          errorMsg: '',
        };
      }

      const [number, setNumber] = useState({
        value: 0,
      });
      
      const onNumberChange = (value) => {
        setNumber({ ...validatePrimeNumber(value), value });
      };

      const onChangeTo = (date) => {
        //   console.log("DATE --> " , momentJalaali(date).format(`HH:mm  -   jYYYY/jMM/jDD`));
          console.log("DATE --> " , (date).format('YYYY-MM-DD HH:mm:ss'));
      }


    //   const propsFile = {
    //     name: 'file',
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     headers: {
    //       authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //       if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    //   };

    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };


      const onFinish = (values) => {
          console.log(values);

          let payload = {
            "title": "حراجی دوم",
            "text": "این حراجی اول است",
            "address": "خیابان اول",
            "is_live_streaming": false,
            "bidding_interval": null,
            "extendable_deadline": false,
            "is_bidding_banned": false,
            // "start_time": "2021-05-05 15:23:07",
            "start_time": (values.start_time).format('YYYY-MM-DD HH:mm:ss'),
            // "end_time": "2021-05-05 15:23:07",
            "end_time": (values.end_time).format('YYYY-MM-DD HH:mm:ss'),
            "type": "PERIODIC",
            "auction_product":[
                {
                    "product_id":1,
                    "base_price":50
                }
            ],
            "house_id":18
          }

          axios.post(`${BASE_URL}/sale/auctions/` , payload).then(res => {
              console.log(res.data);
              
          }).catch(err => {
              console.error(err)
          })
      }


    return (
        <React.Fragment>
        <div  className="container-fluid px-0 container-pages">
            <div className="row m-0">
                <div className="col">
                    <div className="row ">
                        <div className="col content-panel-pages px-0 mx-0">
                                <div className="row justify-content-start pb-3 mx-0">
                                    <div className="col">
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
                                                    <NavLink 
                                                        key="5"
                                                        onClick={ e => props.toggleActiveNavDrawer("1")}
                                                        to="/house-auctions">
                                                        ایجاد حراجی
                                                    </NavLink>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mx-0">
                                    <div className="col content-page p-4  ">

                                        <div className="d-block d-xl-flex my-4 justify-content-start tabs-link-add-auction p-3">

                                            
                                                <div onClick={() => executeScroll(refArray[0])} 
                                                    className="d-flex justify-content-start text-center tab-item-add-auction">
                                                    <p className="mb-0 mr-3">اطلاعات عمومی</p>
                                                </div>
                                         
                                            
                                                <div onClick={() => executeScroll(refArray[1])} className="d-flex justify-content-start text-center tab-item-add-auction">
                                                    <p className="mb-0 mx-3">تاریخ برگزاری حراج</p>  
                                                </div>
                                       
                                            
                                                <div onClick={() => executeScroll(refArray[2])} className="d-flex justify-content-start text-center tab-item-add-auction">
                                                    <p className="mb-0 mx-3">بازه بید‌ها</p>    
                                                </div>
                                           
                                            
                                                <div onClick={() => executeScroll(refArray[3])} className="d-flex justify-content-start text-center tab-item-add-auction">
                                                    <p className="mb-0 mx-3">ارزیابی شرکت کنندگان</p>      
                                                </div>
                                            
                                            
                                                <div onClick={() => executeScroll(refArray[4])} className="d-flex justify-content-start text-center tab-item-add-auction">
                                                    <p className="mb-0 mr-3">قوانین</p>  
                                                </div>
                                           
                                            
                                        </div>
                                            <div ref={refArray[0]}></div>
                                                 <Form 
                                                          {...layout}
                                                          form={form}
                                                          name="basic"
                                                          initialValues={{ remember: true }}
                                                          onFinish={onFinish}
                                                        //   onFinishFailed={onFinishFailed}
                                                 >
                                                        <div className="d-flex">
                                                            <Form.Item
                                                                name="type"
                                                                rules={[{required: true, message : 'نوع حراج تعیین نشده!'}]}
                                                                >
                                                                <Select defaultValue="نوع حراج" style={{ width: 200 }} onChange={handleChange}>
                                                                    <Option value="LIVE">LIVE</Option>
                                                                    <Option value="ONLINE">ONLINE</Option>
                                                                    <Option value="PERIODIC">PERIODIC</Option>
                                                                    <Option value="HIDDEN">HIDDEN</Option>
                                                                    <Option value="SECOND_HIDDEN">SECOND_HIDDEN</Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </div>

                                                        <div className="d-block d-lg-flex mt-4 align-items-start">
                                                            <div className="col col-lg-3">
                                                                <div className="d-flex mb-2 mb-lg-0">
                                                                عنوان حراج فارسی    
                                                                </div>
                                                            </div>
                                                            <div className="col col-lg-6">
                                                                <Form.Item
                                                                        className="w-100  h-100"
                                                                        name="title_persion"
                                                                        rules={[
                                                                            { 
                                                                                required: true, message: 'ورودی عنوان فارسی خالی است!' 
                                                                            },
                                                                            
                                                                            {
                                                                                // pattern: /~[a-zA-Z0-9]/g,
                                                                                pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                                                message: "کاراکتر انگلیسی مجاز نیست!",
                                                                            }

                                                                    ]}
                                                                    >
                                                                    <Input 
                                                                        // defaultValue = {member?.first_name}
                                                                        size="large"
                                                                    />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="col col-lg-3"></div>
                                                        </div>

                                                        <div className="d-block d-lg-flex ">
                                                            <div className="col col-lg-3">
                                                                <div className="d-flex mb-2 mb-lg-0">
                                                                    عنوان حراج انگلیسی    
                                                                </div>
                                                            </div>
                                                            <div className="col col-lg-6">
                                                                <Form.Item
                                                                        className="w-100  h-100"
                                                                        name="title_english"
                                                                        rules={[
                                                                            { 
                                                                                required: true, message: 'ورودی عنوان انگلیسی خالی است!' 
                                                                            },
                                                                            {
                                                                                pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                                                message: "کاراکتر فارسی مجاز نیست!",
                                                                            }
                                                                        ]}
                                                                    >
                                                                    <Input 
                                                                        // defaultValue = {member?.first_name}
                                                                        size="large"
                                                                    />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="col col-lg-3"></div>
                                                        </div>



                                                        <div className="d-block d-lg-flex ">
                                                            <div className="col col-lg-3">
                                                                <div className="d-flex mb-2 mb-lg-0">
                                                                    تاریخ نمایش در سایت    
                                                                </div>
                                                            </div>
                                                            <div className="d-block d-md-flex justify-content-start mb-4 px-3">
                                                                <div className="d-flex align-items-center">
                                                                    <p className="mb-0 ml-4 text-right">شروع</p>
                                                                    <DatePicker
                                                                        className="date-field-show-box ml-4"
                                                                        isGregorian={false}
                                                                        timePicker={false}
                                                                        // onChange={valueFrom  => onChangeFrom(valueFrom)}
                                                                        // value={dateFrom}
                                                                    />

                                                                </div>
                                                                <div className="d-flex mt-2 mt-md-0">
                                                                    <p className="mb-0 mr-3 ml-2 mx-sm-2 pt-1 text-right">پایان</p>
                                                                    <DatePicker
                                                                        className="date-field-show-box"
                                                                        isGregorian={false}
                                                                        timePicker={false}
                                                                        // onChange={valueTo => onChangeTo(valueTo)}
                                                                        // value={dateTo}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="d-block d-lg-flex ">
                                                            <div className="col col-lg-3">
                                                                <div className="d-flex mb-2 mb-lg-0">
                                                                    تاریخ نمایش حضوری     
                                                                </div>
                                                            </div>
                                                            <div className="d-block d-md-flex justify-content-start mb-4 px-3">
                                                                <div className="d-flex align-items-center">
                                                                    <p className="mb-0 ml-4 text-right">شروع</p>
                                                                    <DatePicker
                                                                        className="date-field-show-box ml-4"
                                                                        isGregorian={false}
                                                                        timePicker={false}
                                                                        // onChange={valueFrom  => onChangeFrom(valueFrom)}
                                                                        // value={dateFrom}
                                                                    />

                                                                </div>
                                                                <div className="d-flex mt-2 mt-md-0">
                                                                    <p className="mb-0 mr-3 ml-2 mx-sm-2 pt-1 text-right">پایان</p>
                                                                    <DatePicker
                                                                        className="date-field-show-box"
                                                                        isGregorian={false}
                                                                        timePicker={false}
                                                                        // onChange={valueTo => onChangeTo(valueTo)}
                                                                        // value={dateTo}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                               
                                                        
                                                    {/* 
                                                       <div className="d-block d-lg-flex">
                                                           <div className="col col-lg-3">
                                                               <div className="d-flex mb-2 mb-lg-0">
                                                                 تاریخ نمایش در سایت  
                                                               </div>
                                                           </div>
                                                            <div className="col col-lg-6">
                                                                <Form.Item name="range-time-picker_insite"  {...rangeConfig}>
                                                                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="col col-lg-3"></div>
                                                       </div>

                                                       <div className="d-block d-lg-flex">
                                                           <div className="col col-lg-3">
                                                               <div className="d-flex mb-2 mb-lg-0">
                                                                 تاریخ نمایش حضوری   
                                                               </div>
                                                           </div>
                                                            <div className="col col-lg-6">
                                                                <Form.Item name="range-time-picker"  {...rangeConfig}>
                                                                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="col col-lg-3"></div>
                                                       </div> */}
                                                       <div className="d-block d-lg-flex ">
                                                            <div className="col col-lg-3">
                                                                <div className="d-flex mb-2 mb-lg-0">
                                                                    آدرس    
                                                                </div>
                                                            </div>
                                                            <div className="col col-lg-6">
                                                                <Form.Item
                                                                        className="w-100  h-100"
                                                                        name="address"
                                                                        rules={[{ required: true, message: 'ورودی آدرس خالی است!' }]}
                                                                    >
                                                                    <Input 
                                                                        // defaultValue = {member?.first_name}
                                                                        size="large"
                                                                    />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="col col-lg-3"></div>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-4">
                                                            <span className="bullet ml-2"></span>
                                                            <p className="mb-0">حراج خصوصی</p>
                                                            {/* <Form.Item  
                                                                name="private_auction" 
                                                                valuePropName="checked" 
                                                                rules={[{ required: false, message: 'ورودی آدرس خالی است!' }]}>
                                                                <Checkbox>حراج خصوصی</Checkbox>
                                                            </Form.Item> */}
                                                        </div>

                                                        <div ref={refArray[1]}></div>
                                                        <div   className="d-flex border-bottom mb-3">
                                                            <h4>تاریخ برگزاری حراج</h4>
                                                        </div>

                                                        <div className="d-block d-xl-flex justify-content-start">







                                                        <div className="d-block w-100">
    
                                                            
                                                            <Form.List
                                                                name="names"
                                                                rules={[
                                                                {
                                                                    validator: async (_, names) => {
                                                                    if (!names || names.length < 2) {
                                                                        return Promise.reject(new Error(' '));
                                                                    }
                                                                    },
                                                                },
                                                                ]}
                                                                >

                                                                {(fields, { add, remove }, { errors }) => (
                                                                    <>
                                                                    {fields.map((field, index) => (
                                                                        <Form.Item
                                                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                                            required={false}
                                                                            key={field.key}
                                                                            >


                                                                <div className="d-block d-xl-flex">
                                                                <div style={{minWidth : '200px'}} className="col ">
                                                                    <p className="mb-0 text-right mb-2 mb-xl-0">تاریخ و زمان اولین روز برگزاری</p>
                                                                </div>
                                                                    <div className="col ">
                                                                        <div className="d-flex">
                                                                            <Form.Item 
                                                                                // name="start_time"  
                                                                                {...config}
                                                                                // maxLength={16}
                                                                                // showCount={16}
                                                                                {...field}
                                                                                name={[field.name, 'start_time']}
                                                                                fieldKey={[field.fieldKey, 'start_time']}
                                                                                >
                                                                                <DatePicker 
                                                                                    className="date-field-firstDay-holding-box" 
                                                                                    isGregorian={false} 
                                                                                    showTime 
                                                                                    format='jYYYY-jMM-jDD HH:mm:ss' 
                                                                                    onChange={valueTo => onChangeTo(valueTo)}
                                                                                />
                                                                            </Form.Item>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <div className="d-block d-lg-flex justify-content-start">
                                                                            <p style={{minWidth : '100px'}} className="mb-2 mb-xl-0 ml-2 text-right">شماره لت از</p> 
                                                                                <Form.Item
                                                                                    {...formItemLayout}
                                                                                    className="text-center"
                                                                                    {...field}
                                                                                    name={[field.name, 'num1']}
                                                                                    fieldKey={[field.fieldKey, 'num1']}
                                                                                    validateStatus={number.validateStatus}
                                                                                    help={number.errorMsg}
                                                                                >
                                                                                    <InputNumber 
                                                                                
                                                                                    value={number.value} 
                                                                                    />
                                                                                </Form.Item>
                                                                                <p className="mx-lg-3 mb-2 mb-xl-0 text-right">تا</p> 
                                                                                <Form.Item
                                                                                    {...formItemLayout}
                                                                                    className="text-right"
                                                                                    {...field}
                                                                                    name={[field.name, 'num2']}
                                                                                    fieldKey={[field.fieldKey, 'num2']}
                                                                                    validateStatus={number.validateStatus}
                                                                                    help={number.errorMsg}
                                                                                >
                                                                                    <InputNumber 
                                                                                
                                                                                    value={number.value} onChange={onNumberChange} />
                                                                                </Form.Item>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                            {/* <Form.Item
                                                                                {...field}
                                                                                validateTrigger={['onChange', 'onBlur']}
                                                                                rules={[
                                                                                    {
                                                                                    required: true,
                                                                                    whitespace: true,
                                                                                    message: "Please input passenger's name or delete this field.",
                                                                                    },
                                                                                ]}
                                                                                noStyle
                                                                                >
                                                                                <Input placeholder="passenger name" style={{ width: '60%' }} />
                                                                            </Form.Item> */}
                                                                                {fields.length >= 1 ? (
                                                                                    
                                                                                // <MinusCircleOutlined
                                                                                <BsFillTrashFill

                                                                                    className="dynamic-delete-button"
                                                                                    onClick={() => remove(field.name)}

                                                                                />
                                                                                ) : null}
                                                                        </Form.Item>
                                                                        ))}
                                                                        <Form.Item>
                                                                            <Button
                                                                                type="dashed"
                                                                                onClick={() => add()}
                                                                                style={{ width: '100%'}}
                                                                                // icon={<PlusOutlined />}
                                                                            >
                                                                                اضافه کردن تاریخ 
                                                                            </Button>
                                                                            {/* <Button
                                                                                type="dashed"
                                                                                onClick={() => {
                                                                                add('The head item', 0);
                                                                                }}
                                                                                style={{ width: '60%', marginTop: '20px' }}
                                                                                icon={<PlusOutlined />}
                                                                            >
                                                                                Add field at head
                                                                            </Button> */}
                                                                            <Form.ErrorList errors={errors} />
                                                                        </Form.Item>
                                                                </>
                                                                )}
                                                            </Form.List>
                                                        </div>







                                                            {/* <div className="col">
                                                                <div className="d-flex">
                                                                    <Form.Item name="start_time"  {...config}>
                                                                        <DatePicker className="date-field-firstDay-holding-box" isGregorian={false} showTime format='jYYYY-jMM-jDD HH:mm:ss' 
                                                                            onChange={valueTo => onChangeTo(momentJalaali(valueTo.format('jYYYY-jMM-jDD HH:mm:ss')))}
                                                                        />
                                                                    </Form.Item>
                                                                </div>
                                                            </div>
                                                            <div className="col px-0">
                                                                <div className="d-flex align-items-start">
                                                                    <p className="mb-0 ml-2">شماره لت از</p> 
                                                                        <Form.Item
                                                                            {...formItemLayout}
                                                                            name = "num1"
                                                                            validateStatus={number.validateStatus}
                                                                            help={number.errorMsg}
                                                                        >
                                                                            <InputNumber 
                                                                            min={8} 
                                                                            max={12} 
                                                                            value={number.value} 
                                                                            onChange={onNumberChange} 
                                                                            />
                                                                        </Form.Item>
                                                                        <p className="mx-3 mb-0">تا</p> 
                                                                        <Form.Item
                                                                            {...formItemLayout}
                                                                            
                                                                            validateStatus={number.validateStatus}
                                                                            help={number.errorMsg}
                                                                        >
                                                                            <InputNumber 
                                                                            min={8} 
                                                                            max={12} 
                                                                            value={number.value} onChange={onNumberChange} />
                                                                        </Form.Item>
                                                                </div>

                                                                
                                                            </div> */}

                                                        </div>
                                                        <div ref={refArray[2]}></div>
                                                        <div  className="d-flex border-bottom mb-3">
                                                            <h4>بازه میان بید‌ها</h4>
                                                        </div>

                                                        <div className="d-flex">

                                                            <Form.Item
                                                                    name="body"
                                                                    rules={[{
                                                                    required: true,
                                                                    message: 'واحد پولی تعیین نشده!'
                                                                    }
                                                                ]}>
                                                                <Select defaultValue="واحد پولی" style={{ width: 200 }} onChange={handleChange}>
                                                                    <Option value="LIVE">LIVE</Option>
                                                                    <Option value="ONLINE">ONLINE</Option>
                                                                    <Option value="PERIODIC">PERIODIC</Option>
                                                                    <Option value="HIDDEN">HIDDEN</Option>
                                                                    <Option value="SECOND_HIDDEN">SECOND_HIDDEN</Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </div>





                                                        <Form.List
                                                                name="names2"
                                                                rules={[
                                                                {
                                                                    validator: async (_, names) => {
                                                                    if (!names || names.length < 2) {
                                                                        return Promise.reject(new Error(' '));
                                                                    }
                                                                    },
                                                                },
                                                                ]}
                                                                >

                                                                {(fields, { add, remove }, { errors }) => (
                                                                    <>
                                                                    {fields.map((field, index) => (
                                                                        <Form.Item
                                                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                                            required={false}
                                                                            key={field.key}
                                                                            >


                                                    <div className="d-block d-xl-flex">
                                             
                                                            <div className="col px-0">
                                                                <div className="d-block d-lg-flex align-items-start">
                                                                    <p style={{minWidth : '80px'}} className="mb-0 ml-2 text-right"> مبلغ خرید از</p> 
                                                                        <Form.Item
                                                                            {...formItemLayout}
                                                                            className="text-right"
                                                                            name={[field.name, 'num133']}
                                                                            fieldKey={[field.fieldKey, 'num133']}
                                                                            validateStatus={number.validateStatus}
                                                                            help={number.errorMsg}
                                                                        >
                                                                            <InputNumber 
                                                                            // min={8} 
                                                                            // max={12} 
                                                                            
                                                                            style={{width : '150px'}}
                                                                            value={number.value} 
                                                                            onChange={onNumberChange} 
                                                                            />
                                                                        </Form.Item>
                                                                        <p className="mx-3 mb-0 text-right">تا</p> 
                                                                        <Form.Item
                                                                            className="text-right"
                                                                            {...formItemLayout}
                                                                            name={[field.name, 'num166']}
                                                                            fieldKey={[field.fieldKey, 'num166']}
                                                                            validateStatus={number.validateStatus}
                                                                            help={number.errorMsg}
                                                                        >
                                                                            <InputNumber 
                                                                            // min={8} 
                                                                            // max={12} 
                                                                            style={{width : '150px'}}
                                                                            
                                                                            value={number.value} 
                                                                            onChange={onNumberChange} />
                                                                        </Form.Item>
                                                                        
                                                                        <p style={{minWidth : '80px'}} className="mx-3 mb-0 text-right">شارژ مورد نیاز</p> 
                                                                        <Form.Item
                                                                            {...formItemLayout}
                                                                            className="text-right"
                                                                            name={[field.name, 'num122']}
                                                                            fieldKey={[field.fieldKey, 'num122']}
                                                                            validateStatus={number.validateStatus}
                                                                            help={number.errorMsg}
                                                                        >
                                                                            <InputNumber 
                                                                            // min={8} 
                                                                            // max={12} 
                                                                            style={{width : '150px'}}
                                                                            value={number.value} onChange={onNumberChange} />
                                                                        </Form.Item>
                                                                </div>

                                                                
                                                            </div>
                                                    </div>

                                                                       
                                                                                {fields.length >= 1 ? (
                                                                                    
                                                                                // <MinusCircleOutlined
                                                                                <BsFillTrashFill

                                                                                    className="dynamic-delete-button"
                                                                                    onClick={() => remove(field.name)}

                                                                                />
                                                                                ) : null}
                                                                        </Form.Item>
                                                                        ))}
                                                                        <Form.Item>
                                                                            <Button
                                                                                type="dashed"
                                                                                onClick={() => add()}
                                                                                style={{ width: '100%'}}
                                                                                // icon={<PlusOutlined />}
                                                                            >
                                                                                اضافه کردن شارژ 
                                                                            </Button>
                                                                            {/* <Button
                                                                                type="dashed"
                                                                                onClick={() => {
                                                                                add('The head item', 0);
                                                                                }}
                                                                                style={{ width: '60%', marginTop: '20px' }}
                                                                                icon={<PlusOutlined />}
                                                                            >
                                                                                Add field at head
                                                                            </Button> */}
                                                                            <Form.ErrorList errors={errors} />
                                                                        </Form.Item>
                                                                </>
                                                                )}
                                                            </Form.List>


















                                                        {/* <div className="d-flex align-items-start mt-3">
                                                                    <p className="mb-0 ml-2">از</p> 
                                                                        <Form.Item
                                                                            {...formItemLayout}
                                                                            name="num5"
                                                                            validateStatus={number.validateStatus}
                                                                            help={number.errorMsg}
                                                                        >
                                                                            <InputNumber 
                                                                            // min={8} 
                                                                            // max={12} 
                                                                            value={number.value} onChange={onNumberChange} />
                                                                        </Form.Item>
                                                                        <p className="mx-3 mb-0">تا</p> 
                                                                        <Form.Item
                                                                            {...formItemLayout}
                                                                            name="num6"
                                                                            validateStatus={number.validateStatus}
                                                                            help={number.errorMsg}
                                                                        >
                                                                            <InputNumber 
                                                                            // min={8} 
                                                                            // max={12} 
                                                                            value={number.value} onChange={onNumberChange} />
                                                                        </Form.Item>
                                                                </div> */}



                                                                {/* <div className="d-none">
                                                                            <p className="mx-3 mb-0">مبلغ خرید از</p>
                                                                            <Form.Item
                                                                                {...formItemLayout}
                                                                                name="num7"
                                                                                validateStatus={number.validateStatus}
                                                                                help={number.errorMsg}
                                                                            >
                                                                                <InputNumber 
                                                                                // min={8} 
                                                                                // max={12} 
                                                                                value={number.value} onChange={onNumberChange} />
                                                                            </Form.Item>
                                                                            <p className="mx-3 mb-0">تا</p> 
                                                                            <Form.Item
                                                                                {...formItemLayout}
                                                                                name="num8"
                                                                                validateStatus={number.validateStatus}
                                                                                help={number.errorMsg}
                                                                            >
                                                                                <InputNumber 
                                                                                // min={8} 
                                                                                // max={12} 
                                                                                value={number.value} onChange={onNumberChange} />
                                                                            </Form.Item> 
                                                                            <p className="mx-3 mb-0">شارژ مورد نیاز</p> 
                                                                                <Form.Item
                                                                                    {...formItemLayout}
                                                                                    name="num9"
                                                                                    validateStatus={number.validateStatus}
                                                                                    help={number.errorMsg}
                                                                                >
                                                                                    <InputNumber 
                                                                                    // min={8} 
                                                                                    // max={12} 
                                                                                    value={number.value} onChange={onNumberChange} />
                                                                            </Form.Item>       
                                                                    </div>   */}

                                                                    <div className="d-flex align-items-center mb-4">
                                                                        <span className="bullet ml-2"></span>
                                                                        <p className="mb-0"> تبدیل نرخ ارز</p>
                                                                    {/* <Form.Item  
                                                                        name="private_auction" 
                                                                        valuePropName="checked" 
                                                                        rules={[{ required: false, message: 'ورودی آدرس خالی است!' }]}>
                                                                        <Checkbox>تبدیل نرخ ارز </Checkbox>
                                                                    </Form.Item> */}
                                                                </div>

                                                                <div className="d-flex">
                                                                    <div className="col px-0">
                                                                        <div className="d-flex">
                                                                            <p>تبدیل نرخ تومان به دلار</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div className="d-flex">
                                                                            <Form.Item
                                                                                {...formItemLayout}
                                                                                name="num10"   
                                                                                validateStatus={number.validateStatus}
                                                                                help={number.errorMsg}
                                                                            >
                                                                            <InputNumber 
                                                                                // min={8} 
                                                                                // max={12} 
                                                                                style={{width : '200px'}}
                                                                                value={number.value} onChange={onNumberChange} />
                                                                        </Form.Item>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div ref={refArray[3]}></div>
                                                                <div  className="d-flex border-bottom mb-3">
                                                                    <h4>اعتبارسنجی</h4>
                                                                </div>

                                                                <div className="d-flex align-items-center mb-4">
                                                                    <span className="bullet ml-2"></span>
                                                                    <p className="mb-0"> تبدیل آرتیبیشن</p>
                                                                        {/* <Form.Item  
                                                                            name="private_auction" 
                                                                            valuePropName="checked" 
                                                                            rules={[{ required: false, message: 'ورودی آدرس خالی است!' }]}>
                                                                            <Checkbox>تبدیل آرتیبیشن</Checkbox>
                                                                        </Form.Item> */}
                                                                    </div>

                                                                    <div className="d-flex align-items-center mb-4">
                                                                        <span className="bullet ml-2"></span>
                                                                        <p className="mb-0">شارژ مورد نیاز کیف پول</p>
                                                                        {/* <Form.Item  
                                                                            name="private_auction" 
                                                                            valuePropName="checked" 
                                                                            rules={[{ required: false, message: 'ورودی آدرس خالی است!' }]}>
                                                                            <Checkbox>شارژ مورد نیاز کیف پول</Checkbox>
                                                                        </Form.Item> */}
                                                                    </div>



                                                                        <div className="d-none">
                                                                            <p className="mx-3 mb-0">مبلغ خرید از</p>
                                                                            <Form.Item
                                                                                {...formItemLayout}
                                                                                name="num12"
                                                                                validateStatus={number.validateStatus}
                                                                                help={number.errorMsg}
                                                                            >
                                                                                <InputNumber 
                                                                                // min={8} 
                                                                                // max={12} 
                                                                                value={number.value} onChange={onNumberChange} />
                                                                            </Form.Item>
                                                                            <p className="mx-3 mb-0">تا</p> 
                                                                            <Form.Item
                                                                                {...formItemLayout}
                                                                                name="num13"
                                                                                validateStatus={number.validateStatus}
                                                                                help={number.errorMsg}
                                                                            >
                                                                                <InputNumber 
                                                                                // min={8} 
                                                                                // max={12} 
                                                                                value={number.value} onChange={onNumberChange} />
                                                                            </Form.Item> 
                                                                            <p className="mx-3 mb-0">شارژ مورد نیاز</p> 
                                                                                <Form.Item
                                                                                    {...formItemLayout}
                                                                                    name="num14"
                                                                                    validateStatus={number.validateStatus}
                                                                                    help={number.errorMsg}
                                                                                >
                                                                                    <InputNumber 
                                                                                    // min={8} 
                                                                                    // max={12} 
                                                                                    value={number.value} onChange={onNumberChange} />
                                                                            </Form.Item>       
                                                                    </div>     

                                                                    <div className="d-flex">
                                                                        {/* <Upload {...propsFile}>
                                                                            <Button icon={<UploadOutlined />}>بارگزاری لیست دعوت شدگان</Button>
                                                                        </Upload>  */}


                                                                              <Form.Item
                                                                                    name="upload"
                                                                                    // label="Upload"
                                                                                    valuePropName="fileList"
                                                                                    getValueFromEvent={normFile}
                                                                                    // extra="longgggggggggggggggggggggggggggggggggg"
                                                                                >
                                                                                    <Upload name="logo" action="/upload.do" listType="picture">
                                                                                    <Button icon={<UploadOutlined />}>بارگزاری لیست دعوت شدگان</Button>
                                                                                    </Upload>
                                                                                </Form.Item>   
                                                                    </div>    

                                                                    <div className="d-block d-lg-flex">
                                                                        <div className="col col-lg-3">
                                                                            <div className="d-flex">
                                                                                <p className="mb-2 mb-lg-2">سایر مدارک مورد نیاز</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Form.Item
                                                                                name="body"
                                                                                rules={[{
                                                                                required: false,
                                                                                message: 'فیلد سایر مدارک خالی است!'
                                                                                }
                                                                                ]}>
                                                                                <Input.TextArea className="text-box-aria-add-auction" rows={10}/>
                                                                            </Form.Item>
                                                                        </div>
                                                                        <div className="col-3"></div>
                                                                    </div>   

                                                                    <div ref={refArray[4]} className="d-flex border-bottom mb-3">
                                                                        <h4>قوانین حراج</h4>
                                                                    </div>   

                                                                    <div className="d-flex align-items-center mb-4">
                                                                        <span className="bullet ml-2"></span>
                                                                        <p className="mb-0">پرداخت آنلاین دارد</p>
                                                                        {/* <Form.Item  
                                                                            name="private_auction" 
                                                                            valuePropName="checked" 
                                                                            rules={[{ required: false, message: 'ورودی آدرس خالی است!' }]}>
                                                                            <Checkbox>پرداخت آنلاین دارد </Checkbox>
                                                                        </Form.Item> */}
                                                                    </div>


                                                                    <div className="d-block d-lg-flex">
                                                                        <div className="col col-lg-3">
                                                                            <div className="d-flex">
                                                                                <p className="mb-2 mb-lg-2">شرایک پرداخت</p> 
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Form.Item
                                                                                name="payment"
                                                                                rules={[{
                                                                                required: true,
                                                                                message: 'فیلد شرایک پرداخت خالی است!'
                                                                                }
                                                                                ]}>
                                                                                <Input.TextArea className="text-box-aria-add-auction" rows={10}/>
                                                                            </Form.Item>
                                                                        </div>
                                                                        <div className="col-3"></div>
                                                                    </div>   


                                                                    <div className="d-block d-lg-flex">
                                                                        <div className="col col-lg-3">
                                                                            <div className="d-flex">
                                                                                <p className="mb-2 mb-lg-2">شرایک مرجوعی</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Form.Item
                                                                                name="marjuee"
                                                                                rules={[{
                                                                                required: true,
                                                                                message: 'فیلد شرایط مرجوعی خالی است!'
                                                                                }
                                                                                ]}>
                                                                                <Input.TextArea className="text-box-aria-add-auction" rows={10}/>
                                                                            </Form.Item>
                                                                        </div>
                                                                        <div className="col-3"></div>
                                                                    </div>   


                                                                    <div className="d-block d-lg-flex">
                                                                        <div className="col col-lg-3">
                                                                            <div className="d-flex">
                                                                                <p className="mb-2 mb-lg-2">حمل و نقل</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Form.Item
                                                                                name="transfer"
                                                                                rules={[{
                                                                                required: true,
                                                                                message: 'فیلد حمل و نقل خالی است!'
                                                                                }
                                                                                ]}>
                                                                                <Input.TextArea  className="text-box-aria-add-auction" rows={10}/>
                                                                            </Form.Item>
                                                                        </div>
                                                                        <div className="col-3"></div>
                                                                    </div>


                                                                    <div className="d-flex justify-content-end">
                                                                        <button className="btn-submit-auction" htmlType="submit">ثبت حراجی</button>
                                                                    </div>
                                                                </Form>

                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </React.Fragment>
    )
}

export default AddNewAuctionPage;
