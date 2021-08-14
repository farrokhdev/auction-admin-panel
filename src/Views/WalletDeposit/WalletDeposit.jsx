import React, {useState, useEffect} from 'react';
import {BASE_URL} from '../../utils';
import {Form, Breadcrumb, Select, Input, message} from 'antd';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import axios from '../../utils/request';
import ModalConfirmDeposit from './ModalConfirmDeposit';



function WalletDeposit(props) {

    const [members, setMembers] = useState([]);
    const [visibleCofirmDeposit, setVisibleCofirmDeposit] = useState(false);
    const [giftAmount, setGiftAmount] = useState(0);
    const [usersSelect, setUsersSelect] = useState([]);


    const [form] = Form.useForm();
    useEffect(() => {
       axios.get(`${BASE_URL}/panel/users/`).then(res => {
           setMembers(res.data.data.result)
       }).catch(err => {
           console.error(err);
       })
    }, []);

    const { Option } = Select;

    const onFinish = (values) => {
        // console.log(values);
        // setGiftAmount(values.gift_credit)
        // setUsersSelect(values.user)
        // setTimeout(() => {
        //     setVisibleCofirmDeposit(true)
        // }, 1000);
        axios.post(`${BASE_URL}/panel/credit/gift`,values).then(res => {
            // setMembers(res.data.data.result)
            message.success("شارژ هدیه با موفقیت اضافه شد");
            props.history.push("/wallets")
        }).catch(err => {
            console.error(err);
            message.error("دوباره تلاش کنید");
        })
    }   
    
    const onFinishFailed = (values) => {
        console.log(values);
    }
    

    return (
        <React.Fragment>
            {/* <Loading loading={loading} /> */}
            <div  className="container-fluid px-0 container-pages">
                <div className="row m-0">
                    <div className="col">
                        <div className="row ">
                            <div className="col content-panel-pages px-0 mx-0">
                                    <div className="row justify-content-start pb-3 mx-0">
                                        <div className="col">
                                            <div className="d-flex">
                                                <Breadcrumb>
                                                    <Breadcrumb.Item><NavLink 
                                                            key="1"
                                                            onClick={ e => props.toggleActiveNavDrawer("1")}
                                                            to="/">
                                                            خانه
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                        شارژ هدیه
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">

                                        <Form
                                                id="form-wallet-gift"
                                                name="basic"
                                                form={form}
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                initialValues={{
                                                remember: true
                                            }}
                                                onFinish={onFinish}
                                                onFinishFailed={onFinishFailed}>

                                                <div className="d-block d-lg-flex">
                                                    <div className="col col-md-3">
                                                        <div className="d-flex">
                                                            <p className="mb-0 mb-2 mb-lg-0">انتخاب کاربران</p>
                                                        </div>
                                                    </div>
                                                    <div className="col">


                                                    <Form.Item
                                                        className="text-right w-100"
                                                        name="user"
                                                        rules={[
                                                        {
                                                            required: true,
                                                            message: 'کاربر را انتخاب نکرده‌اید!',
                                                            type: 'array',
                                                        },
                                                        ]}
                                                        >
                                                        <Select className="" mode="multiple" placeholder="مخاطب را انتخاب کنید">
                                                            {members.length >= 1 ? members.map(member => (

                                                                <React.Fragment key={member?.id}>
                                                                    <Option value={`${member?.id}`}>{member?.first_name}</Option>
                                                                </React.Fragment>
                                                            )) : <Option value=""></Option>}
                                                        
                                                        </Select>
                                                    </Form.Item>

                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="d-block d-lg-flex">
                                                    <div className="col col-md-3">
                                                        <div className="d-flex">
                                                            <p className="mb-0 mb-2 mb-lg-0">مبلغ (تومان)</p>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                    <Form.Item 
                                                    name="gift_credit"  
                                                    rules={[{ 
                                                        required: true ,
                                                        message: 'مبلغ  را وارد نکرده‌اید!'
                                                        },
                                                        {
                                                            pattern: /^[\u06F0-\u06F90-9]+$/,
                                                            message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                        },

                                                        {
                                                            message: "حداکثر تعداد کاراکترها 10 رقم می‌باشد!",
                                                        }
                                                        
                                                    ]}>
                                                    <Input
                                                        
                                                        // placeholder="Select a option and change input text above"
                                                    >
                                                        
                                                    </Input>
                                                </Form.Item>
                                                    </div>
                                                    <div className="col"></div>
                                                </div>

                                       
                                                <div className="d-flex justify-content-end">
                                                    <button htmlType="submit" className="btn-submit-new-ticket mr-2 mt-4">واریز</button>
                                                </div>

                                            </Form>
                                        </div>
                                    </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalConfirmDeposit 
                setVisibleCofirmDeposit={setVisibleCofirmDeposit}
                visibleCofirmDeposit = {visibleCofirmDeposit}
                giftAmount={giftAmount}
                usersSelect={usersSelect}
            />
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(WalletDeposit)
