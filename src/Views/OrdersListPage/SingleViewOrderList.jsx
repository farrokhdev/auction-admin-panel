import React, { useState, useEffect } from 'react';
import { Form, Spin, InputNumber, Alert, Breadcrumb, Image, Input, Button, Space } from 'antd';
import ImgCrop from 'antd-img-crop';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../utils';
import axios from "../../utils/request";
import { toggleActiveNavDrawer } from '../../redux/reducers/panel/panel.actions';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import { MinusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import UploadImage from '../AddAuction/uploadImage';
import classnames from 'classnames';
import { useSelector } from "react-redux";



function SingleViewOrderList(props) {

    const layout = {
        labelCol: {
            span: 48,
        },
        wrapperCol: {
            span: 200,
        },
    };
    const [artwork, setArtwork] = useState({});
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState(null)
    const [is_upload, setIs_upload] = useState(true)

    const finalData = useSelector((state) => state.auctionReducer)

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/sale/product/${props.match.params.id}/`).then(res => {
            setLoading(false)
            setArtwork(res.data.data.result)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })

    }, []);

    const [form] = Form.useForm();


    useEffect(() => {
        if (artwork) {
            setMedia(finalData?.media || null)
            form.setFieldsValue({
                media: artwork?.media?.exact_url,
                artwork_height: artwork?.artwork_height,
                artwork_length: artwork?.artwork_length,
                artwork_link: artwork?.artwork_link,
                artwork_title: artwork?.artwork_title,
                artwork_title_en: artwork?.artwork_title,
                artwork_num: artwork?.artwork_num,
                artwork_field: artwork?.latest_auction?.house?.activity_type?.length ? artwork?.latest_auction?.house?.activity_type[0].title : '',
                artwork_width: artwork?.artwork_width,
                email: artwork?.credentials?.email,
                english_artist_name: artwork?.english_artist_name,
                persian_artist_name: artwork?.persian_artist_name,
                english_description: artwork?.english_description,
                persian_description: artwork?.persian_description,
                price: artwork?.price,
                price_min: artwork?.min_price,
                price_max: artwork?.max_price,
                price_sale: artwork?.price,
                technique: artwork?.technique,
                artwork_owner_name: artwork?.owner?.first_name,
                artwork_owner_house_auction_name: artwork?.latest_auction?.house?.first_name ? artwork?.latest_auction?.house?.first_name + ' ' + artwork?.latest_auction?.house?.last_name : '',
                artwork_auction_name: artwork?.latest_auction?.title ? artwork?.latest_auction?.title : '',
                artwork_category: artwork?.category ? artwork?.category[0]?.title : ''

            })
        }

    }, [artwork]);

    const handleResultUpload = (value) => {
        if (value?.media_path)
            setMedia(value)
        // dispatch(setAUCTION({media:value}))
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
            <Spin indicator={antIcon} spinning={loading}  >
                <div style={{ marginTop: '30px' }} className="container-fluid px-0 container-pages">

                    <div className="row m-0">
                        <div className="col">
                            <div className="row justify-content-start pb-3 mx-0">
                                <div className="col px-0">
                                    <div className="d-flex">
                                        <Breadcrumb>
                                            <Breadcrumb.Item>
                                                <NavLink
                                                    key="1"
                                                    onClick={e => props.toggleActiveNavDrawer("1")}
                                                    to="/">
                                                    خانه
                                                </NavLink>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>

                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                               جزئیات سفارشات
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                </div>
                            </div>

                            <div className="row content-page ">

                                <div className="col pt-5">

                                    <Form
                                        name="artwork_details"
                                        {...layout}
                                        form={form}
                                        scrollToFirstError={true}
                                        initialValues={{
                                            remember: true,
                                        }}
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 24 }}

                                    >


                                        <div className="d-block d-lg-flex ">
                                            <div className="col-12 col-lg-2">
                                                <p className="text-right">تصویر اصلی</p>
                                            </div>
                                            <div className="col-12 col-lg-8">
                                                <div className="d-flex">

                                                    <Image
                                                        width={200}
                                                        height={200}
                                                        className="image-custom-back"
                                                        src={artwork?.media ? artwork?.media?.exact_url : 'error'}
                                                    />



                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block d-lg-flex justify-content-start my-3">
                                            <div className="col">
                                                <Alert className={classnames("text-right", {
                                                    "d-flex": !is_upload,
                                                    "d-none": is_upload,
                                                })} message="شما باید یک عکس بارگذاری کنید!" type="error" showIcon />
                                                <div className="d-flex">
                                                    <UploadImage handleResultUpload={handleResultUpload} initialImage={media} setIs_upload={setIs_upload} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">حراج دار</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_owner_house_auction_name"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: false,
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark" />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">نام حراج</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_auction_name"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: false,
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">دسته‌بندی محصول</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_category"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'دسته‌بندی محصول وارد نشده است!'
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">رشته هنری</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_field"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: false,
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">نام هنرمند فارسی</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="persian_artist_name"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'نام فارسی هنرمند وارد نشده است!'
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">نام هنرمند انگلیسی</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="english_artist_name"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'نام انگلیسی هنرمند وارد نشده است!'
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled inintialValue={artwork?.english_artist_name} className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">نام اثر فارسی</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_title"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'نام اثر فارسی وارد نشده است!'
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">نام اثر انگلیسی</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_title_en"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: false,
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">مالک اثر</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_owner_name"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'نام مالک اثر وارد نشده است!'
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">طول (سانتی‌متر)</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_length"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'طول محصول وارد نشده است!'
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">عرض (سانتی‌متر)</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_width"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'عرض محصول وارد نشده است!'
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">ارتفاع (سانتی‌متر)</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_height"
                                                        className="w-100"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'ارتفاع محصول وارد نشده است!'
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">تکنیک</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="technique"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'تکنیک محصول وارد نشده است!'
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">کمینه قیمت (تومان)</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="price_min"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'مقدار کمینه قیمت خالی است!'
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            disabled
                                                            maxLength={20}
                                                            formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            className="ant-input custom-input-number w-100 pr-0"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">شماره اثر</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_num"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">بیشینه قیمت (تومان)</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="price_max"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'مقدار بیشینه قیمت خالی است!'
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            disabled
                                                            maxLength={20}
                                                            formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            className="ant-input custom-input-number w-100 pr-0"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">قیمت فروش (تومان)</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="price_sale"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'مقدار قیمت فروش خالی است!'
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            disabled
                                                            className="ant-input w-100"
                                                            // defaultValue={}
                                                            formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">توضیحات فارسی</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="persian_description"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: false,

                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block d-lg-flex">
                                            <div className="col-12 col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-lg-0">توضیحات انگلیسی</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="english_description"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: false,

                                                            },
                                                        ]}
                                                    >
                                                        <Input disabled className="text-dark"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">

                                            <div className="col">
                                                <p className="text-right mr-3">لینک‌های مرتبط</p>
                                            </div>

                                        </div>


                                        <div className="row mx-xl-2 ">
                                            <Form.List
                                                name="bank_accounts">
                                                {(fields, { add, remove }) => (
                                                    <>

                                                        <div style={{ direction: 'ltr' }} className="d-flex mb-0 w-100 p-0  ml-5">
                                                            <Form.Item
                                                                className="rowAddBtn">
                                                                {/* <button
                                                                    type="default"
                                                                    onClick={(e) => { e.preventDefault(); add() }}
                                                                    className="bg-white btn-add-new-link-artwork ">
                                                                    اضافه کردن لینک جدید
                                                                </button> */}
                                                            </Form.Item>
                                                        </div>

                                                        <div className=" row boxAccountNumber px-5">
                                                            {fields.map(field => (
                                                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">

                                                                    <div className="col p-0">
                                                                        <div className="d-block d-lg-flex ">
                                                                            <div className="col p-0">

                                                                                <div className="d-block  p-0">
                                                                                    <div className="col-12 col-xl-2 p-0">
                                                                                        <div className="d-flex justify-content-start pr-2 my-3 my-xl-2">
                                                                                            عنوان
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-11 px-2">
                                                                                        <Form.Item
                                                                                            {...field}
                                                                                            maxLength={16}
                                                                                            showCount={16}
                                                                                            name={[field.name, 'title_link']}
                                                                                            fieldKey={[field.fieldKey, 'title_link']}
                                                                                            rules={[{
                                                                                                required: false,
                                                                                                message: 'ورودی عنوان لینک خالی است!',
                                                                                            },
                                                                                            ]}
                                                                                        >
                                                                                            <Input
                                                                                                placeholder="عنوان لینک"


                                                                                            />
                                                                                        </Form.Item>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                            <div className="col p-0">
                                                                                <div className="d-block  p-0">
                                                                                    <div className="col-12  p-0">
                                                                                        <div className="d-flex justify-content-start pr-2 my-3 my-xl-2">
                                                                                            لینک
                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="col-12 px-2">
                                                                                        <Form.Item
                                                                                            {...field}
                                                                                            name={[field.name, 'link']}
                                                                                            fieldKey={[field.fieldKey, 'link']}
                                                                                            rules={[
                                                                                                {
                                                                                                    required: false, message: 'ورودی لینک خالی است!'
                                                                                                },

                                                                                            ]}
                                                                                        >
                                                                                            <Input
                                                                                                placeholder="http://artwork"
                                                                                            />
                                                                                        </Form.Item>
                                                                                    </div>
                                                                                    <div className="col-12 col-xl-1 px-2 mt-2 mt-xl-0">
                                                                                        <div className="row justify-content-end pl-3 pl-xl-0">
                                                                                            <div className="removeBankInfoBtn">
                                                                                                <span className="removeBankInfoBtn"
                                                                                                //  onClick={() => handleShowModal() } 
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <MinusCircleOutlined onClick={(e) => remove(e.currentTarget)} />

                                                                </Space>

                                                            ))}
                                                        </div>

                                                    </>
                                                )}

                                            </Form.List>

                                        </div>
                                    </Form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Spin>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleActiveNavDrawer: (data) => dispatch(toggleActiveNavDrawer(data)),
    }
}

const mapStateToProps = (store) => {
    return {
        panel: store.panelReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleViewOrderList)