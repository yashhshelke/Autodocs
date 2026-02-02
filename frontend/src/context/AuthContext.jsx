import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is already logged in on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                if (authService.isAuthenticated()) {
                    const savedUser = authService.getUser();
                    if (savedUser) {
                        setUser(savedUser);
                    } else {
                        // Fetch fresh user data if not in localStorage
                        const userData = await authService.getCurrentUser();
                        setUser(userData);
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // Clear invalid tokens
                await authService.logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        setError(null);
        setLoading(true);
        try {
            const { user } = await authService.login(email, password);
            setUser(user);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.error ||
                error.response?.data?.detail ||
                'Login failed. Please try again.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, username, password, password2) => {
        setError(null);
        setLoading(true);
        try {
            const { user } = await authService.signup(email, username, password, password2);
            setUser(user);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.email?.[0] ||
                error.response?.data?.password?.[0] ||
                error.response?.data?.detail ||
                'Signup failed. Please try again.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
