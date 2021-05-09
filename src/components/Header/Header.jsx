import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {clearStorage} from '../../redux/reducers/auth/auth.actions';
import {clearActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import DrawerResponsive from '../DrawerResponsive/DrawerResponsive';

function Header(props) {


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

    const menu = (
        <Menu>
          <Menu.Item key="0"> 
            <div style={{width :'100px'}} className="text-center" onClick={handleLogOut}>خروج</div>
          </Menu.Item>
          {/* <Menu.Item key="1">
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" disabled>
            3rd menu item（disabled）
          </Menu.Item> */}
        </Menu>
      );

 


    return (
        <div style={{height : '60px'}} className="row justify-content-center align-items-center box-header-panel pr-0 mr-0">
            
            <div className="row justify-content-between align-items-center w-100">
                <div className="d-none d-lg-block">
                    <h3 className="text-right mb-0 mr-3">Auction Panel Admin</h3>
                </div>
                <div className=" col-3 col-sm-7  d-lg-none ">
                    <div className="d-flex">
                        {/* <DrawerResponsive/> */}
                    </div>
                </div>
                <div className="col-9 col-sm-5 col-lg-3">
                    <div  className="d-flex justify-content-end">
                        <div className="col">
                            <div className="d-flex justify-content-start align-items-center">
                                
                                <Avatar size={32} icon={<UserOutlined />} />
                                
                                {props.auth?.username ? 
                                    <Dropdown className="mr-2" overlay={menu}>
                                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                            {props.auth?.username} 
                                            <DownOutlined  className="mr-3"/>
                                        </a>
                                </Dropdown>

                               : <div onClick={handleRedirect} style={{cursor : 'pointer'}} className="mr-2">ورود</div>} 
      
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

// export default Header;

const mapDispatchToProps = (dispatch) => {
    return {
        // setPhoneNumber : (data) => dispatch(setPhoneNumber(data)),
        // setProfile : (data) => dispatch(setProfile(data)),
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



