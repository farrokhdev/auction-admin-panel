import React , {useState , useEffect} from 'react'
import TableFrequentlyAskedQuestions from './TableFrequentlyAskedQuestions';
import {NavLink} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import {BASE_URL} from '../../utils';
import Loading from '../../components/Loading';
import axios from '../../utils/request';
import PaginationComponent from '../../components/PaginationComponent';

function FrequentlyAskedQuestions(props) {

    const [frequentlyAskedQuestions , setFrequentlyAskedQuestions] = useState([
        {
            persion_category : '1دسته‌بندی فارسی  ',
            english_category : ' english category1',
        },
        {
            persion_category : 'دسته‌بندی فارسی2  ', 
            english_category : ' english category2',
        },
        {
            persion_category : 'دسته‌بندی فارسی3',
            english_category : ' english category3',
        }
    ]);
    const [frequentlyCount, setfrequentlyCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true)
      axios.get(`${BASE_URL}/sale/product/?page=${currentPage}&page_size=5`).then(res => {
        setLoading(false)
        // setFrequentlyAskedQuestions(res.data.results)
        setfrequentlyCount(res.count)
    }).catch(err => {
        console.log(err);
        setLoading(false)
    })
 
    }, []);

    const handeSelectPage = (e) => {
        console.log("Log Of Pagination", e);
        setCurrentPage(e)
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
                                                       مشاهده دسته‌بندی
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">
                                            <TableFrequentlyAskedQuestions frequentlyAskedQuestions={frequentlyAskedQuestions}/>
                                            <PaginationComponent count ={frequentlyCount} handeSelectPage={handeSelectPage} />
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(FrequentlyAskedQuestions)