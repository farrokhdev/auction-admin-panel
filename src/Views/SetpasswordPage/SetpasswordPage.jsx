import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import axios from "../../utils/request";
import {BASE_URL} from "../../utils";
import {connect} from 'react-redux';
import {loginSuccess} from '../../redux/reducers/auth/auth.actions';
import {setToken} from '../../utils/utils';
import {Form, Input, Checkbox , notification} from 'antd';
import Loading from '../../components/Loading';
import * as QueryString from "query-string";


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

function SetpasswordPage(props) {

    const params = QueryString.parse(props.location.search);
    const inputRef = useRef(null);

    const [userPassword , setUserPassword] = useState();
    const [confirmUserPassword , setConfirmUserPassword] = useState();
    const [isAdmission , setIsAdmission] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {     
        inputRef.current.focus(); 
    }, []);


    const [form] = Form.useForm();

    let payload ;


    const onFinish = (values) => {
        setLoading(true)
        payload = {
            "mobile": props.auth.mobile,
            "password": values.password,
            "password_check": values.password_check,
            "verify_code": props.auth.otp ,
            "token-email" : params.token ? params.token : ''
        }

        if( values.password_check === values.password ){
            axios.post(`${BASE_URL}/account/recover-password/`, payload).then(res => {
               
                // if (res.data && res.data.result.mobile) {
                    // props.registerSuccess(payload)
                    // window.location.href = "#/projects?"
                    // login({input: payload.national_code, password: payload.password});
                // }

                if(res.data.code === 200){
                    setLoading(false)
                    props.loginSuccess({username : props.auth.mobile})
                    openNotificationSuccesSetPassword()

                    setTimeout(() => {
                        window.location.href = "#/home"
                    }, 1300);
                }
            }).catch(err => {
                console.log(err);
                setLoading(false)
            })
       
        }else{
            setLoading(false)
            form.setFields([
                {
                    name : "password_check",
                    errors: ['تکرار گذرواژه همخوانی ندارد!'],
                  },
              ]);   
        }
    }

    // const login = (payload) => {
    //     axios.post(`${BASE_URL}/users/login/`, payload, {headers: {"Site-Origin": "biithome"}}).then(res => {
    //             if (res.data && res.data.result?.access_token) {
    //                 setToken(res.data.result)
    //                 props.loginSuccess({})
    //                 setTimeout(() => {
    //                     window.location.href = "#/panel-profile?"
    //                 }, 500);
    //             }
    //         })
    //         .catch(err => console.log(err))
    // };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const openNotificationSuccesSetPassword = () => {
        notification.success({
          message: 'بازیابی گذرواژه',
          description:`بازیابی گذرواژه با موفقیت انجام شد`,
            duration: 1,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };



    return (
        <React.Fragment>
            <Loading loading={loading}/>
            <div className="containerLoginPage">
            
            <div className="row">
                <div className="col">
            
                <div className="row">
                <div className="col">
                
                <div className="row setPasswordBox bg-white mt-4">
                <div className="col m-0 p-0 ">
                    <div className="headerLogin">
                        ثبت گذرواژه 
                    </div>
                    <div className="d-none d-md-flex boxImageLoginPage "></div>
                    <div className="boxInfoLogin mt-0 mx-sm-4">

                        <div className="col p-0">

                        <Form
                            {...layout}
                            form={form}
                            name="basic"
                            initialValues={{ 
                                remember: true 
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                         
                        >

                            <div>
                                <p className="text-right mb-1 mr-2 mt-3">گذرواژه</p>
                            </div>
                            <div className="row justify-content-center">


                                <div className="col">
                                    <div
                                        style={{
                                        position: 'relative'
                                    }}>

                                        <Form.Item
                                            name="password"
                                            // rules={[{
                                            //     required: true,
                                            //     message: 'ورودی گذرواژه خالی است!',
                                     
                                                
                                            // }
                                            rules={[
                                                { 
                                                    required: true,
                                                    message: 'ورودی گذرواژه خالی است!',
                                                },
                                                
                                                {
                                                    min: 8,
                                                    message: "گذرواژه حداقل 8 کاراکتر می‌باشد!",
                                                },

                                                {
                                                    // pattern: /^[A-Za-z][A-Za-z0-9]*$/,
                                                    pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                    message: "کاراکتر فارسی مجاز نیست!",
                                                }
                                              
                                                
                                            ]}
                                          

                                            
                                       >
                                            <Input.Password
                                                ref={inputRef}
                                                style={{marginTop : '10px'}}
                                                // onChange={event => setUserPassword(event.target.value)}
                                                // value={userPassword}
                                                placeholder="گذرواژه خود را وارد کنید"/>
                                        </Form.Item>

                                        <span className="iconLockSetPass"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-0">
                                <p className="text-right mb-1 mr-2">تکرار گذرواژه</p>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col">
                                    <div
                                        style={{
                                        position: 'relative'
                                    }}>

                                        <Form.Item
                                            name="password_check"
                                            dependencies={['password']}
                                            rules={[{
                                                required: true,
                                                message: 'ورودی تایید گذرواژه خالی است!'
                                            }
                                        ]}>
                                            <Input.Password
                                                // onChange={event => setConfirmUserPassword(event.target.value)}
                                                // value={confirmUserPassword}
                                                placeholder="گذرواژه خود را تکرار کنید"/>
                                        </Form.Item>

                                        <span className="iconLockSetPass"></span>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="row justify-content-center">
                                <div className="col ">
                                    {/* <div
                                        style={{
                                            position: 'relative',
                                            marginBottom : '30px'
                                        }}>

                                        <Form.Item
                                            className="invite-input "
                                            name="referral_code"
                                            
                                            rules={[{
                                                required: false,
                                                message: 'ورودی کد معرف خالی است!',
                                                
                                            }
                                        ]}
                                        >
                                            <Input.Password
                                                readOnly
                                                placeholder="کد معرف خود را وارد کنید"/>
                                        </Form.Item>

                                        <span className="iconPeople"></span>
                                    </div> */}
                                    {/* <div 
                                        className="rememberTextPassword d-flex justify-content-start text-right p-0 mt-2 mb-4  ml-md-0"
                                    >

                                            <Form.Item
                                                style={{height : '20px'}}
                                                    className="border-0 "
                                                    name="agreement"
                                                    valuePropName="checked"
                                                    rules={[
                                                    {
                                                        validator: (_, value) =>
                                                        value ? Promise.resolve() : Promise.reject('با قوانین و مقررات موافقت نکرده‌اید!'),
                                                    },
                                                    ]}
                                                >
                                                    <Checkbox>
                                                     <span className="textAllow text-justify ">با ورود و یا ثبت نام در حراجی آنلاین  <Link className="term-and-conditions">شرایط و قوانین</Link>  را می‌پذیرید</span>
                                                    </Checkbox>
                                            </Form.Item>

                                    </div> */}
                                    
                                    <div className="d-flex ">
                                        <button
                                            htmlType="submit"
                                            id="setPassBtn"
                                            className=" enterToCompany text-white "
                                        >

                                            ثبت گذرواژه
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </Form>
                        </div>

                    </div>
                    <div className="rememberTextPassword">
                  
                    </div>
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
        // setPhoneNumber : (data) => dispatch(setPhoneNumber(data)),
        // setProfile : (data) => dispatch(setProfile(data)),
        loginSuccess : (data) => dispatch(loginSuccess(data)),
    }
}
const mapStateToProps = (store) => {
    return {
        auth : store.authReducer,
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(SetpasswordPage)