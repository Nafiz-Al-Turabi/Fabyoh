import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveLink = ({ children, to, title }) => {
    return (
        <NavLink
            to={to}
            title={title}
            className={({ isActive }) =>
                isActive ? "text-xl p-text" : "text-gray-800 text-xl hover:text-gray-600"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;