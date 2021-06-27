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

                    <MenuItemComponent id={"1"} key={"1"} title={"خانه"} link={"/home"} toggleActiveNavDrawer={toggleActiveNavDrawer} icon={<HomeOutlined />}/>
                    <MenuItemComponent id={"2"} key={"2"} title={"اعضا"} link={"/members"} toggleActiveNavDrawer={toggleActiveNavDrawer} icon={<TeamOutlined />}/>
                    <MenuItemComponent id={"3"} key={"3"} title={"آثار هنری"} link={"/artworks"} toggleActiveNavDrawer={toggleActiveNavDrawer} icon={<PictureOutlined />}/>
                    <MenuItemComponent id={"4"} key={"4"} title={"حراج‌ها"} link={"/auctions"} toggleActiveNavDrawer={toggleActiveNavDrawer} icon={<NotificationOutlined />}/> 
                    
                    <SubMenu  key="5" icon={<WalletOutlined />} title="کیف پول">
                      <MenuItemComponent id={"5_1"} key={"5_1"} title={"لیست کیف پول‌ها"} link={"/wallets"} toggleActiveNavDrawer={toggleActiveNavDrawer} />
                      <MenuItemComponent id={"5_2"} key={"5_2"} title={"شارژ هدیه"} link={"/wallet-deposit"} toggleActiveNavDrawer={toggleActiveNavDrawer} />
                    </SubMenu>

                    <SubMenu  key="6" icon={<BankOutlined />} title="خانه‌های حراجی">
                      <MenuItemComponent id={"6_1"} key={"6_1"} title={"خانه‌های حراجی "} link={"/house-auctions"} toggleActiveNavDrawer={toggleActiveNavDrawer} />
                      <MenuItemComponent id={"6_2"} key={"6_2"} title={"ایجاد حراجی"} link={"/add-new-auction"} toggleActiveNavDrawer={toggleActiveNavDrawer} />
                    </SubMenu>

                    <MenuItemComponent id={"7"} key={"7"} title={"مشاوره فروش"} link={"/sales-consuler"} icon={<SnippetsOutlined/>} toggleActiveNavDrawer={toggleActiveNavDrawer} />
                    <MenuItemComponent id={"8"} key={"8"} title={"سفارشات"} link={"/orders"} icon={<FileTextOutlined />} toggleActiveNavDrawer={toggleActiveNavDrawer} />

                    <SubMenu  key="9" icon={<CommentOutlined />} title="پیام‌ها">
                      <MenuItemComponent id={"9_1"} key={"9_1"} title={"لیست پیام‌ها"} link={"/inbox-messages"} icon={<FileTextOutlined />} toggleActiveNavDrawer={toggleActiveNavDrawer} />
                      <MenuItemComponent id={"9_2"} key={"9_2"} title={"ارسال پیام"} link={"/send-message"}  toggleActiveNavDrawer={toggleActiveNavDrawer} />
                    </SubMenu>

                    <MenuItemComponent id={"10"} key={"10"} title={"تیکت‌ها"} link={"/tickets"} icon={<WechatOutlined />} toggleActiveNavDrawer={toggleActiveNavDrawer} />
                    <MenuItemComponent id={"11"} key={"11"} title={"سوالات متداول"} link={"/frequently-asked-questions"} icon={<QuestionOutlined />} toggleActiveNavDrawer={toggleActiveNavDrawer} />

                
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
