import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils';
import { Form, Breadcrumb, Select, InputNumber, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { toggleActiveNavDrawer } from '../../redux/reducers/panel/panel.actions';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import axios from '../../utils/request';
import ModalConfirmDeposit from './ModalConfirmDeposit';
import queryString from 'query-string';
import { messageFailed, messageSuccess } from '../../utils/message';


function WalletDeposit(props) {

    const { Option } = Select;

    const [members, setMembers] = useState([]);
    const [visibleCofirmDeposit, setVisibleCofirmDeposit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({ search: '' })

    const [form] = Form.useForm();

    useEffect(() => {
        getMembers()
    }, []);

    const getMembers = (params) => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/panel/users/?${queries}`).then(res => {
            setLoading(false)
            setTimeout(() => {
                setMembers([{ label: "همه کاربران", value: "allUsers" }, ...(res.data.data.result).map(item =>
                    ({ label: `${item?.first_name} ${item?.last_name}${' '}(${item?.mobile})`, value: item?.id }))])
            }, 200);

        }).catch(err => {
            console.log(err);
        })
    }



    const onFinish = (values) => {
        setLoading(true)
        axios.post(`${BASE_URL}/panel/credit/gift`, values).then(res => {
            setLoading(false)

            if (res.data.data.statusCode !== 400) {
                messageSuccess("شارژ هدیه با موفقیت اضافه شد");
                setTimeout(() => {
                    props.history.push("/wallets")
                }, 1000);
            } else {
                messageFailed(res.data.data.error_message[0]);
            }

        }).catch(err => {
            setLoading(false)
            console.error(err);
            messageFailed(err?.response?.data?.data?.error_message[0]);
        })
    }

    const onFinishFailed = (values) => {
        console.log(values);
    }

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
                                                    <Breadcrumb.Item><NavLink
                                                        key="1"
                                                        onClick={e => props.toggleActiveNavDrawer("1")}
                                                        to="/">
                                                        خانه
                                                    </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                        شارژ هدیه
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">

                                            <Form
                                                id="form-wallet-gift"
                                                name="basic"
                                                form={form}
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                initialValues={{
                                                    remember: true
                                                }}
                                                onFinish={onFinish}
                                                onFinishFailed={onFinishFailed}>

                                                <div className="d-block d-lg-flex">
                                                    <div className="col col-md-3">
                                                        <div className="d-flex">
                                                            <p className="mb-0 mb-2 mb-lg-0">انتخاب کاربران</p>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        
                                                        <Form.Item
                                                            className="text-right w-100"
                                                            name="user"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'کاربر را انتخاب نکرده‌اید!',
                                                                    type: 'array',
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                className=""
                                                                mode="multiple"
                                                                placeholder="مخاطب را انتخاب کنید"
                                                                optionFilterProp='label'
                                                                options={members}
                                                                onSearch={(e) => getMembers({ search: e })}
                                                                maxTagCount='responsive'
                                                            >
                                                                {/* {members.length >= 1 ? members.map(member => (

                                                                <React.Fragment key={member?.id}>
                                                                    <Option value={`${member?.id}`}>{`${member?.first_name} ${member?.last_name}${' '}(${member?.mobile})`}</Option>
                                                                </React.Fragment>
                                                            )) : <Option value=""></Option>} */}

                                                            </Select>
                                                        </Form.Item>

                                                    </div>

                                                </div>

                                                <div className="d-block d-lg-flex">
                                                    <div className="col col-md-3">
                                                        <div className="d-flex">
                                                            <p className="mb-0 mb-2 mb-lg-0">مبلغ (تومان)</p>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <Form.Item
                                                            name="gift_credit"
                                                            rules={[{
                                                                required: true,
                                                                message: 'مبلغ  را وارد نکرده‌اید!'
                                                            },
                                                            {
                                                                pattern: /^[\u06F0-\u06F90-9]+$/,
                                                                message: "تنها کاراکتر عدد معتبر می‌باشد!",
                                                            }

                                                            ]}>
                                                            <InputNumber
                                                                className="default-input w-100"
                                                                formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                            // onChange={onChange}
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col"></div>
                                                </div>


                                                <div className="d-flex justify-content-end">
                                                    <button htmlType="submit" className="btn-submit-new-ticket mr-2 mt-4">واریز</button>
                                                </div>

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
    }
}

const mapStateToProps = (store) => {
    return {
        panel: store.panelReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletDeposit)
