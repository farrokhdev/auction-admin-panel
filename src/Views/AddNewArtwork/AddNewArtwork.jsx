import React , {useState , useEffect} from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Form, Input,InputNumber,  Button, Space , Breadcrumb , Select , notification , Alert} from 'antd';
import {NavLink , Link} from 'react-router-dom';
import {BASE_URL} from '../../utils';
import axios from '../../utils/request';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import  { Redirect } from 'react-router-dom'
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import UploadImage from '../AddAuction/uploadImage';
import classnames  from 'classnames';

const layout = {
    labelCol: {
      span: 48,
    },
    wrapperCol: {
      span: 200,
    },
};
function AddNewArtwork(props) {

    // let numeral = require('numeral');

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [auctionsList , setAuctionsList] = useState([])
    const [houseAuctionsList , setHouseAuctionsList] = useState([])

    const [CoreUpload, setCoreUpload] = useState([]);
    const [Uploaded, setUploaded] = useState(false);
    const [Uploading, setUploading] = useState(false);
    const [media, setMedia] = useState(null)
    const [is_upload, setIs_upload] = useState(true)

    const [minPrice, setMinPrice] = useState()

    const { Option } = Select;

    useEffect(() => {
        setLoading(true)
       axios.get(`${BASE_URL}/sale/category/`).then( res => {
           setLoading(false)
           setCategories(res.data.data.result)
           
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

    // const handleUpload = (e) => {
    //     let payload = {"content_type":"image"}
    //     setImageUrl('')
    //     axios.post(`${BASE_URL}/core/upload/`, payload)
    //         .then(resp=>{
    //             if(resp.data.code === 200){
    //                 setCoreUpload(resp.data.data.result)
    //                 setUploading(true)
    //                 axios.put(resp.data.data.result.upload_url, e)
    //                     .then(resp1 => {
    //                         if (resp1.status === 200) {
    //                             axios.post(`${BASE_URL}/core/media/photos/`, {
    //                                 "media_path": resp.data.data.result.upload_url,
    //                                 "type": "image",
    //                                 "bucket_name": "image",
    //                                 "file_key": resp.data.data.result.file_key
    //                             })
    //                                 .then(resp2=>{
    //                                     if(resp2.data.code === 201){
    //                                         setCoreUpload(resp2.data.data.result)
    //                                         setUploaded(true)
    //                                         setUploading(false)
    //                                         getBase64(e, imageUrl =>
    //                                             setImageUrl(imageUrl)
    //                                         );
    //                                     }
    //                                 })
    //                                 .catch(err=>{
    //                                     console.log("Error Message" , err.response);
    //                                     setUploading(false)
    //                                 })
    //                         }
    //                     })
    //                     .catch(err => {
    //                         console.error(err.response);
    //                         setUploading(false)
    //                     })
    //             }
    //         })
    //         .catch(err=>{
    //             console.log("Error Message" , err.response);
    //         })

    // }

    // function getBase64(img, callback) {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }
    
    //   const onPreview = async file => {
    //     let src = file.url;
    //     if (!src) {
    //       src = await new Promise(resolve => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file.originFileObj);
    //         reader.onload = () => resolve(reader.result);
    //       });
    //     }

    //     let image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow.document.write(image.outerHTML);
    //   };
    const [form] = Form.useForm();


    form.setFieldsValue({

        price_min : minPrice

    })


      const onFinish = (values) => {
        setLoading(true)

        if(media === null){
            setIs_upload(false)
        }

        let payload = {
            "artwork_title": values.artwork_title,
            "persian_artwork_name": values.persian_artwork_name,
            "english_artwork_name": values.english_artwork_name,
            "persian_artist_name": values.persian_artist_name,
            "english_artist_name": values.english_artist_name,
            "artwork_owner": values.artwork_owner,
            "auction_owner_name": values.auction_owner_name,
            "artwork_num": values.artwork_num,
            "artwork_length": values.artwork_length,
            "artwork_width": values.artwork_width,
            "artwork_height": values.artwork_height,
            "technique": values.technique,
            "field_art" : values.field_art,
            "category_id": values.category_id,
            "persion_description": values.persion_description,
            "english_description": values.english_description,
            "media": media,
            "price": values.price,
            "price_max": values.price_max,
            "price_min": values.price_min,
            "artwork_link" : values.artwork_link
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
          message: 'ثبت اثر هنری',
          description:`اثر هنری با موفقیت ایجاد شد`,
            duration: 1,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
          return <Redirect to='/artworks'  />
      };


      const handleResultUpload = (value) => {
        if (value?.media_path)
            setMedia(value)
        // dispatch(setAUCTION({media:value}))
    }


    return (
        <React.Fragment>
<Loading loading={loading}/>
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
                                    
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                        افزودن اثر هنری
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>

                <div  className="row content-page ">
        
                    <div className="col pt-5">

                    <Form 
                        {...layout} 
                        name="nest-messages" 
                        scrollToFirstError={true} 
                        onFinish={onFinish} 
                        >

                        <div className="d-flex">
                            <Alert className={classnames("text-right w-100", {
                                    "d-flex" : !is_upload ,
                                    "d-none" : is_upload  ,
                                })}  message="شما باید یک عکس بارگذاری کنید!" type="error" showIcon />
                        </div>
                        
                        <div className="d-block d-lg-flex justify-content-start my-3">
                            <div className="col-12 col-lg-2">

                                <p className="text-right mb-0 mb-4 mb-lg-0">بارگذاری تصاویر</p>
                            </div>
                            <div className="col">

                            <div className="row mb-5">
                                <UploadImage handleResultUpload={handleResultUpload} initialImage={media} setIs_upload = {setIs_upload}/>
                            </div>

                                    {/* <ImgCrop rotate>
                                        <Upload
                                            beforeUpload={(file, fileList) => {
                                                handleUpload(file)
                                                return false
                                            }}
                                            listType="picture-card"
                                            onPreview={onPreview}
                                            showUploadList={false}

                                        >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> :
                                                <div>
                                                    {Uploading ? <LoadingOutlined /> : <PlusOutlined />}
                                                    <div style={{ marginTop: 8 }}>Upload</div>
                                                </div>
                                            }
                                        </Upload>
                                    </ImgCrop> */}
                            </div>
                        </div>

                        <div className="d-block d-md-flex">
                            <div  className="col-12 col-md-3 ">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">حراج دار</p>
                                </div>
                            </div>
                            <div  className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                        name="auction_owner_name"
                                        className="w-100 "
                                        rules={[{
                                                required: true,
                                                message: 'ورودی نام حراج دار خالی است!'
                                            },
                                  
                                        ]}
                                            >
                                            <Select
                                                placeholder="انتخاب حراج‌دار"
                                                // onChange={onGenderChange}
                                                className ="text-right"
                                                allowClear
                                                >

                                                    {houseAuctionsList.length >=1 ? houseAuctionsList.map(houseAuction => (
                                                        <React.Fragment key={houseAuction?.id}>
                                                            <Option value={houseAuction?.id}>{houseAuction?.first_name}{" "}{houseAuction?.last_name}</Option>
                                                        </React.Fragment>
                                                    ) ) : <Option value=""></Option>}
                                                
                                            </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        
                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-3">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">نام حراج</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="artwork_title"
                                            className="w-100 "
                                            rules={[{
                                                required: true,
                                                message: 'ورودی نام حراج خالی است!'
                                            },
                                  
                                        ]}
                                            >
                                            <Select
                                                placeholder="انتخاب حراج"
                                                // onChange={onGenderChange}
                                                className ="text-right"
                                                allowClear
                                                >

                                                    {auctionsList.length >=1 ? auctionsList.map(auction => (
                                                        <React.Fragment key={auction?.id}>
                                                            <Option value={auction?.id}>{auction?.title}</Option>
                                                        </React.Fragment>
                                                    ) ) : <Option value=""></Option>}

                                            </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-3">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">دسته‌بندی محصول</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">

                                            <Form.Item
                                                className ="text-right w-100"
                                                name="category_id"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'دسته‌بندی را انتخاب نکرده‌اید!',
                                                    type: 'array',
                                                },
                                                ]}
                                                >
                                                <Select  
                                                    className="" mode="multiple"
                                                    placeholder="انتخاب دسته‌بندی">

                                                    {categories.length >= 1 ? categories.map(category => (

                                                        <React.Fragment key={category?.id}>
                                                            <Option value={category?.id}>{category?.title}</Option>
                                                        </React.Fragment>
                                                    )) : <Option value=""></Option>}
                                                        
                                                </Select>
                                            </Form.Item>



                                    {/* <Form.Item
                                            name="category_id"
                                            className="w-100 "
                                            rules={[{
                                                required: false,
                                                message: 'ورودی دسته‌بندی محصول خالی است!'
                                            },
                                  
                                        ]}
                                            >
                                            <Input />
                                    </Form.Item> */}
                                </div>
                            </div>
                        </div>

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-3">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">رشته هنری</p>
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
                                                    message : "ورودی رشته هنری خالی است!"
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
                                    <p className="text-right mb-2 mb-md-0">نام هنرمند فارسی</p>
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
                                                    message : "ورودی نام هنرمند فارسی خالی است!"
                                                },
                                                {
                                                    pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                    message: "کاراکتر انگلیسی مجاز نیست!",
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
                                    <p className="text-right mb-2 mb-md-0">نام هنرمند انگلیسی</p>
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
                                                    message : "ورودی نام هنرمند انگلیسی خالی است!"
                                                },
                                                {
                                                    pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                    message: "کاراکتر فارسی مجاز نیست!",
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
                                    <p className="text-right mb-2 mb-md-0">نام اثر فارسی</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="persian_artwork_name"
                                            className="w-100 "
                                            rules={[
                                                {
                                                    required: true,
                                                    message : "ورودی نام اثر فارسی خالی است!"
                                                },
                                                {
                                                    pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                    message: "کاراکتر انگلیسی مجاز نیست!",
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
                                    <p className="text-right mb-2 mb-md-0">نام اثر انگلیسی</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="english_artwork_name"
                                            className="w-100 "
                                            rules={[
                                                {
                                                    required: true,
                                                    message : 'ورودی نام اثر انگلیسی خالی است!'
                                                },
                                                {
                                                    pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                    message: "کاراکتر فارسی مجاز نیست!",
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
                                    <p className="text-right mb-2 mb-md-0">مالک اثر</p>
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
                                                    message : "ورودی مالک اثر خالی است!"
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
                                    <p className="text-right mb-2 mb-md-0">طول (سانتی‌متر)</p>
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
                                                    message : "ورودی طول محصول خالی است!"
                                                },
                                                {
                                                    pattern: /^[\d]{0,14}$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                }
                                            ]}
                                            >
                                                <Input
                                                    className="w-100"
                                                        maxLength = {15}
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
                                    <p className="text-right mb-2 mb-md-0">عرض (سانتی‌متر)</p>
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
                                                    message : "ورودی عرض محصول خالی است!"
                                                },
                                                {
                                                    pattern: /^[\d]{0,14}$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                }
                                            ]}
                                            >
                                            <Input
                                                    className="w-100"
                                                        maxLength = {15}
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
                                    <p className="text-right mb-2 mb-md-0">ارتفاع (سانتی‌متر)</p>
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
                                                    message: "ورودی ارتفاع محصول خالی است!"
                                                },
                                                {
                                                    pattern: /^[\d]{0,14}$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                }
                                            ]}
                                            >
                                            <Input
                                                    className="w-100"
                                                        maxLength = {15}
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
                                                    message : "ورودی تکنیک اثر خالی است!"
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
                                    <p className="text-right mb-2 mb-md-0">کمینه قیمت (تومان)</p>
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
                                                    message : "ورودی کمینه قیمت اثر خالی است!"
                                                },
                                 
                                                {
                                                    // pattern: /^[\d]{0,20}$/,
                                                    pattern: /^[\u06F0-\u06F90-9]+$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                },
                                            ]}>

                                                    <InputNumber
                                                        className="w-100"
                                                        maxLength = {20}
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
                                    <p className="text-right mb-2 mb-md-0">شماره اثر</p>
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
                                                    message : "ورودی شماره اثر خالی است!"
                                                },
                                                {
                                                    pattern: /^[\d]{0,15}$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                }
                                            ]}
                                            >
                                            <Input
                                                    className="w-100"
                                                        maxLength = {15}
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
                                    <p className="text-right mb-2 mb-md-0">بیشینه قیمت (تومان)</p>
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
                                                    message : "ورودی بیشینه قیمت خالی است!"
                                                },
                                                {
                                                    // pattern: /^[\u06F0-\u06F90-9]+$/,
                                                    pattern: /^[\u06F0-\u06F90-[,]+$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                }
                                            ]}
                                            >

                                          
                                                    <InputNumber
                                                        className="w-100"
                                                        maxLength = {20}
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
                                    <p className="text-right mb-2 mb-md-0">قیمت فروش (تومان)</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="price"
                                            className="w-100 "
                                            rules={[
                                                {
                                                    required: true,
                                                    message : "ورودی قیمت فروش خالی است!"
                                                },
                                                {
                                                    // pattern: /^[\d]{0,20}$/,
                                                    pattern: /^[\u06F0-\u06F90-[,]+$/,
                                                    message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                }
                                            ]}
                                            >
                                                <InputNumber
                                                    className="w-100"
                                                    maxLength = {20}
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
                                    <p className="text-right mb-2 mb-md-0">توضیحات فارسی</p>
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
                                                    message : "توضیحات فارس خالی است!"
                                                },
                                                {
                                                    pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                                    message: "کاراکتر انگلیسی مجاز نیست!",
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
                                    <p className="text-right mb-2 mb-md-0">توضیحات انگلیسی</p>
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
                                                    message : "ورودی توضیحات انگلیسی خالی است!"
                                                },
                                                {
                                                    pattern: /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                                    message: "کاراکتر فارسی مجاز نیست!",
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
                                <p className="text-right mr-3">لینک‌های مرتبط</p>
                            </div>
                        
                        </div>


                        <div className="row mx-xl-2 ">
                            <Form.List
                            name="artwork_link">
                                        {(fields , { add, remove }) => (
                                            <>

                                    <div style={{direction : 'ltr'}}  className="d-flex mb-0 w-100 p-0  ml-5">
                                        <Form.Item
                                        className="rowAddBtn">
                                            <button 
                                                type="default"  
                                                onClick={(e) => {e.preventDefault();  add()}}
                                                className="bg-white btn-add-new-link-artwork ">
                                                {/* <img src={plusIcon}/> */}
                                                اضافه کردن لینک جدید
                                            </button>
                                        </Form.Item>
                                    </div>

                                    <div  className=" row boxAccountNumber px-5">
                                            {fields.map(field => (
                                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8}} align="baseline">

                                            <div className="col p-0">
                                                <div className="d-block d-xl-flex">
                                                    <div className="col p-0">
                                                        <div className="d-block d-xl-flex p-0">

                                                            <div className="col-12 col-xl-2 p-0">
                                                                <div className="d-flex justify-content-start pr-3 my-3 my-xl-2">
                                                                عنوان
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
                                                                         message: 'ورودی عنوان لینک خالی است!' ,
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
                                                        <div className="d-block d-xl-flex p-0">
                                                            <div className="col-12 col-xl-2 p-0">
                                                            <div className="d-flex justify-content-start pr-3 my-3 my-xl-2">
                                                            لینک
                                                            </div>

                                                            </div>
                                                            <div className="col-12 px-2">
                                                                <Form.Item
                                                                    {...field}
                                                                    name={[field.name, 'sheba_number']}
                                                                    fieldKey={[field.fieldKey, 'sheba_number']}
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
                                 ثبت اثر هنری
                                </Button>
                            </Form.Item>
                        </div>



                        </Form>
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(AddNewArtwork)
