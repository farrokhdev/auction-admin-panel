import React, { useState, useEffect, useRef } from 'react'
import { Mentions, Form, Button, Select, Breadcrumb, Spin } from 'antd';
import { LoadingOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import { toggleActiveNavDrawer } from '../../redux/reducers/panel/panel.actions';
import { setUserForSaleConsulerResponse } from '../../redux/reducers/user/user.actions';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { messageSuccess , messageFailed } from '../../utils/message';

const scrollToRef = (ref) => window.scrollTo(20, ref.current.offsetTop)

function SendMessagePage(props) {
    
    const { Option } = Select;
    const myRef1 = useRef(null)
    const executeScroll = (e) => scrollToRef(e)

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
        props.setUserForSaleConsulerResponse(null)
    };

    const [memberList, setMemberList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({ search : '' })



    useEffect(() => {
        // admin does not want to send message to user, api call service and set lists of member to select for send message   
        if(!props?.user?.user_to_saleconsuler_response?.value){
            getMembers(params);
        }else{
        // admin wants reply and send message to user, selected this user instead of set list member to select  
            setMemberList([ {label : props?.user?.user_to_saleconsuler_response?.label , 
            value : props?.user?.user_to_saleconsuler_response?.value } ])
        } 

    }, [props?.user?.user_to_saleconsuler_response]);


    // api call service for get list of member for set in select options
    const getMembers = (params) =>{
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/panel/users/?${queries}`).then(res => {

            setTimeout(() => {
                setMemberList( [{label : "?????? ??????????????" , value : "allUsers" } , ...(res.data.data.result).map( item => 
                ({label : `${item?.first_name} ${item?.last_name}${' '}(${item?.mobile})` , value : item?.id })) ])
            }, 200);

        }).catch(err => {
            console.log(err);
        })
   }


    const onFinish = (values) => {
        console.log(values);
        setLoading(true)
        // check select user by admin to send message(set name and id of user in storage)
        if(props?.user?.user_to_saleconsuler_response?.value){
             (values.users= [props?.user?.user_to_saleconsuler_response?.value])
        }
        // check all users selected (for not send field 'users' of payload to backend)
        if (values.users.includes("allUsers")) {

            const new_memberlist=memberList?.slice(1,memberList?.length)
            
let member_ids=[] ;

new_memberlist.map((member)=>{
    member_ids.push(member.value)
})

console.log(member_ids)
            console.log(new_memberlist)
        
            
            let payload = {
                "users":member_ids, 
               "message":{
                "title": values?.title,
                "body": values?.body
               }
            }

            axios.post(`${BASE_URL}/panel/sendmessage/`, payload).then(res => {
                setLoading(false)
                if(res.data.data.statusCode !== 400){
                    messageSuccess('?????????? ???????? ???? ???????????? ?????????? ????')
                }

                // setTimeout(() => {
                //     props.history.push('/inbox-messages')
                // }, 1000);

            }).catch(err => {
                console.log(err);
                setLoading(false)

                if (err.response ) {
                    messageFailed(err?.response?.data?.data?.error_message?.body[0])
                }
            })
        // all users not selected (send field 'users' to backend)
        } else {

            let payload = {
                "users": !!props?.user?.user_to_saleconsuler_response?.value ? [props?.user?.user_to_saleconsuler_response?.value] :  values.users,
                "message": {
                    "title": values.title,
                    "body": values.body
                }
            }
            axios.post(`${BASE_URL}/panel/sendmessage/`, payload).then(res => {
                setLoading(false)
                if(res.data.data.statusCode !== 400){
                    messageSuccess('?????????? ???????? ???? ???????????? ?????????? ????')
                }

                // setTimeout(() => {
                //     props.history.push('/inbox-messages')
                // }, 1000);

            }).catch(err => {
                console.log(err);
                setLoading(false)

                if (err.response ) {
                    messageFailed(err?.response?.data?.data?.error_message?.body[0])
                }
            })
        }

        props.setUserForSaleConsulerResponse(null)

    }

    console.log(memberList)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
            <Spin indicator={antIcon} spinning={loading}  >
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
                                                        onClick={e => props.toggleActiveNavDrawer("1")}
                                                        to="/">
                                                        ????????
                                                    </NavLink>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    ?????????? ????????
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mx-0">
                                    <div className="col content-page p-4  ">


                                        <Form className="pt-5" form={form} layout="horizontal" onFinish={onFinish}>
                                            <div ref={myRef1}></div>
                                            <Form.Item
                                                className="text-right input-message-send-to"
                                                name="users"
                                                label="?????????? ????"
                                                rules={[
                                                    {
                                                        required: !!props?.user?.user_to_saleconsuler_response?.value ? false : true,
                                                        message: '?????????? ???? ???????????? ???????????????????!',
                                                        type: 'array',
                                                    },
                                                ]}
                                            >
                                                
                                                <Select 
                                                    className="text-right" 
                                                    mode="multiple" 
                                                    placeholder="?????????? ???? ???????????? ????????" 
                                                    optionFilterProp='label'
                                                    onSearch={(e)=>getMembers({search : e})}
                                                    maxTagCount = 'responsive'
                                                    options={memberList}
                                                    disabled={!!props?.user?.user_to_saleconsuler_response?.value}
                                                    defaultValue={!!props?.user?.user_to_saleconsuler_response?.value  ?  props?.user?.user_to_saleconsuler_response?.value :  []}
                                                >

                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                name="title"
                                                className="input-title-message-send-to"
                                                label="?????????? ????????"
                                                labelCol={{span: 6}}
                                                wrapperCol={{span: 16}}
                                                rules={[{ required: true, message: '?????????? ?????????? ???????? ??????!' }]}
                                            >
                                                <Mentions style={{ borderRadius: '38px', minHeight: '38px' }}
                                                    placeholder="?????????? ???????? ???? ???????? ????????" rows={1}
                                                    className="text-right">
                                                </Mentions>
                                            </Form.Item>

                                            <Form.Item
                                                name="body"
                                                label="?????? ????????"
                                                labelCol={{span: 6}}
                                                wrapperCol={{span: 16}}
                                                rules={[{ required: true, message: '?????????? ?????? ???????? ???????? ??????!' }]}
                                            >
                                                <Mentions style={{ borderRadius: '10px', minHeight: '38px' }}
                                                    className="text-right" rows={4}
                                                    placeholder="?????? ???????? ???? ???????? ????????">
                                                </Mentions>
                                            </Form.Item>

                                            <Form.Item
                                                wrapperCol={{
                                                    span: 14,
                                                    offset: 6
                                                }}>
                                                <Button htmlType="submit" className="btn-send-message">
                                                    ?????????? ????????
                                                </Button>
                                                &nbsp;&nbsp;&nbsp;
                                                <Button htmlType="button" className="btn-reset-message"
                                                    onClick={onReset}>
                                                    ?????? ????????
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
            </Spin>
        </React.Fragment>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        toggleActiveNavDrawer: (data) => dispatch(toggleActiveNavDrawer(data)),
        setUserForSaleConsulerResponse: (data) => dispatch(setUserForSaleConsulerResponse(data)),
    }
}

const mapStateToProps = (store) => {
    return {
        panel: store.panelReducer,
        user : store.userReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessagePage)
