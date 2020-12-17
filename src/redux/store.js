import { createStore, combineReducers, applyMiddleware } from 'redux'
import recipientReducer from './recipients/recipientReducer'
import currentRecipientReducer from './currentRecipient/currentRecipientReducer'
import chatReducer from './chat/chatReducer'
import currentUserReducer from './currentUser/currentUserReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
 
const rootReducer = combineReducers({
    recipientState: recipientReducer,
    currentRecipientState: currentRecipientReducer,
    chatState: chatReducer,
    currentUserState: currentUserReducer     
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;