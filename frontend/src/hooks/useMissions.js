import { useState, useEffect, useCallback } from 'react'
import { missionService } from '../services/api'
import { useToast } from '../contexts/ToastContext'

const useMissions = (autoFetch = true) => {
    const [missions, setMissions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const toast = useToast()

    const fetchMissions = useCallback(async (params = {}) => {
        setLoading(true)
        setError(null)

        try {
            const response = await missionService.getAll(params)
            setMissions(response.data)
            return { success: true, data: response.data }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Failed to fetch missions'
            setError(errorMessage)
            toast.error(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }, [toast])

    const createMission = useCallback(async (data) => {
        try {
            const response = await missionService.create(data)
            setMissions((prev) => [response.data, ...prev])
            toast.success('Mission created successfully')
            return { success: true, data: response.data }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Failed to create mission'
            toast.error(errorMessage)
            return { success: false, error: errorMessage }
        }
    }, [toast])

    const updateMission = useCallback(async (id, data) => {
        try {
            const response = await missionService.update(id, data)
            setMissions((prev) =>
                prev.map((mission) => (mission.id === id ? response.data : mission))
            )
            toast.success('Mission updated successfully')
            return { success: true, data: response.data }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Failed to update mission'
            toast.error(errorMessage)
            return { success: false, error: errorMessage }
        }
    }, [toast])

    const deleteMission = useCallback(async (id) => {
        try {
            await missionService.delete(id)
            setMissions((prev) => prev.filter((mission) => mission.id !== id))
            toast.success('Mission deleted successfully')
            return { success: true }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Failed to delete mission'
            toast.error(errorMessage)
            return { success: false, error: errorMessage }
        }
    }, [toast])

    const pauseMission = useCallback(async (id) => {
        try {
            const response = await missionService.pause(id)
            setMissions((prev) =>
                prev.map((mission) => (mission.id === id ? response.data : mission))
            )
            toast.info('Mission paused')
            return { success: true, data: response.data }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Failed to pause mission'
            toast.error(errorMessage)
            return { success: false, error: errorMessage }
        }
    }, [toast])

    const resumeMission = useCallback(async (id) => {
        try {
            const response = await missionService.resume(id)
            setMissions((prev) =>
                prev.map((mission) => (mission.id === id ? response.data : mission))
            )
            toast.success('Mission resumed')
            return { success: true, data: response.data }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Failed to resume mission'
            toast.error(errorMessage)
            return { success: false, error: errorMessage }
        }
    }, [toast])

    const cancelMission = useCallback(async (id) => {
        try {
            const response = await missionService.cancel(id)
            setMissions((prev) =>
                prev.map((mission) => (mission.id === id ? response.data : mission))
            )
            toast.warning('Mission cancelled')
            return { success: true, data: response.data }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Failed to cancel mission'
            toast.error(errorMessage)
            return { success: false, error: errorMessage }
        }
    }, [toast])

    useEffect(() => {
        if (autoFetch) {
            fetchMissions()
        }
    }, [autoFetch, fetchMissions])

    return {
        missions,
        loading,
        error,
        fetchMissions,
        createMission,
        updateMission,
        deleteMission,
        pauseMission,
        resumeMission,
        cancelMission,
    }
}

export default useMissions
