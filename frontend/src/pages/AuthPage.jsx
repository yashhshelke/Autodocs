import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import './AuthPage.css'

const AuthPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, register, isAuthenticated } = useAuth()
    const toast = useToast()
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/dashboard'
            navigate(from, { replace: true })
        }
    }, [isAuthenticated, navigate, location])

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!isLogin && !formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        }

        if (!isLogin) {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password'
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            let result
            if (isLogin) {
                result = await login({
                    email: formData.email,
                    password: formData.password
                })
            } else {
                result = await register({
                    email: formData.email,
                    password: formData.password,
                    full_name: formData.fullName
                })
            }

            if (result.success) {
                toast.success(`Welcome ${isLogin ? 'back' : 'to AutoDocs'}!`)
                const from = location.state?.from?.pathname || '/dashboard'
                navigate(from, { replace: true })
            } else {
                toast.error(result.error || 'Authentication failed')
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-grid"></div>
                <div className="auth-glow-1"></div>
                <div className="auth-glow-2"></div>
            </div>

            <div className="auth-container">
                {/* Logo/Brand */}
                <div className="auth-brand">
                    <div className="brand-icon">🔐</div>
                    <h1 className="brand-title">AutoDocs</h1>
                    <p className="brand-subtitle">Secure AI Process Monitor</p>
                </div>

                {/* Auth Card */}
                <div className="auth-card">
                    <div className="auth-card-header">
                        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                        <p>
                            {isLogin
                                ? 'Sign in to monitor your AI-powered processes'
                                : 'Join thousands automating their paperwork'}
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="security-badge">
                        <div className="security-icon">🛡️</div>
                        <div className="security-text">
                            <div className="security-title">Enterprise-Grade Security</div>
                            <div className="security-description">
                                Your data is encrypted with bank-level security
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="fullName" className="input-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    className={`input ${errors.fullName ? 'input-error' : ''}`}
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                />
                                {errors.fullName && (
                                    <span className="error-message">{errors.fullName}</span>
                                )}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email" className="input-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`input ${errors.email ? 'input-error' : ''}`}
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && (
                                <span className="error-message">{errors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="input-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`input ${errors.password ? 'input-error' : ''}`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.password && (
                                <span className="error-message">{errors.password}</span>
                            )}
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="input-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                />
                                {errors.confirmPassword && (
                                    <span className="error-message">{errors.confirmPassword}</span>
                                )}
                            </div>
                        )}

                        {isLogin && (
                            <div className="form-extras">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#forgot" className="forgot-link">Forgot password?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg auth-submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <span>→</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle Auth Mode */}
                    <div className="auth-toggle">
                        <p>
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}
                            <button
                                className="toggle-btn"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="auth-divider">
                        <span>or continue with</span>
                    </div>

                    {/* Social Auth */}
                    <div className="social-auth">
                        <button className="social-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button className="social-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            GitHub
                        </button>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="trust-indicators">
                    <div className="trust-item">
                        <span className="trust-icon">✓</span>
                        <span>256-bit Encryption</span>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">✓</span>
                        <span>GDPR Compliant</span>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">✓</span>
                        <span>SOC 2 Certified</span>
                    </div>
                </div>

                {/* Back to Home */}
                <button className="back-home" onClick={() => navigate('/')}>
                    ← Back to Home
                </button>
            </div>
        </div>
    )
}

export default AuthPage
