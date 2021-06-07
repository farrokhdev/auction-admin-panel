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
  UserOutlined,
} from '@ant-design/icons';
// import {FaUsers} from "react-icons/fa";
// import iconUsers from '../../images/svg/icon-more.svg'

// import MembersList from '../../components/MembersList';
import {toggleActiveNavDrawer} from '../../redux/reducers/panel/panel.actions';
import {NavLink} from 'react-router-dom';
import Header from '../../components/Header';
import {connect} from 'react-redux';
import classnames from 'classnames';


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

                  <Menu.Item className="d-flex align-items-center" key="3" icon={<PictureOutlined />}>
                    <NavLink 
                      to="/artworks"
                      id="3" 
                      className="mr-2" 
                      onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) } 
                    >
                       آثار هنری
                    </NavLink>
                  </Menu.Item>


                  <SubMenu  key="4" icon={<WalletOutlined />} title="کیف پول">
                    <Menu.Item  className="d-flex align-items-center" key="4_1">
                      <NavLink
                          id="4_1" 
                          to="/wallets" 
                          className="mr-4" 
                          onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) }
                        >
                          لیست کیف پول‌ها
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item  className="d-flex align-items-center" key="4_2">
                      <NavLink
                        id="4_2" 
                        to="/wallet-deposit" 
                        className="mr-4" 
                        onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) }
                       >
                        واریز
                      </NavLink>
                    </Menu.Item>

                    <Menu.Item   className="d-flex align-items-center" key="4_3">
                      <NavLink
                        id="4_3" 
                        to="/wallet-withdrawal" 
                        className="mr-4" 
                        onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) }
                       >
                        برداشت
                      </NavLink>
                    </Menu.Item>
                  </SubMenu>

                  <Menu.Item key="5" className="d-flex align-items-center" icon={<BankOutlined />}>
                    <NavLink 
                       id="5" 
                       to="/house-auctions" 
                       className="mr-2 align-items-center" 
                       onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) } 
                    >
                        خانه‌های حراجی
                    </NavLink>
                  </Menu.Item>

                  <Menu.Item key="6" className="d-flex align-items-center" icon={<SnippetsOutlined />}>
                    <NavLink 
                       id="6" 
                       to="/sales-consuler" 
                       className="mr-2 align-items-center" 
                       onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) } 
                    >
                        مشاهده فروش
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

                  <Menu.Item key="7" className="d-flex align-items-center" icon={<SnippetsOutlined />}>
                    <NavLink 
                       id="7" 
                       to="/orders" 
                       className="mr-2 align-items-center" 
                       onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) } 
                    >
                        سفارشات
                    </NavLink>
                  </Menu.Item>

                  <SubMenu  key="8" icon={<CommentOutlined />} title="پیام‌ها">
                    <Menu.Item  className="d-flex align-items-center" key="8_1">
                      <NavLink
                          id="8_1" 
                          to="/inbox-messages" 
                          className="mr-4" 
                          onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) }
                        >
                          لیست پیام‌ها
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item  className="d-flex align-items-center" key="8_2">
                      <NavLink
                        id="8_2" 
                        to="/send-message" 
                        className="mr-4" 
                        onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) }
                       >
                        ارسال پیام
                      </NavLink>
                    </Menu.Item>
                  </SubMenu>


                  <Menu.Item key="9" className="d-flex align-items-center" icon={<WechatOutlined />}>
                    <NavLink 
                       id="9" 
                       to="/tickets" 
                       className="mr-2" 
                       onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) } 
                    >
                        تیکت‌ها
                    </NavLink>
                  </Menu.Item>

                  <Menu.Item key="10" className="d-flex align-items-center" icon={<QuestionOutlined />}>
                    <NavLink 
                       id="10" 
                       to="/frequently-asked-questions" 
                       className="mr-2" 
                       onClick={ e => props.toggleActiveNavDrawer(e.currentTarget.id) } 
                    >
                        سوالات متداول
                    </NavLink>
                  </Menu.Item>

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
