import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Select, Spin} from "antd";

import {Redirect} from "react-router-dom";
import moment from 'moment-jalaali'
import axios from "../../utils/request";
import {BASE_URL} from "../../utils";
import {ADD_AUCTION} from "../../utils/constant";
import {useDispatch} from "react-redux";
import {removeAUCTION, setAUCTION} from "../../redux/reducers/auction/auction.actions";

const listAuctionType = [
    {name: "SECOND_HIDDEN", value: "دومین قیمت پیشنهاد با حراج (مخفی)"},
    {name: "HIDDEN ", value: "قیمت پیشنهاد با حراج (مخفی)"},
    {name: "PERIODIC ", value: "حراج زمان دار"},
    {name: "ONLINE  ", value: "آنلاین"},
    {name: "LIVE  ", value: "زنده"},
]

const Conditions = (props) => {

    const {selectComponent, setSelectComponent, finalData, setFinalData, products, id,payment_method,setPayment_method,sendData} = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const dispatch = useDispatch();
    const onFinish = (values) => {

        console.log(values)
        // setFinalData({...finalData, ...values})
        dispatch(setAUCTION({ ...values}))
        // sendData(values)
            sendData(values)

    }
    useEffect(() => {
        form.setFieldsValue(finalData)
        // if(finalData?.data?.payment_method)
        // setPayment_method(true)
    }, [finalData])


    console.log(finalData)
    return (
        <Form onFinish={onFinish}
              form={form}
            // initialValues={{start_time:moment("1398-02-02","jYYYY-jMM-jDD")}}
              wrapperCol={{span: 24}}>
            <div className="row">
                <div className="col-xxxxl-8">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-check sm-mrgt35">
                                <input className="form-check-input" type="checkbox" checked={payment_method==="ONLINE"}
                                       onChange={e => {
                                           if (e.target.checked)
                                               setPayment_method("ONLINE")
                                           else
                                               setPayment_method("OFFLINE")
                                       }}/>
                                <label className="form-check-label" htmlFor="checkbox41">
                                    پرداخت آنلاین
                                    <span className="form-check-txt">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                                </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <label className="default-lable">نحوه‌ی پرداخت</label>
                                <Form.Item
                                    className="w-100"
                                    name="payment_method_conditions"
                                    rules={[
                                        {
                                            max: 500,
                                            message: "حداکثر 500کاراکتر",
                                        },
                                    ]}>
                               <textarea rows="3" className=""
                                         placeholder="شرایط پرداخت را وارد نمایید."/>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <label className="default-lable">قوانین بازگشت</label>
                                <Form.Item
                                    className="w-100"
                                    name="return_rules"
                                    rules={[
                                        {
                                            max: 500,
                                            message: "حداکثر 500کاراکتر",
                                        },
                                    ]}>
                               <textarea rows="3" className=""
                                         placeholder="قوانین بازگشت را وارد نمایید."/>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <label className="default-lable">حمل ونقل</label>
                                <Form.Item
                                    className="w-100"
                                    name="transportation"
                                    rules={[
                                        {
                                            max: 500,
                                            message: "حداکثر 500کاراکتر",
                                        },
                                    ]}>
                               <textarea rows="3" className=""
                                         placeholder="نحوه‌ی انتقال اثر را وارد نمایید."/>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="button-group">

                                <Button type="button" className="btn-gray" onClick={() => {
                                    setSelectComponent(selectComponent - 1)
                                }}>بازگشت
                                </Button>

                                <Button className="btn-default" htmlType="submit">ثبت </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default Conditions;
