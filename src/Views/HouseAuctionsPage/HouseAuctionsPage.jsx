import React, {useState, useEffect} from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import Header from '../../components/Header';
import {Menu, Dropdown, Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg';
import TableHouseAuctionList from './TableHouseAuctionList';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';

function HouseAuctionsPage() {

    const [houseAuctions,
        setHouseAuctions] = useState([]);
    console.log("houseAuctions =>>>> ", houseAuctions);

    useEffect(() => {

        fetcher(`${BASE_URL}/panel/request/`, {
            method: "GET",
            data: "",
            header: {}
        }).then(res => {
            setHouseAuctions(res.data.result.results)
        }).catch(err => {
            console.log(err);
        })

    }, []);

    return (
        <React.Fragment>
            <div className="container-fluid ">

                <div className="row justify-content-start pb-3 mx-0">
                    <div className="col">
                        <div className="d-flex">
                            <Breadcrumb>
                                <Breadcrumb.Item>خانه</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to="/members">خانه‌های حراج</Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col">
                        <TableHouseAuctionList/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HouseAuctionsPage;
