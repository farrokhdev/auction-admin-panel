import React , {useState } from 'react'
import {Breadcrumb , Form , Input} from 'antd';
import {NavLink} from 'react-router-dom';
import {BASE_URL} from '../../utils';
import axios from '../../utils/request';
import {successNotification , failNotification} from '../../utils/notification';

const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

function AddNewQuestionCategory(props) {


    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const [loading, setLoading] = useState(false);


    const onFinish = (values) => {
        console.log(values);

        let payload = {
            "title_fa": values?.title_fa,
            "title_en": values?.title_en
        }
        setLoading(true)
        axios.post(`${BASE_URL}/panel/faq-categories/` , payload).then(res => {
            if(res.data.data.statusCode !== 400){
                successNotification("افزودن دسته‌بندی" , "افزودن دسته‌بندی با موفقیت انجام شد")
                setLoading(false)
                setTimeout(() => {
                    window.location.href = "#/frequently-asked-questions";
                }, 1200);
            }else{
                failNotification('خطا' , res.data.data.error_message)
            }
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })
    }

    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
      };

      const formItemLayout =
      formLayout === 'horizontal'
        ? {
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
                                            افزودن دسته‌بندی سوالات
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
                                onValuesChange={onFormLayoutChange}
                            >
                           

                               <div className="d-flex">
                                   <div className="col">

                                    <div className="d-block d-lg-flex">
                                        <div className="col col-lg-3">
                                            <div className="d-flex">
                                                <p className="mb-2 mb-lg-0 text-right">نام دسته‌بندی فارسی</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <Form.Item 
                                                name="title_fa"
                                                rules={[{
                                                    required: true,
                                                    message: 'نام دسته‌بندی فارسی را وارد نکرده‌اید!'
                                                },
                                                {
                                                    // pattern: /~[a-zA-Z0-9]/g,
                                                    pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                    message: "کاراکتر انگلیسی مجاز نیست!",
                                                }
                                            ]}
                                                >
                                                <Input placeholder="نام دسته‌بندی فارسی را وارد نمایید" />
                                            </Form.Item>
                                        </div>
                                    </div>                         

                                    <div className="d-block d-lg-flex">
                                        <div className="col col-lg-3">
                                            <div className="d-flex">
                                                <p className="mb-2 mb-lg-0 text-right">نام دسته‌بندی انگلیسی</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <Form.Item 
                                                name="title_en"
                                                rules={[{
                                                    required: true,
                                                    message: 'نام دسته‌بندی انگلیسی را وارد نکرده‌اید!'
                                                },
                                                
                                                {
                                                    pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                    message: "کاراکتر فارسی مجاز نیست!",
                                                }
                                            ]}
                                                >
                                                <Input placeholder="نام دسته‌بندی انگلیسی را وارد نمایید" />
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

export default AddNewQuestionCategory;
