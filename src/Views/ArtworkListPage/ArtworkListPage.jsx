import React, {useState, useEffect} from 'react';
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';
import {Breadcrumb} from 'antd';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import TableArtworkList from './TableArtworkList';
import Loading from '../../components/Loading';
import PaginationComponent from '../../components/PaginationComponent';
import queryString from 'query-string';

function ArtWorkListPage(props) {

    const [artworkList , setArtworkList] = useState([]);
    const [countArtwork , setCountArtwork] = useState(0);
    const [currentPage , setcurrentPage] = useState(1);
    const [loading , setLoading] = useState(false);
    const [params , setParams] = useState(
        {
            page : 1 , 
            page_size : 5 , 
            search : ''
        });


    // const handleFilterDateFrom = (date) => {
    //     setParams({...params , date_after : date})
    // }

    // const handleFilterDateTo = (date) => {
    //     setParams({...params , date_befor : date})
    // }


    const handleFilterArtwork = (value) => {
        setParams({
            ...params , search : value
        })
    }

    useEffect(() => {

        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/sale/product/?${queries}`).then(res => {
            setLoading(false)
            setArtworkList(res.data.data.result)
            setCountArtwork(res.data.data.count)
        }).catch(err => {
            console.error(err);
            setLoading(false)
        })

    }, [params]);


    const handeSelectPage = (e) => {
        setcurrentPage(e)
        setParams({
            ...params , page : e
        })
    }

    return (
        <React.Fragment>
            <Loading loading={loading}/>
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
                                                <TableArtworkList  artworkList={artworkList} countArtwork={countArtwork} 
                                                    handleFilterArtwork={handleFilterArtwork}
                                                    // handleFilterDateFrom={handleFilterDateFrom}
                                                    // handleFilterDateTo={handleFilterDateTo}
                                                
                                                />
                                            </div>

                                            <PaginationComponent count={countArtwork} handeSelectPage={handeSelectPage}/>

                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
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
