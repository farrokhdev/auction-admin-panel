


import React , {useState , useRef} from 'react'
import { Editor } from 'react-draft-wysiwyg';
// import { EditorState } from 'draft-js';
import axios from "../../utils/request";
import {BASE_URL} from '../../utils';
import {Form,Input , notification} from 'antd';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { successNotification , failNotification} from '../../utils/notification';


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

    const [editorState, setEditorState] = useState()
    const [html, setHtml] = useState()
    
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        setHtml(document.querySelector('.demo-editor').innerHTML)
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
        axios.post(`${BASE_URL}/panel/contents/` , payload)
        .then(res => {
            if(res.data.code === 201){
                successNotification("ایجاد محتوا" , "محتوا با موفقیت ایجاد شد")
                setTimeout(() => {
                    window.location.reload()
                }, 1200);
            }
        }).catch(err => {
            console.log(err);
            failNotification("خطا در ایجاد محتوا", "")
        })
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
                                            placeholder="عنوان محتوا را وارد نمایید"/>
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
                                                wrapperClassName="demo-wrapper"
                                                editorClassName="demo-editor"
                                                onEditorStateChange={onEditorStateChange}
                                            />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
       
                    <div className="d-flex justify-content-center">
                        <button  htmlType="submit" className="submitNewPass" >ایجاد محتوا</button>
                    </div>
                </Form>
        </React.Fragment>

    )
}

export default TextEditorDraft;

