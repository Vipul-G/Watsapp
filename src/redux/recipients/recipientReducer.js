import * as actionTypes  from './recipientTypes'

const initialState = {
  loading: false,
  recipients: [],
  error: ''
}


export default function recipientReducer(state = initialState, action) {

    switch(action.type) {
        case actionTypes.fetch_Recipients_Request : return {
            ...state,
            loading: true
        }

        case actionTypes.fetch_Recipients_Success : return {
            loading: false,
            recipients: action.payload,
            error: ''
        }

        case actionTypes.fetch_Recipients_Failure : return {
            loading: false,
            recipients: [],
            error: action.payload   
        }

        default : return state
    }

}