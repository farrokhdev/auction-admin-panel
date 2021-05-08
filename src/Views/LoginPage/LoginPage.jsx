import React , {useState , useEffect , useRef} from 'react'
import {Link} from 'react-router-dom';
import {Form, Input, Checkbox} from 'antd';
import {fetcher} from '../../utils/common';
import {setToken , Token} from '../../utils/utils'
import { BASE_URL } from '../../utils';
import { message, Button } from 'antd';
import axios from "../../utils/request";
import {connect} from 'react-redux';
import { setProfile , loginSuccess} from '../../redux/reducers/auth/auth.actions';

const layout = {
    labelCol: {
        span: 16
    },
    wrapperCol: {
        span: 24
    }
};

const LoginPage=(props)=> {

    const [form] = Form.useForm();
    const inputRef = useRef(null);

    const onFinish = (values) => {
        console.log('Success:', values);

        let payload = {

            "id": values.id,
            "password": values.password
        
        }
    

            axios.post(`${BASE_URL}/account/login/`, payload).then(res => {
                // console.log(res.data.data.result.access);
                // console.log(res.data.data.result);
     
                if(res.data.code === 200){
                   
                    setToken(res.data.data.result)
                    props.setProfile( {...props.state , username : payload.id} )
                    props.loginSuccess({})
                    window.location.href = "#/home"
                }
               
                // if(res.data.data.code === 401){
                        
                //     form.setFields([
                //         {
                //             name: 'id',
                //             errors: ['کاربری با این مشخصات پیدا نشد!'],
                //           },
                //         ])   
                // }

                // if (res.data && res.data.data.result.access){
                //     setToken(res.data.result)

                 
                //     window.location.href = "#/members"
                // }
            })
            .catch(err => {
     
                    if(err.response && err?.response?.data?.message !== undefined ){
                        message.error({content: `${' '}${err?.response?.data?.message}`,
                        className: 'text-danger',
                        style: {
                        marginTop: '10vh',
                    },})
                    }
               
            })

    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <React.Fragment>
            <div className="containerLoginPage">

                


<div className="row">
    <div className="col">
                <div className="d-flex justify-content-center p-4">
                        {/* <Link to="/"><img src={logoEn}/></Link> */}
                    </div>
        <div className="row enterToAccountBox bg-white">
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
                    <div className="d-none d-md-flex boxImageLoginPage">
                        <div className="imageEnterToAccaount"></div>
                    </div>
                    <div className="boxInfoLogin">
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
                                                placeholder="شماره تلفن یا ایمیل خود را وارد کنید"/>
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
                                      className = "passwordField"
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
                                                style={{marginTop : '10px'}}
                                               
                                                placeholder="گذرواژه خود را وارد کنید"/>
                                        </Form.Item>

                                        {/* <span className="iconLock"></span> */}
                                    </div>
                                    <div className="rememberTextPassword p-0 mt-5">
                                        <p>
                                            گذرواژه خود را فراموش کرده اید؟
                                            <span className="mr-2">
                                                <Link to="/register-recovery-password">کلیک کنید</Link>
                                            </span>
                                        </p>
                                    </div>
                                   
                                        <button 
                                            htmlType="submit" 
                                            className="enter-to-panel-btn text-white">
                                            ورود
                                        </button>
                                        {/* <ToastContainer  position="bottom-right" closeOnClick draggable  /> */}
                                    
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="rememberTextPassword">
                        <p>قبلا ثبت نام نکرده‌اید؟
                            <span className="mr-2">

                                {/* { params.referral_code ? <Link to={`/register?referral_code=${params.referral_code}`}>ثبت نام کنید</Link> : <Link to={'/register'}>ثبت نام کنید</Link>} */}

                            </span>
                        </p>
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



const mapDispatchToProps = (dispatch) => {
    return {
        // setPhoneNumber : (data) => dispatch(setPhoneNumber(data)),
        setProfile : (data) => dispatch(setProfile(data)),
        loginSuccess : (data) => dispatch(loginSuccess(data)),
    }
}

const mapStateToProps = (store) => {
    return {
        authReducer : store.authReducer,
        panelReducer : store.panelReducer
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(LoginPage)