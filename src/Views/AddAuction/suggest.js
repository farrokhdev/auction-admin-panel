import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {Button, Form, Select} from "antd";
import {setAUCTION} from "../../redux/reducers/auction/auction.actions";
import {useDispatch, useSelector} from "react-redux";
import BidAddSuggest from "./BidAddSuggest";
import moment from "moment-jalaali";

const timeInterval = [1,2,3,4,5,15,30,45]

const Suggest = (props) => {
    const {
        selectComponent,
        setSelectComponent,
        // finalData,
        // setFinalData,
        products,
        id,
        payment_method,
        setPayment_method
    } = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    // const [data, setData] = useState({})
    const {extendable_deadline ,steps,type} = useSelector((state) => state.auctionReducer)
    const finalData = useSelector((state) => state.auctionReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(finalData)
        form.setFieldsValue(finalData)
    }, [finalData])

    const onFinish = (values) => {
        console.log(values)
        // setFinalData({...finalData, ...values})
        dispatch(setAUCTION({ ...values}))
        setSelectComponent(selectComponent + 1)
        // sendData(values)
        // dispatch(setAUCTION({steps:values}))

    }
    return (
        <>
            <BidAddSuggest/>

            <Form onFinish={onFinish}
                  form={form}
                // initialValues={{start_time:moment("1398-02-02","jYYYY-jMM-jDD")}}
                  wrapperCol={{span: 24}}>
                <div className="row">
                    <div className="col-xxxxl-8">
                        {((type === "ONLINE") || (type === "PERIODIC")) ? <div className="row">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <label className="default-lable">بازه زمانی پیشنهاد</label>
                                    <Form.Item
                                        className="w-100"
                                        name="bidding_interval"
                                        rules={[
                                            {
                                                required: true,
                                                message: "تکمیل این فیلد ضروری است",
                                            },
                                        ]}>
                                        <Select
                                            className="search-input w-100 fs-6"
                                            size="large"
                                            dropdownClassName="text-right"
                                            placeholder=" بازه زمانی پیشنهاد را انتخاب کنید"
                                            // onChange={value => {
                                            //     setType(value)
                                            // }}
                                        >
                                            {
                                                timeInterval.map((item, index) => (
                                                    <Select.Option value={item}
                                                                   key={index}>{item} دقیقه </Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </div> :''}

                        <div className="row">
                            <div className="col-12">
                                <div className="form-check sm-mrgt35">

                                    <input className="form-check-input" type="checkbox"
                                           checked={extendable_deadline}
                                           onChange={(e) => {
                                               dispatch(setAUCTION({extendable_deadline:e.target.checked}))
                                           }}
                                           id="checkbox413"/>
                                    <label className="form-check-label" htmlFor="checkbox413">
                                        تمدید حراج
                                        <span className="form-check-txt">این گزینه را فعال کنید تا به طور خودکار حراج را با ارائه پیشنهاد در آخرین لحظه تمدید کنید.</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="button-group">

                                    <Button type="button" className="btn-gray" onClick={() => {
                                        if(type ==="ONLINE" || type ==="PERIODIC")
                                            setSelectComponent(selectComponent - 1)
                                        else
                                            setSelectComponent(selectComponent - 2)
                                    }}>بازگشت</Button>


                                    {  <Button className="btn-default" htmlType="submit" disabled={!steps?.length}>ادامه</Button> }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default Suggest;
