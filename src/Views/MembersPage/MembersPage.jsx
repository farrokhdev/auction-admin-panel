import React, {useState, useEffect} from 'react';
import TableMemberList from './TableMemberList';
import {BASE_URL} from '../../utils';
import {Breadcrumb , Input , Dropdown , Menu , Spin} from 'antd';
import { CaretDownOutlined , FilterFilled , LoadingOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import ModalBidsMember from './ModalBidsMember';
import PaginationComponent from '../../components/PaginationComponent';
import queryString from 'query-string';
import axios from '../../utils/request';
import ModalParticipantAuctions from './ModalParticipantAuctions';
import ModalFavoriteArtwork from './ModalFavoriteArtwork';


function MembersPage(props) {

    const { Search } = Input;

    const menu=() => (

        <Menu>
            <Menu.Item onClick={(e)=> handleSetRole("user")} className="text-center">
                  کاربر
            </Menu.Item >
       
            <Menu.Item onClick={(e)=> handleSetRole("admin")} className="text-center">
                   ادمین
            </Menu.Item>
            
            <Menu.Item onClick={(e)=> handleSetRole("home_auction")} className="text-center">
                   خانه حراج
            </Menu.Item>

        </Menu>
    ); 

    const [memberList,setMemberList] = useState([]);
    const [countMember,setCountMember] = useState(0);
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [visibleBidsMember, setVisibleBidsMember] = useState(false);
    const [visibleFavoriteArtwork, setVisibleFavoriteArtwork] = useState(false);
    const [visibleParticipantAuctions, setVisibleParticipantAuctions] = useState(false);
    const [is_call_service_auctions, setIs_call_service_auctions] = useState(null)
    const [is_call_service_favoriteArtwork, setIs_call_service_favoriteArtwork] = useState(null)
    const [is_call_service_bids, setIs_call_service_bids] = useState(null)
    const [memberId, setMemberId] = useState()
    const [params , setParams] = useState(
        {
            page : 1, 
            page_size : 10 , 
            role : '' , 
            search : '' , 
        });


    useEffect(() => {
        getListMembers()
    }, [params]);

    const getListMembers = () => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/panel/users/?${queries}`, {
        }).then(res => {
            setLoading(false)
            setMemberList(res.data.data.result)
            setCountMember(res.data.data.count)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })
    }

    const handeSelectPage = (e) => {
        setcurrentPage(e)
        setParams({
            ...params , page : e
        })
    }



    const handleSetRole = (valuState) => {
        setParams({...params , role : valuState })
    }

    const handleSetMemberFilter = (memberSearch) => {
        setParams({...params , page : 1 ,  search : memberSearch })
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <React.Fragment>
            <Spin indicator={antIcon} spinning={loading}  >
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
                                                        <span className="mb-0 ml-2 text-right"><FilterFilled/> </span>
                                                        <Dropdown className="d-flex " overlay={menu} placement="bottomLeft" arrow>
                                                            <button className="d-flex justify-content-center align-items-center btn-status-product-filter"> 
                                                            <p className="mb-0">{params?.house_status ? params?.house_status : " انتخاب نقش کاربر  "}</p><CaretDownOutlined /> </button>
                                                        </Dropdown>
                                                    </div>
                                                </div>

                              
                                            </div>
                                            
                                            <div className="row px-0 mx-0">
                                                <TableMemberList  
                                                    memberList={memberList} 
                                                    countMember={countMember}
                                                    setVisibleBidsMember={setVisibleBidsMember}
                                                    setVisibleParticipantAuctions={setVisibleParticipantAuctions}
                                                    setIs_call_service_auctions={setIs_call_service_auctions}
                                                    setIs_call_service_favoriteArtwork={setIs_call_service_favoriteArtwork}
                                                    setVisibleFavoriteArtwork={setVisibleFavoriteArtwork}
                                                    setIs_call_service_bids={setIs_call_service_bids}
                                                    visibleBidsMember={visibleBidsMember}
                                                    params={params}
                                                    setMemberId={setMemberId}
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

            {/* by variable check that bids api service allow to call,  and show modal */} 
            {!!is_call_service_bids  &&  <ModalBidsMember
                setVisibleBidsMember={setVisibleBidsMember}
                visibleBidsMember={visibleBidsMember}
                is_call_service_bids={is_call_service_bids}
                setIs_call_service_bids={setIs_call_service_bids}
                memberId={memberId}
             /> }  
             
            {/* by variable check that auctions api service allow to call, and show modal */} 
           {!!is_call_service_auctions  &&  <ModalParticipantAuctions
                setVisibleParticipantAuctions={setVisibleParticipantAuctions}
                visibleParticipantAuctions={visibleParticipantAuctions}
                is_call_service_auctions={is_call_service_auctions}
                setIs_call_service_auctions={setIs_call_service_auctions}
                memberId={memberId}
             /> } 

             {/* by a variable check that favorites artwork api service allow to call, and show modal */}
             {!!is_call_service_favoriteArtwork  &&  <ModalFavoriteArtwork
                setVisibleFavoriteArtwork={setVisibleFavoriteArtwork}
                visibleFavoriteArtwork={visibleFavoriteArtwork}
                is_call_service_favoriteArtwork={is_call_service_favoriteArtwork}
                setIs_call_service_favoriteArtwork={setIs_call_service_favoriteArtwork}
                memberId={memberId}
             />}
             </Spin>
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