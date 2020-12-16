import React, {useEffect, useRef} from 'react'
import './Chat.css';
import {Avatar, IconButton} from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import {useSocket} from './context/SocketContext';
import { connect } from 'react-redux'
import { setCurrentRecipient, addNewMessage } from './redux'


const mapStateToProps = (state) => {

    return {
        currentUser: state.currentUserState.currentUser,
        currentRecipient: state.currentRecipientState.currentRecipient,
        recipientState: state.recipientState,
        chatState: state.chatState
    }
        
}
const mapDispatchToProps = (dispatch) => {
	return {
        setCurrentRecipient: (recipient) => dispatch(setCurrentRecipient(recipient)),
        addNewMessage: (friendEmail, newMsgDetail) => dispatch(addNewMessage(friendEmail, newMsgDetail))
	}
}

function Chat({ 
    recipientState, currentRecipient, 
    setCurrentRecipient, chatState, addNewMessage, currentUser
}) {

   
    const inputRef = useRef();
    
    const socket = useSocket();

    const sendMessage = (e) => {
        e.preventDefault();
        const msgDetail = {
            message: inputRef.current.value,
            to: currentRecipient.email,
            from: currentUser.email,
            timestamp: new Date().toUTCString()
        };
        socket.emit('send-message', msgDetail, (data) => {
            // update message state
            const newMsg = {
                from: data.from,
                to: data.to,
                message: data.message,
                timestamp: data.timestamp,
                seen: data.seen
            }
            addNewMessage(currentRecipient.email, newMsg)

        });
        
    };


    useEffect(() => {
        // setting first recipient by default
        const recipient = recipientState.recipients[0]
        if (recipient) {
            setCurrentRecipient(recipient)
        }
    }, [recipientState, setCurrentRecipient])


    useEffect(() => {
        if (!socket) {
            return;

        }
        socket.on('receive-message', (msgDetail) => {
            const friendEmail = msgDetail.from === currentUser.email ? msgDetail.to : msgDetail.from;
            addNewMessage(friendEmail, msgDetail)
            // update message state
        });


        return () => socket.off('receive-message');
    })

    if (!recipientState.recipients.length) {
        return (
            <div className="chat">
                <p>No recipients</p>
            </div>
        )
    }


    return (

        <>

            {   
                recipientState.loading ? <p>loading</p> :
                    recipientState.error ? <p>error</p> :
                    <div className="chat">
                    <div className="chat__header">
                        <Avatar src={currentRecipient ? currentRecipient.photoURL : ''}/>

                        <div className="chat__headerInfo">
                            <h3>{currentRecipient ? currentRecipient.name : 'loadin...'}</h3>
                            <p>Last seen at...</p>
                        </div>

                        <div className="chat__headerRight">
                            <IconButton>
                                <SearchOutlined />
                            </IconButton>
                            <IconButton>
                                <AttachFile />
                            </IconButton>
                            <IconButton>
                                <MoreVert />
                            </IconButton>
                        </div>

                    </div>

                    {currentRecipient && <div className="chat__body">
                        {chatState.loading ? <p>loading...</p> :
                            chatState.error ? <p>error</p> : 
                            chatState.chats[currentRecipient.email] ? chatState.chats[currentRecipient.email].map((msgData, i) => (
                                <p className={`chat__message ${msgData.from ===currentUser.email && "chat__reciever"}`} key={i}>
                                    <span className="chat__name">
                                        {msgData.from!==currentUser.email ? currentRecipient.name : 'You'}
                                    </span>
                                    {msgData.message}
                                    <span className="chat__timestamp">
                                        {msgData.timestamp}
                                    </span>
                                </p>
                                )) : <p>{chatState.chats[currentRecipient.email]}</p>
                        }
                    </div>}

                    <div className="chat__footer">
                        <InsertEmoticon />
                        <form>
                            <input ref={inputRef} placeholder="Type a message" type="text"/>
                            <button type="submit" onClick={sendMessage}>
                                Send
                            </button>
                        </form>
                        <MicIcon />
                    </div>   
                </div>

            }
                   
        </>
        
                
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
