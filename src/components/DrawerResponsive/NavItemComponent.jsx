import React from 'react';
import {NavLink} from 'react-router-dom';

function NavItemComponent({setVisible , icon , title , link }) {

    return (
        <React.Fragment>
           <div style={{height : '30px'}}> 
                <NavLink 
                    to={link} 
                    className="mr-2 nav-item-drawer-responsive" 
                    onClick={(e)=>setVisible(false)}
                >
                    <div className="d-flex align-items-center">
                        {icon}
                        <p  className="mb-0 mr-2">{title}</p>
                    </div>
                </NavLink>
            </div> 
        </React.Fragment>
    )
}

export default NavItemComponent;