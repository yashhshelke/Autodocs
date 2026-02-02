import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                <h2 className="navbar-logo">AutoDocs</h2>

                <ul className="navbar-menu">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    <li>Features</li>
                    <li>Docs</li>
                </ul>

                <button className="navbar-btn" onClick={() => navigate("/login")}>
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <h1>Automate Your Documentation</h1>
                <p>
                    Create, manage, and generate professional documentation effortlessly with
                    AutoDocs. Built for teams who value efficiency and collaboration.
                </p>
                <button className="primary-btn" onClick={() => navigate('/dashboard')}>
                    Start Generating
                </button>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="feature-card">
                    <div className="feature-icon">🚀</div>
                    <h3>Auto Generation</h3>
                    <p>Generate comprehensive documentation directly from your workflows with AI-powered automation.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🔐</div>
                    <h3>Role Based Access</h3>
                    <p>Secure your documents with Admin, Editor, and Viewer permissions for complete control.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Fast & Scalable</h3>
                    <p>Built on modern tech stack for lightning-fast performance and seamless scalability.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">👥</div>
                    <h3>Team Collaboration</h3>
                    <p>Work together in real-time with version control and collaborative editing features.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Analytics Dashboard</h3>
                    <p>Track document usage, team activity, and project progress with insightful analytics.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🎨</div>
                    <h3>Custom Templates</h3>
                    <p>Choose from pre-built templates or create your own for consistent documentation.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2026 AutoDocs. All rights reserved.</p>
                <ul className="footer-links">
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Contact</li>
                    <li>GitHub</li>
                </ul>
            </footer>
        </div>
    );
}

export default Home;
