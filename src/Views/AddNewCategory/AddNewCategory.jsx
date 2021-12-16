import React , {useState , useEffect} from 'react'
import {Breadcrumb , Form , Input , Select , Space , Button} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import { successNotification , failNotification } from '../../utils/notification';

const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const { Option } = Select;

function AddNewCategory(props) {

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState()

    useEffect(() => {
        getCategories()
    }, [])

    // get list of category with childrens(sub_categories) 
    const getCategories = () => {
        axios.get(`${BASE_URL}/sale/category/`).then(res => {
            setCategoryList(res.data.data.result)
        }).catch(err => {
            console.log(err);
        })
    }

    const onFinish = (values) => {
        console.log(values);

        // set values of multi input sub_categories entered, and create array list of that for send to backend
        let list_sub_categories = values.sub_categories?.map(item => item.sub_categories)
        let list_sub_categories_en = values.sub_categories_en?.map(item => item.sub_categories_en)

        console.log("list_sub_categories  , list_sub_categories_en " , list_sub_categories.length , list_sub_categories_en.length);

        if(list_sub_categories?.length !== list_sub_categories_en?.length){
            form.setFields([
                {
                    name: 'category_title',
                    errors: ['زیر دسته‌بندی‌های فارسی و انگلیسی باید متناظر هم باشند!']
                }
            ])
        }else{
            let payload = {
                "sub_categories": list_sub_categories,
                "sub_categories_en": list_sub_categories_en
            }
    
            // check user entered sub_category, then update subcategories of category, otherwise show error notification
            if(!!values.sub_categories){
                axios.put(`${BASE_URL}/sale/category/${categoryId}/` , payload).then(res => {
    
                    if(res.data.data.result.statusCode !== 400){
                        successNotification("افزودن زیرعنوان دسته‌بندی" ,"زیرعنوان با موفقیت اضافه شد")
                        setTimeout(() => {
                            // window.location.reload();
                        }, 1500);
                    }else{
                        failNotification("خطا" , res.data.data.error_message)
                    }
        
                }).catch(err => {
                    console.log(err);
                    failNotification("خطا" , err.response.data.data.error_message)
                })
            }else{
                failNotification("خطا" , "زیرعنوانی را وارد نکرده اید!")
            } 
        }
 
    }

      const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: {
              span: 24,
            },
            wrapperCol: {
              span: 24,
            },
          }
        : null;


        const handleChange = (value) => {
            console.log("value -->>" , value);
        };

    return (
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
                                            افزودن دسته‌بندی
                                        </Breadcrumb.Item>

                                    </Breadcrumb>
                                </div>
                            </div>
                        </div>

                        <div className="row content-page ">

                            <div className="col pt-5">
                            <Form
                                {...formItemLayout}
                                layout={formLayout}
                                onFinish={onFinish}
                                form={form}
                            >

                                <div className="d-flex">
                                    <div className="col">
                                        <div className="d-block d-lg-flex">
                                            <div className="col col-lg-3">
                                                <div className="d-flex">
                                                    <p className="mb-2 mb-lg-0 text-right">دسته‌بندی</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <Form.Item 
                                                    name="category_title"
                                                    rules={[{
                                                        required: true,
                                                        message: 'دسته بندی را انتخاب نکرده‌اید!'
                                                    }
                                                ]}
                                                    >
                                                    <Select 
                                                        className="text-right"  
                                                        placeholder="دسته‌بندی را انتخاب کنید" 
                                                        optionLabelProp="label"
                                                        onChange={(e)=> setCategoryId( categoryList?.filter(item => item.title === e)[0]?.id )}
                                                    >

                                                        <React.Fragment >
                                                            <Option value=''></Option>
                                                        </React.Fragment>

                                                        {!!categoryList?.length >= 1 ? categoryList?.map(category => (

                                                            <React.Fragment 
                                                                key={category?.id}
                                                                
                                                            >
                                                                
                                                                <Option
                                                                    className="text-right"
                                                                    onChange={() => setCategoryId(category?.id)}
                                                                    value={`${category?.title}`}>{category?.title}</Option>
                                                            </React.Fragment>

                                                        )) : <Option value=""></Option>}

                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="d-block ">


                                        <div className="d-block ">
                                            <div className="col col-lg-3"> 
                                                <div className="d-flex mb-4">زیر عنوان دسته‌بندی فارسی</div>
                                            </div>
                                            <div className="col">
                                            <Form.List name="sub_categories">
                                                        {(fields, { add, remove }) => (
                                                        <>
                                                            {fields.map(field => (
                                                            <Space key={field.key} align="baseline">
                                                                <Form.Item
                                                                    noStyle
                                                                    
                                                                    shouldUpdate={(prevValues, curValues) =>
                                                                    prevValues.area !== curValues.area || prevValues.sub_categories !== curValues.sub_categories
                                                                }
                                                                >
                                                                {() => (
                                                                    <Form.Item
                                                                        {...field}
                                                                        // label="Sight"
                                                                        
                                                                        name={[field.name, 'sub_categories']}
                                                                        fieldKey={[field.fieldKey, 'sub_categories']}
                                                                        rules={[{ required: false, message: 'Missing sight' }]}
                                                                    >
                                                   
                                                                    </Form.Item>
                                                                )}
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...field}
                                                                    name={[field.name, 'sub_categories']}
                                                                    fieldKey={[field.fieldKey, 'sub_categories']}
                                                                    rules={[
                                                                        { 
                                                                            required: true, message: 'زیر‌عنوان فارسی وارد نشده است' 
                                                                        },
                                                                        {
                                                                            pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                                            message: "کاراکتر انگلیسی مجاز نیست!",
                                                                        }
                                                                    ]}
                                                                >
                                                                <Input onChange={(e)=>handleChange(e.target.value)}/>
                                                                </Form.Item>

                                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                            </Space>
                                                            ))}

                                                            <Form.Item>
                                                            <Button className="px-4 mt-3" type="dashed" onClick={() => add()} block >
                                                                افزودن زیرعنوان فارسی
                                                            </Button>
                                                            </Form.Item>
                                                        </>
                                                        )}
                                                    </Form.List>
                                            </div>
                                        </div>

                                        <div className="d-block ">
                                            <div className="col col-lg-3"> 
                                                <div className="d-flex mb-4">زیر عنوان دسته‌بندی انگلیسی</div>
                                            </div>
                                            <div className="col">
                                            <Form.List name="sub_categories_en">
                                                        {(fields, { add, remove }) => (
                                                        <>
                                                            {fields.map(field => (
                                                            <Space key={field.key} align="baseline">
                                                                <Form.Item
                                                                    noStyle
                                                                    
                                                                    shouldUpdate={(prevValues, curValues) =>
                                                                    prevValues.area !== curValues.area || prevValues.sub_categories_en !== curValues.sub_categories_en
                                                                }
                                                                >
                                                                {() => (
                                                                    <Form.Item
                                                                        {...field}
                                                                        // label="Sight"
                                                                        
                                                                        name={[field.name, 'sub_categories_en']}
                                                                        fieldKey={[field.fieldKey, 'sub_categories_en']}
                                                                        rules={[
                                                                            { required: false, message: 'Missing sight' }
                                                                        ]}
                                                                    >
                                                   
                                                                    </Form.Item>
                                                                )}
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...field}
                                                                    name={[field.name, 'sub_categories_en']}
                                                                    fieldKey={[field.fieldKey, 'sub_categories_en']}
                                                                    rules={[
                                                                        { 
                                                                            required: true, message: 'زیر‌عنوان انگلیسی وارد نشده است!' 
                                                                        },
                                                                        {
                                                                          pattern:
                                                                            /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                                          message: "کاراکتر فارسی مجاز نیست!",
                                                                        }
                                                                    ]}
                                                                >
                                                                <Input onChange={(e)=>handleChange(e.target.value)}/>
                                                                </Form.Item>

                                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                            </Space>
                                                            ))}

                                                            <Form.Item>
                                                            <Button className="px-4 mt-3" type="dashed" onClick={() => add()} block >
                                                                افزودن زیرعنوان انگلیسی
                                                            </Button>
                                                            </Form.Item>
                                                        </>
                                                        )}
                                                    </Form.List>
                                            </div>
                                        </div>

                                        </div>                         
                                    </div>
                                </div>

                             <div className="d-flex justify-content-center justify-content-lg-end ml-lg-5 my-5">
                                 <button htmlType="submit" className="btn-add-frequently-questions">ثبت دسته‌بندی‌ها</button>
                             </div>

                            </Form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default AddNewCategory;
