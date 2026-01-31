import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <h2 className="sidebar-logo">AutoDocs</h2>

            <ul className="sidebar-menu">
                <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                        Dashboard
                    </Link>
                </li>
                <li>Documents</li>
                <li>Templates</li>
                <li>Team</li>
                <li>Analytics</li>
                <li>Settings</li>
            </ul>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="sidebar-avatar">A</div>
                    <div className="sidebar-user-info">
                        <h4>Admin User</h4>
                        <p>admin@autodocs.io</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
