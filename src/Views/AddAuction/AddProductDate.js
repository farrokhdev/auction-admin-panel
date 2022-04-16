import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form, message, Modal, Collapse } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "../../utils/request";
import { BASE_URL } from "../../utils";
import { LIST_PRODUCTS } from "../../utils/constant";
import Chooseartwork from "./ChooseArtwork";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { setAUCTION } from "../../redux/reducers/auction/auction.actions";
import moment from "moment-jalaali";
import { DeleteFilled } from "@ant-design/icons";

const { Panel } = Collapse;
export const AddProduct = (props) => {
  const { id, date, number } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const { productsDate, productsArrayDate } = useSelector(
    (state) => state.auctionReducer
  );
  const dispatch = useDispatch();
  return (
    <>
      <Button className="add-row mb-0" onClick={() => setIsModalVisible(true)}>
        <FontAwesomeIcon className="ms-1" icon={faPlus} />
        <span> انتخاب محصول </span>
        <span className="pe-1"> ({number}) </span>
      </Button>
      <Modal
        centered
        title={
          <div className="d-flex align-items-center justify-content-between">
            <span className="default titr">آثار</span>
          </div>
        }
        className="text-end"
        width={1000}
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <div className="d-flex text-center justify-content-center">
            <div className="row">
              <div className="col">
                <Button
                  key={2}
                  type=""
                  onClick={() => {
                    if (products?.length) {
                      let list = {};
                      products?.map((t) => (list[t?.id] = t));
                      dispatch(
                        setAUCTION({
                          productsDate: {
                            ...productsDate,
                            [date]: { ...productsDate[date], ...list },
                          },
                          productsArrayDate: [
                            ...productsArrayDate,
                            ...products,
                          ],
                        })
                      );
                      setIsModalVisible(false);
                      setProducts([]);
                    }
                  }}
                  className="btn-default"
                >
                  تایید
                </Button>
              </div>
              <div className="col">
                <Button
                  type="button"
                  className="btn btn-close btn-outline-light"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setIsModalVisible(false)}
                >
                  انصراف{" "}
                </Button>
              </div>
            </div>
          </div>,
        ]}
      >
        <Chooseartwork
          selectProduct={products}
          setSelectProduct={setProducts}
          id={id}
          listCheck={productsArrayDate}
        />
      </Modal>
    </>
  );
};
const Products = (props) => {
  const { selectComponent, setSelectComponent, id } = props;
  const [loading, setLoading] = useState(false);
  const { productsDate, productsArrayDate, start_time, end_time, type } =
    useSelector((state) => state.auctionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let start = moment(start_time).format("jYYYY-jMM-jDD");
    let end = moment(end_time).format("jYYYY-jMM-jDD");
    let list_date = {};
    Object.keys(productsDate).map((t) => {
      if (t >= start && t <= end) {
        list_date[t] = productsDate[t];
      }
    });
    let this_date = start;
    console.log(start, end, list_date);
    for (this_date; this_date <= end; ) {
      if (!productsDate?.[this_date]) {
        console.log("---now", productsDate?.[this_date]);
        list_date[this_date] = {};
      }

      this_date = moment(this_date, "jYYYY-jMM-jDD")
        .add(1, "days")
        .format("jYYYY-jMM-jDD");
    }
    dispatch(
      setAUCTION({
        productsDate: list_date,
        productsArrayDate: productsArrayDate,
      })
    );
  }, []);
  // console.log(productsDate,productsArrayDate)
  return (
    <div>
      <div>
        <Collapse
          defaultActiveKey={["1"]}
          expandIcon={() => <></>}
          onChange={() => {}}
          accordion
        >
          {Object.keys(productsDate).map((item, i) => (
            <Panel
              header={
                <div className="d-flex align-items-center justify-content-between">
                  <span>
                    {moment(item, "jYYYY-jMM-jDD").format("jYYYY  jMMMM jDD")}
                  </span>
                  <div>
                    <DeleteFilled
                      key="ellipsis"
                      className="ms-2"
                      onClick={async () => {
                        let filterList = [];
                        await Object.keys(productsDate[item]).map((t) =>
                          filterList.push(productsDate[item][t])
                        );
                        let list = await productsArrayDate.filter((t) =>
                          filterList.some((j) => j === t?.id)
                        );
                        let p = await productsDate;
                        p[item] = {};
                        await dispatch(
                          setAUCTION({
                            productsDate: p,
                            productsArrayDate: list,
                          })
                        );
                      }}
                    />
                    <AddProduct
                      id={id}
                      date={item}
                      number={Object.keys(productsDate?.[item])?.length || 0}
                    />
                  </div>
                </div>
              }
              key={(i + 1).toString()}
            >
              <div className="row mt-3">
                {productsDate?.[item] &&
                Object.keys(productsDate?.[item])?.length
                  ? Object.keys(productsDate?.[item]).map((prd, i) => (
                      <div
                        key={i}
                        className="col-12 col-md-6 col-lg-4 col-xl-3 "
                      >
                        <div className="mb-3">
                          <Card
                            style={{
                              width: "100%",
                            }}
                            cover={
                              <img
                                alt="بدون تصویر"
                                src={
                                  productsDate?.[item][prd]?.media?.exact_url
                                }
                              />
                            }
                            // actions={[
                            //     <DeleteFilled key="ellipsis" onClick={() => {
                            //         let p = productsDate;
                            //         delete p[item];
                            //         dispatch(setAUCTION({products: p}))
                            //     }}/>,
                            // ]}
                          >
                            <Meta
                              title={productsDate?.[item][prd]?.artwork_title}
                              description={
                                <div className="pt-2">
                                  <div className="d-flex align-items-center justify-content-between ">
                                    <input
                                      type="number"
                                      className="default-input"
                                      defaultValue={
                                        productsDate?.[item][prd]?.base_price
                                      }
                                      placeholder={"قیمت پایه ..."}
                                      onChange={(e) => {
                                        let price = e.target.value;
                                        if (price.length > 4) {
                                          let list = productsDate;
                                          list[item][prd]["base_price"] = price;
                                          dispatch(
                                            setAUCTION({ productsDate: list })
                                          );
                                        }
                                      }}
                                    />
                                    <small className="pe-2">تومان</small>
                                  </div>
                                  {type !== "ONLINE" && type !== "LIVE" ? (
                                    <div className="pt-2">
                                      <div className="d-flex align-items-center justify-content-between ">
                                        <input
                                          type="number"
                                          className="default-input"
                                          defaultValue={
                                            productsDate?.[item][prd]
                                              ?.reserve_price
                                          }
                                          placeholder={"قیمت رزرو ..."}
                                          onChange={(e) => {
                                            let price = e.target.value;
                                            if (price.length > 4) {
                                              let list = productsDate;
                                              list[item][prd]["reserve_price"] =
                                                price;
                                              dispatch(
                                                setAUCTION({
                                                  productsDate: list,
                                                })
                                              );
                                            }
                                          }}
                                        />
                                        <small className="pe-2">تومان</small>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              }
                            />
                          </Card>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default Products;
