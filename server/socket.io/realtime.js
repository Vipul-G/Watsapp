const Chat = require('../models/chat.model');


const changeStream = Chat.watch();

let listnerCount = 0;

 // Objective: we need to send aknowledgment to the sender
module.exports = function(socket) {

    if (listnerCount < 1) {
        changeStream.on('change', (next) => {
            console.log('change occur in chat')

            if (!socket || next.operationType !== 'insert') {
                // console.log({socket})
                return
            }
        
            const msgDetails = {
                from: next.fullDocument.from,
                to: next.fullDocument.to,
                message: next.fullDocument.message,
                timestamp: next.fullDocument.timestamp,
                seen: next.fullDocument.seen,
            }
            console.log({msgDetails})
            const receiver = next.fullDocument.to;
        
            socket.broadcast.to(receiver).emit('receive-message', msgDetails)
        
        })
    }

    listnerCount = changeStream.listenerCount('change')
}
