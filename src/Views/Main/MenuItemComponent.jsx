import React from 'react';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom';

function MenuItemComponent({toggleActiveNavDrawer , link , title , icon , id , key}) {

return (
<React.Fragment>
    <Menu.Item 
            className="d-flex align-items-center" 
            key={key} 
            icon={icon}>
        <NavLink 
            id={id} 
            to={link} 
            className="mr-2" 
            onClick={ e=> toggleActiveNavDrawer(e.currentTarget.id) }
        >
            {title}
        </NavLink>

    </Menu.Item>
</React.Fragment>
)
}

export default MenuItemComponent;