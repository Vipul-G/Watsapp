/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()
const backendURL = process.env.REACT_APP_LOCAL ? 'http://localhost:9000' : 'https:stormy-forest-22894.herokuapp.com/';

export function useSocket () {
  return useContext(SocketContext)
}

export function SocketProvider ({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    let mount = true
    const newSocket = io(
      backendURL, // socket.io server address
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
