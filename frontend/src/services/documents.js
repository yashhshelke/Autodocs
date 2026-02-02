import api from './api';

export const documentService = {
    // Get all documents
    async getDocuments() {
        const response = await api.get('/documents/');
        return response.data;
    },

    // Get single document
    async getDocument(id) {
        const response = await api.get(`/documents/${id}/`);
        return response.data;
    },

    // Create document
    async createDocument(data) {
        const response = await api.post('/documents/', data);
        return response.data;
    },

    // Update document
    async updateDocument(id, data) {
        const response = await api.put(`/documents/${id}/`, data);
        return response.data;
    },

    // Delete document
    async deleteDocument(id) {
        await api.delete(`/documents/${id}/`);
    }
};

export const projectService = {
    // Get all projects
    async getProjects() {
        const response = await api.get('/projects/');
        return response.data;
    },

    // Get single project
    async getProject(id) {
        const response = await api.get(`/projects/${id}/`);
        return response.data;
    },

    // Create project
    async createProject(data) {
        const response = await api.post('/projects/', data);
        return response.data;
    },

    // Update project
    async updateProject(id, data) {
        const response = await api.put(`/projects/${id}/`, data);
        return response.data;
    },

    // Delete project
    async deleteProject(id) {
        await api.delete(`/projects/${id}/`);
    }
};

export default { documentService, projectService };
