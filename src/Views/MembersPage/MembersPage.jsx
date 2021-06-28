import React, {useState, useEffect} from 'react';
import TableMemberList from './TableMemberList';
import {BASE_URL} from '../../utils';
import {Breadcrumb , Input , Dropdown , Menu} from 'antd';
import { CaretDownOutlined , FilterFilled , DownOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import ModalBidsMember from './ModalBidsMember';
import PaginationComponent from '../../components/PaginationComponent';
import DatePicker from 'react-datepicker2';
import queryString from 'query-string';
import momentJalaali from 'moment-jalaali';
import axios from '../../utils/request';


function MembersPage(props) {

    const { Search } = Input;

    const menu=() => (

        <Menu>
            <Menu.Item onClick={(e)=> handleSetState("پذیرفته شده")} className="text-center">
                 پذیرفته شده
            </Menu.Item >
       
            <Menu.Item onClick={(e)=> handleSetState("پذیرفته نشده")} className="text-center">
                  پذیرفته نشده
            </Menu.Item>

        </Menu>
    ); 

    const [memberList,setMemberList] = useState([]);
    const [countMember,setCountMember] = useState(0);
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [visibleBidsMember, setVisibleBidsMember] = useState(false);
    const [params , setParams] = useState(
        {
            page : `${currentPage}` , 
            page_size : '' , 
            member_status : '' , 
            // title : '' , 
            name : '' , 
            // date_joined : '',
        });

        console.log("PPP ",params);

    useEffect(() => {
        setLoading(true)
        const queries = queryString.stringify(params);
        console.log("queries " , queries);
        // fetcher(`${BASE_URL}/panel/users/?page=${currentPage}&page_size=5`, {
        axios.get(`${BASE_URL}/panel/users/?${queries}`, {
        }).then(res => {
            setLoading(false)
            setMemberList(res.data.data.result)
            // setCountMember(res.data.result.count)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })

    }, [params]);

    const handeSelectPage = (e) => {
        console.log("Log Of Pagination", e);
        setcurrentPage(e)
    }

    // const handleSetDateJoinedFilter = (date) => {
    //     setParams({...params , date_joined : momentJalaali(date).format(`jYYYY/jMM/jDD`)})
    // }

    const handleSetState = (valuState) => {
        setParams({...params , member_status : valuState })
    }

    const handleSetMemberFilter = (memberSearch) => {
        setParams({...params , name : memberSearch })
    }


    return (
        <React.Fragment>
            <Loading loading={loading} />
            <div  className="container-fluid px-0 container-pages">
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
                                                            onClick={ e => props.toggleActiveNavDrawer("1")}
                                                            to="/">
                                                            خانه
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                       لیست اعضا
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page p-4">

                                            <div className="d-block d-lg-flex mb-2">
                                                
                                                <div className="col">
                                                    <div className="d-flex">
                                                        <Search className="mb-2" placeholder="جستجوی کاربر" 
                                                        onSearch={(e)=> handleSetMemberFilter(e)} 
                                                        style={{ width: 300 }}  />
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="d-flex align-items-center  h-100 mt-2 mt-lg-0">
                                                        <p className="mb-0 ml-2 text-right">وضعیت</p>
                                                        <Dropdown className="d-flex " overlay={menu} placement="bottomLeft" arrow>
                                                            <button className="d-flex justify-content-center align-items-center btn-status-product-filter"> 
                                                            <p className="mb-0">{params?.house_status ? params?.house_status : "انتخاب وضعیت"}</p><CaretDownOutlined /> </button>
                                                        </Dropdown>
                                                    </div>
                                                </div>

                                                {/* <div className="col">
                                                    <div className="d-flex">
                                                        <p className="mb-0 ml-2 text-right">تاریخ عضویت</p>
                                                        <DatePicker
                                                            className="date-field-filter-box"
                                                            isGregorian={false}
                                                            timePicker={false}
                                                            onChange={valueFrom  => handleSetDateJoinedFilter(valueFrom)}
                                                            // value={dateFrom}
                                                        />
                                                    </div>
                                                </div> */}
                                            </div>
                                            
                                            <div className="row px-0 mx-0">
                                                <TableMemberList  
                                                    memberList={memberList} 
                                                    countMember={countMember}
                                                    setVisibleBidsMember={setVisibleBidsMember}
                                                    visibleBidsMember={visibleBidsMember}
                                                />
                                            </div>

                                            <PaginationComponent count={countMember} handeSelectPage={handeSelectPage}/>
                                            
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalBidsMember
                setVisibleBidsMember={setVisibleBidsMember}
                visibleBidsMember={visibleBidsMember}
             />
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(MembersPage)