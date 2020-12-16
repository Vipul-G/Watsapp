import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { IconButton, Avatar } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router-dom'
import { fetchRecipients } from './redux'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux'
import { auth } from './auth/firebaseSignIn'

// eslint-disable-next-line react/prop-types

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUserState.currentUser,
		recipientState: state.recipientState
	}
}

const mapDispatchToProps = (dispatch) => {
	return { 
		fetchRecipients: (currentUser) => dispatch(fetchRecipients(currentUser)),
		setCurrentUser: (currentUser = null) => dispatch(setCurrentUser(currentUser)),
	}
}

const Sidebar = ({ recipientState, fetchRecipients, currentUser, setCurrentUser }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [recipientList, setRecipientList] = useState(recipientState.recipients)
	
	useEffect(() => {
		setRecipientList(recipientState.recipients)
	}, [recipientState])
	const history = useHistory()

	const open = Boolean(anchorEl)

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleSignout = async () => {
		try {
			await auth.signOut()
			setCurrentUser()
			history.push('/signin')
		} catch (err) {
			console.error({err})
		}
	}

	useEffect(() => {
		if (currentUser) {
			fetchRecipients(currentUser)
		}
	}, [fetchRecipients, currentUser])

	const handleSearchInput = (e) => {
		e.preventDefault()
		const value = e.target.value.toLowerCase()
		if(value === '') {
			return setRecipientList(recipientState.recipients)
		}
		const filteredArr = recipientState.recipients.filter((r) => r.name.toLowerCase().includes(value))
		setRecipientList(filteredArr)
	}

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar src={currentUser.photoURL} />

	<p><b>{currentUser.name.toUpperCase()}</b></p>

				<div className='sidebar__headerRight'>
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton onClick={handleMenu}>
						<MoreVertIcon />
					</IconButton>

					<Menu
						id='menu-appbar'
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={open}
						onClose={handleClose}
					>
						<MenuItem
							onClick={() => {
								handleClose()
								handleSignout()
							}}
						>
							Signout
						</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
					</Menu>
				</div>
			</div>

			<div className='sidebar__search'>
				<div className='sidebar__searchContainer'>
					<SearchOutlined />
					<input placeholder='Search or start new chat' type='text' size='55' onChange={handleSearchInput} />
				</div>
			</div>

			<div className='sidebar__chats'>
				{recipientState.loading ? 'loading'
				: recipientState.error ? 'error'
					:  recipientList.map((r, i) => (
					<SidebarChat recipient={r} key={i} />
				))}
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
