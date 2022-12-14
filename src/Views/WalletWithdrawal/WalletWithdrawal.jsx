import React, {useState, useEffect} from 'react';
import {BASE_URL} from '../../utils';
import {Form , Breadcrumb , Select , Input} from 'antd';
import {NavLink} from 'react-router-dom';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import axios from '../../utils/request';
import ModalConfirmWithdrawal from './ModalConfirmWithdrawal';


function WalletWithdrawal(props) {
    
    const { Option } = Select;

    const [visibleCofirmWithdrawal, setVisibleCofirmWithdrawal] = useState(false);
    const [cards, setCards] = useState([{card_number : "1111111111111111"}]);
    const [amount, setAmount] = useState();

    const onFinish = (values) => {
        setAmount(values.amount ? values.amount : '')
        console.log(values);

        let payload = {
            card_number : values.amount,
            amount : values.amount
        }


        axios.post(`${BASE_URL}/` , payload).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })


        setVisibleCofirmWithdrawal(true)
    }   
    
    const onFinishFailed = (values) => {
        console.log(values);
    }

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
                                                            ????????
                                                        </NavLink>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item>
                                                       ????????????
                                                    </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  mx-0">
                                        <div className="col content-page p-4  ">
                                            
                                        <Form
                                                id="form-add-ticket"
                                                name="basic"
                                                initialValues={{
                                                remember: true
                                            }}
                                                onFinish={onFinish}
                                                onFinishFailed={onFinishFailed}>

                                                <div className="d-block d-lg-flex">
                                                    <div className="col col-md-3">
                                                        <div className="d-flex">
                                                            <p className="mb-0 mb-2 mb-lg-0">???????? ??????????</p>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                    <Form.Item  
                                                    
                                                            name="user_bank_account"
                                                            rules={[{ 
                                                                required: true ,
                                                                message: '?????????? ?????????? ???? ???????????? ???????????????????!'
                                                            }]}>
                                                            <Select
                                                                // notFoundContent = {'?????????? ?????????? ???? ???????? ???????????? ?????? ?????????? ??????!'}
                                                                placeholder="???????????? ???????? ??????????"
                                                                // onChange={onGenderChange}
                                                                allowClear
                                                            >

                                                                {cards ? cards.map(card => (
                                                                    <Option value={card.card_number}>{card.card_number}</Option>
                                                                ))  : null }

                                                            </Select>
                                                    </Form.Item>
                                                    </div>
                                                    <div className="col"></div>
                                                </div>
                                                
                                                <div className="d-block d-lg-flex">
                                                    <div className="col col-md-3">
                                                        <div className="d-flex">
                                                            <p className="mb-0 mb-2 mb-lg-0">???????? (??????????)</p>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                    <Form.Item 
                                                    name="amount"  
                                                    rules={[{ 
                                                        required: true ,
                                                        message: '????????  ???? ???????? ???????????????????!'
                                                        },
                                                        {
                                                            // pattern: /^[\d]{0,20}$/,
                                                            pattern: /^[\u06F0-\u06F90-9]+$/,
                                                            message: "???????? ?????????????? ?????? ?????????? ???????????????!",
                                                        },

                                                        {
                                                            message: "???????????? ?????????? ?????????????????? 10 ?????? ???????????????!",
                                                        }
                                                        
                                                    ]}>
                                                    <Input
                                                        
                                                        // placeholder="Select a option and change input text above"
                                                    >
                                                        
                                                    </Input>
                                                </Form.Item>
                                                    </div>
                                                    <div className="col"></div>
                                                </div>

                                       
                                                <div className="d-flex justify-content-end">
                                                    <button htmlType="submit" className="btn-submit-new-ticket mr-2 mt-4">????????????</button>
                                                </div>

                                            </Form>
                                        </div>
                                    </div>
                               
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <ModalConfirmWithdrawal
                setVisibleCofirmWithdrawal={setVisibleCofirmWithdrawal}
                visibleCofirmWithdrawal={visibleCofirmWithdrawal}
                amount={amount}
            />
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
  
  export default connect(mapStateToProps , mapDispatchToProps)(WalletWithdrawal)
