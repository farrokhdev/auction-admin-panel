import React, {useState , useRef} from 'react'
import {Form, Input , message , notification} from 'antd';
import axios from "../../utils/request";
import {BASE_URL} from '../../utils'
import { setPhoneNumber} from '../../redux/reducers/auth/auth.actions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';

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

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};

function RecoveryPassword(props) {

    const inputRef = useRef(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [usernameField , setUsernameField] = useState();

    const openNotificationMobile = () => {
        notification.success({
          message: 'بازیابی گذرواژه',
          description:`کد بازیابی گذرواژه به ${usernameField ? usernameField : ''} ارسال شد`,
            duration: 1,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };

      const openNotificationEmail = () => {
        notification.success({
          message: 'بازیابی گذرواژه',
          description:`کد بازیابی گذرواژه به ${usernameField ? usernameField : ''} ارسال شد`,
            duration: 1,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setLoading(true)
        let payload = {
            "username": values.username
        }

        axios.post(`${BASE_URL}/account/request-password/`, payload).then(res => {

            if(res.data.code === 200){
                setLoading(false)
                if(res.data.data.result.type === "mobile"){
                    setTimeout(() => {
                        openNotificationMobile('topLeft')
                        props.setPhoneNumber({mobile : payload.username})

                        }, 1000);

                        setTimeout(() => {
                            window.location.href = "#/confirm-code"
                        }, 1500);
                    }
                    
                    else{
                        openNotificationEmail('topLeft')

                        setTimeout(() => {
                            // window.location.href = "#/confirm-code"
                        }, 1500);
                    }
                }
        

            }).catch(err => {
                console.log(err.response?.data?.data?.error_message);
                setLoading(false)
                if(err.response && err.response?.data?.data?.error_message !== 'ok' && err.response?.data?.data?.error_message !== undefined ){
                    message.error({content: `${' '}${err.response?.data?.data?.error_message}`,
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

    return (
        <React.Fragment>
            <Loading loading={loading}/>
            <div className="containerLoginPage">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="row recoveryPasswordPage bg-white mt-4">
                                    <div className="col m-0 p-0 ">
                                        <div className="headerLogin">
                                            بازیابی گذرواژه
                                        </div>

                                        <div className="boxInfoLogin mx-sm-4">
                                            <div className="col p-0">
                                                <div>
                                                    <p className="text-right">شماره موبایل / ایمیل</p>
                                                </div>
                                                <div className="row justify-content-center ">
                                                    <div className="col ">

                                                        <Form
                                                            {...layout}
                                                            form={form}
                                                            name="basic"
                                                            initialValues={{
                                                            remember: true
                                                        }}
                                                            onFinish={onFinish}
                                                            onFinishFailed={onFinishFailed}>
                                                            <div className="mobileField">
                                                                <Form.Item
                                                                    name="username"
                                                                    rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'ورودی ایمیل یا موبایل خالی است!'
                                                                    }
                                                                ]}>
                                                                    <Input onChange={(e)=>setUsernameField(e.target.value)}  placeholder="موبایل یا ایمیل را وارد کنید"/>
                                                                </Form.Item>
                                                                <span className="iconLock_national_code_RecoverPassword"></span>
                                                            </div>
                                                            <div className="d-flex justify-content-center ">
                                                                <button htmlType="submit" className="btn-get-confirm-code text-white ">
                                                                    دریافت کد تایید
                                                                </button>
                                                            </div>
                                                        </ Form>
                                                    </div>
                                                </div>
                                            </div>
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
        setPhoneNumber : (data) => dispatch(setPhoneNumber(data)),
        // setProfile : (data) => dispatch(setProfile(data)),
        // loginSuccess : (data) => dispatch(loginSuccess(data)),
    }
}

const mapStateToProps = (store) => {
    return {
        auth : store.authReducer,
        panelReducer : store.panelReducer
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(RecoveryPassword)