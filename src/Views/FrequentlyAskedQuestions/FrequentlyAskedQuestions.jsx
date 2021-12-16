import React , {useState , useEffect} from 'react'
import TableFrequentlyAskedQuestions from './TableFrequentlyAskedQuestions';
import {NavLink} from 'react-router-dom';
import {Breadcrumb , Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import axios from '../../utils/request';
import PaginationComponent from '../../components/PaginationComponent';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

function FrequentlyAskedQuestions(props) {

    const [frequentlyAskedQuestions , setFrequentlyAskedQuestions] = useState([]);
    const [frequentlyCount, setfrequentlyCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [params , setParams] = useState(
        {
            page : 1, 
            page_size : 10 , 
        });

    useEffect(() => {
      setLoading(true)
      const queries = queryString.stringify(params);
      axios.get(`${BASE_URL}/panel/faq-categories/?${queries}`).then(res => {
        setLoading(false)
        setFrequentlyAskedQuestions(res.data.data.result)
        setfrequentlyCount(res.count)
    }).catch(err => {
        console.log(err);
        setLoading(false)
    })
 
    }, [params]);

    const handeSelectPage = (e) => {
        console.log("Log Of Pagination", e);
        setCurrentPage(e)
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
                                                       مشاهده دسته‌بندی
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">

                                        <div className="d-flex justify-content-center justify-content-lg-end ml-lg-5 mb-5">
                                            <Link to="/add-question-category" >
                                                <button className="btn-add-questions-category">افرودن دسته‌بندی</button>
                                            </Link>
                                        </div>

                                            <TableFrequentlyAskedQuestions 
                                                frequentlyAskedQuestions={frequentlyAskedQuestions}
                                                params={params}
                                            />
                                            <PaginationComponent count ={frequentlyCount} handeSelectPage={handeSelectPage} />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
  
  export default connect(mapStateToProps , mapDispatchToProps)(FrequentlyAskedQuestions)