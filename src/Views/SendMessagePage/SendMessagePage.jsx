import React , {useState , useEffect , useRef} from 'react'
import {Mentions, Form, Button , Select , Breadcrumb , message} from 'antd';
import {NavLink} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';


const { Option, getMentions } = Mentions;
const scrollToRef = (ref) => window.scrollTo(20, ref.current.offsetTop)

function SendMessagePage(props) {

    const myRef1 = useRef(null)

    const executeScroll = (e) => scrollToRef(e)


    const [form] = Form.useForm();

    const onReset = () => {
      form.resetFields();
    };

    const [memberList, setMemberList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        axios.get(`${BASE_URL}/panel/users/`).then(res => {
            setMemberList(res.data.data.result.results)
        }).catch(err => {
            console.log(err);
        })

    }, []);

    const onFinish = (values) => {
        console.log(values);
        setLoading(true)
        let payload = {
            "users": values.users,
            "message": {
                "title": values.title,
                "body": values.body
            }
        }

        axios.post(`${BASE_URL}/panel/message/`, payload).then(res => {
            setLoading(false)
            message.success({content: `${' '}ارسال پیام با موفقیت انجام شد`,
                className: 'text-success',
                style: {
                marginTop: '10vh',
            },})

            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }).catch(err => {
            console.log(err);
            setLoading(false)
            if(err.response && err?.response?.data?.message !== undefined ){
                message.error({content: `${' '}${err?.response?.data?.message}`,
                className: 'text-danger',
                style: {
                marginTop: '10vh',
            },})
            }
        })
           
        
    }    

    return (
        <React.Fragment>
            <div className="container-fluid px-0 container-pages">

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
                                                    ارسال پیام
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row  mx-0">
                                    <div className="col content-page p-4  ">
                                   

                                        <Form  className="pt-5" form={form} layout="horizontal" onFinish={onFinish}>
                                            <div ref={myRef1}></div>
                                        <Form.Item
                                            className="text-right input-message-send-to"
                                            name="users"
                                            label="ارسال به"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'مخاطب را انتخاب نکرده‌اید!',
                                                type: 'array',
                                            },
                                            ]}
                                        >
                                            <Select className="" mode="multiple" placeholder="مخاطب را انتخاب کنید">
                                                {memberList.length >= 1 ? memberList.map(member => (

                                                    <React.Fragment key={member?.id}>
                                                        <Option value={`${member?.id}`}>{member?.first_name}</Option>
                                                    </React.Fragment>
                                                )) : <Option value=""></Option>}
                                            
                                            </Select>
                                        </Form.Item>

                                            <Form.Item
                                                name="title"
                                                
                                                label="عنوان پیام"
                                                labelCol={{
                                                    span: 6
                                                }}
                                                    wrapperCol={{
                                                    span: 16
                                                }}
                                                // rules={[{
                                                //     validator: checkMention
                                                // }
                                                // ]}
                                                rules={[{ required: true, message: 'ورودی عنوان خالی است!' }]}
                                            
                                                >
                                                <Mentions placeholder="عنوان پیام را وارد کنید" rows={1} className="text-right">
                                                    
                                                    {/* <Option value="afc163">afc163</Option>
                                                    <Option value="zombieJ">zombieJ</Option>
                                                    <Option value="yesmeck">yesmeck</Option> */}
                                                </Mentions>
                                            </Form.Item>

                                            <Form.Item
                                                name="body"
                                                label="متن پیام"
                                                labelCol={{
                                                    span: 6
                                                }}
                                                wrapperCol={{
                                                    span: 16
                                                }}
                                                rules={[{ required: true, message: 'ورودی متن پیام خالی است!' }]}
                                            
                                                >
                                                <Mentions className="text-right" rows={4} placeholder="متن پیام را وارد کنید">
                                                    {/* <Option value="afc163">afc163</Option>
                                                    <Option value="zombieJ">zombieJ</Option>
                                                    <Option value="yesmeck">yesmeck</Option> */}
                                                </Mentions>
                                            </Form.Item>

                                            <Form.Item
                                                wrapperCol={{
                                                span: 14,
                                                offset: 6
                                            }}>
                                                <Button htmlType="submit" className="btn-send-message">
                                                    ارسال پیام
                                                </Button>
                                                &nbsp;&nbsp;&nbsp;
                                                <Button htmlType="button" className="btn-reset-message" onClick={onReset}>
                                                    پاک کردن
                                                </Button>
                                            </Form.Item>
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


const mapDispatchToProps = (dispatch) => {
    return {
        toggleActiveNavDrawer : (data) => dispatch(toggleActiveNavDrawer(data)),
    }
  }
  
  const mapStateToProps = (store) => {
    return {
        panel: store.panelReducer
    }
  }
  
  export default connect(mapStateToProps , mapDispatchToProps)(SendMessagePage)