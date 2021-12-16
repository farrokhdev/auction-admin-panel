import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Select, Spin, TimePicker } from "antd";
import DatePicker from 'react-datepicker2';
import { Link } from "react-router-dom";
import moment from 'moment-jalaali'
import { useDispatch, useSelector } from "react-redux";
import { setAUCTION } from "../../redux/reducers/auction/auction.actions";
import UploadImage from "./uploadImage";
import locale from "antd/es/date-picker/locale/de_DE";
import ChooseHouseAuction from "./ChooseHouseAuction";
import momentJalaali from "moment-jalaali"

const listAuctionType = [
    { name: "SECOND_HIDDEN", value: "دومین قیمت پیشنهاد با حراج (مخفی)" },
    { name: "HIDDEN", value: "قیمت پیشنهاد با حراج (مخفی)" },
    { name: "PERIODIC", value: "حراج زمان دار" },
    { name: "ONLINE", value: "آنلاین" },
    { name: "LIVE", value: "زنده" },
]

const BaseInformation = (props) => {

    const { selectComponent, setSelectComponent } = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    // const [data, setData] = useState({})
    const [type, setType] = useState("")


    // const {has_gallery} = useSelector((state) => state.auctionReducer)
    const finalData = useSelector((state) => state.auctionReducer)
    const [media, setMedia] = useState(null)
    const [has_gallery_state, setHas_gallery_state] = useState(false)
    const [today, setToday] = useState(finalData?.start_time || moment())
    const [todayGallery, setTodayGallery] = useState(finalData?.gallery_start_date || moment())
    const dispatch = useDispatch();
    useEffect(() => {
        let listDate = {}
        finalData?.start_time && (listDate["start_time"] = moment(finalData?.start_time))
        finalData?.gallery_start_date && (listDate["gallery_start_date"] = moment(finalData?.gallery_start_date || ''))
        finalData?.end_time && (listDate["end_time"] = moment(finalData?.end_time))
        finalData?.gallery_end_date && (listDate["gallery_end_date"] = moment(finalData?.gallery_end_date))
        finalData?.start_clock && (listDate["start_clock"] = moment(finalData?.start_clock))
        finalData?.end_clock && (listDate["end_clock"] = moment(finalData?.end_clock))
        finalData?.gallery_start_clock && (listDate["gallery_start_clock"] = moment(finalData?.gallery_start_clock))
        finalData?.gallery_end_clock && (listDate["gallery_end_clock"] = moment(finalData?.gallery_end_clock))
        finalData?.type && (setType(finalData?.type))
        setMedia(finalData?.media || null)
        setHas_gallery_state(finalData?.has_gallery || false)

        form.setFieldsValue({
            ...listDate,
            title: finalData?.title,
            type: finalData?.type,
            description: finalData?.description,
            address: finalData?.address,
            house_id: finalData?.house_id
            // start_clock: finalData?.start_clock,
            // end_clock: finalData?.end_clock,
            // gallery_start_clock: finalData?.gallery_start_clock,
            // gallery_end_clock: finalData?.gallery_end_clock,

        })
    }, [finalData])
    // console.log((form.getFieldsValue()))
    const onFinish = (values) => {
        // console.log(values)
        // setFinalData({...finalData, ...values})
        if (media) {
            dispatch(setAUCTION({ ...values, media, has_gallery: has_gallery_state }))
            setSelectComponent(selectComponent + 1)
        } else {
            message.error("آپلود تصویر آکشن اجباری می باشد")
        }

    }
    const handleDateChange = () => {
        // dispatch(setAUCTION({  productsArrayDate: [],
        //     productsDate: {}}))
    }
    const handleResultUpload = (value) => {
        if (value?.media_path)
            setMedia(value)
        // dispatch(setAUCTION({media:value}))
    }
    return (
        <>

            <Form onFinish={onFinish}
                form={form}
                wrapperCol={{ span: 24 }}>
                <div className="row">
                    <div className="col-xxxxl-8">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <label className="default-lable">نوع حراج</label>
                                    <Form.Item
                                        className="w-100"
                                        name="type"
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
                                                listAuctionType.map((item, index) => (
                                                    <Select.Option value={item.name}
                                                        key={index}>{item.value}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <ChooseHouseAuction />

                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <label className="default-lable">نام حراج</label>
                                    <Form.Item
                                        className="w-100"
                                        name="title"
                                        rules={[
                                            {
                                                required: true,
                                                message: "تکمیل این فیلد ضروری است",
                                            },
                                        ]}>
                                        <input type="text" className="default-input"
                                            placeholder="نام حراج را وارد نمایید." />
                                    </Form.Item>

                                </div>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <UploadImage handleResultUpload={handleResultUpload} initialImage={media} />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <label className="default-lable"> متن جزییات</label>
                                    <Form.Item
                                        className="w-100"
                                        name="description"
                                        rules={[
                                            {
                                                required: true,
                                                message: "تکمیل این فیلد ضروری است",
                                            },
                                            {
                                                max: 500,
                                                message: "حداکثر 500کاراکتر",
                                            },
                                        ]}>
                                        <textarea className="" placeholder="جزییات حراج را وارد نمایید." />
                                    </Form.Item>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <label className="default-lable">تاریخ شروع</label>
                                            <Form.Item
                                                className="w-100"
                                                name="start_time"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد ضروری است",
                                                    },
                                                ]}>
                                                <DatePicker
                                                    className="default-input pr-2 mt-2"
                                                    // value={this.state.date}
                                                    // setTodayOnBlur={false}
                                                    timePicker={false}
                                                    isGregorian={false}
                                                    onChange={(value) => {
                                                        if (value) {
                                                            setToday(value)
                                                            // handleDateChange()
                                                        }

                                                    }}
                                                    name="start_time"
                                                    id="start_time"
                                                    min={momentJalaali().add(-1,'days')}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <label className="default-lable">ساعت شروع</label>
                                            <Form.Item
                                                className="w-100"
                                                name="start_clock"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد ضروری است",
                                                    },
                                                ]}>
                                                <TimePicker locale={{
                                                    ...locale,
                                                    lang: {
                                                        ...locale.lang,
                                                        ok: "تایید",
                                                    }
                                                }}
                                                    placeholder="00:00"
                                                    format={"HH:mm"} showNow={false} className="default-input custom-timePicker mt-2" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    {type !== 'LIVE' && <div className="col-md-6">
                                        <div className="input-group">
                                            <label className="default-lable">تاریخ پایان</label>
                                            <Form.Item
                                                className="w-100"
                                                name="end_time"

                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد ضروری است",
                                                    },
                                                    {
                                                        validator: (_, value) =>
                                                            value >= today ? Promise.resolve() : Promise.reject(new Error(` تاریخ بزرگتر از تاریخ شروع وارد کنید `))
                                                    },
                                                ]}>
                                                <DatePicker
                                                    className="default-input pr-2 mt-2"
                                                    // setTodayOnBlur={false}
                                                    // value={this.state.date}
                                                    timePicker={false}
                                                    isGregorian={false}
                                                    // onChange={handleDateChange}
                                                    name="end_time"
                                                    id="end_time"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>}

                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <label className="default-lable">ساعت پایان</label>
                                            <Form.Item
                                                className="w-100"
                                                name="end_clock"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد ضروری است",
                                                    },
                                                ]}>
                                                <TimePicker locale={{
                                                    ...locale,
                                                    lang: {
                                                        ...locale.lang,
                                                        ok: "تایید",
                                                    }
                                                }}
                                                    placeholder="00:00"
                                                    format={"HH:mm"} showNow={false} className="default-input custom-timePicker mt-2" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    {type === 'ONLINE' && <>
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox"
                                                        checked={has_gallery_state}
                                                        onChange={e => setHas_gallery_state(e.target.checked)
                                                            // dispatch(setAUCTION({has_gallery: e.target.checked}))
                                                        }
                                                        id="checkboxphysicalex" />
                                                    <label className="form-check-label" htmlFor="checkboxphysicalex">
                                                        نمایش در نمایشگاه فیزیکی
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {has_gallery_state && <>
                                            <div className="col-md-6" />
                                            <div className="col-md-6">
                                                <div className="input-group">
                                                    <label className="default-lable"> تاریخ شروع نمایشگاه</label>
                                                    <Form.Item
                                                        className="w-100"
                                                        name="gallery_start_date"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "تکمیل این فیلد ضروری است",
                                                            },
                                                        ]}>
                                                        <DatePicker
                                                            className="default-input pr-2 mt-2"
                                                            // value={this.state.date}
                                                            timePicker={false}
                                                            isGregorian={false}
                                                            onChange={(value) => {
                                                                if (value) {
                                                                    setTodayGallery(value)
                                                                }
                                                            }}
                                                            name="gallery_start_date"
                                                            id="gallery_start_date"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-group">
                                                    <label className="default-lable">ساعت شروع نمایشگاه </label>
                                                    <Form.Item
                                                        className="w-100"
                                                        name="gallery_start_clock"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "تکمیل این فیلد ضروری است",
                                                            },
                                                        ]}>
                                                        <TimePicker locale={{
                                                            ...locale,
                                                            lang: {
                                                                ...locale.lang,
                                                                ok: "تایید",
                                                            }
                                                        }}
                                                            placeholder="00:00"
                                                            format={"HH:mm"} showNow={false} className="default-input custom-timePicker mt-2" />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-group">
                                                    <label className="default-lable">تاریخ پایان نمایشگاه</label>
                                                    <Form.Item
                                                        className="w-100"
                                                        name="gallery_end_date"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "تکمیل این فیلد ضروری است",
                                                            },
                                                            {
                                                                validator: (_, value) =>
                                                                    value >= todayGallery ? Promise.resolve() : Promise.reject(new Error(` تاریخ بزرگتر از تاریخ شروع وارد کنید `))
                                                            },
                                                        ]}>
                                                        <DatePicker
                                                            className="default-input pr-2 mt-2"
                                                            // value={this.state.date}
                                                            timePicker={false}
                                                            isGregorian={false}
                                                            // onChange={this.handleDateChange}
                                                            // name="gallery_end_date"
                                                            id="gallery_end_date"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="input-group">
                                                    <label className="default-lable">ساعت پایان نمایشگاه</label>
                                                    <Form.Item
                                                        className="w-100"
                                                        name="gallery_end_clock"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "تکمیل این فیلد ضروری است",
                                                            },
                                                        ]}>
                                                        <TimePicker locale={{
                                                            ...locale,
                                                            lang: {
                                                                ...locale.lang,
                                                                ok: "تایید",
                                                            }
                                                        }}
                                                            placeholder="00:00"
                                                            format={"HH:mm"} showNow={false} className="default-input custom-timePicker mt-2" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="input-group">
                                                    <label className="default-lable"> آدرس</label>
                                                    <Form.Item
                                                        className="w-100"
                                                        name="address"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "تکمیل این فیلد ضروری است",
                                                            },
                                                            {
                                                                max: 500,
                                                                message: "حداکثر 500کاراکتر",
                                                            },
                                                        ]}>
                                                        <textarea className="default-input"
                                                            placeholder="آدرس حراج را وارد نمایید." />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </>}
                                    </>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="button-group">
                                    {/*<button type="button" className="btn-gray">لغو</button>*/}
                                    <Button type="button" className="btn-default" htmlType="submit">ثبت و ادامه</Button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Form>
        </>
    );
};

export default BaseInformation;