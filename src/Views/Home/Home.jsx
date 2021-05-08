import React from 'react'
import { Result, Button , Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import {ShoppingOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';


function Home(props) {
    return (
        <React.Fragment>
            



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
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                            </div>
                                    <div className="row px-0 mx-0">
                                        <div className="col content-page p-4 mx-3">
                                            
                                        {props.auth.is_logged_in ? 
                                        
                                        <Result
                                            icon={<ShoppingOutlined />}
                                            style={{ color: 'hotpink' }}
                                                title="به پنل حراجی آنلاین خوش آمدید"
                                                extra={[
                                                    
                                                    <Link to="/members">
                                                        <Button  type="primary" 
                                                        // key="console"
                                                        >
                                                        لیست اعضا
                                                        </Button>
                                                    </Link>
                                                ]}
                                        />
                                        : <Result
                                        icon={<ShoppingOutlined />}
                                        style={{ color: 'hotpink' }}
                                            title="به پنل حراجی آنلاین خوش آمدید"
                                            extra={[
                                                
                                                <Link to="/login">
                                                    <Button  type="primary" 
                                                    // key="console"
                                                    >
                                                    ورود به پنل
                                                    </Button>
                                                </Link>
                                            ]}
                                    /> }
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
        </React.Fragment>
    )
}

// export default Home;
const mapStateToProps = (store) => {
    return {
        auth : store.authReducer
    }
}


export default connect(mapStateToProps , null)(Home)