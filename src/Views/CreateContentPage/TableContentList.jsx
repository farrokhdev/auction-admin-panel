import React, { useState, useEffect } from 'react';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import queryString from 'query-string';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { message , Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function TableContentList({ setLoading }) {

    const [params, setParams] = useState({
        page: 1,
        page_size: 10,
        ordering: '-start_time'
    })
    const [content, setContent] = useState([])
const {confirm} = Modal
    function showDeleteConfirm(id) {

        confirm({
            title: 'آیا قصد حذف کردن این محتوا را دارید؟',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'بله',
            okType: 'danger',
            cancelText: 'خیر',
            onOk() {
                setLoading(true)
                axios.delete(`${BASE_URL}/panel/contents/${id}/`)
                    .then(resp => {
                        setLoading(false)
                        message.success("حذف محتوا با موفقیت انجام شد")
                        getContetnList()
                    })
                    .catch(err => {
                        setLoading(false)
                        console.error(err);
                        if (err?.response?.data?.message)
                            message.error(err.response.data.message)
                        else if (err?.response?.data?.data?.result)
                            message.error(err.response.data.message)
                        else
                            message.error("دوباره تلاش کنید")
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const getContetnList = () => {
        setLoading(true)
        const queries = queryString.stringify(params);
        axios.get(`${BASE_URL}/panel/contents/?${queries}`)
            .then(resp => {
                setLoading(false)
                if (resp.data.code === 200) {
                    setContent(resp.data.data.result)
                    // setCountAuction(resp.data.data.count)
                }

            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        getContetnList()
    }, [params]);
    return (
        <>
            <div collapse className="table-responsive ">
                <table className="table ">
                    <thead>
                        <tr className="meassage-header-table-title">
                            <th className=" px-0 minWidth-row">
                                <div className=" px-3 text-center">ردیف</div>
                            </th>
                            <th className="  px-0 minWidth-name">
                                <div className=" px-3 text-center">عنوان محتوا</div>
                            </th>

                            <th className="  px-0 minWidth-email">
                                <div className=" px-3 text-center">حذف</div>
                            </th>

                            <th className="  px-0 minWidth-typeAuction">
                                <div className=" px-3 text-center">ویرایش</div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {content ? content?.map((item, index) =>
                            <>
                                <tr className="spaceRow row-messages">

                                    <td className="">
                                        <div className="my-2 content-td">
                                        <div className="text-center">{params?.page == 1 ? ++index : (params?.page_size * (params?.page - 1)) + ++index}</div>
                                        </div>
                                    </td>

                                    <td className="">
                                        <div className="my-2 content-td">
                                            <div className=" text-center">{item?.title}</div>

                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="my-2 content-td">
                                            <div className=" text-center"   onClick={() => showDeleteConfirm(item.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                            </div>

                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="my-2 content-td">

                                            <Link  className=" text-center" to={`/create-content/${item?.id}`}> <FontAwesomeIcon icon={faPen} /></Link>

                                        </div>
                                    </td>
                                </tr>
                            </>
                        ) : <div className="d-flex text-center w-100"></div>}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableContentList