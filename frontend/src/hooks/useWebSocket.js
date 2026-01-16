import { useEffect, useRef, useState, useCallback } from 'react'

const useWebSocket = (url, options = {}) => {
    const {
        onMessage,
        onOpen,
        onClose,
        onError,
        reconnectAttempts = 5,
        reconnectInterval = 3000,
        enabled = true,
    } = options

    const [isConnected, setIsConnected] = useState(false)
    const [lastMessage, setLastMessage] = useState(null)
    const wsRef = useRef(null)
    const reconnectCountRef = useRef(0)
    const reconnectTimeoutRef = useRef(null)

    const connect = useCallback(() => {
        if (!enabled || !url) return

        try {
            const token = localStorage.getItem('authToken')
            const wsUrl = token ? `${url}?token=${token}` : url

            const ws = new WebSocket(wsUrl)

            ws.onopen = (event) => {
                console.log('WebSocket connected')
                setIsConnected(true)
                reconnectCountRef.current = 0
                onOpen?.(event)
            }

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data)
                    setLastMessage(data)
                    onMessage?.(data)
                } catch (err) {
                    console.error('Failed to parse WebSocket message:', err)
                }
            }

            ws.onerror = (event) => {
                console.error('WebSocket error:', event)
                onError?.(event)
            }

            ws.onclose = (event) => {
                console.log('WebSocket closed')
                setIsConnected(false)
                onClose?.(event)

                // Attempt to reconnect
                if (
                    enabled &&
                    reconnectCountRef.current < reconnectAttempts &&
                    !event.wasClean
                ) {
                    reconnectCountRef.current++
                    console.log(
                        `Reconnecting... Attempt ${reconnectCountRef.current}/${reconnectAttempts}`
                    )

                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect()
                    }, reconnectInterval)
                }
            }

            wsRef.current = ws
        } catch (err) {
            console.error('Failed to create WebSocket connection:', err)
        }
    }, [url, enabled, onMessage, onOpen, onClose, onError, reconnectAttempts, reconnectInterval])

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
        }

        if (wsRef.current) {
            wsRef.current.close()
            wsRef.current = null
        }

        setIsConnected(false)
    }, [])

    const sendMessage = useCallback((data) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const message = typeof data === 'string' ? data : JSON.stringify(data)
            wsRef.current.send(message)
            return true
        } else {
            console.warn('WebSocket is not connected')
            return false
        }
    }, [])

    useEffect(() => {
        if (enabled) {
            connect()
        }

        return () => {
            disconnect()
        }
    }, [enabled, connect, disconnect])

    return {
        isConnected,
        lastMessage,
        sendMessage,
        connect,
        disconnect,
    }
}

export default useWebSocket
