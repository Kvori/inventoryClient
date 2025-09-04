import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

// interface UseAddItemLockOptions {
//     inventoryId: number
//     onLockGranted: () => void
// }

// export function useAddItemLock({ inventoryId, onLockGranted }: UseAddItemLockOptions) {
//     const socketRef = useRef<Socket | null>(null)
//     const [isLockedByOther, setIsLockedByOther] = useState(false)

//     useEffect(() => {
//         const socket = io('http://localhost:5000', {
//             withCredentials: true
//         })

//         socket.on('connect', () => {
//             console.log('✅ Socket ID:', socket.id)
//         })

//         socketRef.current = socket

//         socket.emit('joinInventory', inventoryId)

//         socket.on('addItemLockChanged', ({ locked, lockedBy }) => {
//             const isOther = locked && lockedBy !== socket.id
//             setIsLockedByOther(isOther)

//             if (locked && lockedBy === socket.id) {
//                 onLockGranted()
//             }
//         })

//         socket.on('addItemLockDenied', ({ reason }) => {
//             alert(`🚫 Нельзя нажать: ${reason}`)
//         })

//         return () => {
//             socket.emit('leaveInventory', inventoryId)
//             socket.disconnect()
//         }
//     }, [inventoryId, onLockGranted])

//     const requestLock = () => {
//         socketRef.current?.emit('lockAddItem', inventoryId)
//     }

//     const releaseLock = () => {
//         socketRef.current?.emit('lockAddItem', inventoryId)
//     }

//     return {
//         requestLock,
//         releaseLock,
//         isLockedByOther
//     }
// }

export function useAddItemLock({ inventoryId, onLockGranted }) {
    const socketRef = useRef<Socket | null>(null)
    const [isLockedByOther, setIsLockedByOther] = useState(false)
}
