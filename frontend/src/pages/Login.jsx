import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../style/login.css";

function Login() {
    const navigate = useNavigate();
    const { login, signup } = useAuth();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        password2: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(""); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            let result;
            if (isSignup) {
                // Signup mode
                if (formData.password !== formData.password2) {
                    setError("Passwords don't match");
                    setLoading(false);
                    return;
                }
                result = await signup(formData.email, formData.username, formData.password, formData.password2);
            } else {
                // Login mode
                result = await login(formData.email, formData.password);
            }

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-box">
                    <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
                    <p className="login-subtitle">
                        {isSignup ? 'Sign up for AutoDocs' : 'Sign in to your AutoDocs account'}
                    </p>

                    {error && (
                        <div className="error-message" style={{
                            background: '#fee',
                            color: '#c33',
                            padding: '10px',
                            borderRadius: '6px',
                            marginBottom: '15px',
                            fontSize: '14px'
                        }}>
                            {error}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignup && (
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignup && (
                            <div className="input-group">
                                <label htmlFor="password2">Confirm Password</label>
                                <input
                                    id="password2"
                                    name="password2"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={formData.password2}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {!isSignup && (
                            <div className="forgot-password">
                                <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                            </div>
                        )}

                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? '...' : (isSignup ? 'Sign Up' : 'Sign In')}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>
                            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setIsSignup(!isSignup);
                                setError("");
                                setFormData({ email: "", username: "", password: "", password2: "" });
                            }}>
                                {isSignup ? 'Sign in' : 'Sign up'}
                            </a>
                        </p>
                    </div>
                </div>

                <button className="back-home-btn" onClick={() => navigate('/')}>
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}

export default Login;
