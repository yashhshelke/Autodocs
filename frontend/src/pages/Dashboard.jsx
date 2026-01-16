import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import useMissions from '../hooks/useMissions'
import useWebSocket from '../hooks/useWebSocket'
import Modal from '../components/ui/Modal'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const toast = useToast()
    const { missions, loading, fetchMissions } = useMissions(true)
    const [showNewMissionModal, setShowNewMissionModal] = useState(false)
    const [filter, setFilter] = useState('all')

    // WebSocket for real-time updates
    const { isConnected, lastMessage } = useWebSocket(
        `${import.meta.env.VITE_WS_URL}/missions/`,
        {
            enabled: true,
            onMessage: (data) => {
                if (data.type === 'mission_update') {
                    // Refresh missions when updates come in
                    fetchMissions()
                    toast.info(`Mission "${data.mission?.title}" updated`)
                }
            },
            onOpen: () => {
                console.log('WebSocket connected to mission updates')
            },
            onError: (error) => {
                console.error('WebSocket error:', error)
            }
        }
    )

    const handleLogout = async () => {
        await logout()
        toast.success('Logged out successfully')
        navigate('/')
    }

    const filteredMissions = missions.filter((mission) => {
        if (filter === 'all') return true
        if (filter === 'in-progress') return mission.status === 'in-progress'
        if (filter === 'completed') return mission.status === 'completed'
        return true
    })

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
                            {isConnected && (
                                <span className="ws-indicator" title="Real-time updates active">
                                    🟢 Live
                                </span>
                            )}
                        </div>

                        <div className="header-actions">
                            <span className="user-greeting">
                                Welcome, {user?.full_name || user?.email || 'User'}
                            </span>
                            <button className="btn btn-outline" onClick={() => navigate('/')}>
                                Home
                            </button>
                            <button className="btn btn-secondary" onClick={handleLogout}>
                                <span>👋</span>
                                Logout
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
                                <button
                                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    All
                                </button>
                                <button
                                    className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
                                    onClick={() => setFilter('in-progress')}
                                >
                                    In Progress
                                </button>
                                <button
                                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                                    onClick={() => setFilter('completed')}
                                >
                                    Completed
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="loading-center">
                                <LoadingSpinner size="large" text="Loading missions..." />
                            </div>
                        ) : filteredMissions.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📋</div>
                                <h3>No missions found</h3>
                                <p>
                                    {filter === 'all'
                                        ? 'Start a new process to get started'
                                        : `No ${filter.replace('-', ' ')} missions`}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setShowNewMissionModal(true)}
                                >
                                    Start New Process
                                </button>
                            </div>
                        ) : (
                            <div className="missions-grid">
                                {filteredMissions.map((mission) => (
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
            <Modal
                isOpen={showNewMissionModal}
                onClose={() => setShowNewMissionModal(false)}
                title="Start New Process"
                size="medium"
            >
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
            </Modal>
        </div>
    )
}

export default Dashboard
