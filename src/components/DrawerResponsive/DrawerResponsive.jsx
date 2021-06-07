import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import {MenuFoldOutlined , HomeFilled , MessageFilled , PictureFilled , TeamOutlined , BankFilled , WechatFilled , WalletFilled} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';

function DrawerResponsive() {

    const [visible,
        setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <React.Fragment>
            <Button  onClick={showDrawer}>
            <MenuFoldOutlined />
            </Button>
            <Drawer
                title="حراجی آنلاین"
                className="text-right"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}>
                
               
                    <div style={{height : '30px'}}> 
                        <NavLink 
                            to="/home" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                            <div className="d-flex align-items-center">
                                <HomeFilled />
                                <p  className="mb-0 mr-2">خانه</p>
                            </div>
                        </NavLink>
                    </div>
                

                    <div style ={{height : '30px'}}>
                        <NavLink 
                            to="/members" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                            <div className="d-flex align-items-center">
                            <TeamOutlined />
                                <p  className="mb-0 mr-2">اعضا</p>
                            </div>
                        </NavLink>
                    </div>

                    <div style={{height : '30px'}}>
                        <NavLink 
                            to="/artworks" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                         <div className="d-flex align-items-center">
                         <PictureFilled />
                             <p className="mb-0 mr-2">آثار هنری</p>
                        </div>
                        </NavLink>
                    </div>
                    
                    
                    <div style={{height : '30px'}}>
                        <NavLink 
                            to="/house-auctions" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                         <div className="d-flex align-items-center">
                         <BankFilled />
                             <p className="mb-0 mr-2">خانه‌های حراجی</p>
                        </div>
                        </NavLink>
                    </div>

                    <div style={{height : '30px'}}>
                        <NavLink 
                            to="/wallets" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                         <div className="d-flex align-items-center">
                         <WalletFilled />
                             <p className="mb-0 mr-2">کیف پول</p>
                        </div>
                        </NavLink>
                    </div>

                    <div style={{height : '30px'}}>
                        <NavLink 
                            to="/sales-consuler" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                         <div className="d-flex align-items-center">
                         <BankFilled />
                             <p className="mb-0 mr-2">مشاوره فروش</p>
                        </div>
                        </NavLink>
                    </div>

                    <div style={{height : '30px'}}>
                        <NavLink 
                            to="/orders" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                         <div className="d-flex align-items-center">
                         <BankFilled />
                             <p className="mb-0 mr-2">سفارشات</p>
                        </div>
                        </NavLink>
                    </div>
        
                    <div style={{height : '30px'}}>
                        <NavLink 
                            to="/inbox-messages" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                         <div className="d-flex align-items-center">
                            <MessageFilled />
                             <p className="mb-0 mr-2">پیام‌ها</p>
                        </div>
                        </NavLink>
                    </div>

                    <div style={{height : '30px'}}>
                        <NavLink 
                            to="/tickets" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                         <div className="d-flex align-items-center">
                         <WechatFilled />
                             <p className="mb-0 mr-2">تیکت‌ها</p>
                        </div>
                        </NavLink>
                    </div>
                    
            </Drawer>
        </React.Fragment>
    )
}

export default DrawerResponsive;
