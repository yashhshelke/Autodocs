import React from "react";
import Sidebar from "../components/Sidebar";
import "../style/Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />

            <main className="dashboard-main">
                <h1>Dashboard</h1>
                <p className="subtitle">Welcome back! Here's what's happening with your documentation.</p>

                {/* Stats Section */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Documents</h3>
                        <div className="stat-value">24</div>
                    </div>

                    <div className="stat-card">
                        <h3>Active Projects</h3>
                        <div className="stat-value">8</div>
                    </div>

                    <div className="stat-card">
                        <h3>Team Members</h3>
                        <div className="stat-value">12</div>
                    </div>

                    <div className="stat-card">
                        <h3>This Month</h3>
                        <div className="stat-value">156</div>
                    </div>
                </div>

                {/* Action Cards */}
                <div className="card-grid">
                    <button className="dash-card">
                        <h3>Create Document</h3>
                        <p>Start a new documentation project from scratch or use a template.</p>
                    </button>

                    <button className="dash-card">
                        <h3>Your Documents</h3>
                        <p>View and manage all your existing documentation files.</p>
                    </button>

                    <button className="dash-card">
                        <h3>Team Access</h3>
                        <p>Manage team roles, permissions, and collaboration settings.</p>
                    </button>
                </div>

                {/* Recent Activity */}
                <div className="recent-section">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-info">
                                <h4>Updated "API Documentation"</h4>
                                <p>Modified by John Doe</p>
                            </div>
                            <span className="activity-time">2 hours ago</span>
                        </div>

                        <div className="activity-item">
                            <div className="activity-info">
                                <h4>Created "User Guide v2.0"</h4>
                                <p>Created by Sarah Smith</p>
                            </div>
                            <span className="activity-time">5 hours ago</span>
                        </div>

                        <div className="activity-item">
                            <div className="activity-info">
                                <h4>Shared "Technical Specs"</h4>
                                <p>Shared with Development Team</p>
                            </div>
                            <span className="activity-time">1 day ago</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
