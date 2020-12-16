import axios from '../../axios';
import * as actionTypes from './chatTypes'

// Add_new_message
export const addNewMessage = (friendEmail, newMsgDetail) => {
    return {
        type: actionTypes.ADD_NEW_MESSAGE,
        payload: newMsgDetail,
        recipientEmail: friendEmail
    }
}


// Fetch_Chat
const fetchChatsRequest = () => {
  return { 
    type: actionTypes.FETCH_CHATS_REQUEST
  }
}
const fetchChatsSuccess = (chat) => {
  return {
    type: actionTypes.FETCH_CHATS_SUCCESS,
    payload: chat
  }
}
const fetchChatsFailure = (error) => {
  return {
    type: actionTypes.FETCH_CHATS_FAILURE,
    payload: error
  }
}
// Async action creator
export const fetchChats = ({email : currentUserEmail}) => {

  return (dispatch) => {

    dispatch(fetchChatsRequest())

    axios.get(`/users/${currentUserEmail}/chat`)
    .then((response) => {
        dispatch(fetchChatsSuccess(response.data.length ? response.data[0] : {}))
    })
    .catch((error) => {
        dispatch(fetchChatsFailure(error.message))
    })

  }
}