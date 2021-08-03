import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Select, Spin, Upload} from "antd";
import DatePicker from 'react-datepicker2';
import {Link} from "react-router-dom";
import moment from 'moment-jalaali'
import {setAUCTION, uploadExel} from "../../redux/reducers/auction/auction.actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import PriceAddValidate from "./PriceAddValidate";
import {UploadOutlined} from "@ant-design/icons";
import UploadAxios from "../../utils/uploadRequest";
import {BASE_URL} from "../../utils";
import {UPLOAD_EXEL_AUCTION} from "../../utils/constant";


const Validate = (props) => {

    const {selectComponent, setSelectComponent} = props
    const [form] = Form.useForm();
    // const [loading, setLoading] = useState(false)
    // const [data, setData] = useState({})
    // const [type, setType] = useState("")
    const [validate, setValidate] = useState(false)
    const [invitationCard, setInvitationCard] = useState(false)
    const [description, setDescription] = useState(false)
    const {
        validations_auction,
        has_recommendation,

        add_previous_buyer,
        other,
        is_send_invitation,
        details
    } = useSelector((state) => state.auctionReducer)
    const finalData = useSelector((state) => state.auctionReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue({details: details || ""})
    }, [])

    const onFinish = (values) => {
        // console.log(values)
        // setFinalData({...finalData, ...values})
        dispatch(setAUCTION({...values}))
        setSelectComponent(selectComponent + 1)
    }

    return (
        <>
            <div className="col-xxxxl-8">
                <div className="row">
                    {/*<div className="col-12">*/}
                    {/*    <div className="form-check sm-mrgt35">*/}
                    {/*        <input className="form-check-input" type="checkbox" checked={admin_confirmation}*/}
                    {/*               onChange={e => dispatch(setAUCTION({*/}
                    {/*                   admin_confirmation: e.target.checked,*/}
                    {/*                   is_send_invitation: false,*/}
                    {/*                   has_recommendation: false,*/}
                    {/*                   add_previous_buyer: false,*/}
                    {/*                   other: false,*/}
                    {/*               }))}*/}
                    {/*               id="checkbox41"/>*/}
                    {/*        <label className="form-check-label" htmlFor="checkbox41">*/}
                    {/*            اعتبارسنجی توسط گالری آرتیبیشن*/}
                    {/*            <span className="form-check-txt">اگر می خواهید سایت مسئول مراحل احراز هویت باشد ، این گزینه را فعال کنید</span>*/}
                    {/*        </label>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
                 <div className="row">
                        <div className="col-12">
                            <div className="form-check sm-mrgt35">
                                <input className="form-check-input" type="checkbox" checked={is_send_invitation}
                                       onChange={e => dispatch(setAUCTION({is_send_invitation: e.target.checked,

                                           has_recommendation: false,
                                           add_previous_buyer: false,
                                           other: false,
                                       }))}
                                       id="checkbox42"/>
                                <label className="form-check-label" htmlFor="checkbox42">
                                    ارسال دعوتنامه
                                    <span className="form-check-txt">با فعال کردن گزینه ارسال دعوتنامه می توانید لیستی از خریداران را آپلود کنید </span>
                                </label>
                            </div>

                        </div>
                        {is_send_invitation ? <div className="col-12 mb-4" dir="ltr">
                                {/*<button type="button" className="btn-outline-pink" >آپلود لیست</button>*/}
                                <div className="text-end">
                                    <Upload {...props} className="btn-outline-pink" style={{color: "#e6007e"}}
                                            customRequest={
                                                async (e) => {
                                                    const {onSuccess, onError, file, action, onProgress} = e;
                                                    let getDate = new Date();
                                                    let formData = new FormData()
                                                    getDate = moment(getDate).format("YYYY-MM-DDThh:mm")
                                                    onSuccess({"status": "uploading"})
                                                    await formData.append('file', e?.file)
                                                    if (finalData?.title)
                                                        await UploadAxios.put(`${BASE_URL}${UPLOAD_EXEL_AUCTION(finalData?.title + getDate)}`, formData)
                                                            .then(r => {
                                                                if (r?.data.code === 201)
                                                                    onSuccess({"status": "done"})
                                                                else
                                                                    onError(() => {
                                                                    }, {"status": "error"})
                                                            }).catch(e => {
                                                                onError({"status": "error"})
                                                            })
                                                }
                                            }>
                                        <Button className="btn-outline-pink border-0 m-0" style={{color: "#e6007e"}}
                                                icon={<UploadOutlined/>}>آپلود لیست </Button>
                                    </Upload>
                                </div>

                            </div>
                            :
                            <>
                                <div className="col-12">
                                    <div className="form-check sm-mrgt35">
                                        {/*<input className="form-check-input" type="checkbox" value=""*/}
                                        {/*id="checkbox43"/>*/}
                                        <label className="form-check-label" htmlFor="checkbox43">
                                            افزایش اعتبار
                                        </label>
                                    </div>
                                </div>

                                <PriceAddValidate/>

                                <div className="col-12">
                                    <div className="form-check ">
                                        <input className="form-check-input" type="checkbox" checked={has_recommendation}
                                               onChange={e => dispatch(setAUCTION({has_recommendation: e.target.checked}))}
                                               id="checkbox53"/>
                                        <label className="form-check-label" htmlFor="checkbox53">
                                            توصیه‌نامه
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-check ">
                                        <input className="form-check-input" type="checkbox" checked={add_previous_buyer}
                                               onChange={e => dispatch(setAUCTION({add_previous_buyer: e.target.checked}))}
                                               id="checkbox63"/>
                                        <label className="form-check-label" htmlFor="checkbox63">
                                            خریداران قبلی
                                        </label>
                                    </div>
                                </div>

                            </>}
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={other}
                                       onChange={e => dispatch(setAUCTION({other: e.target.checked}))}
                                       id="checkbox44"/>
                                <label className="form-check-label" htmlFor="checkbox44">
                                    سایر
                                    <span className="form-check-txt">اگر می خواهید توضیحاتی وارد کنید ، این گزینه را فعال کنید</span>
                                </label>
                            </div>
                        </div>

                    </div>

            </div>
            <Form onFinish={onFinish}
                  form={form}
                // initialValues={{start_time:moment("1398-02-02","jYYYY-jMM-jDD")}}
                  wrapperCol={{span: 24}}>

                <div className="row">
                    {(other) ? <div className="col-12">
                        <div className="input-group">
                            <label className="default-lable">توضیحات</label>
                            <Form.Item
                                className="w-100 mb-0"
                                name="details"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                    },
                                ]}>
                      <textarea rows="3" className="default-input"
                                placeholder="توضیحات را وارد نمایید."/>
                            </Form.Item>
                        </div>
                    </div> : ''}
                    <div className="col-12">
                        <div className="button-group">
                            <Button type="button" className="btn-gray" onClick={() => {
                                setSelectComponent(selectComponent - 1)
                            }}>بازگشت
                            </Button>
                            <Button className="btn-default" htmlType="submit"
                                    disabled={!validations_auction?.length  && !is_send_invitation}>ادامه</Button>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default Validate;

