import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './AgentWorkspace.css'

const AgentWorkspace = () => {
    const navigate = useNavigate()
    const { missionId } = useParams()
    const activityFeedRef = useRef(null)

    const [planTree, setPlanTree] = useState([])
    const [activityFeed, setActivityFeed] = useState([])
    const [documents, setDocuments] = useState([])
    const [missionInfo, setMissionInfo] = useState(null)
    const [autoScroll, setAutoScroll] = useState(true)

    useEffect(() => {
        // Simulate loading mission data
        setMissionInfo({
            id: missionId,
            title: 'College Transcript Request',
            type: 'Education',
            status: 'in-progress',
            progress: 65,
            startedAt: '2026-01-12T10:00:00',
            estimatedCompletion: '1 hour'
        })

        setPlanTree([
            {
                id: 1,
                title: 'Initialize Process',
                status: 'completed',
                children: [
                    { id: 11, title: 'Validate user credentials', status: 'completed' },
                    { id: 12, title: 'Connect to college portal', status: 'completed' }
                ]
            },
            {
                id: 2,
                title: 'Authentication',
                status: 'completed',
                children: [
                    { id: 21, title: 'Navigate to login page', status: 'completed' },
                    { id: 22, title: 'Enter credentials', status: 'completed' },
                    { id: 23, title: 'Verify 2FA code', status: 'completed' }
                ]
            },
            {
                id: 3,
                title: 'Form Navigation',
                status: 'in-progress',
                children: [
                    { id: 31, title: 'Locate transcript request form', status: 'completed' },
                    { id: 32, title: 'Fill student information', status: 'in-progress' },
                    { id: 33, title: 'Select delivery method', status: 'pending' }
                ]
            },
            {
                id: 4,
                title: 'Document Processing',
                status: 'pending',
                children: [
                    { id: 41, title: 'Submit request', status: 'pending' },
                    { id: 42, title: 'Wait for processing', status: 'pending' },
                    { id: 43, title: 'Download transcript', status: 'pending' }
                ]
            },
            {
                id: 5,
                title: 'Verification & Delivery',
                status: 'pending',
                children: [
                    { id: 51, title: 'Verify document integrity', status: 'pending' },
                    { id: 52, title: 'Upload to secure storage', status: 'pending' },
                    { id: 53, title: 'Notify user', status: 'pending' }
                ]
            }
        ])

        setDocuments([
            {
                id: 1,
                name: 'Student ID Verification',
                type: 'image/png',
                status: 'verified',
                preview: '📄',
                timestamp: '10:05 AM'
            },
            {
                id: 2,
                name: 'Request Form (Draft)',
                type: 'application/pdf',
                status: 'processing',
                preview: '📝',
                timestamp: '10:15 AM'
            }
        ])

        // Simulate real-time activity feed
        const initialActivities = [
            {
                id: 1,
                type: 'info',
                message: 'Mission started: College Transcript Request',
                timestamp: '10:00:00',
                details: 'Initializing AI agent for document processing'
            },
            {
                id: 2,
                type: 'success',
                message: 'Successfully connected to college portal',
                timestamp: '10:01:23',
                details: 'Portal: https://portal.university.edu'
            },
            {
                id: 3,
                type: 'info',
                message: 'Navigating to login page',
                timestamp: '10:01:45',
                details: 'URL: /auth/login'
            },
            {
                id: 4,
                type: 'success',
                message: 'Authentication successful',
                timestamp: '10:02:30',
                details: 'User verified with 2FA'
            },
            {
                id: 5,
                type: 'info',
                message: 'Locating transcript request form',
                timestamp: '10:03:15',
                details: 'Analyzing page structure...'
            },
            {
                id: 6,
                type: 'success',
                message: 'Form located successfully',
                timestamp: '10:03:45',
                details: 'Element: #transcript-request-form'
            },
            {
                id: 7,
                type: 'processing',
                message: 'Filling student information fields',
                timestamp: '10:04:20',
                details: 'Fields: Name, ID, Program, Year'
            }
        ]

        setActivityFeed(initialActivities)

        // Simulate new activities coming in
        let activityId = initialActivities.length + 1
        const interval = setInterval(() => {
            const newActivities = [
                {
                    type: 'info',
                    message: 'Validating field data',
                    details: 'Checking format and completeness'
                },
                {
                    type: 'success',
                    message: 'Field validation passed',
                    details: 'All required fields filled correctly'
                },
                {
                    type: 'processing',
                    message: 'Moving to next form section',
                    details: 'Section 3 of 5'
                }
            ]

            const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
            const now = new Date()
            const timestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

            setActivityFeed(prev => [...prev, {
                id: activityId++,
                ...randomActivity,
                timestamp
            }])
        }, 5000)

        return () => clearInterval(interval)
    }, [missionId])

    useEffect(() => {
        if (autoScroll && activityFeedRef.current) {
            activityFeedRef.current.scrollTop = activityFeedRef.current.scrollHeight
        }
    }, [activityFeed, autoScroll])

    const getStatusIcon = (status) => {
        const icons = {
            completed: '✓',
            'in-progress': '⚡',
            pending: '○',
            failed: '✕'
        }
        return icons[status] || '○'
    }

    const getStatusClass = (status) => {
        return `status-${status}`
    }

    const getActivityIcon = (type) => {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            error: '❌',
            warning: '⚠️',
            processing: '⚙️'
        }
        return icons[type] || 'ℹ️'
    }

    return (
        <div className="agent-workspace">
            {/* Header */}
            <header className="workspace-header">
                <div className="workspace-header-content">
                    <div className="header-left">
                        <button className="back-btn" onClick={() => navigate('/dashboard')}>
                            ← Back to Dashboard
                        </button>
                        <div className="mission-info-header">
                            <h1>{missionInfo?.title}</h1>
                            <span className="badge badge-info">{missionInfo?.type}</span>
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="mission-progress-header">
                            <span className="progress-text">{missionInfo?.progress}% Complete</span>
                            <div className="progress-bar-mini">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${missionInfo?.progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <button className="btn btn-outline btn-sm">
                            Pause Mission
                        </button>
                    </div>
                </div>
            </header>

            {/* Three Column Layout */}
            <div className="workspace-content">
                {/* Left Column: Plan Tree */}
                <aside className="workspace-sidebar workspace-sidebar-left">
                    <div className="sidebar-header">
                        <h3>📋 Plan Tree</h3>
                        <p>AI execution roadmap</p>
                    </div>

                    <div className="plan-tree">
                        {planTree.map((step) => (
                            <div key={step.id} className="plan-step">
                                <div className={`plan-step-header ${getStatusClass(step.status)}`}>
                                    <span className="plan-step-icon">{getStatusIcon(step.status)}</span>
                                    <span className="plan-step-title">{step.title}</span>
                                </div>

                                {step.children && step.children.length > 0 && (
                                    <div className="plan-substeps">
                                        {step.children.map((substep) => (
                                            <div
                                                key={substep.id}
                                                className={`plan-substep ${getStatusClass(substep.status)}`}
                                            >
                                                <span className="substep-icon">{getStatusIcon(substep.status)}</span>
                                                <span className="substep-title">{substep.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Center Column: Activity Feed */}
                <main className="workspace-main">
                    <div className="main-header">
                        <div>
                            <h3>🔴 Live Activity Feed</h3>
                            <p>Real-time AI reasoning and actions</p>
                        </div>
                        <label className="auto-scroll-toggle">
                            <input
                                type="checkbox"
                                checked={autoScroll}
                                onChange={(e) => setAutoScroll(e.target.checked)}
                            />
                            <span>Auto-scroll</span>
                        </label>
                    </div>

                    <div className="activity-feed" ref={activityFeedRef}>
                        {activityFeed.map((activity) => (
                            <div key={activity.id} className={`activity-item activity-${activity.type}`}>
                                <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                                <div className="activity-content">
                                    <div className="activity-header">
                                        <span className="activity-message">{activity.message}</span>
                                        <span className="activity-timestamp">{activity.timestamp}</span>
                                    </div>
                                    <div className="activity-details">{activity.details}</div>
                                </div>
                            </div>
                        ))}

                        {activityFeed.length > 0 && (
                            <div className="activity-item activity-processing">
                                <div className="activity-icon">
                                    <div className="pulse-dot"></div>
                                </div>
                                <div className="activity-content">
                                    <div className="activity-message">Agent is working...</div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Right Column: Document Tray */}
                <aside className="workspace-sidebar workspace-sidebar-right">
                    <div className="sidebar-header">
                        <h3>📁 Document Tray</h3>
                        <p>Forms & certificates</p>
                    </div>

                    <div className="document-tray">
                        {documents.map((doc) => (
                            <div key={doc.id} className="document-card">
                                <div className="document-preview">
                                    <span className="document-icon">{doc.preview}</span>
                                </div>
                                <div className="document-info">
                                    <div className="document-name">{doc.name}</div>
                                    <div className="document-meta">
                                        <span className={`badge badge-${doc.status === 'verified' ? 'success' : 'info'}`}>
                                            {doc.status}
                                        </span>
                                        <span className="document-time">{doc.timestamp}</span>
                                    </div>
                                </div>
                                <button className="document-action">
                                    <span>👁️</span>
                                </button>
                            </div>
                        ))}

                        <div className="document-placeholder">
                            <div className="placeholder-icon">📄</div>
                            <div className="placeholder-text">
                                More documents will appear here as the AI processes your request
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default AgentWorkspace
