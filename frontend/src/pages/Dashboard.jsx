import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { documentService, projectService } from "../services/documents.js";
import "../style/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [documents, setDocuments] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [docsData, projectsData] = await Promise.all([
                documentService.getDocuments(),
                projectService.getProjects()
            ]);
            setDocuments(docsData);
            setProjects(projectsData);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="dashboard-page">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="sidebar-logo">AutoDocs</h2>

                <ul className="sidebar-menu">
                    <li
                        className={activeMenu === 'dashboard' ? 'active' : ''}
                        onClick={() => setActiveMenu('dashboard')}
                    >
                        📊 Dashboard
                    </li>
                    <li
                        className={activeMenu === 'documents' ? 'active' : ''}
                        onClick={() => setActiveMenu('documents')}
                    >
                        📄 Documents
                    </li>
                    <li
                        className={activeMenu === 'templates' ? 'active' : ''}
                        onClick={() => setActiveMenu('templates')}
                    >
                        📝 Templates
                    </li>
                    <li
                        className={activeMenu === 'team' ? 'active' : ''}
                        onClick={() => setActiveMenu('team')}
                    >
                        👥 Team
                    </li>
                    <li
                        className={activeMenu === 'analytics' ? 'active' : ''}
                        onClick={() => setActiveMenu('analytics')}
                    >
                        📈 Analytics
                    </li>
                    <li
                        className={activeMenu === 'settings' ? 'active' : ''}
                        onClick={() => setActiveMenu('settings')}
                    >
                        ⚙️ Settings
                    </li>
                </ul>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">
                            {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="sidebar-user-info">
                            <h4>{user?.username || 'User'}</h4>
                            <p>{user?.email || 'user@autodocs.io'}</p>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        🚪 Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p className="subtitle">Welcome back, {user?.username || 'User'}! Here's what's happening with your documentation.</p>
                    </div>
                    <button className="new-doc-btn" onClick={() => alert('Create new document - Coming soon!')}>
                        + New Document
                    </button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#64748b' }}>
                        Loading your data...
                    </div>
                ) : error ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        fontSize: '1.1rem',
                        color: '#dc2626',
                        background: '#fee',
                        borderRadius: '8px',
                        margin: '20px 0'
                    }}>
                        {error}
                    </div>
                ) : (
                    <>
                        {/* Stats Section */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Total Documents</h3>
                                <div className="stat-value">{documents.length}</div>
                                <p className="stat-change">All your documents</p>
                            </div>

                            <div className="stat-card">
                                <h3>Active Projects</h3>
                                <div className="stat-value">{projects.length}</div>
                                <p className="stat-change">{projects.length} total projects</p>
                            </div>

                            <div className="stat-card">
                                <h3>User Role</h3>
                                <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                                    {user?.role || 'viewer'}
                                </div>
                                <p className="stat-change">Your access level</p>
                            </div>

                            <div className="stat-card">
                                <h3>Last Login</h3>
                                <div className="stat-value" style={{ fontSize: '1.5rem' }}>Now</div>
                                <p className="stat-change">Active session</p>
                            </div>
                        </div>

                        {/* Action Cards */}
                        <div className="card-grid">
                            <div className="dash-card" onClick={() => alert('Create document - Coming soon!')}>
                                <div className="card-icon">📝</div>
                                <h3>Create Document</h3>
                                <p>Start a new documentation project from scratch or use a template.</p>
                            </div>

                            <div className="dash-card" onClick={() => setActiveMenu('documents')}>
                                <div className="card-icon">📚</div>
                                <h3>Your Documents</h3>
                                <p>View and manage all your existing documentation files ({documents.length} total).</p>
                            </div>

                            <div className="dash-card" onClick={() => alert('Team access - Coming soon!')}>
                                <div className="card-icon">🔐</div>
                                <h3>Team Access</h3>
                                <p>Manage team roles, permissions, and collaboration settings.</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="recent-section">
                            <h2>Your Projects</h2>
                            {projects.length === 0 ? (
                                <p style={{ color: '#64748b', fontStyle: 'italic' }}>
                                    No projects yet. Create your first project to get started!
                                </p>
                            ) : (
                                <div className="activity-list">
                                    {projects.map((project) => (
                                        <div className="activity-item" key={project.id}>
                                            <div className="activity-info">
                                                <h4>{project.title}</h4>
                                                <p>{project.description || 'No description'}</p>
                                            </div>
                                            <span className="activity-time">
                                                {project.document_count} docs
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Documents Section */}
                        {documents.length > 0 && (
                            <div className="recent-section">
                                <h2>Recent Documents</h2>
                                <div className="activity-list">
                                    {documents.slice(0, 5).map((doc) => (
                                        <div className="activity-item" key={doc.id}>
                                            <div className="activity-info">
                                                <h4>{doc.name}</h4>
                                                <p>{doc.description || 'No description'} • Project: {doc.project_name}</p>
                                            </div>
                                            <span className="activity-time">
                                                {new Date(doc.updated_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
