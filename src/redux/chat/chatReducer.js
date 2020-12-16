import * as actionType from './chatTypes';

const initialState = {
    loading: false,
    error: '',
    chats: {
    }
}

export default function chatReducer(state = initialState, action) {
    
    switch(action.type) {
        // ADD_NEW_MESSAGE
        case actionType.ADD_NEW_MESSAGE :
            const currentState = {
                loading: false,
                error: '',
                chats: {
                    ...state.chats
                }
            }

            if(!currentState.chats[action.recipientEmail]) {
                currentState.chats[action.recipientEmail] = [action.payload]
            } else {
                currentState.chats[action.recipientEmail].push(action.payload)
            }

            return currentState

        // FETCH CHAT of currentUser with a friend []
        case actionType.FETCH_CHATS_REQUEST : return {
                ...state,
                loading: true,
                error: ''
            }
        case actionType.FETCH_CHATS_SUCCESS : 
            return {
                loading: false,
                error: '',
                chats: action.payload
            }
            
        case actionType.FETCH_CHATS_FAILURE : return {
            ...state,
            loading: false,
            error: action.payload,
        }

        default : return state
    }

}

