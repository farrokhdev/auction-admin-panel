


import React, { useState, useRef } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';
import { Form, Input, notification } from 'antd';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { successNotification, failNotification } from '../../utils/notification';
import { CheckCircleTwoTone, LoadingOutlined } from '@ant-design/icons';


const layout = {
    labelCol: {
        span: 16
    },
    wrapperCol: {
        span: 24
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 16,
        span: 24
    }
};

function TextEditorDraft() {

    const inputRef = useRef(null);
    const [form] = Form.useForm();

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [html, setHtml] = useState()
    const [CoreUpload, setCoreUpload] = useState("");
    const [Uploaded, setUploaded] = useState(false);
    const [Uploading, setUploading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        setHtml(document.querySelector('.editorClassName').innerHTML)
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        createHtml(values)
    }

    // Handle create content html
    const createHtml = (data) => {
        let payload = {
            "title": data?.title,
            "body": html,
        }
        axios.post(`${BASE_URL}/panel/contents/`, payload)
            .then(res => {
                if (res.data.code === 201) {
                    successNotification("ایجاد محتوا", "محتوا با موفقیت ایجاد شد")
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200);
                }
            }).catch(err => {
                console.log(err);
                failNotification("خطا در ایجاد محتوا", "")
            })
    }


    const uploadImageCallBack = (file) => {
        let uploadedImage = uploadedImages;
        const imageObject = {
            file: file,
            localSrc: URL.createObjectURL(file),
        }
        uploadedImage.push(imageObject);
        setUploadedImages({ uploadedImages: uploadedImage })
        return new Promise(
            (resolve, reject) => {
                // resolve({ data: { link: imageObject.localSrc } });
                let payload = { "content_type": "image" }
                // console.log("e.target.files[0]===>>", e)
                axios.post(`${BASE_URL}/core/upload/`, payload)
                    .then(resp => {
                        if (resp.data.code === 200) {
                            setCoreUpload(resp.data.data.result)
                            setUploading(true)
                            axios.put(resp.data.data.result.upload_url, file)
                                .then(resp1 => {
                                    if (resp1.status === 200) {
                                        console.log("---->", resp1)
                                        axios.post(`${BASE_URL}/core/media/photos/`, {
                                            "media_path": resp.data.data.result.upload_url,
                                            "type": "image",
                                            "bucket_name": "image",
                                            "file_key": resp.data.data.result.file_key
                                        })
                                            .then(resp2 => {
                                                if (resp2.data.code === 201) {
                                                    setCoreUpload(resp2.data.data.result)
                                                    setUploaded(true)
                                                    setUploading(false)
                                                    console.log(resp2.data.data.result)
                                                    // resolve(resp2.data.data.result.exact_url);
                                                    resolve({ data: { link: resp2.data.data.result.exact_url } });
                                                }
                                            })
                                            .catch(err => {
                                                console.log("Error Message", err.response);
                                                setUploading(false)
                                                reject(err.response);
                                            })
                                    }
                                })
                                .catch(err => {
                                    console.error(err.response);
                                    setUploading(false)
                                })
                        }
                    })
                    .catch(err => {
                        console.log("Error Message", err.response);
                    })
            }
        );
    }

    return (
        <React.Fragment>
            <Form
                {...layout}
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >

                <div>
                    <p className="text-right mb-1 mr-2">عنوان محتوا</p>
                </div>
                <div className="row justify-content-center ">
                    <div className="col ">
                        <div
                            style={{
                                position: 'relative'
                            }}>

                            <Form.Item
                                name="title"
                                rules={[{
                                    required: true,
                                    message: 'عنوانی وارد نکرده‌اید!'
                                }
                                ]}>
                                <Input
                                    ref={inputRef}
                                    style={{

                                    }}
                                    placeholder="عنوان محتوا را وارد نمایید" />
                            </Form.Item>

                        </div>
                    </div>
                </div>
                <div className="">
                    <p className="text-right mb-1 mr-2">محتوا</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col">
                        <div
                            style={{
                                position: 'relative'
                            }}>

                            <Form.Item
                                name="body"
                                rules={[{
                                    required: true,
                                    message: 'محتوایی ایجاد نکرده‌اید!'
                                },

                                ]}>
                                <Editor


                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}
                                    toolbar={{
                                        // inline: { inDropdown: true },
                                        // list: { inDropdown: true },
                                        // textAlign: { inDropdown: true },
                                        // link: { inDropdown: true },
                                        // history: { inDropdown: true },
                                        image: { uploadCallback: uploadImageCallBack },
                                        inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                                    }}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <button htmlType="submit" className="submitNewPass" >ایجاد محتوا</button>
                </div>
            </Form>
        </React.Fragment>

    )
}

export default TextEditorDraft;

