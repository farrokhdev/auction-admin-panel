import React , {useState , useEffect} from 'react'
import {Breadcrumb , Form , Input} from 'antd';
import {NavLink} from 'react-router-dom';
import ModalEditFrequentlyAskedQuestion from './ModalEditFrequentlyAskedQuestion';
import {BASE_URL} from '../../utils';
import axios from '../../utils/request';
import TableQuestionsCategory from './TableQuestionsCategory';
import PaginationComponent from '../../components/PaginationComponent'
import { failNotification, successNotification } from '../../utils/notification';
import queryString from 'query-string';

const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

function SingleFrequentlyAskedQuestions(props) {


    const [visibleEditQuestion , setVisibleEditQuestion] = useState(false);
    const [isCallServiceGetQuestion, setIsCallServiceGetQuestion] = useState(null)
    const [loading, setLoading] = useState(false);
    const [frequentlyCount, setfrequentlyCount] = useState(0);
    const [questionList , setQuestionList] = useState([]);
    const [question_id, setQuestion_id] = useState()
    const [params , setParams] = useState(
        {
            page : 1, 
            page_size : 10 , 
            category__id : props.match.params.id
        });


    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');


      useEffect(() => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/panel/faq/?${queries}`).then(res => {
            setLoading(false)
            setQuestionList(res.data.data.result)
            setfrequentlyCount(res.data.data.count)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })

    }, [params]);



    const onFinish = (values) => {
        console.log(values);

        let payload = {
            "question_en": values.question_en,
            "question_fa": values.question_fa,
            "answer_en": values.answer_en,
            "answer_fa": values.answer_fa,
            "category": props.match.params.id
        }
        setLoading(true)
        axios.post(`${BASE_URL}/panel/faq/` , payload).then(res => {
            if(res.data.data.statusCode !== 400){
                successNotification("افزودن سوال" , "افزودن سوال با موفقیت انجام شد")
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


        const handeSelectPage = (e) => {
            setParams({
                ...params , page : e
            })
        }

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
                                                <Input placeholder="سوال فارسی را وارد نمایید" />
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
                                                <Input placeholder="پاسخ فارسی را وارد نمایید" />
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
                                                <Input style={{direction : 'ltr'}} className="text-left" placeholder="سوال انگلیسی را وارد نمایید" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="d-block d-lg-flex">
                                        <div className="col col-lg-2">
                                            <div className="d-flex">
                                                <p className="mb-2 mb-lg-0 text-right">پاسخ انگلیسی</p>
                                            </div>
                                        </div>
                                        <div className="col text-left">
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
                                                <Input style={{direction : 'ltr'}} className="text-left" placeholder="پاسخ انگلیسی را وارد نمایید" />
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
                                        setIsCallServiceGetQuestion={setIsCallServiceGetQuestion}
                                        isCallServiceGetQuestion={isCallServiceGetQuestion}
                                        questionList={questionList}
                                        params={params}
                                        setQuestion_id={setQuestion_id}
                                        question_id={question_id}
                                    />
                                </div>

                            </div>

                            <div className="d-flex justify-content-center w-100 mt-4">
                                <PaginationComponent count ={frequentlyCount} handeSelectPage={handeSelectPage} />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default SingleFrequentlyAskedQuestions;
