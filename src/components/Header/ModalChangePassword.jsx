import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { Form, Input, message, notification, Spin } from 'antd';
import axios from "../../utils/request"
import { BASE_URL } from '../../utils'
import Loading from '../Loading';
import { LoadingOutlined } from '@ant-design/icons';


const layout = {
    labelCol: {
        span: 16
    },
    wrapperCol: {
        span: 24
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 16,
        span: 24
    }
};


function ModalChangePassword({ setVisibleChangePasswordModal, visibleChangePasswordModal }) {

    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setVisibleChangePasswordModal(true);
    };

    const handleOk = () => {
        setTimeout(() => {
            setVisibleChangePasswordModal(false);
        }, 2000);
    };

    const handleCancel = (e) => {
        e.preventDefault()
        console.log('Clicked cancel button');
        setVisibleChangePasswordModal(false);
        // window.location.reload();
    };

    const openNotification = () => {
        notification.success({
            message: 'تغییر گذرواژه',
            description: `گذرواژه با موفقیت تغییر یافت`,
            duration: 0,
            className: 'custom-class',
            style: {
                backgroundColor: '#f9faf5'
            }
        });
    };


    const openFailNotification = (message) => {
        notification.error({
            message: 'تغییر گذرواژه ناموفق',
            description: `${message}`,
            duration: 0,
            className: 'custom-class',
            style: {
                backgroundColor: '#f9faf5'
            }
        });
    };


    const [form] = Form.useForm();


    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true)
        let payload = {
            "old_password": values.old_password,
            "password": values.password,
            "password_check": values.password_check
        }

        if (values.password_check !== values.password) {

            form.setFields([
                {
                    name: "password_check",
                    errors: ['تکرار گذرواژه وارد شده همخوانی ندارد!'],
                },
            ]);

        } else {
            axios.post(`${BASE_URL}/account/change-password/`, payload).then(res => {
                console.log(res.data);

                if (res.data.code === 200 && res.data.data.statusCode !== 400) {
                    setLoading(false)
                    openNotification('topLeft')
                }

                if (res.data.data.statusCode === 400) {
                    setLoading(false)
                    openFailNotification(res.data.message)
                }

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
                .catch(err => {
                    console.log(err.response.data.data.error_message)
                    setLoading(false)
                    if (err.response && err.response?.data?.data?.error_message !== 'ok' && err.response?.data?.data?.error_message !== undefined) {
                        message.error({
                            content: `${' '}${err.response?.data?.data?.error_message}`,
                            className: 'text-danger',
                            style: {
                                marginTop: '10vh',
                            },
                        })
                    }
                })

        }

    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
            {/* <Loading loading={loading}/> */}
            <Spin indicator={antIcon} spinning={loading} >

                <Modal
                    title="تغییر گذرواژه"
                    className="modal-change-password"
                    visible={visibleChangePasswordModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={400}
                >
                    <div className="d-flex">
                        <div className="col p-0">

                            <Form
                                {...layout}
                                form={form}
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >

                                <div>
                                    <p className="text-right mb-1 mr-2">گذرواژه فعلی</p>
                                </div>
                                <div className="row justify-content-center ">

                                    <div className="col ">
                                        <div
                                            style={{
                                                position: 'relative'
                                            }}>

                                            <Form.Item
                                                name="old_password"
                                                rules={[{
                                                    required: true,
                                                    message: 'ورودی گذرواژه فعلی خالی است!'
                                                }
                                                ]}>
                                                <Input.Password
                                                    ref={inputRef}
                                                    style={{

                                                    }}
                                                    placeholder="گذرواژه فعلی خود را وارد کنید" />
                                            </Form.Item>

                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="text-right mb-1 mr-2">گذرواژه جدید</p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <div
                                            style={{
                                                position: 'relative'
                                            }}>

                                            <Form.Item
                                                name="password"
                                                rules={[{
                                                    required: true,
                                                    message: 'ورودی گذرواژه جدید خالی است!'
                                                },
                                                {
                                                    min: 8,
                                                    message: "گذرواژه حداقل 8 کاراکتر می‌باشد!",

                                                },
                                                {
                                                    pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                    message: "کاراکتر فارسی مجاز نیست!",

                                                }
                                                ]}>
                                                <Input.Password
                                                    placeholder="گذرواژه جدید خود را وارد کنید" />
                                            </Form.Item>

                                        </div>
                                    </div>
                                </div>
                                <div className=" pt-2">
                                    <p className="text-right  mb-1 mr-2">تکرار گذرواژه
                                    </p>
                                </div>
                                <div className="row justify-content-center mb-2">
                                    <div className="col ">
                                        <div
                                            style={{
                                                position: 'relative'
                                            }}>

                                            <Form.Item
                                                className="invite-input"
                                                name="password_check"
                                                rules={[{
                                                    required: true,
                                                    message: 'ورودی تکرار  گذرواژه خالی است!'
                                                }
                                                ]}>
                                                <Input.Password
                                                    placeholder=" گذرواژه خود را تکرار کنید" />
                                            </Form.Item>

                                        </div>

                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className="cancelSetPassBtn px-5 mx-2" onClick={(e) => handleCancel(e)}>انصراف</button>{' '}
                                    <button htmlType="submit" className="submitNewPass" >ثبت گذرواژه جدید</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal>
            </Spin>
        </React.Fragment>
    )
}

export default ModalChangePassword;
