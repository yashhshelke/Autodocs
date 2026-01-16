import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Check if user is already logged in on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('authToken')
            const savedUser = localStorage.getItem('user')

            if (token && savedUser) {
                try {
                    // Verify token is still valid
                    const response = await authService.getCurrentUser()
                    setUser(response.data)
                } catch (err) {
                    // Token is invalid, clear storage
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('user')
                    setUser(null)
                }
            }
            setLoading(false)
        }

        initAuth()
    }, [])

    const login = async (credentials) => {
        try {
            setError(null)
            const response = await authService.login(credentials)
            const { access, refresh, user: userData } = response.data

            // Save to localStorage
            localStorage.setItem('authToken', access)
            localStorage.setItem('refreshToken', refresh)
            localStorage.setItem('user', JSON.stringify(userData))

            setUser(userData)
            return { success: true, user: userData }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Login failed'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        }
    }

    const register = async (userData) => {
        try {
            setError(null)
            const response = await authService.register(userData)
            const { access, refresh, user: newUser } = response.data

            // Save to localStorage
            localStorage.setItem('authToken', access)
            localStorage.setItem('refreshToken', refresh)
            localStorage.setItem('user', JSON.stringify(newUser))

            setUser(newUser)
            return { success: true, user: newUser }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Registration failed'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        }
    }

    const logout = async () => {
        try {
            await authService.logout()
        } catch (err) {
            console.error('Logout error:', err)
        } finally {
            // Clear storage regardless of API call success
            localStorage.removeItem('authToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
            setUser(null)
        }
    }

    const updateUser = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
