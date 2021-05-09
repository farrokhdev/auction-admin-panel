import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import {MenuFoldOutlined} from '@ant-design/icons';
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
                
               
       
                    <div>
                        <NavLink 
                         to="/home" 
                      className="mr-2" 
                      onClick={(e)=>setVisible(false)}
                    >
                    خانه
                    </NavLink>
                    </div>

                    <NavLink 
                      to="/members" 
                      className="mr-2" 
                      onClick={(e)=>setVisible(false)}
                    >
                    اعضا
                    </NavLink>
        
                    
            </Drawer>
        </React.Fragment>
    )
}

export default DrawerResponsive;
