import React, {useEffect, useState} from 'react'
import {Breadcrumb, Input, Select, Form , message , notification} from 'antd';
import axios from "../../utils/request";
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux'

function SendNewTicket(props) {

    const [form] = Form.useForm();

    const {Option} = Select;
    const {TextArea} = Input;

    const [loading,
        setLoading] = useState(false);

    const handleSendTicket = () => {
        props.setVisible(false)
        setTimeout(() => {
            window
                .location
                .reload()
        }, 1000);
    };

    const [categoriTicket , setcategoriTicket] = useState([]);
    console.log('categoriTicket:', categoriTicket);

    const onFinish = (values) => {

        let payload = {
            "title": values.title,
            "body": values.body,
            "category": values.category.id,
            "priority": values.priority,
            // "media_id": 1
        }

        axios.post(`${BASE_URL}/panel/ticket/`, payload).then(res => {
                props.setVisible(false)

                if(res.data.code === 201){
                    openNotification();
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }
                
                



            })
            .catch(err => {
                console.log(err);

                if(err.response && err?.response?.data?.error_message !== undefined ){
                    message.error({content: `${' '}${err?.response?.data?.error_message}`,
                    className: 'text-danger',
                    style: {
                    marginTop: '10vh',
                },})
                }

            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => { 
        axios.get(`${BASE_URL}/ticketing/category`).then(res => {
            setcategoriTicket(res.data.data.result);       
        }).catch(err => { 
            console.log(err);
        })   
    }, []);

    const handleClockTicket = (e) => {
        e.preventDefault()

        props.setVisible(false)
        // window.location.reload()

    }


    const openNotification = () => {
        notification.success({
          message: 'ثبت تیکت',
          description:`تیکت با موفقیت تبت شد`,
            duration: 0,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };

    return (
        <React.Fragment>
            <Loading loading={loading}/>
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
                                                    <NavLink key="1" onClick={e => props.toggleActiveNavDrawer("1")} to="/">
                                                        خانه
                                                    </NavLink>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    لیست پیام‌ها
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mx-0 ">
                                    <div className="col content-page p-4  ">
                                        <div className="px-2 px-lg-4 pl-lg-5">
                                            <div className="d-flex">
                                                <span className="lineTitle"></span>
                                                <p>ثبت تیکت جدید</p>
                                            </div>

                                            <Form
                                                id="form-add-ticket"
                                                name="basic"
                                                initialValues={{
                                                remember: true
                                            }}
                                                onFinish={onFinish}
                                                onFinishFailed={onFinishFailed}>

                                                <Form.Item
                                                    className="text-left"
                                                    name="category_title"
                                                    label="موضوع"
                                                    rules={[{ 
                                                        required: true ,
                                                        message: 'موضوعی را انتخاب نکرده‌اید!'
                                                    }]}>
                                                    <Select
                                                        className="input-item-send-ticket"
                                                        style={{
                                                            direction: 'rtl',
                                                            
                                                    }}
                                                        notFoundContent={' '}
                                                        allowClear>

                                                        {categoriTicket
                                                            ? categoriTicket.map(category => (
                                                                <Option className="text-right" value={category.id}>{category.title}</Option>
                                                            ))
                                                            : null}

                                                    </Select>
                                                </Form.Item>

                                                <Form.Item
                                                    label="اولویت"
                                                    name="priority"
                                                    rules={[{
                                                        required: true,
                                                        message: 'اولویتی را انتخاب نکرده‌اید!'
                                                    }
                                                ]}>

                                                    <Select
                                                        className="input-item-send-ticket"
                                                        style={{
                                                        direction: 'ltr'
                                                    }}
                                                        notFoundContent={' '}
                                                        allowClear>
                                                        <Option className="text-right" value="low">کم</Option>
                                                        <Option className="text-right" value="medium">متوسط</Option>
                                                        <Option className="text-right" value="high">زیاد</Option>
                                                    </Select>

                                                </Form.Item>
                                                <Form.Item
                                                    name="title"
                                                    label="عنوان"
                                                    rules={[{
                                                        required: true,
                                                        message: 'عنوانی را انتخاب نکرده‌اید!'
                                                    }
                                                ]}>
                                                    <Input className="input-item-send-ticket"/>
                                                </Form.Item>
                                                <Form.Item
                                                
                                                    label="متن"
                                                    name={['body']}
                                                    rules={[{
                                                        required: true,
                                                        message: 'تیکتی وارد نکرده‌اید!'
                                                    }
                                                ]}>
                                                    <Input.TextArea className="input-item-send-ticket" rows={8}/>
                                                </Form.Item>

                                                <div className="d-flex justify-content-end">
                                                    {/* <button onClick={handleClockTicket} className="btn-cancel-ticket mt-4">انصراف</button> */}
                                                    <button htmlType="submit" className="btn-submit-new-ticket mr-2 mt-4">ثبت تیکت</button>
                                                </div>

                                            </Form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(SendNewTicket)