import React from 'react';
import {NavLink} from "@remix-run/react";

const AppNavigation = () => {
    return (
        <nav id="main-navigation">
            <ul>
                <li className="nav-item">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/posts">My Notes</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default AppNavigation;