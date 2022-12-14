import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Space, Breadcrumb, Select, notification, Alert, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../utils';
import axios from '../../utils/request';
import { toggleActiveNavDrawer } from '../../redux/reducers/panel/panel.actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import MultipleUpload from './MultipleUpload';
import queryString from 'query-string';


const layout = {
    labelCol: {
        span: 48,
    },
    wrapperCol: {
        span: 200,
    },
};


function AddNewArtwork(props) {

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [auctionsList, setAuctionsList] = useState([])
    const [houseAuctionsList, setHouseAuctionsList] = useState([])
    const [is_upload, setIs_upload] = useState(true)
    const [uploadList, setUploadList] = useState([])
    const [minPrice, setMinPrice] = useState()

    const [memberList, setMemberList] = useState([]);
    const [params, setParams] = useState({ search: '' })



    const { Option } = Select;


    useEffect(() => {
        // admin does not want to send message to user, api call service and set lists of member to select for send message   
        if (!props?.user?.user_to_saleconsuler_response?.value) {
            getMembers(params);
        } else {
            // admin wants reply and send message to user, selected this user instead of set list member to select  
            setMemberList([{
                label: props?.user?.user_to_saleconsuler_response?.label,
                value: props?.user?.user_to_saleconsuler_response?.value
            }])
        }

    }, [props?.user?.user_to_saleconsuler_response]);


    // api call service for get list of member for set in select options
    const getMembers = (params) => {
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/panel/users/?${queries}`).then(res => {

            setTimeout(() => {
                setMemberList([{ label: "?????? ??????????????", value: "allUsers" }, ...(res.data.data.result).map(item =>
                    ({ label: `${item?.first_name} ${item?.last_name}${' '}(${item?.mobile})`, value: item?.id }))])
            }, 200);

        }).catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/sale/category/?title=????????`).then(res => {
            setLoading(false)

            setCategories(res.data.data.result[0].children)

        }
        ).catch(err => {
            console.error(err);
            setLoading(false)
        })

        // --------- Get list acutions ---------

        axios.get(`${BASE_URL}/sale/auctions/`).then(res => {
            setAuctionsList(res.data.data.result)
        }).catch(err => {
            console.error(err);

        })

        // --------- Get list house aucitons ---------

        axios.get(`${BASE_URL}/account/home-auction/`).then(res => {
            setLoading(false)
            setHouseAuctionsList(res.data.data.result)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })


    }, []);


    const [form] = Form.useForm();


    form.setFieldsValue({
        price_min: minPrice
    })

    const onFinish = (values) => {
        setLoading(true)

        if (!uploadList.length) {
            setIs_upload(false)
        }

        let payload = {

            "artwork_title": values.artwork_title,
            "artwork_title_en": values.artwork_title_en,


            "persian_artwork_name": values.persian_artwork_name,
            "english_artwork_name": values.english_artwork_name,
            "persian_artist_name": values.persian_artist_name,
            "english_artist_name": values.english_artist_name,
            "artwork_owner": values.artwork_owner,

            // "auction_owner_name": values.auction_owner_name,

            "artwork_num": values.artwork_num,
            "artwork_length": values.artwork_length,
            "artwork_width": values.artwork_width,
            "artwork_height": values.artwork_height,
            "technique": values.technique,

            "technique_en": values.technique_en,
            
            "field_art": values.field_art,
            "category_id": values.category_id,
            "persion_description": values.persion_description,
            "english_description": values.english_description,
            "media": uploadList,
            "price": values.price,
            "price_max": values.price_max,
            "price_min": values.price_min,
            "artwork_link": values.artwork_link
        }

        axios.post(`${BASE_URL}/sale/product/`, payload).then(res => {
            setLoading(false)
            openNotification()

        }).catch(err => {
            console.log(err.response);
            setLoading(false)
        })
    };

    const openNotification = () => {
        notification.success({
            message: '?????? ?????? ????????',
            description: `?????? ???????? ???? ???????????? ?????????? ????`,
            duration: 1,
            className: 'custom-class',
            style: {
                backgroundColor: '#f9faf5'
            }
        });
        // return <Redirect to='/artworks' />
    };



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
                                                    ????????
                                                </NavLink>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>

                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                ???????????? ?????? ????????
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                </div>
                            </div>

                            <div className="row content-page ">

                                <div className="col pt-5">

                                    <div className="d-flex mb-4">
                                        <div className="col">
                                            <div className="d-flex">
                                                ???????????????? ????????????
                                            </div>
                                        </div>
                                    </div>

                                    <Form
                                        {...layout}
                                        name="nest-messages"
                                        scrollToFirstError={true}
                                        onFinish={onFinish}
                                    >

                                        <div className="d-flex">
                                            <Alert className={classnames("text-right w-100", {
                                                "d-flex": !is_upload,
                                                "d-none": is_upload,
                                            })} message="?????? ???????? ???? ?????? ???????????????? ????????!" type="error" showIcon />
                                        </div>

                                        <MultipleUpload uploadList={uploadList} setUploadList={setUploadList} />

                                        <div className="d-block d-lg-flex justify-content-start my-3">
                                            <div className="col-12 col-lg-2"></div>
                                            <div className="d-block"></div>
                                        </div>




                                        {/* <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">???????? ??????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_owner"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "?????????? ???????? ?????? ???????? ??????!"
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">???????? ??????</p>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">


                                                    <Form.Item
                                                        className="text-right w-100"
                                                        name="artwork_owner"
                                                        // label="???????? ??????"
                                                        rules={[
                                                            {
                                                                required: !!props?.user?.user_to_saleconsuler_response?.value ? false : true,
                                                                message: '?????????? ???????? ?????? ???????? ??????!',
                                                                type: 'array',
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            className="text-right"
                                                            mode="multiple"
                                                            placeholder="?????????? ???? ???????????? ????????"
                                                            optionFilterProp='label'
                                                            onSearch={(e) => getMembers({ search: e })}
                                                            maxTagCount='responsive'
                                                            options={memberList}
                                                            disabled={!!props?.user?.user_to_saleconsuler_response?.value}
                                                            defaultValue={!!props?.user?.user_to_saleconsuler_response?.value ? props?.user?.user_to_saleconsuler_response?.value : []}
                                                        >

                                                        </Select>
                                                    </Form.Item>





                                                </div>
                                            </div>
                                        </div>






                                        {/* <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3 ">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">???????? ??????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="auction_owner_name"
                                                        className="w-100 "
                                                        rules={[{
                                                            required: true,
                                                            message: '?????????? ?????? ???????? ?????? ???????? ??????!'
                                                        },

                                                        ]}
                                                    >
                                                        <Select
                                                            placeholder="???????????? ?????????????????"
                                                            // onChange={onGenderChange}
                                                            className="text-right"
                                                            allowClear
                                                        >

                                                            {houseAuctionsList.length >= 1 ? houseAuctionsList.map(houseAuction => (
                                                                <React.Fragment key={houseAuction?.id}>
                                                                    <Option className="text-right" value={houseAuction?.id}>{houseAuction?.first_name}{" "}{houseAuction?.last_name}</Option>
                                                                </React.Fragment>
                                                            )) : <Option value=""></Option>}

                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????? ????????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_title"
                                                        className="w-100 "
                                                        rules={[{
                                                            required: true,
                                                            message: '?????????? ?????? ???????? ???????? ??????!'
                                                        },

                                                        ]}
                                                    >
                                                        <Select
                                                            placeholder="???????????? ????????"
                                                            // onChange={onGenderChange}
                                                            className="text-right"
                                                            allowClear
                                                        >

                                                            {auctionsList.length >= 1 ? auctionsList.map(auction => (
                                                                <React.Fragment key={auction?.id}>
                                                                    <Option className="text-right" value={auction?.id}>{auction?.title}</Option>
                                                                </React.Fragment>
                                                            )) : <Option value=""></Option>}

                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">??????????????????? ??????????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">

                                                    <Form.Item
                                                        className="text-right w-100"
                                                        name="category_id"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '??????????????????? ???? ???????????? ???????????????????!',
                                                                type: 'array',
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            className="" mode="multiple"
                                                            placeholder="???????????? ???????????????????">

                                                            {categories?.length >= 1 ? categories?.map(category => (

                                                                <React.Fragment key={category?.id}>
                                                                    <Option className="text-right" value={category?.id}>{category?.title}</Option>
                                                                </React.Fragment>
                                                            )) : <Option value=""></Option>}

                                                        </Select>
                                                    </Form.Item>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">???????? ????????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="field_art"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "?????????? ???????? ???????? ???????? ??????!"
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????? ???????????? ??????????</p>
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
                                                                message: "?????????? ?????? ???????????? ?????????? ???????? ??????!"
                                                            },
                                                            {
                                                                pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                                message: "?????????????? ?????????????? ???????? ????????!",
                                                            }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????? ???????????? ??????????????</p>
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
                                                                message: "?????????? ?????? ???????????? ?????????????? ???????? ??????!"
                                                            },
                                                            {
                                                                pattern: /^[a-zA-Z0-9/)/(\\????'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                                message: "?????????????? ?????????? ???????? ????????!",
                                                            }

                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????? ?????? ??????????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        
                                                        // name="persian_artwork_name"
                                                        name="artwork_title"

                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "?????????? ?????? ?????? ?????????? ???????? ??????!"
                                                            },
                                                            {
                                                                pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                                message: "?????????????? ?????????????? ???????? ????????!",
                                                            }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????? ?????? ??????????????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        // name="english_artwork_name"
                                                        name="artwork_title_en"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '?????????? ?????? ?????? ?????????????? ???????? ??????!'
                                                            },
                                                            {
                                                                pattern: /^[a-zA-Z0-9/)/(\\????'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                                message: "?????????????? ?????????? ???????? ????????!",
                                                            }

                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????? (???????????????????)</p>
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
                                                                message: "?????????? ?????? ?????????? ???????? ??????!"
                                                            },
                                                            {
                                                                pattern: /^[\d]{0,14}$/,
                                                                message: "???????? ?????????????? ?????? ?????????? ???????????????!",
                                                            }
                                                        ]}
                                                    >
                                                        <Input
                                                            className="w-100"
                                                            maxLength={15}
                                                            type="number"
                                                        >
                                                        </Input>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????? (???????????????????)</p>
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
                                                                message: "?????????? ?????? ?????????? ???????? ??????!"
                                                            },
                                                            {
                                                                pattern: /^[\d]{0,14}$/,
                                                                message: "???????? ?????????????? ?????? ?????????? ???????????????!",
                                                            }
                                                        ]}
                                                    >
                                                        <Input
                                                            className="w-100"
                                                            maxLength={15}
                                                            type="number"
                                                        >
                                                        </Input>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">???????????? (???????????????????)</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="artwork_height"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "?????????? ???????????? ?????????? ???????? ??????!"
                                                            },
                                                            {
                                                                pattern: /^[\d]{0,14}$/,
                                                                message: "???????? ?????????????? ?????? ?????????? ???????????????!",
                                                            }
                                                        ]}
                                                    >
                                                        <Input
                                                            className="w-100"
                                                            maxLength={15}
                                                            type="number"
                                                        >
                                                        </Input>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">??????????</p>
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
                                                                message: "?????????? ?????????? ?????? ???????? ??????!"
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????????? ??????????????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="technique_en"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "?????????? ?????????? ?????? ???????? ??????!"
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????????? ???????? (??????????)</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <>
                                                        <Form.Item
                                                            name="price_min"
                                                            className="w-100 "
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "?????????? ?????????? ???????? ?????? ???????? ??????!"
                                                                },

                                                                {
                                                                    // pattern: /^[\d]{0,20}$/,
                                                                    pattern: /^[\u06F0-\u06F90-9]+$/,
                                                                    message: "???????? ?????????????? ?????? ?????????? ???????????????!",
                                                                },
                                                            ]}>

                                                            <InputNumber
                                                                className="w-100"
                                                                maxLength={20}
                                                                formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            >
                                                            </InputNumber>


                                                        </Form.Item>
                                                    </>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????????? ??????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name=""
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "?????????? ?????????? ?????? ???????? ??????!"
                                                            },
                                                            {
                                                                pattern: /^[\d]{0,15}$/,
                                                                message: "???????? ?????????????? ?????? ?????????? ???????????????!",
                                                            }
                                                        ]}
                                                    >
                                                        <Input
                                                            className="w-100"
                                                            maxLength={15}
                                                            type="number"
                                                        >
                                                        </Input>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">???????????? ???????? (??????????)</p>
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
                                                                message: "?????????? ???????????? ???????? ???????? ??????!"
                                                            },
                                                            {
                                                                // pattern: /^[\u06F0-\u06F90-9]+$/,
                                                                pattern: /^[\u06F0-\u06F90-[,]+$/,
                                                                message: "???????? ?????????????? ?????? ?????????? ???????????????!",
                                                            }
                                                        ]}
                                                    >


                                                        <InputNumber
                                                            className="w-100"
                                                            maxLength={20}
                                                            formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        >
                                                        </InputNumber>

                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">???????? ???????? (??????????)</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="price"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: "?????????? ???????? ???????? ???????? ??????!"
                                                            },
                                                            {
                                                                // pattern: /^[\d]{0,20}$/,
                                                                pattern: /^[\u06F0-\u06F90-[,]+$/,
                                                                message: "???????? ?????????????? ?????? ?????????? ???????????????!",
                                                            }
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            className="w-100"
                                                            maxLength={20}
                                                            formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        >
                                                        </InputNumber>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????????????? ??????????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="persion_description"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "?????????????? ???????? ???????? ??????!"
                                                            },
                                                            {
                                                                pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                                message: "?????????????? ?????????????? ???????? ????????!",
                                                            }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block d-md-flex">
                                            <div className="col-12 col-md-3">
                                                <div className="d-flex">
                                                    <p className="text-right mb-2 mb-md-0">?????????????? ??????????????</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                                    <Form.Item
                                                        name="english_description"
                                                        className="w-100 "
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "?????????? ?????????????? ?????????????? ???????? ??????!"
                                                            },
                                                            {
                                                                pattern: /^[a-zA-Z0-9/)/(\\????'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                                message: "?????????????? ?????????? ???????? ????????!",
                                                            }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">

                                            <div className="col">
                                                <p className="text-right mr-3">????????????????? ??????????</p>
                                            </div>

                                        </div>


                                        <div className="row mx-xl-2 ">
                                            <Form.List
                                                name="artwork_link">
                                                {(fields, { add, remove }) => (
                                                    <>

                                                        <div style={{ direction: 'ltr' }} className="d-flex mb-0 w-100 p-0  ml-5">
                                                            <Form.Item
                                                                className="rowAddBtn">
                                                                <button
                                                                    type="default"
                                                                    onClick={(e) => { e.preventDefault(); add() }}
                                                                    className="bg-white btn-add-new-link-artwork ">
                                                                    {/* <img src={plusIcon}/> */}
                                                                    ?????????? ???????? ???????? ????????
                                                                </button>
                                                            </Form.Item>
                                                        </div>

                                                        <div className=" row boxAccountNumber px-5">
                                                            {fields.map(field => (
                                                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">

                                                                    <div className="col p-0">
                                                                        <div className="d-block d-xl-flex">
                                                                            <div className="col p-0">
                                                                                <div className="d-block d-xl-flex p-0">

                                                                                    <div className="col-12 col-xl-2 p-0">
                                                                                        <div className="d-flex justify-content-start pr-3 my-3 my-xl-2">
                                                                                            ??????????
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-10 px-2">
                                                                                        <Form.Item
                                                                                            {...field}
                                                                                            maxLength={16}
                                                                                            showCount={16}
                                                                                            name={[field.name, 'card_number']}
                                                                                            fieldKey={[field.fieldKey, 'card_number']}
                                                                                            rules={[{
                                                                                                required: false,
                                                                                                message: '?????????? ?????????? ???????? ???????? ??????!',
                                                                                            },
                                                                                            ]}
                                                                                        >
                                                                                            <Input
                                                                                                placeholder="?????????? ????????"


                                                                                            />
                                                                                        </Form.Item>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col p-0">
                                                                                <div className="d-block d-xl-flex p-0">
                                                                                    <div className="col-12 col-xl-2 p-0">
                                                                                        <div className="d-flex justify-content-start pr-3 my-3 my-xl-2">
                                                                                            ????????
                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="col-12 px-2">
                                                                                        <Form.Item
                                                                                            {...field}
                                                                                            name={[field.name, 'sheba_number']}
                                                                                            fieldKey={[field.fieldKey, 'sheba_number']}
                                                                                            rules={[
                                                                                                {
                                                                                                    required: false, message: '?????????? ???????? ???????? ??????!'
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

                                                                                                {/* <ModalConfirmRemove 
                                                                                                    handleRemove={()=>remove(field.name)}
                                                                                                    field = {field.name}
                                                                                                    setConfirmRemoveModal = {setConfirmRemoveModal}
                                                                                                    confirmRemoveModal = {confirmRemoveModal}
                                                                                                /> */}
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </Space>

                                                            ))}
                                                        </div>

                                                    </>
                                                )}

                                            </Form.List>

                                        </div>

                                        <div className="d-flex justify-content-end ">
                                            <Form.Item>
                                                <Button className="btn-edit-link" htmlType="submit">
                                                    ?????? ?????? ????????
                                                </Button>
                                            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddNewArtwork)
