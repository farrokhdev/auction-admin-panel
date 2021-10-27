import React from 'react'
import { Menu, Dropdown} from 'antd';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import ModalEditFrequentlyAskedQuestion from './ModalEditFrequentlyAskedQuestion';
import { ExclamationCircleOutlined , DownOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';
import { successNotification } from '../../utils/notification';
import EmptyComponent from '../../components/EmptyComponent';

function TableQuestionsCategory(props) {

   const {setVisibleEditQuestion , visibleEditQuestion , questionList , params} = props

    const { confirm } = Modal; 
    const menu=(id , name) => (
        <Menu>
            <Menu.Item onClick={()=>handleShowModalEditQuestion(id)} className="text-center">
                ویرایش
            </Menu.Item >
            <Menu.Item onClick={()=>handleِDeleteQuestion(id)} className="text-center">
                حذف
            </Menu.Item >
        </Menu>
    );



    const handleShowModalEditQuestion = (id) => {
        setVisibleEditQuestion(true)
    }

    const handleِDeleteQuestion = (id) =>{

   
            confirm({
            className:"modal-confirm-delete-question",
              title: 'از حذف این سوال اطمینان دارید؟',
              icon: <ExclamationCircleOutlined />,
              okText : "حذف سوال",
              cancelText : "انصراف",
            
    
              onOk() {
                console.log('OK');
    
  
        
                axios.delete(`${BASE_URL}/panel/faq/${id}/`).then(res => {
                    successNotification('حذف سوال' , 'حذف سوال با موفقیت انجام شد')
                }).catch(err => {
                    console.log(err);
                })
    
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
              },
                //   onCancel() {
                //     console.log('Cancel');
                //   },
            });

    }

    const ReachableContext = React.createContext();
    const UnreachableContext = React.createContext();

    const config = {
        title: 'Use Hook!',
        content: (
          <>
            <ReachableContext.Consumer>{name => `Reachable: ${name}!`}</ReachableContext.Consumer>
            <br />
            <UnreachableContext.Consumer>{name => `Unreachable: ${name}!`}</UnreachableContext.Consumer>
          </>
        ),
      };

    return (
        <div collapse className="table-responsive ">
        <table className="table ">
            <thead >
                <tr className="meassage-header-table-title">
                    <th className=" px-0 minWidth-row">
                        <div className=" px-3 text-center">ردیف</div>
                    </th>
                    <th className="  px-0 minWidth-name">
                        <div className=" px-3 text-center">سوال فارسی</div>
                    </th>

                    <th className="  px-0 minWidth-description">
                        <div className=" px-3 text-center">پاسخ فارسی</div>
                    </th>

                    <th className="  px-0 minWidth-email">
                        <div className=" px-3 text-center">سوال انگلیسی</div>
                    </th>

                    
                    <th className="  px-0 minWidth-description">
                        <div className=" px-3 text-center">پاسخ انگلیسی</div>
                    </th>

                    <th className="  px-0 minWidth-action ">
                        <div className="px-3 text-center">عملیات</div>
                    </th>
                </tr>
            </thead>

            <tbody>
                {questionList?.length ? questionList?.map((question, index) =>
                    <> 
                        <tr className="spaceRow row-messages">

                        <td   className="">
                            <div  className="my-2 content-td" >
                                <div className="text-center">
                                {params?.page == 1 ?  ++index : ( params?.page_size * (params?.page - 1) ) + ++index }
                                   
                                </div>
                            </div>
                        </td>

                        <td   className="">
                            <div   className="my-2 content-td">
                                <div className=" text-center"> 
                                    {question?.question_fa}
                                </div>

                            </div>
                        </td>

                        <td className="">
                            <div
                                className=" my-2 content-td">
                                <div style={{direction : 'ltr'}} className=" w-100 text-center"> 
                                {question?.answer_fa}
                                </div>
                            </div>
                        </td>
                 
                        <td className="">
                            <div
                                className=" my-2 content-td">
                                <div style={{direction : 'ltr'}} className=" w-100 text-center"> 
                                    {question?.question_en}
                                </div>
                            </div>
                        </td>
                        
                    
                        <td className="">
                            <div
                          
                                className="my-2 content-td">
                                    {question?.answer_en}
                            </div>
                        </td>
                        <td className=" text-center">
                            <div className="my-2 content-td">
                                <Dropdown overlay={menu(question?.id)}>
                                    <a className="">
                                        <img src={icon_more} alt=""/>
                                    </a>
                                </Dropdown>
                            </div>
                        </td>
                        </tr>

                        </>
                    ) : <div className="d-flex text-center w-100"></div>} 

                    <ModalEditFrequentlyAskedQuestion
                        setVisibleEditQuestion={setVisibleEditQuestion}
                        visibleEditQuestion={visibleEditQuestion}
                    />

                </tbody>
            </table>

                <div className="d-flex justify-content-center w-100">
                    {!questionList?.length  && <EmptyComponent text={"سوالی موجود نیست"}/>}
                </div>
            </div>
    )
}

export default TableQuestionsCategory
