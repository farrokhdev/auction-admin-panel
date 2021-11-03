import React , {useState , useEffect} from 'react'
import {Modal , Form , Input , notification , Select , Mentions } from 'antd';
import {Link} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import { successNotification , failNotification} from '../../utils/notification';


function ModalEditFrequentlyAskedQuestion({setVisibleEditQuestion , visibleEditQuestion , question_id , setIsCallServiceGetQuestion}) {

    const [form] = Form.useForm();
    const [singleQuestion, setSingleQuestion] = useState()
    useEffect(() => {
        getSingleQuestion()
    }, [])




    const getSingleQuestion = () => {
        axios.get(`${BASE_URL}/panel/faq/${question_id}/`).then(res => {
            setSingleQuestion(res.data.data.result)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })
    }

   
    useEffect(() => {
        form.setFieldsValue({
            question_en : singleQuestion?.question_en,
            question_fa : singleQuestion?.question_fa,
            answer_en : singleQuestion?.answer_en,
            answer_fa : singleQuestion?.answer_fa,
            category : singleQuestion?.category
        })
    }, [singleQuestion]);


    const [formLayout, setFormLayout] = useState('horizontal');
    const [loading, setLoading] = useState(false);


    const onFinish = (values) => {
        console.log(values);
        let payload = {
            "question_en": values.question_en,
            "question_fa": values.question_fa,
            "answer_en": values.answer_en,
            "answer_fa": values.answer_fa,
            "category": singleQuestion?.category
        }
        setLoading(true)
        axios.put(`${BASE_URL}/panel/faq/${question_id}/` , payload).then(res => {
            if(res.data.data.statusCode !== 400){
                successNotification("ویرایش سوال" , "ویرایش سوال با موفقیت انجام شد")
                setLoading(false)
                setTimeout(() => {
                    window.location.reload();
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

    const handleCloseModal =() => {
        setIsCallServiceGetQuestion(false)
        setVisibleEditQuestion(false)
    }

    return (
        <Modal
                title="ویرایش سوالها و پاسخ ها"
                centered
                className="modal-edit-questions"
                visible={visibleEditQuestion}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                width={800}>

                    <div className="d-flex">
                        <div className="col">

                        <Form
                                {...formItemLayout}
                                layout={formLayout}
                                form={form}
                                onFinish={onFinish}
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
                                                },

                                                {
                                                    pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                    message: "کاراکتر انگلیسی مجاز نیست!",
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
                                                name="answer_fa"
                                                rules={[{
                                                    required: true,
                                                    message: 'پاسخ فارسی را وارد نکرده‌اید!'
                                                },

                                                {
                                                    pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                    message: "کاراکتر انگلیسی مجاز نیست!",
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
                                                },
                                                {
                                                    pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                    message: "کاراکتر فارسی مجاز نیست!",
    
                                                }
                                            ]}
                                                >
                                                <Input style={{direction : 'ltr'}} placeholder="سوال انگلیسی" />
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
                                            name="answer_en"
                                            rules={[{
                                                required: true,
                                                message: 'پاسخ انگلیسی را وارد نکرده‌اید!'
                                            },
                                            {
                                                pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                message: "کاراکتر فارسی مجاز نیست!",

                                            }
                                        ]}
                                            >
                                                <Input style={{direction : 'ltr'}} placeholder="پاسخ انگلیسی" />
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
