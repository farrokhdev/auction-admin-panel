import React , {useState , useEffect} from 'react'
import {Breadcrumb , Form , Input , Select} from 'antd';
import {NavLink} from 'react-router-dom';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';

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


    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        axios.get(`${BASE_URL}/sale/category/`).then(res => {
            setCategoryList(res.data.data.result)
        }).catch(err => {
            console.log(err);
        })
    }

    const onFinish = (values) => {
        console.log(values);

        let payload = {
            "category_title": values.category_title,
            "sub_categories": values.sub_categories
          }

        axios.post(`${BASE_URL}/sale/category/` , payload).then(res => {
            setCategoryList(res.data.data.result)
        }).catch(err => {
            console.log(err);
        })


    }

    // const onFormLayoutChange = ({ layout }) => {
    //     setFormLayout(layout);
    //   };

      const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 14,
            },
          }
        : null;

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
                                // onValuesChange={onFormLayoutChange}
                            >

                                <div className="d-flex">
                                    <div className="col">
                                        <div className="d-block d-lg-flex">
                                            <div className="col col-lg-3">
                                                <div className="d-flex">
                                                    <p className="mb-2 mb-lg-0 text-right">دسته‌بندی </p>
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
                                                    >

                                                        <React.Fragment >
                                                            <Option value=''></Option>
                                                        </React.Fragment>

                                                        {!!categoryList?.length >= 1 ? categoryList?.map(category => (

                                                            <React.Fragment key={category?.id}>
                                                                <Option
                                                                    className="text-right"
                                                                    value={`${category?.title}`}>{category?.title}</Option>
                                                            </React.Fragment>

                                                        )) : <Option value=""></Option>}

                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col col-lg-3">
                                                <div className="d-flex">
                                                    <p className="mb-2 mb-lg-0 text-right">زیر عنوان دسته‌بندی </p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <Form.Item 
                                                    name="sub_categories"
                                                    rules={[{
                                                        required: true,
                                                        message: 'زیر عنوان دسته‌بندی را انتخاب نکرده‌اید!'
                                                    },
                                                    {
                                                        // pattern: /~[a-zA-Z0-9]/g,
                                                        pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                        message: "کاراکتر انگلیسی مجاز نیست!",
                                                    }
                                                ]}
                                                    >
                                                    <Input placeholder="زیر عنوان دسته‌بندی را وارد کنید" />
                                                </Form.Item>
                                            </div>
                                        </div>                         
                                    </div>
                                </div>

                             <div className="d-flex justify-content-center justify-content-lg-end ml-lg-5 my-5">
                                 <button htmlType="submit" className="btn-add-frequently-questions">افزودن به دسته‌بندی‌ها</button>
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
