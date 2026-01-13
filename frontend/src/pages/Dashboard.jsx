import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate()
    const [missions, setMissions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showNewMissionModal, setShowNewMissionModal] = useState(false)

    useEffect(() => {
        // Simulate loading missions
        setTimeout(() => {
            setMissions([
                {
                    id: 1,
                    title: 'College Transcript Request',
                    type: 'Education',
                    status: 'in-progress',
                    progress: 65,
                    lastAction: 'Agent verified ID at 2:00 PM',
                    lastActionTime: '2 hours ago',
                    estimatedCompletion: '1 hour',
                    priority: 'high'
                },
                {
                    id: 2,
                    title: 'Government ID Renewal',
                    type: 'Government',
                    status: 'in-progress',
                    progress: 40,
                    lastAction: 'Filling form section 3 of 5',
                    lastActionTime: '30 minutes ago',
                    estimatedCompletion: '3 hours',
                    priority: 'medium'
                },
                {
                    id: 3,
                    title: 'Tax Document Retrieval',
                    type: 'Finance',
                    status: 'completed',
                    progress: 100,
                    lastAction: 'Documents downloaded successfully',
                    lastActionTime: '1 day ago',
                    estimatedCompletion: 'Completed',
                    priority: 'low'
                },
                {
                    id: 4,
                    title: 'Medical Records Request',
                    type: 'Healthcare',
                    status: 'pending',
                    progress: 10,
                    lastAction: 'Waiting for portal authentication',
                    lastActionTime: '5 minutes ago',
                    estimatedCompletion: '2 hours',
                    priority: 'high'
                }
            ])
            setIsLoading(false)
        }, 1000)
    }, [])

    const getStatusBadge = (status) => {
        const statusConfig = {
            'in-progress': { class: 'badge-info', text: 'In Progress' },
            'completed': { class: 'badge-success', text: 'Completed' },
            'pending': { class: 'badge-warning', text: 'Pending' },
            'failed': { class: 'badge-error', text: 'Failed' }
        }
        const config = statusConfig[status] || statusConfig['pending']
        return <span className={`badge ${config.class}`}>{config.text}</span>
    }

    const getPriorityIndicator = (priority) => {
        const colors = {
            high: 'var(--color-error)',
            medium: 'var(--color-warning)',
            low: 'var(--color-info)'
        }
        return (
            <div className="priority-indicator" style={{ background: colors[priority] }}></div>
        )
    }

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="container">
                    <div className="header-content">
                        <div className="header-brand">
                            <h1 className="brand-logo">AutoDocs</h1>
                            <span className="brand-tagline">AI Process Monitor</span>
                        </div>

                        <div className="header-actions">
                            <button className="btn btn-outline" onClick={() => navigate('/')}>
                                Home
                            </button>
                            <button className="btn btn-secondary">
                                <span>👤</span>
                                Profile
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                <div className="container">
                    {/* Dashboard Header */}
                    <div className="dashboard-title-section">
                        <div>
                            <h2 className="dashboard-title">Mission Control</h2>
                            <p className="dashboard-subtitle">Monitor and manage your active AI processes</p>
                        </div>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => setShowNewMissionModal(true)}
                        >
                            <span>+</span>
                            Start New Process
                        </button>
                    </div>

                    {/* Stats Overview */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                                <span style={{ color: 'var(--color-primary)' }}>📊</span>
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{missions.length}</div>
                                <div className="stat-label">Total Missions</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                                <span style={{ color: 'var(--color-success)' }}>✓</span>
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">
                                    {missions.filter(m => m.status === 'completed').length}
                                </div>
                                <div className="stat-label">Completed</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
                                <span style={{ color: 'var(--color-info)' }}>⚡</span>
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">
                                    {missions.filter(m => m.status === 'in-progress').length}
                                </div>
                                <div className="stat-label">In Progress</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                                <span style={{ color: 'var(--color-warning)' }}>⏳</span>
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">
                                    {missions.filter(m => m.status === 'pending').length}
                                </div>
                                <div className="stat-label">Pending</div>
                            </div>
                        </div>
                    </div>

                    {/* Active Missions Grid */}
                    <div className="missions-section">
                        <div className="section-header-inline">
                            <h3>Active Missions</h3>
                            <div className="filter-buttons">
                                <button className="filter-btn active">All</button>
                                <button className="filter-btn">In Progress</button>
                                <button className="filter-btn">Completed</button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="missions-grid">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="mission-card">
                                        <div className="skeleton skeleton-card"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="missions-grid">
                                {missions.map((mission) => (
                                    <div
                                        key={mission.id}
                                        className="mission-card"
                                        onClick={() => navigate(`/workspace/${mission.id}`)}
                                    >
                                        {getPriorityIndicator(mission.priority)}

                                        <div className="mission-card-header">
                                            <div className="mission-type-badge">{mission.type}</div>
                                            {getStatusBadge(mission.status)}
                                        </div>

                                        <h4 className="mission-title">{mission.title}</h4>

                                        <div className="mission-progress">
                                            <div className="progress-header">
                                                <span className="progress-label">Progress</span>
                                                <span className="progress-value">{mission.progress}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-bar-fill"
                                                    style={{ width: `${mission.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="mission-last-action">
                                            <div className="last-action-icon">🤖</div>
                                            <div className="last-action-content">
                                                <div className="last-action-text">{mission.lastAction}</div>
                                                <div className="last-action-time">{mission.lastActionTime}</div>
                                            </div>
                                        </div>

                                        <div className="mission-footer">
                                            <div className="mission-eta">
                                                <span className="eta-icon">⏱️</span>
                                                <span>ETA: {mission.estimatedCompletion}</span>
                                            </div>
                                            <button className="mission-view-btn">
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* New Mission Modal */}
            {showNewMissionModal && (
                <div className="modal-overlay" onClick={() => setShowNewMissionModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Start New Process</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowNewMissionModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            <p>Select the type of document or process you need:</p>

                            <div className="process-types-grid">
                                <button className="process-type-card">
                                    <span className="process-icon">🎓</span>
                                    <span className="process-name">Education</span>
                                </button>
                                <button className="process-type-card">
                                    <span className="process-icon">🏛️</span>
                                    <span className="process-name">Government</span>
                                </button>
                                <button className="process-type-card">
                                    <span className="process-icon">💼</span>
                                    <span className="process-name">Finance</span>
                                </button>
                                <button className="process-type-card">
                                    <span className="process-icon">🏥</span>
                                    <span className="process-name">Healthcare</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
