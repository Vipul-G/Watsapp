import { Set_CurrentRecipient } from './currentRecipientTypes';

const initialState = {
    currentRecipient: null
}

export default function currentRecipientReducer(state = initialState, action) {

    switch(action.type) {
        
        case Set_CurrentRecipient : return {
            currentRecipient: action.payload
        }

        default : return state
    }

}