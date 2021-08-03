import React , {useState , useEffect} from 'react';
import { Upload , Empty, InputNumber} from 'antd';
import ImgCrop from 'antd-img-crop';
import { Form, Input, Button, Space , Breadcrumb , Image} from 'antd';
import {NavLink} from 'react-router-dom';
import {BASE_URL} from '../../utils';
import axios from "../../utils/request";
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import {MinusCircleOutlined} from '@ant-design/icons';
import UploadImage from '../AddAuction/uploadImage';

function SingleViewArtworkPage(props) {

    const layout = {
        labelCol: {
          span: 48,
        },
        wrapperCol: {
          span: 200,
        },
      };
    const [artwork, setArtwork] = useState();
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState( null)
    console.log("artwork =>>>", artwork);

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
        if(artwork){

            form.setFieldsValue({

                media : artwork?.media?.exact_url,
                artwork_height : artwork?.artwork_height,
                artwork_length : artwork?.artwork_length,
                artwork_link : artwork?.artwork_link,
                artwork_title : artwork?.artwork_title,
                artwork_title_en : artwork?.artwork_title,
                artwork_num : artwork?.artwork_num,
                artwork_field : artwork?.latest_auction?.house?.activity_type[0].title,
                artwork_width : artwork?.artwork_width,
                email : artwork?.credentials?.email,
                english_artist_name : artwork?.english_artist_name,
                persian_artist_name : artwork?.persian_artist_name,
                english_description : artwork?.english_description,
                persian_description : artwork?.persian_description,
                price : artwork?.price,
                price_min :artwork?.min_price,
                price_max : artwork?.max_price,
                price_sale : artwork?.price,
                technique : artwork?.technique,
                artwork_owner_name : artwork?.owner?.first_name,
                artwork_owner_house_auction_name :  artwork?.latest_auction?.house?.first_name,
                artwork_auction_name : artwork?.latest_auction?.title,

                artwork_category : artwork?.category ? artwork?.category[0]?.title : ''

            })
        }

    }, [artwork]);

