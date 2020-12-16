import { SET_CURRENT_USER } from './currentUserTypes'

export const setCurrentUser = (currentUser) => {
    return {
        type: SET_CURRENT_USER,
        payload: currentUser
        
    }
}

// const userAuthRequest = () => {
//     return {
//         type: types.USER_AUTH_REQUEST
//     }
// }

// const userAuthSuccess = (currentUser) => {
//     return {
//         type: types.USER_AUTH_SUCCESS,
//         payload: currentUser
//     }
// }

// const userAuthFailure = (error) => {
//     return {
//         type: types.USER_AUTH_FAILURE,
//         payload: error
//     }
// }

// const userSignOut = () => {
//     return {
//         type: types.USER_SIGN_OUT
//     }
// }

// Async action creator
// export const userAuth = () => {

//     return (dispatch) => {

//         dispatch(userAuthRequest())

//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             if(user) {
//                 // user sign in
//                 dispatch(userAuthSuccess(user))
//             } else {
//                 // user sign out
//                 unsubscribe()
//                 dispatch(userSignOut())
//             }
//         }, (error) => {
//             console.error(error)
//             dispatch(userAuthFailure(error.message))
//         })

//     }

// }