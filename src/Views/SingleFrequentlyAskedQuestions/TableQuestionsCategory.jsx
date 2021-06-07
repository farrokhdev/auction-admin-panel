import React from 'react'
import { Menu, Dropdown } from 'antd';
import {Link} from 'react-router-dom';
import icon_more from '../../images/svg/icon-more.svg'
import momentJalaali from 'moment-jalaali';
import {convertTypePersian} from '../../utils/converTypePersion';
import ModalEditFrequentlyAskedQuestion from './ModalEditFrequentlyAskedQuestion';
import { ExclamationCircleOutlined , DownOutlined } from '@ant-design/icons';
import { Modal, notification } from 'antd';
import axios from "../../utils/request";
import { BASE_URL } from '../../utils';

function TableQuestionsCategory({setVisibleEditQuestion , visibleEditQuestion}) {

    
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

    const openNotification = () => {
        notification.success({
          message: 'تایید اثر',
          description:` با موفقیت تایید شد`,
            duration: 1,
            className: 'custom-class',
            style : {
                backgroundColor : '#f9faf5'
            }
        });
      };

    const handleShowModalEditQuestion = (id) => {
        setVisibleEditQuestion(true)
    }

    const handleِDeleteQuestion = (id) =>{
        // alert("Delete Question")

   
            confirm({
            className:"modal-confirm-delete-question",
              title: 'از حذف این سوال اطمینان دارید؟',
              icon: <ExclamationCircleOutlined />,
              okText : "حذف سوال",
              cancelText : "انصراف",
            
    
              onOk() {
                console.log('OK');
    
                let payload = {
                    // "title" : props.detailsArtwork?.title,
                    // "category": props.detailsArtwork?.category,
                    // "description": props.detailsArtwork?.description,
                    // "is_approve":"True",
                    // "admin_description": description
                }
        
                axios.put(`${BASE_URL}/panel/product/approve/1/`, payload).then(res => {
        
                }).catch(err => {
                    console.log(err);
                })
    
                openNotification('topLeft')
                setTimeout(() => {
                    window.location.reload();
                }, 700);
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

                    <th className="  px-0 minWidth-email">
                        <div className=" px-3 text-center">سوال انگلیسی</div>
                    </th>

                    <th className="  px-0 minWidth-description">
                        <div className=" px-3 text-center">پاسخ فارسی</div>
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
                {/* {houseAuctionOffersList ? houseAuctionOffersList.map((offer, index) => */}
                    <> 
                        <tr className="spaceRow row-messages">

                        <td   className="">
                            <div  className="my-2 content-td" >
                                <div className="text-center">
                                    {/* {++index} */}
                                    1
                                </div>
                            </div>
                        </td>

                        <td   className="">
                            <div   className="my-2 content-td">
                                <div className=" text-center"> 
                                {/* {offer?.first_name} */}
                                سوال فارسی
                            </div>

                            </div>
                        </td>
                 
                        <td className="">
                            <div
                                className=" my-2 content-td">
                                <div className=" w-100 text-center"> سوال انگلیسی</div>
                            </div>
                        </td>
                        
                        <td className="">
                            <div
                                className=" my-2 content-td">
                                <div className=" w-100 text-center"> پاسخ فارسی</div>
                            </div>
                        </td>
                
                        <td className="">
                            <div
                          
                                className="my-2 content-td">
                                    پاسخ انگلیسی
                            </div>
                        </td>
                        <td className=" text-center">
                            <div className="my-2 content-td">
                                <Dropdown overlay={menu(1)}>
                                    <a className="">
                                        <img src={icon_more} alt=""/>
                                    </a>
                                </Dropdown>
                                {/* <button onClick={()=>handleClickShowDetailsMessage(ticket?.id) }>جزییات</button> */}

                            </div>
                        </td>
                        </tr>

                        </>
                    {/* ) : <div className="d-flex text-center w-100">لیست خالی</div>} */}

                    <ModalEditFrequentlyAskedQuestion
                        setVisibleEditQuestion={setVisibleEditQuestion}
                        visibleEditQuestion={visibleEditQuestion}
            />

        </tbody>
    </table>

</div>
    )
}

export default TableQuestionsCategory
