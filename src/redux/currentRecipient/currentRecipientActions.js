import {Set_CurrentRecipient} from './currentRecipientTypes';

export const setCurrentRecipient = (recipient) => {
    return {
        type: Set_CurrentRecipient,
        payload: recipient
    }
}