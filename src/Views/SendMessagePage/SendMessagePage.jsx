import React from 'react';
import {Breadcrumb , Mentions, Form, Button} from 'antd';
import { NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';


const { Option, getMentions } = Mentions;


function SendMessagePage(props) {


    const [form] = Form.useForm();

    const onReset = () => {
      form.resetFields();
    };
  
    const onFinish = async () => {
      try {
        const values = await form.validateFields();
        console.log('Submit:', values);
      } catch (errInfo) {
        console.log('Error:', errInfo);
      }
    };
  
    // const checkMention = async (_, value) => {
    //   const mentions = getMentions(value);
  
    //   if (mentions.length < 2) {
    //     throw new Error('More than one must be selected!');
    //   }
    // };




    return (
        <React.Fragment>
            <div className="container-fluid px-0 container-pages">

                <div className="row m-0">
                    <div className="col">
                        <div className="row ">
                            <div className="col content-panel-pages px-0 mx-0">
                                <div className="row justify-content-start pb-3 mx-0">
                                    <div className="col">
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
                                                    ارسال پیام
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mx-0">
                                    <div className="col content-page p-4  ">

                                        <Form form={form} layout="horizontal" onFinish={onFinish}>


                                            <Form.Item
                                                name="title"
                                                
                                                label="عنوان پیام"
                                                labelCol={{
                                                    span: 6
                                                }}
                                                    wrapperCol={{
                                                    span: 16
                                                }}
                                                // rules={[{
                                                //     validator: checkMention
                                                // }
                                                // ]}
                                                rules={[{ required: true, message: 'ورودی عنوان خالی است!' }]}
                                            
                                                >
                                                <Mentions placeholder="عنوان پیام" rows={1} className="text-right">
                                                    
                                                    {/* <Option value="afc163">afc163</Option>
                                                    <Option value="zombieJ">zombieJ</Option>
                                                    <Option value="yesmeck">yesmeck</Option> */}
                                                </Mentions>
                                            </Form.Item>

                                            <Form.Item
                                                name="text"
                                                label="متن پیام"
                                                labelCol={{
                                                    span: 6
                                                }}
                                                wrapperCol={{
                                                    span: 16
                                                }}
                                                rules={[{ required: true, message: 'ورودی متن پیام خالی است!' }]}
                                            
                                                >
                                                <Mentions className="text-right" rows={4} placeholder="متن پیام را وارد کنید">
                                                    {/* <Option value="afc163">afc163</Option>
                                                    <Option value="zombieJ">zombieJ</Option>
                                                    <Option value="yesmeck">yesmeck</Option> */}
                                                </Mentions>
                                            </Form.Item>

                                            <Form.Item
                                                wrapperCol={{
                                                span: 14,
                                                offset: 6
                                            }}>
                                                <Button htmlType="submit" className="btn-send-message">
                                                    ارسال پیام
                                                </Button>
                                                &nbsp;&nbsp;&nbsp;
                                                <Button htmlType="button" className="btn-reset-message" onClick={onReset}>
                                                    پاک کردن
                                                </Button>
                                            </Form.Item>




                                        </Form>
                                    </div>
                                </div>
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(SendMessagePage)