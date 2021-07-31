import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Select, Spin} from "antd";
import DatePicker from 'react-datepicker2';
import {Link} from "react-router-dom";
import moment from 'moment-jalaali'
import {setAUCTION} from "../../redux/reducers/auction/auction.actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";



const Currency = (props) => {

    const {selectComponent, setSelectComponent, finalData, setFinalData} = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [type, setType] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
    }, [])

    const onFinish = (values) => {
        // console.log(values)
        // setFinalData({...finalData, ...values})
        setSelectComponent(selectComponent + 1)
    }

    return (
        <Form onFinish={onFinish}
              form={form}
              wrapperCol={{span: 24}}>
            <div className="row">
                <div className="col-12">
                    <div className="form-check sm-mrgt35">
                        <input className="form-check-input" type="checkbox" value=""
                               id="checkbox41"/>
                        <label className="form-check-label" htmlFor="checkbox41">
                            نرخ تبدیل ارز روزانه
                        </label>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="input-group">
                        <label className="default-lable">نرخ تبدیل از ریال به دلار</label>
                        <input type="text" className="default-input" placeholder="نرخ تبدیل را وارد نمایید."/>
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
                        <Button className="btn-default" htmlType="submit">ادامه</Button>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default Currency;

