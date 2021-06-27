import React from 'react';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom';

function MenuItemComponent({toggleActiveNavDrawer , link , title , icon , id , key}) {



return (

        <Menu.Item 
                className="d-flex align-items-center" 
                key={key} 
                icon={icon}>
            <NavLink 
                id={id} 
                to={link} 
                className="mr-2" 
                onClick={ e=>{ toggleActiveNavDrawer(e.currentTarget.id)
                     console.log(e.currentTarget.id)} }
            >
                {String(title)}
            </NavLink>

        </Menu.Item>

)
}

export default MenuItemComponent;