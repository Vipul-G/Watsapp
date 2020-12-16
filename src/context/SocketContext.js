/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket () {
  return useContext(SocketContext)
}

export function SocketProvider ({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    let mount = true
    const newSocket = io(
      'http://localhost:9000', // socket.io server address
      { query: { id } }
    )

    if (mount) {
      setSocket(newSocket)
    }
    return () => {
      mount = false
      newSocket.close()
    }
  }, [id])

  return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
  )
}
