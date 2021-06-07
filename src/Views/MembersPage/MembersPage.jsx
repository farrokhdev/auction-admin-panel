import React, {useState, useEffect} from 'react';
import TableMemberList from './TableMemberList';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';
import {Pagination , Breadcrumb} from 'antd';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import ModalBidsMember from './ModalBidsMember';

function MembersPage(props) {

    const [memberList,setMemberList] = useState([]);
    const [countMember,setCountMember] = useState();
    const [currentPage,setcurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [visibleBidsMember, setVisibleBidsMember] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetcher(`${BASE_URL}/panel/users/?page=${currentPage}&page_size=10`, {
            method: "GET",
            data: "",
            header: {}
        }).then(res => {
            setLoading(false)
            setMemberList(res.data.result.results)
            setCountMember(res.data.result.count)
        }).catch(err => {
            console.log(err);
            setLoading(false)
        })

    }, [currentPage]);

    const handeSelectPage = (e) => {
        console.log("Log Of Pagination", e);
        setcurrentPage(e)
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
                                        <div className="col content-page p-4  ">
                                            
                                            <div className="row px-0 mx-0">
                                                <TableMemberList  
                                                    memberList={memberList} 
                                                    countMember={countMember}
                                                    setVisibleBidsMember={setVisibleBidsMember}
                                                    visibleBidsMember={visibleBidsMember}
                                                />
                                            </div>
                                            <div className="d-none d-sm-flex justify-content-center">
                                                <Pagination
                                                    showSizeChanger={false}
                                                    onChange={(e)=>handeSelectPage(e)}
                                                    defaultCurrent={1}
                                                    total={countMember}
                                                    defaultPageSize={10}
                                                />
                                            </div>
                                            <div className="d-flex d-sm-none justify-content-center ">
                                                        <Pagination 
                                                            onChange={(e)=>handeSelectPage(e)}
                                                            defaultCurrent={1} 
                                                            total={countMember} 
                                                            defaultPageSize={10}
                                                            size="small"
                                                        />
                                                    </div>
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