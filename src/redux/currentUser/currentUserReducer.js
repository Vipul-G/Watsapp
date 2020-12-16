import { SET_CURRENT_USER } from './currentUserTypes'

const initialState = {
    currentUser: null
}

export default function currentUserReducer (state = initialState, action) {

    switch(action.type) {
        case SET_CURRENT_USER : return {
            currentUser: action.payload
        }
        default : return state
    }

}