/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import { setCurrentRecipient } from './redux'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	return {
		chatState: state.chatState
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentRecipient: (recipient) => dispatch(setCurrentRecipient(recipient))
	}
}

function getLastMessage(chatState, recipient) {

	const cArr = chatState.chats[recipient.email]

	if(chatState.loading) {
		return 'loading...'
	} else if(!cArr || !cArr.length) {
		return ''
	}

	return cArr[cArr.length - 1].message
}

function SidebarChat({ recipient, setCurrentRecipient, chatState }) {

	const [lastMessage, setLastMessage] = useState('loading...')

	const handleClick = (e) => {
		e.preventDefault()
		setCurrentRecipient(recipient)
	}

	useEffect(() => {
		setLastMessage(getLastMessage(chatState, recipient))
	}, [chatState, recipient])
	return (
		<div className='sidebarChat' onClick={handleClick}>
			<Avatar
				src={recipient.photoURL}
			/>
			<div className='sidebarChat__info'>
				<h2>{recipient.name}</h2>
	<p>{lastMessage}</p>
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarChat)
