import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import {MenuFoldOutlined , HomeFilled , MessageFilled , PictureFilled , TeamOutlined} from '@ant-design/icons';
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
                            to="/send-message" 
                            className="mr-2 nav-item-drawer-responsive" 
                            onClick={(e)=>setVisible(false)}
                        >
                         <div className="d-flex align-items-center">
                            <MessageFilled />
                             <p className="mb-0 mr-2">ارسال پیام</p>
                        </div>
                        </NavLink>
                    </div>
        
                    
            </Drawer>
        </React.Fragment>
    )
}

export default DrawerResponsive;
