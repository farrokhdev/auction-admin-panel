import React , {useState , useEffect , useRef} from 'react';
import axios from "../../utils/request";
import {BASE_URL} from "../../utils";
import {Form,Input , message , notification} from 'antd';
import * as QueryString from "query-string";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getOtp} from '../../redux/reducers/auth/auth.actions';
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
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function ConfirmCodeOtpPage(props) {
    const [form] = Form.useForm();
    const [usernameField , setUsernameField] = useState(props.auth.mobile);
    const [loading, setLoading] = useState(false);

    const params = QueryString.parse(props.location.search);
    console.log("params Confirm =>>>>>>",params);
    const inputRef = useRef(null);
    const [confirmCode, setConfirmCode] = useState();
    const [counter, setCounter] = useState(59);

    console.log("Mobile =>>> ", props.auth.mobile);
     
    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          let id = setInterval(() => {
            savedCallback.current();
          }, delay);
          return () => clearInterval(id);
        }, [delay]);
    }

      
        useInterval(() => {
            setCounter(counter - 1);
          }, 1000)

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


    const handleGetCodeVerify = () => {
        setCounter(59)
        let payload = {
            "mobile": props.auth.mobile,
        }


        axios.post(`${BASE_URL}/account/request-password/`, payload).then(res => {

            if(res.data.code === 200){
                openNotificationMobile('topLeft')
            }
        }).catch(err => {
            console.log(err);
        })

            

    };
    
    const onFinish = (values) => {

        setLoading(true)
        let payload = {
            // "mobile":"09366661196",
            // "verify_code":6998
            
            // "id": props.authReducer.data?.id,
            // "mobile":props.authReducer.data?.mobile,11
            "mobile": props.auth.mobile ,
            "verify_code": values.verify_code ,
            }

            // confirmCode = values.otp ;

            if(values.verify_code > 3)(
                axios.post(`${BASE_URL}/account/approve-mobile/` , payload).then(res => {

                if (res.data && res.data.data.result?.mobile){
                    setLoading(false)
                    props.getOtp({otp : payload.verify_code})
                    window.location.href = "#/set-password"
                }
                }).catch(err => {
                    console.log(err.response);
                    setLoading(false)
                    if(err.response && err.response?.data?.data?.error_message !== 'ok' && err.response?.data?.data?.error_message !== undefined ){
                        message.error({content: `${' '}${err.response?.data?.data?.error_message}`,
                        className: 'text-danger',
                        style: {
                        marginTop: '10vh',
                        },})
                    }
                })
            )
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
            
                        <div className="row loginPage bg-white mt-4">
                            <div className="col m-0 p-0">
                                <div className="headerLogin">
                                    تایید شماره تلفن همراه
                                </div>
                                <div className="d-none d-xl-flex boxImageLoginPage">
                                    <div className="imageConfirmPhone"></div>
                                </div>
                                <div className="boxNumberPhone mx-sm-4">
                                    <div className="col p-0">
                                        <div>
                                            <p className="text-right">کد تایید</p>
                                        </div>
                                        <div className="row justify-content-center ">
                                            <div className="col">

                                                <Form
                                                    {...layout}
                                                    form={form}
                                                    name="basic"
                                                    initialValues={{
                                                    remember: true
                                                }}
                                                    onFinish={onFinish}
                                                    onFinishFailed={onFinishFailed}>

                                                    <div
                                                        style={{
                                                        position: 'relative'
                                                    }}>

                                                        {counter > 1
                                                            ? <span className="timerConfirmPhoneNumber">00:{counter}</span>
                                                            : <button onClick={handleGetCodeVerify} className="againSendCodeBtn">ارسال مجدد کد
                                                            </button>}

                                                        <Form.Item
                                                            name="verify_code"
                                                            rules={[
                                                            {
                                                                required: false,
                                                                message: 'کد تایید وارد نشده!'
                                                            }, {
                                                                pattern: /^[\d]{0,5}$/,
                                                                message: "تنها کاراکتر عدد معتبر می‌باشد!"
                                                            }, {
                                                                maxLength: 5,
                                                                message: "حداکثر تعداد کاراکترها 4 رقم می‌باشد!"
                                                            }
                                                        ]}>
                                                            <Input
                                                                ref={inputRef}
                                                                maxLength={5}
                                                                onChange=
                                                                {(event)=>{setConfirmCode(event.target.value)}}
                                                                placeholder="کد تایید خود را وارد کنید"/>
                                                        </Form.Item>

                                                        <span className="iconLockConfirm"></span>
                                                    </div>
                                                    <div className="d-flex ">
                                                        <button
                                                            htmlType="submit"
                                                            disabled={!Boolean(confirmCode
                                                            ?.length > 3)}
                                                            className="sendConfirmCode">
                                                            ارسال کد تایید
                                                        </button>
                                                    </div>

                                                    <div className="changeNumberText mb-2">
                                                        <p>
                                                            {/* <Link to={'/register'}>تغییر شماره تلفن همراه</Link> */}
                                                        </p>
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
            </div>
        </React.Fragment>
    )
}

// export default ConfirmCodeOtpPage;


const mapDispatchToProps = (dispatch) => {
    return {
        getOtp : (data) => dispatch(getOtp(data)),
    }
}

const mapStateToProps = (store) => {
    return {
        auth : store.authReducer,
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(ConfirmCodeOtpPage)