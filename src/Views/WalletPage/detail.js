import React, {useEffect , useState} from 'react';

import { Form, Input, Breadcrumb} from 'antd';
import  {fetcher} from '../../utils/common';
import { BASE_URL } from '../../utils';
import {Link , NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import MapComponent from '../../components/MapComponent';

const layout = {
    labelCol: {
        span: 16,
    },
    wrapperCol: {
        span: 24,
    },
};

function Detail(props) {

    const [form] = Form.useForm();

    const [member, setMember] = useState();


    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    const onFinish = (values) => {
        console.log(values);
    };

    const onFinishFailed = (error) => {
        console.log(error);
    };


    useEffect(() => {

        // fetcher(`${BASE_URL}/panel/users/${props.match.params.id}`,{method:"GET",data:"",header:{}}).then(res => {
        fetcher(`${BASE_URL}/panel/wallet/${props.match.params.id}/`,{method:"GET",data:"",header:{}}).then(res => {
            setMember(res.data.result)
            form.setFieldsValue(res.data.result)
            // setCountMember(res.data.count)
            // setBankAccountInfo(res.data.result.bankaccount)
        }).catch(err => {
            console.log(err);
        })

    }, []);

    // useEffect(() => {
    //     form.setFieldsValue({
    //         first_name : member?.first_name,
    //         last_name : member?.last_name,
    //         mobile : member?.mobile,
    //         email : member?.email ? member?.email : 'acution_house@gmail.com',
    //         national_code : member?.national_code ? member?.national_code : '0123456789',
    //         address : member?.address,
    //         count : member?.count,
    //         postal_code : member?.postal_code,
    //         id : member?.id,
    //         card_number : member?.bankaccount[0]?.card_number,
    //         account_number : member?.bankaccount[0]?.account_number,
    //         sheba_number : member?.bankaccount[0]?.sheba_number,
    //         bank_name : member?.bankaccount[0]?.bank_name,
    //         home_auction_name : member?.home_auction_name,
    //         home_auction_type : member?.home_auction_type,
    //     })
    // }, [member]);


    return (
        <React.Fragment>

            <div style={{marginTop : '30px'}} className="container-fluid px-0 container-pages">

                <div  className="row m-0">
                    <div className="col">
                        <div   className="row justify-content-start pb-3 mx-0">
                            <div className="col px-0">
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
                                            <Link to="/wallets"> کیف پول</Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            <Link to="/wallets">{`${member?.user_name}`}</Link>
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                            </div>
                        </div>

                        <div  className="row content-page">

                            <div  className="col  userInfoSection  px-lg-5 ">

                                <Form
                                    {...layout}
                                    name="house-auction-details"
                                    form={form}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    // onValuesChange = {onValuesChange}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    // initialValues={{
                                    //     first_name : member?.first_name,

                                    //     id : "id",
                                    //     card_number : "card_number",
                                    //     account_number : "account_number",
                                    //     sheba_number : "sheba_number",
                                    //     bank_name : "bank_name",
                                    //     home_auction_name : "home_auction_name",
                                    //     last_name : member?.last_name,
                                    //     mobile : member?.mobile,
                                    //     email : member?.email,
                                    //     national_code : member?.national_code,
                                    //     address : member?.adderss,
                                    //     postal_code : member?.postal_code,
                                    //   }}

                                >

                                    <div className="d-flex my-4">
                                        <h3>اطلاعات کیف پول</h3>
                                    </div>


                                    <div  className="d-block d-md-flex align-items-center ">
                                        <div  className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                            <p className="text-right mb-0 h-100">نام کاربری </p>
                                        </div>
                                        <div  className="col ">
                                            <div style={{verticalAlign : 'middle'}} className="d-flex h-100 align-items-center">
                                                <Form.Item
                                                    className="w-100  h-100"
                                                    name="user_name"
                                                    rules={[{ required: true, message: 'ورودی نام خالی است!' }]}
                                                >
                                                    <Input
                                                        // defaultValue = {member?.first_name}
                                                        size="large"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="d-block d-md-flex align-items-center">
                                        <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                            <p className="text-right mb-0 h-100"> موجودی</p>
                                        </div>
                                        <div className="col">
                                            <Form.Item
                                                className="w-100"
                                                name="inventory"
                                                rules={[{ required: true, message: 'ورودی کد ملی خالی است!' }]}
                                            >
                                                <Input

                                                    size="large"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="d-block d-md-flex align-items-center">
                                    <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                        <p className="text-right mb-0 h-100">  هدیه</p>
                                    </div>
                                    <div className="col">
                                        <Form.Item
                                            className="w-100"
                                            name="gift_credit"
                                            rules={[{ required: true, message: 'ورودی کد ملی خالی است!' }]}
                                        >
                                            <Input

                                                size="large"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                    <div className="d-block d-md-flex align-items-center">
                                        <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                            <p className="text-right mb-0 h-100"> موجودی کل</p>
                                        </div>
                                        <div className="col">
                                            <Form.Item
                                                className="w-100"
                                                name="total_inventory"
                                                rules={[{ required: true, message: 'ورودی کد ملی خالی است!' }]}
                                            >
                                                <Input

                                                    size="large"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                </Form>
                            </div>
                            <div className="col-0 col-xl-1">

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

export default connect(mapStateToProps , mapDispatchToProps)(Detail)