// console.log("Category",artwork?.category);


    //  const [mainPic, setMainPic] = useState(); 

    //  const onChangeMainPic = (newFile) => {
    //     setMainPic(newFile);
    //   };

    const [fileList, setFileList] = useState([
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
      ]);

     
    
    //   const onChange = ({ fileList: newFileList }) => {
    //     setFileList(newFileList);
    //   };
    
    //   const onPreview = async file => {
    //     let src = file.url;
    //     if (!src) {
    //       src = await new Promise(resolve => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file.originFileObj);
    //         reader.onload = () => resolve(reader.result);
    //       });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow.document.write(image.outerHTML);
    //   };


      const onFinish = (values) => {
        console.log(values);

        let payload = {
            media : values.media ,
            title_link : "" ,
            link : "" ,
            artwork_height : values.artwork_height,
            artwork_length : values.artwork_length,
            artwork_link : values.artwork_link,
            artwork_title : values.artwork_title,
            artwork_title_en : values.artwork_title_en,
            artwork_num : values.artwork_num,
            artwork_field : values.artwork_field,
            artwork_width : values.artwork_width,
            english_artist_name : values.english_artist_name,
            persian_artist_name : values.persian_artist_name,
            english_description : values.english_description,
            persian_description : values.persian_description,
            price :values.price,
            price_min : values.price_min,
            price_max : values.price_max,
            price_sale : values.price_sale,
            technique : values.technique,
            artwork_owner_name : values.artwork_owner_name,
            artwork_owner_house_auction_name : values.artwork_owner_house_auction_name,
            artwork_auction_name : values.artwork_auction_name,
            artwork_category : artwork?.category ? values[0]?.title : '' 
        }

        axios.put(`${BASE_URL}/panel/product/approve/${props.match.params.id}/` , payload).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })

      };

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const normFile = (e) => {
    //     console.log('Upload event:', e);
      
    //     if (Array.isArray(e)) {
    //       return e;
    //     }
      
    //     return e && e.fileList;
    //   };

 
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
                                        اثر هنری
                                    {/* <Link to="/members">{`${member?.first_name}${' '}${member?.last_name}`}</Link> */}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>

                <div  className="row content-page ">
        
                    <div className="col pt-5">

                    <Form  
                        name="artwork_details" 
                        {...layout}
                        form={form}
                        scrollToFirstError={true}
                        initialValues={{ 
                            remember: true,
                            // artwork_height : JSON.stringify(String(artwork?.artwork_height)),
                        }}
                        labelCol={{ span: 4 }}
                        // wrapperCol={{ span: 14 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        // onValuesChange = {onValuesChange}
                        
                        >


                        <div className="d-block d-lg-flex ">
                            <div className="col-12 col-lg-2">
                                <p className="text-right">تصویر اصلی</p>
                            </div>
                            <div  className="col-12 col-lg-8">
                                {/* <div className="box-main-image-artwork"> */}
                                <div className="d-flex">

                                <Image
                                    width={200}
                                    height={200}
                                    src={artwork?.media ? artwork?.media?.exact_url : 'error'}
                                    // fallback="data:image/png;base64,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"
                                    // fallback="https://box.amnmoj.ir/image/d30da840-dd21-443e-9a21-8b973a2ebdbb?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XAS8PG1BHSATZE09C25C%2F20210502%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210502T145642Z&X-Amz-Expires=18000&X-Amz-SignedHeaders=host&X-Amz-Signature=4e7b975ef0a594e18ad0589bd7947cd8569206ce72db22ffb8c6b5b4347b81d8"
                                    // fallback="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />

                             
                      
                                </div>
                            </div>
                        </div>
                        <div className="d-block d-lg-flex justify-content-start my-3">
                            <div className="col-12 col-lg-2">
                                <p className="text-right mb-0 mb-4 mb-lg-0">سایر تصاویر</p>
                            </div>
                            <div className="col">
                                <div className="d-flex">

                                        <UploadImage handleResultUpload={handleResultUpload} initialImage={media}/>
                                    
                                        {/* <Form.Item
                                            name="media"
                                            // label="Upload"
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                            // extra="longgggggggggggggggggggggggggggggggggg"
                                            >
                                            <ImgCrop rotate>
                                                <Upload
                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onChange={onChange}
                                                    onPreview={onPreview}
                                                >
                                                    {fileList.length < 20 && '+ Upload'}
                                                </Upload>
                                                </ImgCrop>
                                            </Form.Item> */}

                                </div>
                            </div>
                        </div>

                        <div className="d-block d-lg-flex">
                            <div  className="col-12 col-lg-3">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-lg-0">حراج دار</p>
                                </div>
                            </div>
                            <div  className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="artwork_owner_house_auction_name"
                                            className="w-100 "
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
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
                                            // label="حراج دار"
                                            // value={artwork?.english_artist_name}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input  inintialValue={artwork?.english_artist_name}/>
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="d-block d-lg-flex">
                            <div className="col-12 col-lg-3">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-lg-0">طول</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="artwork_length"
                                            className="w-100 "
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="d-block d-lg-flex">
                            <div className="col-12 col-lg-3">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-lg-0">عرض</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="artwork_width"
                                            className="w-100 "
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="d-block d-lg-flex">
                            <div className="col-12 col-lg-3">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-lg-0">ارتفاع</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="artwork_height"
                                            className="w-100"
                                            // label="حراج دار"
                                            // initialValues={artwork?.artwork_height}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input  />
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="d-block d-lg-flex">
                            <div className="col-12 col-lg-3">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-lg-0">کمینه قیمت</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="price_min"
                                            className="w-100 mx-0"
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                    message : "مقدار کمینه قیمت خالی است!"
                                                },
                                                // {
                                                //     pattern: /^[\d]$/,
                                                //     message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                // },
                                            ]}
                                            >
                                            <span>
                                                <InputNumber 
                                                    maxLength={20}
                                                    className="ant-input custom-input-number w-100 pr-0"
                                                    formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                />
                                            </span>
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="d-block d-lg-flex">
                            <div className="col-12 col-lg-3">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-lg-0">بیشینه قیمت</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="price_max"
                                            className="w-100 "
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                    message : 'مقدار بیشینه قیمت خالی است!'
                                                },
                                            ]}
                                            >
                                            <InputNumber 
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
                                    <p className="text-right mb-2 mb-lg-0">قیمت فروش</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name="price_sale"
                                            className="w-100 "
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                    message : 'مقدار قیمت فروش خالی است!'
                                                },
                                            ]}
                                            >
                                            <InputNumber 
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            >
                                            <Input />
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
                                            // label="حراج دار"
                                            rules={[
                                                {
                                                    required: true,
                                                },
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
                            name="bank_accounts">
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
                                            <MinusCircleOutlined onClick={(e) => remove(e.currentTarget)} />   

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
                                 ویرایش اطلاعات
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(SingleViewArtworkPage)