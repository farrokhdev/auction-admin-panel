import React, { useEffect, useState } from "react";
import { Form, Input, Breadcrumb, Spin, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { fetcher } from "../../utils/common";
import axios from "../../utils/request";
import { BASE_URL } from "../../utils";
import { Link, NavLink } from "react-router-dom";
import { toggleActiveNavDrawer } from "../../redux/reducers/panel/panel.actions";
import { connect } from "react-redux";
import MapComponent from "../../components/MapComponent";
import {
  failNotification,
  successNotification,
} from "../../utils/notification";
import TableBankInfo from "./TableBankInfo";

const layout = {
  labelCol: {
    span: 16,
  },
  wrapperCol: {
    span: 24,
  },
};

function ShowDetailHouseAuctionPage(props) {
  const [form] = Form.useForm();

  const [member, setMember] = useState();
  const [point, setPoint] = useState({});
  const [bankAccountInfo, setBankAccountInfo] = useState();
  const [activity_types, setActivity_types] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activites, setActivites] = useState([]);

  useEffect(() => {
    getCategoryActivities();
  }, []);

  const getCategoryActivities = () => {
    axios
      .get(`${BASE_URL}/sale/category/?title=خانه های حراج`)
      .then((res) => {
        setActivites(
          res.data.data.result[0].children.map((item) => ({
            value: item?.id,
            label: item?.title,
          }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onFinish = (values) => {
    console.log(values);
    setLoading(true);

    let payload = {
      "first_name": values?.first_name,
      "last_name": values?.last_name,
      "first_name_en": values?.first_name_en,
      "last_name_en": values?.last_name_en,
      "postal_code": values?.postal_code,
      "national_code": values?.national_code,
      "home_auction_location": {
        "point": {
          "latitude": point?.latitude,
          "longitude": point?.longitude,
        },
        "address": values?.address,
        "address_en": values?.address_en,
      },
      "role": "home_auction",
      "bankaccount": bankAccountInfo,
      "home_auction_name": values?.home_auction_name,
      "home_auction_type": values?.home_auction_type,
      "activity_type_id": values?.activity_type_id,
    };

    axios
      .put(`${BASE_URL}/panel/users/${props.match.params.id}/`, payload)
      .then((res) => {
        if (
          res.data.data.statusCode !== 400 &&
          res.data.data.statusCode !== 403
        ) {
          setLoading(false);
          successNotification(
            "ویرایش اطلاعات",
            "ویرایش اطلاعات با موفقیت انجام شد"
          );

          setTimeout(() => {
              window.location.reload()
          }, 1200);
        } else {
          failNotification("خطا", res.data.data.error_message[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        failNotification("خطا", err.response.data.data.error_message[0]);
      });
  };

  const onFinishFailed = (error) => {
    console.log(error);
  };

  useEffect(() => {
    setLoading(true);
    fetcher(`${BASE_URL}/panel/users/${props.match.params.id}/`, {
      method: "GET",
      data: "",
      header: {},
    })
      .then((res) => {
        setMember(res.data.result);
        setActivity_types(
          res.data.result.activity_type.map((item) => ({
            value: item?.id,
            label: item?.title,
          }))
        );
        setBankAccountInfo(res.data.result.bankaccount);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      first_name: member?.first_name,
      last_name: member?.last_name,
      first_name_en: member?.first_name_en,
      last_name_en: member?.last_name_en,
      mobile: member?.mobile,
      email: member?.email,
      national_code: member?.national_code,
      address: member?.home_auction_location?.address,
      address_en: member?.home_auction_location?.address_en,
      count: member?.count,
      postal_code: member?.postal_code,
      id: member?.id,
      card_number: member?.bankaccount[0]?.card_number,
      account_number: member?.bankaccount[0]?.account_number,
      sheba_number: member?.bankaccount[0]?.sheba_number,
      bank_name: member?.bankaccount[0]?.bank_name,
      home_auction_name: member?.home_auction_name,
      activity_type_id: activity_types?.map((item) => item?.value),
      home_auction_type: member?.home_auction_type,
    });
  }, [member, activity_types]);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <React.Fragment>
      <Spin indicator={antIcon} spinning={loading}>
        <div className="container-fluid px-0 container-pages mt-3">
          <div className="row m-0">
            <div className="col">
              <div className="row justify-content-start pb-3 mx-0">
                <div className="col px-0">
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
                      <Breadcrumb.Item>
                        <Link to="/members">لیست اعضا</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to="/members">{`${member?.first_name}${" "}${
                          member?.last_name
                        }`}</Link>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>

              <div className="row content-page">
                <div className="col  userInfoSection  px-lg-5 ">
                  <Form
                    {...layout}
                    name="house-auction-details"
                    form={form}
                    initialValues={{
                      remember: false,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <div className="d-flex my-4">
                      <h3>اطلاعات کاربر</h3>
                    </div>

                    <div className="d-block d-md-flex align-items-center ">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                        <p className="text-right mb-0 h-100">نام فارسی </p>
                      </div>
                      <div className="col ">
                        <div
                          style={{ verticalAlign: "middle" }}
                          className="d-flex h-100 align-items-center"
                        >
                          <Form.Item
                            className="w-100  h-100"
                            name="first_name"
                            rules={[
                              {
                                required: false,
                                message: "ورودی نام خالی است!",
                              },

                              {
                                pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                                message: "کاراکتر انگلیسی مجاز نیست!",
                              },
                            ]}
                          >
                            <Input size="large" />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                        <p className="text-right mb-0 h-100">
                          نام خانوادگی فارسی
                        </p>
                      </div>
                      <div className="col ">
                        <Form.Item
                          className="w-100  h-100"
                          name="last_name"
                          rules={[
                            {
                              required: false,
                              message: "ورودی نام خانوادگی خالی است!",
                            },

                            {
                              pattern: /^[^a-zA-Z][^a-zA-Z]*$/g,
                              message: "کاراکتر انگلیسی مجاز نیست!",
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center ">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                        <p className="text-right mb-0 h-100 ">نام انگلیسی </p>
                      </div>
                      <div className="col ">
                        <div
                          style={{ verticalAlign: "middle" }}
                          className="d-flex h-100 align-items-center"
                        >
                          <Form.Item
                            className="w-100  h-100"
                            name="first_name_en"
                            rules={[
                              {
                                required: false,
                                message: "ورودی نام خالی است!",
                              },
                              {
                                pattern:
                                  /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                                message: "کاراکتر فارسی مجاز نیست!",
                              },
                            ]}
                          >
                            <Input size="large" />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                        <p className="text-right mb-0 h-100">
                          {" "}
                          نام و نام خانوادگی انگلیسی
                        </p>
                      </div>
                      <div className="col ">
                        <Form.Item
                          className="w-100  h-100"
                          name="last_name_en"
                          rules={[
                            {
                              required: false,
                              message: "ورودی نام خانوادگی خالی است!",
                            },
                            {
                              pattern:
                                /^[a-zA-Z0-9/)/(\\÷×'":;|}{=`~,<>/\-$@$!%*?&#^_. +]+$/,
                              message: "کاراکتر فارسی مجاز نیست!",
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                        <p className="text-right mb-0 h-100">شماره تماس</p>
                      </div>
                      <div className="col ">
                        <Form.Item
                          className="w-100  h-100"
                          name="mobile"
                          rules={[
                            {
                              required: false,
                              message: "ورودی موبایل خالی است!",
                            },
                          ]}
                        >
                          <Input readOnly size="large" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                        <p className="text-right mb-0 h-100">ایمیل</p>
                      </div>
                      <div className="col">
                        <Form.Item
                          className="w-100  h-100"
                          name="email"
                          rules={[
                            {
                              required: false,
                              message: "ورودی ایمیل خالی است!",
                            },
                          ]}
                        >
                          <Input readOnly size="large" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                        <p className="text-right mb-0 h-100">کد ملی</p>
                      </div>
                      <div className="col">
                        <Form.Item
                          className="w-100"
                          name="national_code"
                          rules={[
                            {
                              required: false,
                              message: "ورودی کد ملی خالی است!",
                            },
                          ]}
                        >
                          <Input readOnly size="large" />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 pl-0">
                        <p className="text-right mb-0 h-100">کد پستی</p>
                      </div>
                      <div className="col">
                        <Form.Item
                          className="w-100"
                          name="postal_code"
                          rules={[
                            {
                              required: false,
                              message: "ورودی کد پستی خالی است!",
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="d-flex my-4">
                      <h3>اطلاعات حساب بانکی</h3>
                    </div>

                    <TableBankInfo
                      member={member}
                      setBankAccountInfo={setBankAccountInfo}
                      bankAccountInfo={bankAccountInfo}
                    />

                    <div className="d-flex my-4">
                      <h3>اطلاعات خانه حراج</h3>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                        <div className="d-flex">
                          <p className="mb-0">نام خانه حراج</p>
                        </div>
                      </div>
                      <div className="col">
                        <Form.Item
                          name="home_auction_name"
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                        <div className="d-flex">
                          <p className="mb-0 text-right">
                            حوزه‌های فعالیت خانه حراجی
                          </p>
                        </div>
                      </div>
                      <div className="col">
                        <Form.Item
                          className="w-100"
                          name="activity_type_id"
                          rules={[
                            {
                              required: true,
                              message: "حوزه فعالیت انتخاب نشده است!",
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder=""
                            optionFilterProp="label"
                            defaultValue={activity_types}
                            className="multiple-select"
                            maxTagCount="responsive"
                            options={activites}
                            dropdownClassName="text-right"
                          ></Select>
                        </Form.Item>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                        <div className="d-flex">
                          <p className="mb-0 text-right">
                            نوع کاربری خانه حراجی
                          </p>
                        </div>
                      </div>
                      <div className="col">
                        <Form.Item
                          className="w-100"
                          name="home_auction_type"
                          rules={[
                            {
                              required: true,
                              message: "نوع کاربری انتخاب نشده است!",
                            },
                          ]}
                        >
                          <Select
                            className="search-input w-100 fs-6 text-right"
                            size="large"
                            dropdownClassName="text-right"
                            placeholder="نوع  حراجی را انتخاب کنید"
                            defaultValue={member?.home_auction_type}
                          >
                            <Select.Option
                              value="none"
                              selected
                              disabled
                              hidden
                            ></Select.Option>
                            <Select.Option value="collector">
                              مجموعه دار
                            </Select.Option>
                            <Select.Option value="gallery">
                              گالری دار
                            </Select.Option>
                            <Select.Option value="home_auction">
                              خانه حراجی
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                        <div className="d-flex">
                          <p className="mb-0">آدرس</p>
                        </div>
                      </div>
                      <div className="col">
                        <Form.Item name="address" rules={[]}>
                          <Input />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                        <div className="d-flex">
                          <p className="mb-0">آدرس انگلیسی</p>
                        </div>
                      </div>
                      <div className="col">
                        <Form.Item name="address_en" rules={[]}>
                          <Input />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="d-block d-md-flex align-items-center">
                      <div className="col-12 col-md-3 pb-md-4 mb-2 mb-md-0 px-0">
                        <div className="d-flex">
                          <p className="mb-0">لوکیشن</p>
                        </div>
                      </div>
                      <div className="col">
                        <MapComponent point={point} setPoint={setPoint} />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        className="btn-edit-house-auction mt-5"
                        htmlType="submit"
                      >
                        ویرایش اطلاعات
                      </button>
                    </div>
                  </Form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowDetailHouseAuctionPage);
