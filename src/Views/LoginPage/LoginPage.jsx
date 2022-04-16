import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, Checkbox, Spin } from 'antd';
import { fetcher } from '../../utils/common';
import { setToken, Token } from '../../utils/utils'
import { BASE_URL } from '../../utils';
import { message, Button } from 'antd';
import axios from "../../utils/request";
import { connect } from 'react-redux';
import { setProfile, loginSuccess, setPhoneNumber } from '../../redux/reducers/auth/auth.actions';
import GoogleLogin from 'react-google-login';
import Loading from '../../components/Loading';
import {LoadingOutlined} from '@ant-design/icons';



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



const LoginPage = (props) => {



    const [form] = Form.useForm();
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");


    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true)
        let payload = {

            "id": values.id,
            "password": values.password

        }

        axios.post(`${BASE_URL}/panel/login/`, payload).then(res => {
            // console.log(res.data.data.result.access);
            // console.log(res.data.data.result);

            if (res.data.code === 200) {
                setLoading(false)
                setToken(res.data.data.result)
                props.setProfile({ ...props.state, username: payload.id })
                props.loginSuccess({ username: payload.id })
                props.setPhoneNumber({ mobile: payload.id })
                window.location.href = "#/home"
            }


        })
            .catch(err => {
                setLoading(false)
                if (err.response && err?.response?.data?.message !== undefined) {
                    message.error({
                        content: `${' '}${err?.response?.data?.message}`,
                        className: 'text-danger',
                        style: {
                            marginTop: '10vh',
                        },
                    })
                }

            })

    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };




    // const responseGoogle = (response) => {

    //     console.log(response);


    //     // setUsername(response.profileObj.username);
    //     // setEmail(response.profileObj.email);
    //     // setUrl(response.profileObj.url);

    //     axios.post(`${BASE_URL}/rest-auth/google/`).then(res => {
    //         console.log(res.data);

    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    // }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
            <Spin indicator={antIcon} spinning={loading}  >
            <div className="containerLoginPage">
                <div className="row">
                    <div className="col">

                        <div className="row enterToAccountBox bg-white mt-4">
                            <div className="col m-0 p-0">

                                <Form
                                    {...layout}
                                    form={form}
                                    name="basic"
                                    labelCol={{ span: 16 }}
                                    wrapperCol={{ span: 24 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >

                                    <div className="headerLogin">
                                        ورود به حساب کاربری
                                    </div>
                                    <div className="d-none d-xl-flex boxImageLoginPage">
                                        <div className="imageEnterToAccaount"></div>
                                    </div>
                                    <div className="boxInfoLogin mx-sm-4">
                                        <div className="col p-0">
                                            <div>
                                                <p className="text-right mb-1"> ایمیل / شماره تلفن</p>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col">

                                                    <div className="mobileAndImailField">
                                                        <Form.Item
                                                            name="id"
                                                            rules={[{
                                                                required: true,
                                                                message: 'ورودی تلفن همراه یا ایمیل خالی است!'
                                                            },

                                                            ]}>
                                                            <Input

                                                                ref={inputRef}
                                                                placeholder="شماره تلفن یا ایمیل خود را وارد کنید" />
                                                        </Form.Item>

                                                        {/* <span className="iconMobile">
                                            <img src={iconMobile}/>
                                        </span> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-right mt-3 mb-1">گذرواژه</p>
                                            </div>
                                            <div className="row justify-content-center ">
                                                <div className="col">
                                                    <div
                                                        className="passwordField"
                                                    >

                                                        <Form.Item
                                                            ref={inputRef}
                                                            name="password"
                                                            rules={[{
                                                                required: true,
                                                                message: 'ورودی گذرواژه خالی است!'

                                                            },
                                                            {
                                                                pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                                message: "کاراکتر فارسی مجاز نیست!",
                                                            }


                                                            ]}>
                                                            <Input.Password

                                                                suffix="98+"
                                                                style={{ marginTop: '10px' }}

                                                                placeholder="گذرواژه خود را وارد کنید" />
                                                        </Form.Item>

                                                        {/* <span className="iconLock"></span> */}
                                                    </div>
                                                    <div className="rememberTextPassword p-0 ">
                                                        <p>
                                                            گذرواژه خود را فراموش کرده اید؟
                                                            <span className="mr-2">
                                                                <Link to="/recovery-password">کلیک کنید</Link>
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <div className="d-flex justify-content-center enter-whith-google">

                                                        {/* <GoogleLogin
                                            // clientId="12365462243-gua1d2f4uldno7v4t2n61hq8pju041qi.apps.googleusercontent.com"
                                            clientId="12365462243-gua1d2f4uldno7v4t2n61hq8pju041qi.apps.googleusercontent.com"
                                            buttonText="ورود با اکانت گوگل"
                                            // onClick={responseGoogle}
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        /> */}
                                                    </div>

                                                    <div className="d-flex mb-4">
                                                        <button
                                                            htmlType="submit"
                                                            className="enter-to-panel-btn text-white"
                                                        >
                                                            ورود
                                                        </button>


                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* <BounceLoader/> */}
                                </Form>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            </Spin>
        </React.Fragment>
    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        setPhoneNumber: (data) => dispatch(setPhoneNumber(data)),
        setProfile: (data) => dispatch(setProfile(data)),
        loginSuccess: (data) => dispatch(loginSuccess(data)),
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.authReducer,
        panelReducer: store.panelReducer
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)