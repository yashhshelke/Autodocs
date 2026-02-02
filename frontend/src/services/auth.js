import api from './api';

export const authService = {
    // Login user
    async login(email, password) {
        const response = await api.post('/auth/login/', { email, password });
        const { user, access, refresh } = response.data;

        // Store tokens and user data
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('user', JSON.stringify(user));

        return { user, access, refresh };
    },

    // Register new user
    async signup(email, username, password, password2) {
        const response = await api.post('/auth/register/', {
            email,
            username,
            password,
            password2
        });
        const { user, access, refresh } = response.data;

        // Store tokens and user data
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('user', JSON.stringify(user));

        return { user, access, refresh };
    },

    // Logout user
    async logout() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                await api.post('/auth/logout/', { refresh: refreshToken });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }
    },

    // Get current user profile
    async getCurrentUser() {
        const response = await api.get('/auth/profile/');
        return response.data;
    },

    // Get access token from localStorage
    getAccessToken() {
        return localStorage.getItem('accessToken');
    },

    // Get refresh token from localStorage
    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    },

    // Get user from localStorage
    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.getAccessToken();
    }
};

export default authService;
