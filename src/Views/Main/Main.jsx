import React, {useState, useEffect} from 'react';
import { Layout, Menu, Breadcrumb  } from 'antd';
import {
  DesktopOutlined,
  HomeOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  activeOpenKeys,
  FileOutlined,
  defaultOpenKeys,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
// import {FaUsers} from "react-icons/fa";
// import iconUsers from '../../images/svg/icon-more.svg'

// import MembersList from '../../components/MembersList';
import {toggleDrawer , toggleClickNavDrawer , toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {Link, NavLink} from 'react-router-dom';
import Header from '../../components/Header';
import {connect} from 'react-redux';



const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Main(props) {

    const [collapsed, setCollapsed] = useState(false);


    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollapsed(collapsed );
      };


    return (
        <React.Fragment>
            <Layout style={{ minHeight: '100vh' }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" 
                  defaultSelectedKeys={[props.panel?.activeNavDrawer]} 
                  // defaultOpenKeys={[""]}
                  mode="inline">
                  <Menu.Item className="d-flex align-items-center" key="1" icon={<HomeOutlined />}
                  >
                    <NavLink 
                      id="1" 
                      to="/home" 
                      className="mr-2" 
                      onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) } 
                    >خانه</NavLink>
                    
                  </Menu.Item>
                  

                  {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                  </SubMenu> */}

                  {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                  </SubMenu> */}

                  <Menu.Item key="2" className="d-flex align-items-center" icon={<TeamOutlined />}>
                    <NavLink 
                       id="2" 
                       to="/members" 
                       className="mr-2" 
                       onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) } 
                    >
                        اعضا
                    </NavLink>
                  </Menu.Item>

                  <Menu.Item className="d-flex align-items-center" key="3" icon={<AppstoreOutlined />}>
                    <NavLink 
                      to="/house-auctions"
                      id="3" 
                      className="mr-2" 
                      onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) } 
                    >
                      خانه های حراچ
                    </NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">


                <Header className="site-layout-background" />
                {/* <Header className="site-layout-background"  /> */}


                    <Content style={{ margin: '0 16px' }}>
                        {props.children}

                      {/* <div className="row  px-4">
                          <Breadcrumb style={{ margin: '16px 0' }}>
                          <Breadcrumb.Item>خانه</Breadcrumb.Item>
                          </Breadcrumb>
                      </div>
                      <div className="row ">
                          <MembersList/>
                      </div> */}

                      
                    </Content>



                <Footer style={{ textAlign: 'center' }}>کلیه حقوق این سایت نزد شرکت تجارت الکترونیک امن موج محفوظ است</Footer>


              </Layout>
            </Layout>
        </React.Fragment>
    )
}

// export default Main;

const mapDispatchToProps = (dispatch) => {
  return {
      // toggleDrawer : () => dispatch(toggleDrawer()),
      toggleActiveNavDrawer : (data) => dispatch(toggleActiveNavDrawer(data)),
      // toggleClickNavDrawer : () => dispatch(toggleClickNavDrawer())
  }
}

const mapStateToProps = (store) => {
  return {
      panel: store.panelReducer
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Main)