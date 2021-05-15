import React, {useState, useEffect} from 'react';
import TableMemberList from './TableArtworkList';
import {BASE_URL} from '../../utils';
import {fetcher} from '../../utils/common';
import {Pagination , Breadcrumb} from 'antd';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import TableProductList from './TableArtworkList';
import TableArtworkList from './TableArtworkList';


function ArtWorkListPage(props) {

    const [artworkList , setArtworkList] = useState([]);
    const [countArtwork , setCountArtwork] = useState();
    const [currentPage , setcurrentPage] = useState(1);

    console.log("artworkList =>>>" , artworkList);

 const [filterArtwork, setFilterArtwork] = useState();

    useEffect(() => {

        fetcher(`${BASE_URL}/sale/product/?page=${currentPage}&page_size=10`, {
            method: "GET",
            data: "",
            header: {}
        }).then(res => {
            setArtworkList(res.data.result.results)
            setCountArtwork(res.data.result.count)
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
                                                       آثار هنری
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mx-0">
                                        <div className="col content-page px-2  px-md-4 py-4 ">
                                         
                                            <div className="row px-0 mx-0">
                                                <TableArtworkList  artworkList={artworkList} countArtwork={countArtwork} setFilterArtwork={setFilterArtwork}/>
                                            </div>
                                            <div className="d-none d-sm-flex justify-content-center">
                                                <Pagination
                                                    showSizeChanger={false}
                                                    onChange={(e)=>handeSelectPage(e)}
                                                    defaultCurrent={1}
                                                    total={countArtwork}
                                                    defaultPageSize={10}
                                                />
                                            </div>
                                            <div className="d-flex d-sm-none justify-content-center ">
                                                        <Pagination 
                                                            onChange={(e)=>handeSelectPage(e)}
                                                            defaultCurrent={1} 
                                                            total={countArtwork} 
                                                            defaultPageSize={5}
                                                            size="small"
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(ArtWorkListPage)
