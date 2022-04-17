import React, { useState } from "react";
import { BASE_URL } from "../../utils";
import { Breadcrumb, Form, Input, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import {LoadingOutlined} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { toggleActiveNavDrawer } from "../../redux/reducers/panel/panel.actions";
import { connect } from "react-redux";
import axios from "../../utils/request";
import { failNotification , successNotification} from "../../utils/notification";

function AddNewMember(props) {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    sendData(values);
  };

  const sendData = (values) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/panel/users/`, {
          ...values,
          home_auction_location: {
          address: values?.address || "",
        },
        role : 'user'
      })
      .then((resp) => {
        setLoading(false);
        if (resp.data.data.statusCode !== 400) {
          successNotification("افزودن کاربر" , "افزودن کاربر با موفقیت انجام شد");
          setTimeout(() => {
              window.location.href ="#/members"
          }, 1200);
        }else{
            failNotification("خطا", resp.data.data.error_message[0]);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        failNotification("خطا", err.response.data.data.error_message[0]);
      });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <React.Fragment>
      <Spin indicator={antIcon} spinning={loading}>
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
                              onClick={(e) => props.toggleActiveNavDrawer("1")}
                              to="/"
                            >
                              خانه
                            </NavLink>
                          </Breadcrumb.Item>
                          <Breadcrumb.Item>افزودن کاربر</Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                    </div>
                  </div>
                  <div className="row  mx-0">
                    <div className="col content-page p-4">
                      <div className="d-block d-lg-flex mb-2 ">
                        <Form
                          onFinish={onFinish}
                          form={form}
                          wrapperCol={{ span: 24 }}
                        >
                          <div className="">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="input-group w-100">
                                  <label className="default-lable">نام</label>
                                  <Form.Item
                                    className="w-100"
                                    name="first_name"
                                    rules={[
                                      {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="default-input"
                                      placeholder="نام خود را وارد نمایید."
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-group w-100">
                                  <label className="default-lable"> نام انگلیسی</label>
                                  <Form.Item
                                    className="w-100"
                                    name="first_name_en"
                                    rules={[
                                      {
                                        required: false,
                                        message: "تکمیل این فیلد ضروری است",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="default-input"
                                      placeholder="نام انگلیسی خود را وارد نمایید."
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-group">
                                  <label className="default-lable">
                                    نام خانوادگی
                                  </label>
                                  <Form.Item
                                    className="w-100"
                                    name="last_name"
                                    rules={[
                                      {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="default-input"
                                      placeholder="نام خانوادگی خود را وارد نمایید."
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-group">
                                  <label className="default-lable">
                                    نام خانوادگی انگیسی
                                  </label>
                                  <Form.Item
                                    className="w-100"
                                    name="last_name_en"
                                    rules={[
                                      {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="default-input"
                                      placeholder="نام خانوادگی انگلیسی خود را وارد نمایید."
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-group notapproved">
                                  <label className="default-lable">
                                    شماره همراه
                                  </label>

                                  <Form.Item
                                    className="w-100"
                                    name="mobile"
                                    rules={[
                                      {
                                        required: false,
                                        message: "تکمیل این فیلد ضروری است",
                                      },
                                      {
                                        // pattern: /^[A-Za-z0-9][a-zA-Z0-9$@$!%*?()&#^-_. +]*$/,
                                        pattern:
                                          /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                        message: "کاراکتر فارسی مجاز نیست!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={11}
                                      className="default-input"
                                      placeholder="شماره موبایل مورد نظر را وارد نمایید."
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-group notapproved">
                                  <label className="default-lable">ایمیل</label>

                                  <Form.Item
                                    className="w-100"
                                    name="email"
                                    rules={[
                                      {
                                        required: false,
                                        message: "تکمیل این فیلد ضروری است",
                                      },
                                      {
                                        pattern:
                                          /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                        message: "کاراکتر فارسی مجاز نیست!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="default-input"
                                      placeholder="ایمیل خود را وارد نمایید."
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-group">
                                  <label className="default-lable">
                                    کدپستی
                                  </label>
                                  <Form.Item
                                    className="w-100"
                                    name="postal_code"
                                    rules={[
                                      {
                                        required: false,
                                        message: "تکمیل این فیلد ضروری است",
                                      },
                                      {
                                        pattern:
                                          /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
                                        message: " کدپستی صحیح وارد کنید",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      className="default-input"
                                      placeholder="کد پستی خود را وارد نمایید."
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-group">
                                  <label className="default-lable">کدملی</label>
                                  <Form.Item
                                    className="w-100"
                                    name="national_code"
                                    rules={[
                                      {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                      },
                                      {
                                        pattern: /^[\d]{0,10}$/,
                                        message:
                                          "تنها کاراکتر عدد معتبر می‌باشد!",
                                      },
                                      {
                                        min: 10,
                                        message: "کد ملی باید 10 رقم باشد!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      maxLength={10}
                                      className="default-input"
                                      placeholder="کد ملی خود را وارد نمایید."
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="input-group">
                                  <label className="default-lable">آدرس</label>
                                  <Form.Item
                                    className="w-100"
                                    name="address"
                                    rules={[
                                      {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                      },
                                    ]}
                                  >
                                    <TextArea
                                      className="default-input"
                                      placeholder="آدرس خود را وارد نمایید."
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end">
                              <button
                                className=" btn-create-user"
                                htmlType="submit"
                              >
                                افزودن کاربر
                              </button>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActiveNavDrawer: (data) => dispatch(toggleActiveNavDrawer(data)),
  };
};

const mapStateToProps = (store) => {
  return {
    panel: store.panelReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMember);
