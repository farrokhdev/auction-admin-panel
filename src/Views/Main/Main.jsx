import React, {useState, useEffect} from 'react';
import { Layout, Menu, Breadcrumb  } from 'antd';
import {
  BankOutlined,
  HomeOutlined,
  PictureOutlined,
  CommentOutlined,
  WechatOutlined,
  SnippetsOutlined,
  WalletOutlined,
  QuestionOutlined,
  TeamOutlined,
  FileTextOutlined,
  NotificationOutlined
} from '@ant-design/icons';
// import {FaUsers} from "react-icons/fa";
// import iconUsers from '../../images/svg/icon-more.svg'

// import MembersList from '../../components/MembersList';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {NavLink} from 'react-router-dom';
import Header from '../../components/Header';
import {connect} from 'react-redux';
import classnames from 'classnames';
import MenuItemComponent from './MenuItemComponent';

const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Main(props) {

    const [collapsed, setCollapsed] = useState(false);
    // const [marginRightSider, setMarginRightSider] = useState(0);

    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollapsed(collapsed );
        // if(collapsed){
        //   setTimeout(() => {
        //     setMarginRightSider(75)
        //   }, 100);
        // }else{
        //   setTimeout(() => {
        //     setMarginRightSider(200)
        //   }, 100);
        // }
      };

      
    return (
        <React.Fragment>
            <Layout style={{ minHeight: '100vh' }} >

              <Sider className="d-none d-lg-block"

                  style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    right: 0,
                  }}

              // breakpoint="lg"
              // collapsedWidth="0"
              // onBreakpoint={broken => {
              //   console.log(broken);
              // }}
              onCollapse={(collapsed, type) => {
                
              }}
                collapsible 
                collapsed={collapsed} onCollapse={onCollapse}
                >
                <div className="logo" />
                <Menu theme="dark" 
                  defaultSelectedKeys={[props.panel?.activeNavDrawer]} 
                  // defaultOpenKeys={[""]}
                  mode="inline">


                  <Menu.Item 
                      className="d-flex align-items-center" 
                      key={1} 
                      icon={<HomeOutlined />}>
                    <NavLink 
                        id={1}
                        to={"/home"} 
                        className="mr-2" 
                        onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                    >
                        خانه
                    </NavLink>
                  </Menu.Item>


                  <Menu.Item 
                      className="d-flex align-items-center" 
                      key={2} 
                      icon={<TeamOutlined />}>
                    <NavLink 
                        id={2}
                        to={"/members"} 
                        className="mr-2" 
                        onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                    >
                        اعضا
                    </NavLink>
                  </Menu.Item>

                  <Menu.Item 
                      className="d-flex align-items-center" 
                      key={3} 
                      icon={<PictureOutlined />}>
                    <NavLink 
                        id={3}
                        to={"/artworks"} 
                        className="mr-2" 
                        onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                    >
                        آثار هنری
                    </NavLink>
                  </Menu.Item>
       
                  <SubMenu id={4}  key={4} icon={<NotificationOutlined />} title="حراج‌ها">
                    <Menu.Item 
                        className="d-flex align-items-center" 
                        key={4.1}
                        >
                      <NavLink 
                          id={4.1}
                          to={"/auctions"} 
                          className="mr-2" 
                          onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                      >
                          حراج‌ها 
                      </NavLink>
                    </Menu.Item>

                    <Menu.Item 
                        className="d-flex align-items-center" 
                        key={4.2} 
                              >
                        <NavLink 
                            id={4.2}
                            to={"/add-new-auction"} 
                            className="mr-2" 
                            onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                        >
                            ایجاد حراجی 
                        </NavLink>
                    </Menu.Item>
                  </SubMenu>

                    <SubMenu id={5}  key={5} icon={<WalletOutlined />} title="کیف پول">
                          <Menu.Item 
                            className="d-flex align-items-center" 
                            key={5.1} 
                            >
                          <NavLink 
                              id={5.1}
                              to={"/wallets"} 
                              className="mr-2" 
                              onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                          >
                              لیست کیف پول‌ها 
                          </NavLink>
                        </Menu.Item>
                        
                        <Menu.Item 
                            className="d-flex align-items-center" 
                            key={5.2}
                            >
                          <NavLink 
                              id={5.2}
                              to={"/wallet-deposit"} 
                              className="mr-2" 
                              onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                          >
                              شارژ هدیه 
                          </NavLink>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu id={6}  key={6} icon={<BankOutlined />} title="خانه‌های حراجی">
                        <Menu.Item 
                            className="d-flex align-items-center" 
                            key={6.1} 
                            >
                          <NavLink 
                              id={6.1}
                              to={"/house-auctions"} 
                              className="mr-2" 
                              onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                          >
                              خانه‌های حراجی 
                          </NavLink>
                        </Menu.Item>
                    </SubMenu>

                        <Menu.Item 
                        icon={<SnippetsOutlined/>}
                            className="d-flex align-items-center" 
                            key={7}
                            >
                          <NavLink 
                              id={7}
                              to={"/sales-consuler"} 
                              className="mr-2" 
                              onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                          >
                              مشاوره فروش 
                          </NavLink>
                        </Menu.Item>

                        <Menu.Item
                          icon={<FileTextOutlined />} 
                            className="d-flex align-items-center" 
                            key={8} 
                            >
                          <NavLink 
                              id={8}
                              to={"/orders"} 
                              className="mr-2" 
                              onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                          >
                              سفارشات  
                          </NavLink>
                        </Menu.Item>


                    <SubMenu  id={9} key={9} icon={<CommentOutlined />} title="پیام‌ها">
                         <Menu.Item 
                            className="d-flex align-items-center" 
                            key={9.1} 
                            >
                          <NavLink 
                              id={9.1}
                              to={"/inbox-messages"} 
                              className="mr-2" 
                              onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                          >
                              لیست پیام‌ها  
                          </NavLink>
                        </Menu.Item>

                        <Menu.Item
                            className="d-flex align-items-center" 
                            key={9.2} 
                            >
                          <NavLink 
                              id={9.2}
                              to={"/send-message"} 
                              className="mr-2" 
                              onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                          >
                              ارسال پیام  
                          </NavLink>
                        </Menu.Item>


                    </SubMenu>

                    <Menu.Item 
                      icon={<WechatOutlined />}
                            className="d-flex align-items-center" 
                            key={10} 
                            >
                          <NavLink 
                              id={10}
                              to={"/tickets"} 
                              className="mr-2" 
                              onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                          >
                              تیکت‌ها   
                          </NavLink>
                        </Menu.Item>

                        <Menu.Item
                            icon={<QuestionOutlined />}
                            className="d-flex align-items-center" 
                            key={11} 
                            >
                          <NavLink 
                              id={11}
                              to={"/frequently-asked-questions"} 
                              className="mr-2" 
                              onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
                          >
                              سوالات متداول  
                          </NavLink>
                        </Menu.Item>

                    
                                  {/* <SubMenu  key="5" icon={<SnippetsOutlined />} title="مشاوره فروش">
                                    <Menu.Item className="d-flex align-items-center" key="5_1">
                                    <NavLink
                                    id="5_1" 
                                    to="/sales-consuler" 
                                    className="mr-4" 
                                    onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) }
                                    >
                                    مشاهده فروش
                                    </NavLink>
                                    </Menu.Item>
                                    <Menu.Item className="d-flex align-items-center" key="5_2">
                                    <NavLink
                                    id="5_2" 
                                    to="/send-to-house-auction" 
                                    className="mr-4" 
                                    onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) }
                                    >
                                    ارسال به خانه حراج
                                    </NavLink>
                                    </Menu.Item>
                                    <Menu.Item className="d-flex align-items-center"  key="5_3">
                                    <NavLink
                                    id="5_3" 
                                    to="/house-auctions-offered" 
                                    className="mr-4" 
                                    style={{fontSize : '0.7rem'}}
                                    onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) }
                                    >
                                    خانه حراج‌های پیشنهادی یک اثر
                                    </NavLink>
                                    </Menu.Item>
                                  </SubMenu> */}
                </Menu>
              </Sider>


                <Header className="site-layout-background" />


              <Layout className="site-layout" className={classnames("site-layout", {
                            "site-layout-expanded": collapsed,
                            "site-layout-minus": !collapsed
                          })} >


                {/* <Header className="site-layout-background"  /> */}


                    <Content className="mt-5 mb-3" style={{ margin: '0 16px' }}>
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
