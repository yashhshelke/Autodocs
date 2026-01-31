import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../style/Home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <NavBar />

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

            <section className="features">
                <div className="feature-card">
                    <h3>🚀 Auto Generation</h3>
                    <p>Generate comprehensive documentation directly from your workflows with AI-powered automation.</p>
                </div>

                <div className="feature-card">
                    <h3>🔐 Role Based Access</h3>
                    <p>Secure your documents with Admin, Editor, and Viewer permissions for complete control.</p>
                </div>

                <div className="feature-card">
                    <h3>⚡ Fast & Scalable</h3>
                    <p>Built on modern tech stack for lightning-fast performance and seamless scalability.</p>
                </div>

                <div className="feature-card">
                    <h3>👥 Team Collaboration</h3>
                    <p>Work together in real-time with version control and collaborative editing features.</p>
                </div>

                <div className="feature-card">
                    <h3>📊 Analytics Dashboard</h3>
                    <p>Track document usage, team activity, and project progress with insightful analytics.</p>
                </div>

                <div className="feature-card">
                    <h3>🎨 Custom Templates</h3>
                    <p>Choose from pre-built templates or create your own for consistent documentation.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Home;
