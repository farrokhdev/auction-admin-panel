import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Modal, Select, Spin, TimePicker} from "antd";
import DatePicker from 'react-datepicker2';
import {Link} from "react-router-dom";
import moment from 'moment-jalaali'
import {useDispatch, useSelector} from "react-redux";
import {setAUCTION} from "../../redux/reducers/auction/auction.actions";
import UploadImage from "./uploadImage";
import locale from "antd/es/date-picker/locale/de_DE";
import axios from "../../utils/request";
import {UrlQuery} from "../../utils/utils";
import {BASE_URL} from "../../utils";
import {LIST_HOUSE_AUCTIONS} from "../../utils/constant";

// const listAuctionType = [
//     {name: "SECOND_HIDDEN", value: "دومین قیمت پیشنهاد با حراج (مخفی)"},
//     {name: "HIDDEN", value: "قیمت پیشنهاد با حراج (مخفی)"},
//     {name: "PERIODIC", value: "حراج زمان دار"},
//     {name: "ONLINE", value: "آنلاین"},
//     {name: "LIVE", value: "زنده"},
// ]

const ChooseHouseAuction = (props) => {

    const {selectComponent, setSelectComponent} = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [type, setType] = useState("")


    const {house_id} = useSelector((state) => state.auctionReducer)
    const finalData = useSelector((state) => state.auctionReducer)
    const dispatch = useDispatch();
    useEffect(()=>{
        // setSelectProduct([])
        if(house_id){
            form.setFieldsValue({house_id})
        }
        getData()
    },[])
    const getData = (e="") => {
        setLoading(true)
        axios.get((`${BASE_URL}${LIST_HOUSE_AUCTIONS}`))
            // axios.get(UrlQuery(`${BASE_URL}${LIST_PRODUCTS}`,{auction_houses__id:id,product_assign:false}))
            .then(resp => {
                setLoading(false)

                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    const res = resp.data?.data?.result;
                    setData(res)
                    // setDataCount(resp.data?.data?.count)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
                message.error("صفحه را دوباره لود کنید")
            })
    }

    return (
        <>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <label className="default-lable"> انتخاب خانه حراجی</label>
                                    <Form.Item
                                        className="w-100"
                                        name="house_id"
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
                                            placeholder="نوع  حراجی را انتخاب کنید"
                                            onChange={value => {
                                                setType(value)
                                            }}
                                        >
                                            {
                                                data.map((item, index) => (
                                                    <Select.Option value={item.id}
                                                                   key={index}>{item.home_auction_name}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
        </>
    );
};

export default ChooseHouseAuction;
