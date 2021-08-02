import React, {useEffect, useState} from "react";
import axios from "../../utils/request";
import {BASE_URL} from "../../utils";
import {LIST_PRODUCTS} from "../../utils/constant";
import {Avatar, Card, Checkbox, message, Spin} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import {UrlQuery} from "../../utils/utils";
import {useSelector} from "react-redux";

function Chooseartwork(props) {
    const {selectProduct, setSelectProduct,id,listCheck}=props
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const {house_id} = useSelector((state) => state.auctionReducer)
    // console.log(selectProduct)

  useEffect(()=>{
    // setSelectProduct([])
    if(house_id)
    getData()
  },[])
  const getData = (e="") => {
    setLoading(true)
    axios.get(UrlQuery(`${BASE_URL}${LIST_PRODUCTS}`,{auction_houses__id:house_id,product_assign:false}))
    // axios.get(UrlQuery(`${BASE_URL}${LIST_PRODUCTS}`,{auction_houses__id:id,product_assign:false}))
        .then(resp => {
          setLoading(false)

          if ((resp.data.code === 200) && resp.data?.data?.result) {
            const res = resp.data?.data?.result;
            // form.setFieldsValue(res)
            // setData(res)
            setData(res)
            setDataCount(resp.data?.data?.count)
            // let check = Object.keys(res).some(t => !res[t]);
            // console.log(check)
            // setNext(!check)
          }
        })
        .catch(err => {
          setLoading(false)
          console.error(err);
          message.error("صفحه را دوباره لود کنید")
        })
  }
  const { Meta } = Card;
  return (
    <>
      <Spin spinning={loading}>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="search-input">
                <input
                    type="text"
                    className="default-input"
                    placeholder="در بیش از 100 حراج جستجو کنید."
                    onChange={(e)=>getData(e.target.value)}
                />
                <button type="button" className="btn-search"></button>
              </div>
            </div>
            <div className="col-md-3 num-artwork">
              <span className="font12">آثار انتخاب شده: </span>
              <span className="num-artwork-item pinkcolor">{selectProduct?.length}</span>
              <span className="num-artwork-item">از</span>
              <span className="num-artwork-item">{dataCount}</span>
            </div>
          </div>
          <div className="chooseartwork-custome">
            <div className="row mt-3">


              {/*{console.log(data.filter(p=>listCheck.some(t=>p.id !==t?.id)))}*/}
              {/*{(data.filter(p=>listCheck.some(t=>p.id !==t?.id)).map(t=>console.log('==>',t?.id)))}*/}

          {
            data && data.length ? data.map((item,i)=> <div key={i} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div className="my-3">
                <Card
                    style={{ width: "100%" }}

                    cover={
                      <img
                          alt="بدون تصویر"
                          src={item?.media?.exact_url}
                      />
                    }
                    // actions={[
                    //   <SettingOutlined key="setting" />,
                    //   <EditOutlined key="edit" />,
                    //   <EllipsisOutlined key="ellipsis" />,
                    // ]}
                >
                  {/*{console.log(listCheck,productsDate)}*/}
                  <Meta
                      avatar={<Checkbox
                          disabled={listCheck.some(t=>item?.id===t?.id)}
                                        checked={selectProduct.some(t=>item?.id===t?.id) } onChange={e=>{
                        if(e.target.checked)
                          setSelectProduct([...selectProduct, {base_price:item?.min_price,...item}])
                        else {
                          let t=selectProduct.filter(t=>t?.id!==item?.id)
                            setSelectProduct(t)
                        }

                      }}/>}
                      title={item.artwork_title}
                      description={item?.technique}
                  />
                </Card>
              </div>
                </div>
            ):''
          }
            </div>
          </div>
         
        </div>
      </div>
      </Spin>
    </>
  );
}

export default Chooseartwork;
