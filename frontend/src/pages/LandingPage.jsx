import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)

    const timelineSteps = [
        {
            title: 'Define Your Goal',
            description: 'Tell AutoDocs what document or process you need completed',
            icon: '🎯',
            detail: 'Simply describe your paperwork needs in plain language'
        },
        {
            title: 'AI Analysis',
            description: 'Our AI agent analyzes requirements and creates an execution plan',
            icon: '🧠',
            detail: 'Advanced algorithms map out every step needed'
        },
        {
            title: 'Automated Execution',
            description: 'The agent navigates forms, fills data, and handles submissions',
            icon: '⚡',
            detail: 'Watch in real-time as tasks are completed automatically'
        },
        {
            title: 'Verification & Delivery',
            description: 'Documents are verified, downloaded, and securely delivered to you',
            icon: '✅',
            detail: 'Receive your completed documents with full audit trail'
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % timelineSteps.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const features = [
        {
            icon: '🔒',
            title: 'Enterprise Security',
            description: 'Bank-level encryption for all your sensitive government and college data'
        },
        {
            icon: '🤖',
            title: 'Intelligent Automation',
            description: 'AI agents that learn and adapt to complex bureaucratic processes'
        },
        {
            icon: '📊',
            title: 'Full Transparency',
            description: 'Monitor every action the AI takes with detailed activity logs'
        },
        {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Complete in minutes what would take hours of manual work'
        },
        {
            icon: '📱',
            title: 'Multi-Platform',
            description: 'Works across government portals, college systems, and more'
        },
        {
            icon: '🎯',
            title: 'High Accuracy',
            description: 'AI-powered validation ensures error-free submissions'
        }
    ]

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="hero-grid"></div>
                    <div className="hero-glow"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge animate-fade-in-up">
                            <span className="badge badge-info">🚀 AI-Powered Process Automation</span>
                        </div>

                        <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Your AI Agent for
                            <br />
                            <span className="text-gradient">Document Automation</span>
                        </h1>

                        <p className="hero-description animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            AutoDocs uses advanced AI to handle your paperwork, forms, and document processing
                            automatically. Watch in real-time as our intelligent agents navigate complex processes
                            on your behalf.
                        </p>

                        <div className="hero-actions animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <button className="btn btn-primary btn-lg" onClick={() => navigate('/auth')}>
                                Start New Process
                                <span>→</span>
                            </button>
                            <button className="btn btn-outline btn-lg" onClick={() => {
                                document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })
                            }}>
                                Learn More
                            </button>
                        </div>

                        <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <div className="stat-item">
                                <div className="stat-value">10K+</div>
                                <div className="stat-label">Documents Processed</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-value">99.8%</div>
                                <div className="stat-label">Success Rate</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-value">24/7</div>
                                <div className="stat-label">AI Availability</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <h2>How AutoDocs Works</h2>
                        <p>From your goal to AI execution in four transparent steps</p>
                    </div>

                    <div className="timeline-container">
                        <div className="timeline-track"></div>

                        {timelineSteps.map((step, index) => (
                            <div
                                key={index}
                                className={`timeline-step ${activeStep === index ? 'active' : ''} ${activeStep > index ? 'completed' : ''}`}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className="timeline-step-marker">
                                    <div className="timeline-step-icon">{step.icon}</div>
                                    <div className="timeline-step-pulse"></div>
                                </div>

                                <div className="timeline-step-content">
                                    <div className="timeline-step-number">Step {index + 1}</div>
                                    <h3 className="timeline-step-title">{step.title}</h3>
                                    <p className="timeline-step-description">{step.description}</p>
                                    <div className={`timeline-step-detail ${activeStep === index ? 'show' : ''}`}>
                                        {step.detail}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose AutoDocs</h2>
                        <p>Enterprise-grade automation with complete transparency</p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-card animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2>Ready to Automate Your Paperwork?</h2>
                            <p>Join thousands of users who trust AutoDocs with their document processing</p>
                            <button className="btn btn-primary btn-lg" onClick={() => navigate('/auth')}>
                                Get Started Now
                                <span>→</span>
                            </button>
                        </div>
                        <div className="cta-glow"></div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>AutoDocs</h3>
                            <p>AI-Powered Document Automation</p>
                        </div>
                        <div className="footer-links">
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#terms">Terms of Service</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 AutoDocs. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
