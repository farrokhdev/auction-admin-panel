import React , {useState} from 'react'
import TableFrequentlyAskedQuestions from './TableFrequentlyAskedQuestions';
import {NavLink} from 'react-router-dom';
import {Breadcrumb} from 'antd';

function FrequentlyAskedQuestions(props) {

    const [frequentlyAskedQuestions, setFrequentlyAskedQuestions] = useState([]);


    return (
        <React.Fragment>
            {/* <Loading loading={loading} /> */}
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

export default FrequentlyAskedQuestions
