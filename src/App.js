import React from 'react'
import './App.css'
import Sidebar from './Sidebar';
import Chat from './Chat';
import {SocketProvider} from './context/SocketContext';
import { fetchChats } from './redux'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserState.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        fetchChats: (currentUser) => dispatch(fetchChats(currentUser))
	}
}

function App({ currentUser, fetchChats }) {

    fetchChats(currentUser)
  
    return (
        <SocketProvider id={currentUser.email}>
            <div className="app">
                <div className="app__body"> 
                    <Sidebar />
                    {currentUser && <Chat />}
                </div>
            </div> 
        </SocketProvider>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
