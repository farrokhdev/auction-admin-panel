import React , {useState , useEffect} from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import { Menu, Dropdown , Badge} from 'antd';
import { DownOutlined , WechatOutlined} from '@ant-design/icons';
import {clearStorage} from '../../redux/reducers/auth/auth.actions';
import {clearActiveNavDrawer , toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import DrawerResponsive from '../DrawerResponsive/DrawerResponsive';
import ModalChangePassword from './ModalChangePassword';
import classnames from 'classnames';
import {Link, NavLink} from 'react-router-dom';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
// import logo from '../../images/logo1.png'
import logo from '../../images/smartauction-72.png';
import { AvatarUploadModal } from './AvatarUploadModal';


function Header(props) {

    // Modal handler 
    const[modalOpen,setModalOpen]=useState(false)

    const onClick=()=>{
        setModalOpen(true)
    }
    const onOk=()=>{
        setModalOpen(false)
    }
    const onCancel=()=>{
        setModalOpen(false)
    }
    // Modal handler ends




    const [visibleChangePasswordModal, setVisibleChangePasswordModal] = useState(false);
    const [countUnReadTickets, setCountUnReadTickets] = useState(0);

    useEffect(() => {

        axios.get(`${BASE_URL}/ticketing/unread_count/`).then(res => {
            setCountUnReadTickets(res.data.data.result.count)
        }).catch(err => {
            console.log(err);
        })

    }, []);

    const handleLogOut = ()=>{
        props.clearStorage()
        props.clearActiveNavDrawer()
        setTimeout(() => {
            window.location.href = "#/login"
        }, 700);
    }

    const handleRedirect = () =>{
        window.location.href = "#/login"
    }

    const handleShowModalChangePassword = () => {
        setTimeout(() => {
            setVisibleChangePasswordModal(true)
        }, 500);
    }

    const menu = (
        <Menu>
          <Menu.Item key="1"> 
            <div style={{width :'100px'}} className="text-center" onClick={handleShowModalChangePassword} >?????????? ??????????????</div>
          </Menu.Item>
          <Menu.Item key="0"> 
            <div style={{width :'100px'}} className="text-center" onClick={handleLogOut}>????????</div>
          </Menu.Item>
          
          <ModalChangePassword   
                visibleChangePasswordModal = {visibleChangePasswordModal}
                setVisibleChangePasswordModal={setVisibleChangePasswordModal}
          />
        </Menu>
      );



    return (
        <div  className="row justify-content-center align-items-center box-header-panel pr-0 mr-0">
            
            <div className="row justify-content-between align-items-center w-100">
                <div className="d-none d-lg-block">
                    <Link to="/home"> 
                    <img src={logo} className="text-right mb-0 mr-3" alt="" />
                    </Link>
                    {/* <h5 className="text-right mb-0 mr-3">?????? ?????????? ?????????? ????????????</h5> */}
                </div>
                <div className="col-1  d-lg-none px-0">
                    <div className="d-flex">
                        <DrawerResponsive/>
                    </div>
                </div>
                <div className="col-11 col-lg-5 pl-lg-4">
                    <div  className="d-flex justify-content-end ">
                        <div className="col px-0">
                            <div className="d-flex justify-content-end align-items-center ">

                            <Badge size="small" count={countUnReadTickets} className="ml-2 ml-sm-5">
                                <NavLink onClick={ e => props.toggleActiveNavDrawer("4")} to="/inbox-messages">
                                <WechatOutlined  className="icon-bell-header"/>
                                </NavLink>
                            </Badge>

                                <Avatar  className={classnames("", {
                                        "avatar-disable": !props.auth.is_logged_in,
                                        "avatar-logged-in": props.auth.is_logged_in
                                        })} size={32} icon={<UserOutlined />} />

                                     
                                    
                                {props.auth.is_logged_in ? 
                                    <Dropdown className="mr-2" overlay={menu}>
                                        <a className="ant-dropdown-link username-avatar" onClick={e => e.preventDefault()}>
                                            {console.log("length ::" , props.auth?.username?.length)}
                                            {`${props.auth?.mobile ? props.auth?.mobile?.slice(0 , 20) : props.auth?.username?.slice(0 ,20)} ${props.auth?.username?.length > 20 ? '...' : ''}`} 
                                            <DownOutlined  className="mr-1"/>
                                        </a>
                                </Dropdown>

                               : <div onClick={handleRedirect} style={{cursor : 'pointer'}} className="mr-2">????????</div>} 
      
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        // setPhoneNumber : (data) => dispatch(setPhoneNumber(data)),
        toggleActiveNavDrawer : (data) => dispatch(toggleActiveNavDrawer(data)),
        clearActiveNavDrawer : () => dispatch(clearActiveNavDrawer()),
        clearStorage : () => dispatch(clearStorage()),
    }
}

const mapStateToProps = (store) => {
    return {
        auth : store.authReducer,
        panel : store.panelReducer
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(Header)



