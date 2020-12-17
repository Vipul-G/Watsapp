import axios from '../../axios';
import * as actionTypes from './recipientTypes'

const fetchRecipientsRequest = () => {
  return { 
    type: actionTypes.fetch_Recipients_Request
  }
}

const fetchRecipientsSuccess = (recipients) => {
  return {
    type: actionTypes.fetch_Recipients_Success,
    payload: recipients
  }
}

const fetchRecipientsFailure = (error) => {
  return {
    type: actionTypes.fetch_Recipients_Failure,
    payload: error
  }
}

// Async action creator
export const fetchRecipients = (currentUser) => {
  const userEmail = currentUser.email
  if (!userEmail) return

  return (dispatch) => {

    dispatch(fetchRecipientsRequest())

    axios.get(`/${userEmail}/recipients`)
    .then(response => {
      const recipients = response.data
      dispatch(fetchRecipientsSuccess(recipients))
    })
    .catch(error => {
      const errorMsg = error.message
      dispatch(fetchRecipientsFailure(errorMsg))
    })

  }
}