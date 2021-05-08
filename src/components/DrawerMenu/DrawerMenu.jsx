import React , {useState} from 'react';
import { Menu, Switch, Divider , Button} from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import {Link, NavLink} from 'react-router-dom'

const { SubMenu } = Menu;



function DrawerMenu() {

    const [mode, setMode] = React.useState('inline');
  const [theme, setTheme] = React.useState('light');
  const [collapsed, setCollapsed] = useState(false);

//   const changeMode = value => {
//     setMode(value ? 'vertical' : 'inline');
//   };

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  };


    return (
        <React.Fragment>
            {/* <Switch onChange={changeMode} /> Change Mode */}
               
            {/* <Divider type="vertical" /> */}
            {/* <Switch  onClick={changeTheme} /> Change Style<Switch /> */}
            <div  className="logo" >
                
            </div>
            
            <Menu
                
                className="drawer-menu"
                // defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode={mode}
                theme={theme}
                
            >

                <Menu.Item key="1" 
               
                // icon={<MailOutlined />}
                >
                منو
                </Menu.Item>
                <Menu.Item key="2" 
                // icon={<CalendarOutlined />}
                >
                داشبورد
                </Menu.Item>
                <Menu.Item key="3" 
                // icon={<CalendarOutlined />}
                >
                <NavLink to="/members"
                    activeStyle={{
                        fontWeight: "bold",
                        width : "100%",
                        color: "#3D3068"
                    }}
                >اعضا</NavLink>
                </Menu.Item>
                {/* <SubMenu key="sub1" 
                    title="اعضا"
                    
                >

                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
                <SubMenu key="sub1-2" title="Submenu">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                </SubMenu>
                </SubMenu> */}
                <SubMenu key="sub2" 
                    // icon={<SettingOutlined />} 
                    title="خانه‌های حراج">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                </SubMenu>
                <Menu.Item key="link" 
                    // icon={<LinkOutlined />}
                >
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Ant Design
                </a>
                </Menu.Item>
            </Menu>
        </React.Fragment>
    )
}

export default DrawerMenu;


{/* <ul className=" h-100 navbar-panel-drawer ">
                    <div className="d-flex nav-item">
                        <li>
                            <Link to="/">
                                منو
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item mx-4 mx-xl-0">
                        <li>
                            <Link to="/">
                                داشبورد
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link to="/members">
                                اعضا
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link to="/house-auctions">
                            خانه‌های حراج    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            آثار    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            حراج‌ها    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            کیف پول    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            مشاوره خرید    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            مشاوره فروش    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            سفارشات    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            پیام‌ها    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            مدیریت فایل    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            صفحات    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            تنظیمات    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            آمار و گزارش‌گیری    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            مدیرها    
                            </Link>
                        </li>
                    </div>
                    <div className="d-flex nav-item">
                        <li>
                            <Link >
                            سوالات متداول    
                            </Link>
                        </li>
                    </div>
                </ul> */}