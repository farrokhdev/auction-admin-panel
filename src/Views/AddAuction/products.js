import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, Form, message, Modal, Select} from "antd";
import Meta from "antd/es/card/Meta";
import axios from "../../utils/request";
import {BASE_URL} from "../../utils";
import {LIST_PRODUCTS} from "../../utils/constant";
import Chooseartwork from "./ChooseArtwork";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AddProduct from "./AddProduct";
import AddProductDate from "./AddProductDate";
import DatePicker from "react-datepicker2";
import {setAUCTION} from "../../redux/reducers/auction/auction.actions";

const Products = (props) => {
    const {selectComponent, setSelectComponent, products, setProducts, id} = props;
    const [loading, setLoading] = useState(false)
    const {type, choose_product_daily,productsArrayDate} = useSelector((state) => state.auctionReducer)
    const dispatch = useDispatch();

    return (
        <div>


            <div className="form-check sm-mrgt35">
                <input className="form-check-input" type="checkbox"
                       checked={choose_product_daily}
                       disabled={type==="PERIODIC"}
                       onChange={e => {
                           dispatch(setAUCTION({choose_product_daily: e.target.checked}))
                       }}/>
                <label className="form-check-label" htmlFor="checkbox41">
                    انتخاب روزانه محصول
                    <span className="form-check-txt">آیا می خواهید محصولات خود را براساس روز حراج انتخاب کنید</span>
                </label>
            </div>
            {
                choose_product_daily ?
                    <AddProductDate products={products} setProducts={setProducts} id={id}/>
                    :
                <AddProduct products={products} setProducts={setProducts} id={id}/>
            }

            <div className="row">
                <div className="col-12">
                    <div className="button-group">

                        <button type="button" className="btn-gray" onClick={() => {
                            setSelectComponent(selectComponent - 1)
                        }}>بازگشت
                        </button>

                        {

                        }
                        {((Object.keys(products)?.length && !choose_product_daily) || (productsArrayDate?.length && choose_product_daily))  ? <button type="button" className="btn-default" onClick={() => {
                            // if (type === "ONLINE" || type === "PERIODIC")
                            //     setSelectComponent(selectComponent + 1)
                            // else
                                setSelectComponent(selectComponent + 2)
                        }}> ثبت و ادامه</button> : ''}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Products;