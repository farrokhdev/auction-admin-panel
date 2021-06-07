import React , {useState , useEffect} from 'react'
import {Modal , Form , Input , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';


function ModalEditFrequentlyAskedQuestion({setVisibleEditQuestion , visibleEditQuestion}) {

    const [form] = Form.useForm();

   
    const [qfa, ] = useState("");
    const [rfa, ] = useState("");
    const [qen, ] = useState("");
    const [ren, ] = useState("");


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

    const handleCloseModal =() => {
        setVisibleEditQuestion(false)

    }

    return (
        <Modal
                title="ویرایش سوالها و پاسخ ها"
                centered
                className="modal-edit-questions"
                visible={visibleEditQuestion}
                onOk={() => setVisibleEditQuestion(false)}
                onCancel={() => setVisibleEditQuestion(false)}
                width={800}>

                    <div className="d-flex">
                        <div className="col">

                        <Form
                                {...formItemLayout}
                                layout={formLayout}
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

                          
                            <div className="d-block d-sm-flex mt-5">
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-end ml-sm-3">
                                        <button htmlType="submit" className="btn-send-to-house-auctions">ثبت تغییرات</button>
                                    </div>
                                </div>
                                <div className="col px-0">
                                    <div className="d-flex justify-content-center justify-content-sm-start mt-2 mt-sm-0">
                                        {/* <Link to="/tickets"><button  className="btn-response-to-user">پاسخ به کاربر</button></Link> */}
                                        <button onClick={handleCloseModal} className="btn-close-send-to-house-auction">بستن</button>
                                    </div>
                                </div>
                            </div>


                        </Form>
                        </div>
                    </div>
            </Modal>
    )
}

export default ModalEditFrequentlyAskedQuestion;
