import React from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';


function TableFrequentlyAskedQuestions({frequentlyAskedQuestions}) {


    const menu=(id) => (
        <Menu>
            <Menu.Item className="text-center">
                <Link  >
                    مشاهده
                </Link>
            </Menu.Item >
            <Menu.Item className="text-center">
                <Link  to={`frequently-asked-questions/${id}`}>
                     افزودن سوال
                </Link>
            </Menu.Item >
        </Menu>
    );

    
    return (
        <div collapse className="table-responsive ">
            <table className="table ">
                <thead >
                    <tr className="meassage-header-table-title">
                        <th className=" px-0 minWidth-row">
                            <div className=" px-3 text-center">ردیف</div>
                        </th>
                        <th className="  px-0 minWidth-name">
                            <div className=" px-3 text-center">دسته‌بندی فارسی</div>
                        </th>

                        <th className="  px-0 minWidth-email">
                            <div className=" px-3 text-center">دسته‌بندی انگلیسی</div>
                        </th>

                        <th className="  px-0 minWidth-action">
                            <div className="px-3 text-center">عملیات</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {/* {frequentlyAskedQuestions ? frequentlyAskedQuestions.map((question, index) => */}
                        <> 
                            <tr className="spaceRow row-messages">

                            <td   className="">
                                <div  className="my-2 content-td" >
                                    <div className="text-center">
                                        {/* {++index} */}
                                    </div>
                                </div>
                            </td>

                            <td   className="">
                                <div   className="my-2 content-td">
                                    <div className=" text-center"> 
                                        {/* {question?.applicant?.first_name} */}
                                    </div>
                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> 
                                            {/* {question?.applicant?.email} */}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className=" text-center">
                                <div className="my-2 content-td">
                                    <Dropdown overlay={menu(1)}>
                                        <a className="">
                                            <img src={icon_more} alt=""/>
                                            {/* <DownOutlined/> */}
                                        </a>
                                    </Dropdown>
                                    {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}

                                </div>
                            </td>
                            </tr>

                            </>
                        {/* ) : <div className="d-flex text-center w-100">لیست خالی</div>} */}

                   

            </tbody>
        </table>

    </div>
    )
}

export default TableFrequentlyAskedQuestions;
