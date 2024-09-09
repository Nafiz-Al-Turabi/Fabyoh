import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveBottomNav = ({title,to,children}) => {
    return (
        <NavLink
            to={to}
            title={title}
            className={({ isActive }) =>
                isActive ? "flex flex-col gap-3 items-center p-text"  : "flex flex-col gap-3 items-center"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveBottomNav;