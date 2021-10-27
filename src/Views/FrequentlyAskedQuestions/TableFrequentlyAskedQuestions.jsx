import React from 'react'
import { Menu, Dropdown , Modal } from 'antd';
import { ExclamationCircleOutlined  } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import EmptyComponent from '../../components/EmptyComponent'
import {BASE_URL} from '../../utils';
import axios from '../../utils/request';
import {successNotification} from '../../utils/notification'

function TableFrequentlyAskedQuestions({frequentlyAskedQuestions , params}) {

    const { confirm } = Modal; 
    const menu=(id) => (
        <Menu>

            <Menu.Item className="text-center">
                <Link  to={`frequently-asked-questions/${id}`}>
                     مشاهده و افزودن سوال
                </Link>
            </Menu.Item >
            <Menu.Item onClick={()=> handleِDeleteCategoryQuestion(id)} className="text-center">
                    حذف
            </Menu.Item >
        </Menu>
    );


    const handleِDeleteCategoryQuestion = (id) =>{

   
        confirm({
        className:"modal-confirm-delete-question",
          title: 'از حذف این دسته‌بندی اطمینان دارید؟',
          icon: <ExclamationCircleOutlined />,
          okText : "حذف دسته‌بندی",
          cancelText : "انصراف",
        

          onOk() {
            console.log('OK');


    
            axios.delete(`${BASE_URL}/panel/faq-categories/${id}/`).then(res => {
                successNotification('حذف دسته‌بندی سوال' , 'حذف دسته‌بندی سوال با موفقیت انجام شد')
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
                    {frequentlyAskedQuestions?.length ? frequentlyAskedQuestions.map((question, index) =>
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
                                        {question?.title_fa}
                                    </div>
                                </div>
                            </td>
                            <td  className="">

                                <div   className=" ">
                                    <div className="my-2 content-td">
                                        <div className=" text-center"> 
                                            {question?.title_en}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className=" text-center">
                                <div className="my-2 content-td">
                                    <Dropdown overlay={menu(question?.id)}>
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
                         ) : <div className="d-flex text-center w-100"></div>} 

                   

            </tbody>
        </table>

            <div className="d-flex justify-content-center w-100">
                {!frequentlyAskedQuestions?.length  && <EmptyComponent text={"دسته‌بندی موجود نیست"}/>}
            </div>
    </div>
    )
}

export default TableFrequentlyAskedQuestions;
