import React, { useEffect, useState } from "react";
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";
import {
  Form,
  Input,
  Breadcrumb,
  Button,
  Upload,
  Spin,
  Select,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { fetcher } from "../../utils/common";
import { BASE_URL, WEB_SOCKET_BASE_URL } from "../../utils";
import { convertTypePersian } from "../../utils/converTypePersion";
import { Link, NavLink } from "react-router-dom";
import { toggleActiveNavDrawer } from "../../redux/reducers/panel/panel.actions";
import { connect, useSelector } from "react-redux";
import axios from "../../utils/request";
import momentJalaali from "moment-jalaali";
import {
  WEB_SOCKET_BID,
  BID,
  UPDATE_STAGE_PRODUCT,
} from "../../utils/constant";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const layout = {
  labelCol: {
    span: 16,
  },
  wrapperCol: {
    span: 24,
  },
};

function SingleViewAuctionPageLive(props) {
  const [form] = Form.useForm();
  const [auctionInfo, setAuctionInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productSelected, setProductSelected] = useState({});
  const [prevProductSelected, setPrevProductSelected] = useState({});
  const [nextProductSelected, setNextProductSelected] = useState({});
  const [lastPrice, setLastPrice] = useState(0);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  // const [lastPrice, setLastPrice] = useState(0);
  // const { is_logged_in } = useSelector((state) => state.authReducer)
  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (error) => {
    console.log(error);
  };
  const changeProduct = (value) => {
    console.log(value);
    let list = [];
    // let onStage = [];
    let lot = 0;
    list = productList?.filter((t, i) => {
      console.log(value);
      console.log(t.id);
      if (t.id === value) {
        lot = i;
        return t.id === value;
      }
    });

    // onStage = productList.filter((t, i) => (t.product_status === "on_stage"))
    if (list.length > 0) {
      setProductSelected(list[0]);
      setLastPrice(list[0]?.bidding_details?.max_bid);
      if (lot > 0) {
        setPrevProductSelected(productList[lot - 1]);
      } else {
        setPrevProductSelected({});
      }
      if (lot < productList.length - 1) {
        setNextProductSelected(productList[lot + 1]);
      } else {
        setNextProductSelected({});
      }
    }
    // if (onStage.length > 0) {
    //     setLastPrice(onStage[0].max_price)
    // }
  };
  const handleIncrease = (currentValue) => {
    let result = 0;
    if (auctionInfo?.steps?.length) {
      auctionInfo?.steps.some((item, i, array) => {
        if (i !== array.length - 1) {
          if (
            currentValue >= item.threshold &&
            currentValue < auctionInfo?.steps[i + 1].threshold
          ) {
            result = item.step;
            return true;
          } else if (i === 0) {
            console.log("It is an error");
            return 0;
          }
        } else {
          result = item.step;
          return true;
        }
      });
    }
    return result;
  };
  useEffect(() => {
    if (productSelected?.id) {
      changeProduct(productSelected?.id);
    }
  }, [productList]);

  const getListProducts = () => {
    axios
      .get(
        `${BASE_URL}/sale/product/?auctions__id=${props.match.params.id}&ordering=product_auction__lot_num&page=1&page_size=10&search=`
      )
      .then((res) => {
        setLoading(false);
        setProductList(res.data.data.result);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log(productList);
  const sendBid = () => {
    setLoading(true);
    let payload = {
      price: handleIncrease(lastPrice) + lastPrice,
      product_id: productSelected?.id,
    };
    axios
      .post(`${BASE_URL}${BID}`, payload)
      .then((resp) => {
        if (resp.status === 201) {
          message.success("Your request has been sent successfully");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          message.error(err.response?.data?.message);
        } else {
          message.error("An error occurred");
        }
        setLoading(false);
      });
  };
  const updateStage = (value) => {
    setLoadingUpdate(true);
    let payload = { product_sold: value };

    axios
      .put(`${BASE_URL}${UPDATE_STAGE_PRODUCT(props.match.params.id)}`, payload)
      .then((resp) => {
        if (resp.status === 200) {
          message.success("Your request has been sent successfully");
          getListProducts();
        }
        setLoadingUpdate(false);
      })
      .catch((err) => {
        if (err.response?.data?.message)
          message.error(err.response?.data?.message);
        else message.error("An error occurred");
        setLoadingUpdate(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/sale/auctions/${props.match.params.id}/`)
      .then((res) => {
        setLoading(false);
        setAuctionInfo(res.data.data.result);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    getListProducts();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      title: auctionInfo?.title,
      text: auctionInfo?.text,
      address: auctionInfo?.address,
      start_time: auctionInfo?.start_time
        ? momentJalaali(auctionInfo?.start_time).format(`jYYYY/jMM/jDD`)
        : "",
      creation_time: auctionInfo?.creation_time
        ? momentJalaali(auctionInfo?.creation_time).format(`jYYYY/jMM/jDD`)
        : "",
      end_time: auctionInfo?.end_time
        ? momentJalaali(auctionInfo?.end_time).format(`jYYYY/jMM/jDD`)
        : "",
      house: auctionInfo?.house?.first_name,
    });
  }, [auctionInfo]);

  useEffect(() => {
    if (props.match.params.id) {
      let client = new W3CWebSocket(
        WEB_SOCKET_BASE_URL + WEB_SOCKET_BID(props.match.params.id)
      );
      client.onopen = () => {
        console.log("-->WebSocket Client Connected");
      };
      client.onmessage = (message) => {
        if (message?.data != null) {
          let data = JSON.parse(message.data);
          if (true) {
            console.log("message", message);

            if (data?.products?.length)
              setLastPrice(data.products[0].last_price);
            else {
              axios
                .get(`${BASE_URL}/sale/auctions/${props.match.params.id}/`)
                .then((res) => {
                  setLoading(false);
                  setAuctionInfo(res.data.data.result);
                  getListProducts();
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
            }
          } else {
            // let artworkData = data.products.filter(obj => {
            //     return obj.product_id === props.match.params.id
            // })[0]
            // let priceFinal = Math.floor(artworkData.last_price);
            // form.setFieldsValue({ price: 0 })
          }
        }
      };
      client.onclose = (event) => {
        console.log("The connection has been closed successfully.", event);
      };
      return () => client.close(3001, "disconnect");
    }
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <React.Fragment>
      <Spin indicator={antIcon} spinning={loading}>
        <div
          style={{ marginTop: "30px" }}
          className="container-fluid px-0 container-pages"
        >
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
                        <Link to="/members"> جزئیات حراج</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        {/* <Link to="/members">{`${member?.first_name}${' '}${member?.last_name}`}</Link> */}
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>

              <div className="row content-page">
                <div className="col  userInfoSection  px-lg-5 ">
                  <Form
                    {...layout}
                    name="nest-messages"
                    form={form}
                    onFinish={onFinish}
                    initialValues={
                      {
                        // title : auctionInfo?.title,
                      }
                    }
                  >
                    {/* <div className="d-flex my-4">
                            <h3>اطلاعات کاربر</h3>
                        </div> */}

                    <div className="d-block d-md-flex align-items-center mt-5">
                      <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                        <p className="text-right mb-0 h-100">عنوان </p>
                      </div>
                      <div className="col ">
                        <div
                          style={{ verticalAlign: "middle" }}
                          className="d-flex h-100 align-items-center"
                        >
                          <Form.Item
                            className="w-100  h-100"
                            name="title"
                            rules={[
                              {
                                required: true,
                                message: "ورودی نام خالی است!",
                              },
                            ]}
                          >
                            <Input
                              // defaultValue = {auctionInfo?.title}
                              size="large"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="d-block d-md-flex align-items-center mt-5">
                      <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                        <p className="text-right mb-0 h-100">شماره اثر </p>
                      </div>
                      <div className="col ">
                        <div
                          style={{ verticalAlign: "middle" }}
                          className="d-flex h-100 align-items-center"
                        >
                          <div className="input-group">
                            <Form.Item
                              className="w-100"
                              name="type"
                              rules={[
                                {
                                  required: true,
                                  message: "تکمیل این فیلد ضروری است",
                                },
                              ]}
                            >
                              <Select
                                className="search-input w-100 fs-6 text-right"
                                size="large"
                                dropdownClassName="text-right"
                                placeholder="اثر را انتخاب کنید"
                                onChange={changeProduct}
                              >
                                {productList.map((item, index) => (
                                  <Select.Option value={item.id} key={index}>
                                    {item.latest_auction.lot_num}
                                  </Select.Option>
                                ))}

                                {/* {
                                                                     auctionInfo?.auction_product?.map((item, index) => (
                                                                        <Select.Option value={item.auction_id}
                                                                            key={index}>{item?.lot_num}</Select.Option>
                                                                    ))
                                                                } */}
                              </Select>
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    </div>
                    {productSelected?.id ? (
                      <>
                        <div className="d-block d-md-flex align-items-center">
                          <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                            <p className="text-right mb-0 h-100">
                              نام اثر فارسی{" "}
                            </p>
                          </div>
                          <div className="col ">
                            <Form.Item
                              className="w-100  h-100"
                              // name="text"
                            >
                              <Input
                                size="large"
                                value={productSelected?.artwork_title}
                              />
                            </Form.Item>
                          </div>
                        </div>
                        {prevProductSelected?.id ? (
                          <div className="d-block d-md-flex align-items-center ">
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                              <p className="text-right mb-0 h-100"> لت قبلی </p>
                            </div>
                            <div className="col ">
                              <div
                                style={{ verticalAlign: "middle" }}
                                className="d-flex h-100 align-items-center"
                              >
                                <img
                                  src={
                                    prevProductSelected?.media[0]?.exact_url ||
                                    ""
                                  }
                                  className="img-thumbnail"
                                  style={{ maxWidth: "100px" }}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="d-block d-md-flex align-items-center my-3 ">
                          <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                            <p className="text-right mb-0 h-100">تصویر فعلی </p>
                          </div>
                          <div className="col ">
                            <div
                              style={{ verticalAlign: "middle" }}
                              className="d-flex h-100 align-items-center"
                            >
                              <img
                                src={productSelected?.media[0]?.exact_url || ""}
                                className="img-thumbnail"
                                style={{ maxWidth: "200px" }}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        {nextProductSelected?.id ? (
                          <div className="d-block d-md-flex align-items-center ">
                            <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                              <p className="text-right mb-0 h-100"> لت بعدی </p>
                            </div>
                            <div className="col ">
                              <div
                                style={{ verticalAlign: "middle" }}
                                className="d-flex h-100 align-items-center"
                              >
                                <img
                                  src={
                                    nextProductSelected?.media[0]?.exact_url ||
                                    ""
                                  }
                                  className="img-thumbnail"
                                  style={{ maxWidth: "100px" }}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="d-block d-md-flex align-items-center mt-3">
                          <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                            <p className="text-right mb-0 h-100">
                              نام هنرمند فارسی{" "}
                            </p>
                          </div>
                          <div className="col ">
                            <Form.Item
                              className="w-100  h-100"
                              // name="text"
                            >
                              <Input
                                size="large"
                                value={productSelected?.persian_artist_name}
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="d-block d-md-flex align-items-center ">
                          <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                            <p className="text-right mb-0 h-100">کمینه قیمت </p>
                          </div>
                          <div className="col ">
                            <Form.Item
                              className="w-100  h-100"
                              // name="text"
                            >
                              <Input
                                size="large"
                                value={productSelected?.min_price}
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="d-block d-md-flex align-items-center ">
                          <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                            <p className="text-right mb-0 h-100">
                              بیشینه قیمت{" "}
                            </p>
                          </div>
                          <div className="col ">
                            <Form.Item
                              className="w-100  h-100"
                              // name="text"
                            >
                              <Input
                                size="large"
                                value={productSelected?.max_price}
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="d-block d-md-flex align-items-center ">
                          <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                            <p className="text-right mb-0 h-100"> قیمت فعلی </p>
                          </div>
                          <div className="col ">
                            <Form.Item
                              className="w-100  h-100"
                              // name="text"
                            >
                              <Input size="large" value={lastPrice} />
                            </Form.Item>
                          </div>
                        </div>
                        {/* {(productSelected?.product_status === "on_stage") && */}
                        {productSelected?.id && (
                          <>
                            <div className="d-block d-md-flex align-items-center ">
                              <div className="col-12 col-md-2 pb-md-4 mb-2 mb-md-0">
                                <p className="text-right mb-0 h-100">
                                  {" "}
                                  بید بعدی{" "}
                                </p>
                              </div>
                              <div className="col ">
                                <Form.Item
                                  className="w-100  h-100"
                                  // name="text"
                                >
                                  <Input
                                    size="large"
                                    value={
                                      handleIncrease(lastPrice) + lastPrice
                                    }
                                  />
                                </Form.Item>
                              </div>
                            </div>

                            <div className="d-flex justify-content-end">
                              <button
                                className="btn-edit-house-auction mt-5"
                                htmlType="button"
                                onClick={sendBid}
                              >
                                ثبت بید
                              </button>
                              <button
                                className="btn-edit-house-auction mt-5 mr-2"
                                htmlType="button"
                                onClick={() => updateStage(true)}
                                disabled={loadingUpdate}
                              >
                                فروخته شد
                              </button>
                              <button
                                className="btn-edit-house-auction mt-5 mr-2"
                                htmlType="button"
                                onClick={() => updateStage(false)}
                                disabled={loadingUpdate}
                              >
                                فروخته نشد
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </Form>
                </div>
                <div className="col-0 col-xl-1"></div>
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
)(SingleViewAuctionPageLive);
