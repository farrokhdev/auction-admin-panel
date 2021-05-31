import React , {useState , useEffect , useRef } from 'react';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils/index';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber , Breadcrumb , Select , DatePicker , Checkbox , Upload , Button , message} from 'antd';
import {NavLink} from 'react-router-dom';
import Loading from '../../components/Loading';

const scrollToRef = (ref) => window.scrollTo(20, ref.current.offsetTop)

function AddNewAuctionPage(props) {

    const myRef1 = useRef(null)
    const myRef2 = useRef(null)
    const myRef3 = useRef(null)
    const myRef4 = useRef(null)
    const refArray = [myRef1, myRef2, myRef3, myRef4]
    const executeScroll = (e) => scrollToRef(e)

    const { Option } = Select;
    const { RangePicker } = DatePicker;



      function handleChange(value) {
        console.log(`selected ${value}`);
      }

      const rangeConfig = {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'Please select time!',
          },
        ],
      };

      const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'Please select time!',
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
        if (number === 11) {
          return {
            validateStatus: 'success',
            errorMsg: null,
          };
        }
      
        return {
          validateStatus: 'error',
          errorMsg: 'The prime between 8 and 12 is 11!',
        };
      }

      const [number, setNumber] = useState({
        value: 11,
      });
      
      const onNumberChange = (value) => {
        setNumber({ ...validatePrimeNumber(value), value });
      };


      const propsFile = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };


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
                                                       حراج‌ها
                                                    </NavLink>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mx-0">
                                    <div className="col content-page p-4  ">

                                        <div className="d-block d-xl-flex my-4 justify-content-start tabs-link-add-auction">

                                            <div className="col px-0">
                                                <div onClick={() => executeScroll(refArray[0])} className="d-flex justify-content-start text-center">
                                                    <p className="mb-0">اطلاعات عمومی</p>
                                                </div>
                                            </div>
                                            <div className="col px-0">
                                                <div onClick={() => executeScroll(refArray[1])} className="d-flex justify-content-start text-center">
                                                    <p className="mb-0">تاریخ برگزاری حراج</p>  
                                                </div>
                                            </div>
                                            <div className="col px-0">
                                                <div onClick={() => executeScroll(refArray[2])} className="d-flex justify-content-start text-center">
                                                    <p className="mb-0">بازه بید‌ها</p>    
                                                </div>
                                            </div>
                                            <div className="col px-0">
                                                <div onClick={() => executeScroll(refArray[3])} className="d-flex justify-content-start text-center">
                                                    <p className="mb-0">ارزیابی شرکت کنندگان</p>      
                                                </div>
                                            </div>
                                            <div className="col px-0">
                                                <div onClick={() => executeScroll(refArray[4])} className="d-flex justify-content-start text-center">
                                                    <p className="mb-0">قوانین</p>  
                                                </div>
                                            </div>
                                            
                                        </div>
                                            <div ref={refArray[0]}></div>
                                                 <Form>
                               
                                                        <div className="d-flex">
                                                            <Select defaultValue="نوع حراج" style={{ width: 200 }} onChange={handleChange}>
                                                                <Option value="LIVE">LIVE</Option>
                                                                <Option value="ONLINE">ONLINE</Option>
                                                                <Option value="PERIODIC">PERIODIC</Option>
                                                                <Option value="HIDDEN">HIDDEN</Option>
                                                                <Option value="SECOND_HIDDEN">SECOND_HIDDEN</Option>
                                                            </Select>
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
                                                                        rules={[{ required: true, message: 'ورودی عنوان فارسی خالی است!' }]}
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
                                                                        rules={[{ required: true, message: 'ورودی عنوان انگلیسی خالی است!' }]}
                                                                    >
                                                                    <Input 
                                                                        // defaultValue = {member?.first_name}
                                                                        size="large"
                                                                    />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="col col-lg-3"></div>
                                                        </div>

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
                                                       </div>
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
                                                        <div className="d-flex">
                                                            <Form.Item  
                                                                name="private_auction" 
                                                                valuePropName="checked" 
                                                                rules={[{ required: true, message: 'ورودی آدرس خالی است!' }]}>
                                                                <Checkbox>حراج خصوصی</Checkbox>
                                                            </Form.Item>
                                                        </div>

                                                        <div ref={refArray[1]}></div>
                                                        <div   className="d-flex border-bottom mb-3">
                                                            <h4>تاریخ برگزاری حراج</h4>
                                                        </div>

                                                        <div className="d-block d-xl-flex justify-content-start">

                                                            <div className="col col-lg-3">
                                                                <p className="mb-0 text-right mb-2 mb-lg-0">تاریخ و زمان اولین روز برگزاری</p>
                                                            </div>
                                                            <div className="col">
                                                                <div className="d-flex">
                                                                    <Form.Item name="date-time-picker"  {...config}>
                                                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                                                    </Form.Item>
                                                                </div>
                                                            </div>
                                                            <div className="col px-0">
                                                                <div className="d-flex align-items-start">
                                                                    <p className="mb-0 ml-2">شماره لت از</p> 
                                                                        <Form.Item
                                                                            {...formItemLayout}
                                                                            
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
                                                                            
                                                                            validateStatus={number.validateStatus}
                                                                            help={number.errorMsg}
                                                                        >
                                                                            <InputNumber 
                                                                            // min={8} 
                                                                            // max={12} 
                                                                            value={number.value} onChange={onNumberChange} />
                                                                        </Form.Item>
                                                                </div>

                                                                
                                                            </div>

                                                        </div>
                                                        <div ref={refArray[2]}></div>
                                                        <div  className="d-flex border-bottom mb-3">
                                                            <h4>بازه میان بید‌ها</h4>
                                                        </div>

                                                        <div className="d-flex">
                                                            <Select defaultValue="واحد پولی" style={{ width: 200 }} onChange={handleChange}>
                                                                <Option value="LIVE">LIVE</Option>
                                                                <Option value="ONLINE">ONLINE</Option>
                                                                <Option value="PERIODIC">PERIODIC</Option>
                                                                <Option value="HIDDEN">HIDDEN</Option>
                                                                <Option value="SECOND_HIDDEN">SECOND_HIDDEN</Option>
                                                            </Select>
                                                        </div>

                                                        <div className="d-flex align-items-start mt-3">
                                                                    <p className="mb-0 ml-2">از</p> 
                                                                        <Form.Item
                                                                            {...formItemLayout}
                                                                            
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
                                                                    <Form.Item  
                                                                        name="private_auction" 
                                                                        valuePropName="checked" 
                                                                        rules={[{ required: true, message: 'ورودی آدرس خالی است!' }]}>
                                                                        <Checkbox>تبدیل نرخ ارز </Checkbox>
                                                                    </Form.Item>
                                                                </div>

                                                                <div className="d-flex">
                                                                    <div className="col">
                                                                        <div className="d-flex">
                                                                            <p>تبدیل نرخ تومان به دلار</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div className="d-flex">
                                                                            <Form.Item
                                                                                {...formItemLayout}
                                                                                        
                                                                                validateStatus={number.validateStatus}
                                                                                help={number.errorMsg}
                                                                            >
                                                                            <InputNumber 
                                                                                // min={8} 
                                                                                // max={12} 
                                                                                value={number.value} onChange={onNumberChange} />
                                                                        </Form.Item>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div ref={refArray[1]}></div>
                                                                <div  className="d-flex border-bottom mb-3">
                                                                    <h4>اعتبارسنجی</h4>
                                                                </div>

                                                                    <div className="d-flex">
                                                                        <Form.Item  
                                                                            name="private_auction" 
                                                                            valuePropName="checked" 
                                                                            rules={[{ required: true, message: 'ورودی آدرس خالی است!' }]}>
                                                                            <Checkbox>تبدیل آرتیبیشن</Checkbox>
                                                                        </Form.Item>
                                                                    </div>

                                                                    <div className="d-flex">
                                                                        <Form.Item  
                                                                            name="private_auction" 
                                                                            valuePropName="checked" 
                                                                            rules={[{ required: true, message: 'ورودی آدرس خالی است!' }]}>
                                                                            <Checkbox>شارژ مورد نیاز کیف پول</Checkbox>
                                                                        </Form.Item>
                                                                    </div>



                                                                        <div className="d-flex">
                                                                            <p className="mx-3 mb-0">مبلغ خرید از</p>
                                                                            <Form.Item
                                                                                {...formItemLayout}
                                                                                
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
                                                                        <Upload {...propsFile}>
                                                                            <Button icon={<UploadOutlined />}>بارگزاری لیست دعوت شدگان</Button>
                                                                        </Upload>    
                                                                    </div>    

                                                                    <div className="d-block d-lg-flex">
                                                                        <div className="col col-lg-3">
                                                                            <div className="d-flex">
                                                                                <p className="mb-2 mb-lg-2">سایر مدارک مورد نیاز</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Form.Item
                                                                                name={['body']}
                                                                                rules={[{
                                                                                required: true,
                                                                                message: 'تیکتی وارد نکرده‌اید!'
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

                                                                    <div className="d-flex">
                                                                        <Form.Item  
                                                                            name="private_auction" 
                                                                            valuePropName="checked" 
                                                                            rules={[{ required: true, message: 'ورودی آدرس خالی است!' }]}>
                                                                            <Checkbox>پرداخت آنلاین دارد </Checkbox>
                                                                        </Form.Item>
                                                                    </div>


                                                                    <div className="d-block d-lg-flex">
                                                                        <div className="col col-lg-3">
                                                                            <div className="d-flex">
                                                                                <p className="mb-2 mb-lg-2">شرایک پرداخت</p> 
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <Form.Item
                                                                                name={['body']}
                                                                                rules={[{
                                                                                required: true,
                                                                                message: 'تیکتی وارد نکرده‌اید!'
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
                                                                                name={['body']}
                                                                                rules={[{
                                                                                required: true,
                                                                                message: 'تیکتی وارد نکرده‌اید!'
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
                                                                                name={['body']}
                                                                                rules={[{
                                                                                required: true,
                                                                                message: 'تیکتی وارد نکرده‌اید!'
                                                                                }
                                                                                ]}>
                                                                                <Input.TextArea  className="text-box-aria-add-auction" rows={10}/>
                                                                            </Form.Item>
                                                                        </div>
                                                                        <div className="col-3"></div>
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
