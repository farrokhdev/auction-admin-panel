import React , {useState , useEffect} from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Form, Input, Button, Space , Breadcrumb , Image} from 'antd';
import {NavLink , Link} from 'react-router-dom';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';


function AddNewArtwork(props) {

    const layout = {
        labelCol: {
          span: 48,
        },
        wrapperCol: {
          span: 200,
        },
      };



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
    
      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
    
      const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };


      const onFinish = (values) => {
        console.log(values);
      };
 

    return (
        <React.Fragment>

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

                    <Form {...layout} name="nest-messages" onFinish={onFinish} >


                        
                        <div className="d-block d-lg-flex justify-content-start my-3">
                            <div className="col-12 col-lg-2">
                                <p className="text-right mb-0 mb-4 mb-lg-0">بارگذاری تصاویر</p>
                            </div>
                            <div className="col">
                                <div className="d-flex">
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
                                </div>
                            </div>
                        </div>

                        <div className="d-block d-md-flex">
                            <div  className="col-12 col-md-2 ">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">حراج دار</p>
                                </div>
                            </div>
                            <div  className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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
                        
                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">نام حراج</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">دسته‌بندی محصول</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">رشته هنری</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">نام هنرمند فارسی</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">نام هنرمند انگلیسی</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">نام اثر فارسی</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">نام اثر انگلیسی</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">مالک اثر</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">شماره اثر</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">طول</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">عرض</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">ارتفاع</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">تکنیک</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">کمینه قیمت</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">شماره اثر</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">بیشینه قیمت</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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
                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">قیمت فروش</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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
                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">قیمت فروش</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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

                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">توضیحات فارسی</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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
                        <div className="d-block d-md-flex">
                            <div className="col-12 col-md-2">
                                <div className="d-flex">
                                    <p className="text-right mb-2 mb-md-0">توضیحات انگلیسی</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex  ml-lg-5 pl-lg-5">
                                    <Form.Item
                                            name=""
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