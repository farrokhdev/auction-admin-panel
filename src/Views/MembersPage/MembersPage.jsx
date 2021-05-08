import React, {useState, useEffect} from 'react';
import TableMemberList from './TableMemberList';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';
import {Pagination , Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

function MembersPage() {

    const [memberList,setMemberList] = useState([]);
    const [countMember,setCountMember] = useState();
    const [currentPage,setcurrentPage] = useState(1);

    console.log("memberList =>>>", memberList);
    console.log("countMember =>>>", countMember);

    useEffect(() => {

        fetcher(`${BASE_URL}/panel/users/?page=${currentPage}&page_size=10`, {
            method: "GET",
            data: "",
            header: {}
        }).then(res => {
            setMemberList(res.data.result.results)
            setCountMember(res.data.result.count)
        }).catch(err => {
            console.log(err);
        })

    }, [currentPage]);

    const handeSelectPage = (e) => {
        console.log("Log Of Pagination", e);
        setcurrentPage(e)
    }

    return (
        <React.Fragment>
            <div className="container-fluid px-0">

                

                <div className="row m-0">
                    <div className="col">
                        <div className="row ">
                            <div className="col content-panel-pages px-0 mx-0">
                                    <div className="row px-0 mx-0">
                                        {/* <Header/> */}
                                    </div>
                                    <div className="row justify-content-start pb-3 mx-0">
                                        <div className="col">
                                            <div className="d-flex">
                                                <Breadcrumb>
                                                    <Breadcrumb.Item>خانه</Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                        <Link to="/members">لیست اعضا</Link>
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                            </div>
                                    <div className="row px-0 mx-0">
                                        <div className="col content-page p-4 mx-3">
                                            
                                            <div className="row px-0 mx-0">
                                                <TableMemberList  memberList={memberList} countMember={countMember}/>
                                            </div>
                                            <div className="row justify-content-center">
                                                <Pagination
                                                    showSizeChanger={false}
                                                    onChange={(e)=>handeSelectPage(e)}
                                                    defaultCurrent={1}
                                                    total={countMember}
                                                    defaultPageSize={10}
                                                />
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div style={{maxWidth : '300px'}} className="col-2 box-drawer-panel px-0">
                        <DrawerMenu/>
                    </div>
                    <div className="col p-4 contentPage">
                        <TableMemberList memberList={memberList}/>
                        <div className="d-none  d-sm-flex justify-content-center mt-5">
                            <Pagination
                            onChange={(e)=>handeSelectPage(e)}
                            defaultCurrent={1}
                            total={countMember}
                            defaultPageSize={5}
                            />
                     </div>
                    </div>
                </div> */}

            </div>
        </React.Fragment>
    )
}

export default MembersPage;