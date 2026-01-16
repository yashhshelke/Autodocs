import axios from 'axios'

// Create axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
})

// Request interceptor - add auth token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor - handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific error codes
            switch (error.response.status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('user')
                    window.location.href = '/auth'
                    break
                case 403:
                    console.error('Access forbidden')
                    break
                case 404:
                    console.error('Resource not found')
                    break
                case 500:
                    console.error('Server error')
                    break
                default:
                    console.error('API Error:', error.response.data)
            }
        } else if (error.request) {
            console.error('Network error - no response received')
        } else {
            console.error('Error:', error.message)
        }
        return Promise.reject(error)
    }
)

// API Service Methods
export const authService = {
    login: (credentials) => api.post('/auth/login/', credentials),
    register: (userData) => api.post('/auth/register/', userData),
    logout: () => api.post('/auth/logout/'),
    getCurrentUser: () => api.get('/auth/user/'),
    refreshToken: (refreshToken) => api.post('/auth/refresh/', { refresh: refreshToken }),
}

export const missionService = {
    getAll: (params) => api.get('/missions/', { params }),
    getById: (id) => api.get(`/missions/${id}/`),
    create: (data) => api.post('/missions/', data),
    update: (id, data) => api.patch(`/missions/${id}/`, data),
    delete: (id) => api.delete(`/missions/${id}/`),
    pause: (id) => api.post(`/missions/${id}/pause/`),
    resume: (id) => api.post(`/missions/${id}/resume/`),
    cancel: (id) => api.post(`/missions/${id}/cancel/`),
}

export const activityService = {
    getByMission: (missionId, params) => api.get(`/missions/${missionId}/activities/`, { params }),
    getAll: (params) => api.get('/activities/', { params }),
}

export const documentService = {
    getByMission: (missionId) => api.get(`/missions/${missionId}/documents/`),
    download: (id) => api.get(`/documents/${id}/download/`, { responseType: 'blob' }),
    upload: (missionId, formData) => {
        return api.post(`/missions/${missionId}/documents/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
}

export const userService = {
    getProfile: () => api.get('/users/profile/'),
    updateProfile: (data) => api.patch('/users/profile/', data),
    changePassword: (data) => api.post('/users/change-password/', data),
}

export default api
