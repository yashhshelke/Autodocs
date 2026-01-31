import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <h2 className="navbar-logo">AutoDocs</h2>

            <ul className="navbar-menu">
                <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
                <li><Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></li>
                <li>Features</li>
                <li>Docs</li>
            </ul>

            <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="navbar-btn">Sign In</button>
            </Link>
        </nav>
    );
}

export default NavBar;
