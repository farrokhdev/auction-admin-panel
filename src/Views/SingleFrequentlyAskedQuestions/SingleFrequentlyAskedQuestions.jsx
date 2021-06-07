import React , {useState } from 'react'
import {Breadcrumb , Form , Input} from 'antd';
import {NavLink} from 'react-router-dom';
import ModalEditFrequentlyAskedQuestion from './ModalEditFrequentlyAskedQuestion';
import TableQuestionsCategory from './TableQuestionsCategory';


const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

function SingleFrequentlyAskedQuestions(props) {

    // const [qfa, ] = useState("...سوال");
    // const [rfa, ] = useState("...پاسخ فارسی");
    // const [qen, ] = useState("...سوال انگلیسی");
    // const [ren, ] = useState("...پاسخ انگلیسی");

    const [visibleEditQuestion, setVisibleEditQuestion] = useState(false);

    const [qfa, ] = useState("");
    const [rfa, ] = useState("");
    const [qen, ] = useState("");
    const [ren, ] = useState("");

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');

    const onFinish = (values) => {
        console.log(values);
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
                                            لیست سوالات
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
                                initialValues={{
                                    layout: formLayout,
                                    question_fa : qfa,
                                    reply_fa : rfa,
                                    question_en : qen,
                                    reply_en : ren,
                                }}
                                onValuesChange={onFormLayoutChange}
                            >
                           

                               <div className="d-flex">
                                   <div className="col">

                                    <div className="d-block d-lg-flex">
                                        <div className="col col-lg-2">
                                            <div className="d-flex">
                                                <p className="mb-2 mb-lg-0 text-right">سوال فارسی</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <Form.Item 
                                                name="question_fa"
                                                rules={[{
                                                    required: true,
                                                    message: 'سوال فارسی را وارد نکرده‌اید!'
                                                }
                                            ]}
                                                >
                                                <Input placeholder="سوال فارسی" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex">
                                        <div className="col col-lg-2">
                                            <div className="d-flex">
                                                <p className="mb-2 mb-lg-0 text-right">پاسخ فارسی</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <Form.Item 
                                                name="reply_fa"
                                                rules={[{
                                                    required: true,
                                                    message: 'پاسخ فارسی را وارد نکرده‌اید!'
                                                }
                                            ]}
                                                >
                                                <Input placeholder="پاسخ فارسی" />
                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div className="d-block d-lg-flex">
                                        <div className="col col-lg-2">
                                            <div className="d-flex">
                                                <p className="mb-2 mb-lg-0 text-right">سوال انگلیسی</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <Form.Item 
                                                name="question_en"
                                                rules={[{
                                                    required: true,
                                                    message: 'سوال انگلیسی را وارد نکرده‌اید!'
                                                }
                                            ]}
                                                >
                                                <Input placeholder="سوال انگلیسی" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex">
                                        <div className="col col-lg-2">
                                            <div className="d-flex">
                                                <p className="mb-2 mb-lg-0 text-right">پاسخ انگلیسی</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <Form.Item 
                                                name="reply_en"
                                                rules={[{
                                                    required: true,
                                                    message: 'پاسخ انگلیسی را وارد نکرده‌اید!'
                                                }
                                            ]}
                                                >
                                                <Input placeholder="پاسخ انگلیسی" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                   </div>
                               </div>

                             <div className="d-flex justify-content-center justify-content-lg-end ml-lg-5 mb-5">
                                 <button className="btn-add-frequently-questions">افزودن به لیست سوالات</button>
                             </div>

                            </Form>


                                <div className="d-flex">
                                    <TableQuestionsCategory 
                                        setVisibleEditQuestion={setVisibleEditQuestion}
                                        visibleEditQuestion={visibleEditQuestion}
                                        />
                                </div>

                            </div>



                        </div>

                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default SingleFrequentlyAskedQuestions;
