const createChat = require('../controller/chat.controller')
const realtime = require('./realtime');

const socketio = (server, options) => {
    return require('socket.io')(server, options);
}

const socketConnection = (server) => {
  const io = socketio(server, { cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  } });

  io.on('connection', (socket) => {
    realtime(socket);
    // console.log('React connection established');
    
    // client unique id
    const id = socket.handshake.query.id;

    // creating room of name {id}
    socket.join(id); 

    socket.on('send-message', (msgDetails, callback) => {
        // console.log('[send-message]', {msgDetails});
        
        createChat(msgDetails)
        .then((data) => {callback(data)})

        // socket.broadcast.to(msgDetails.to).emit('receive-message', msgDetails)
        // callback(msgDetails)
        
    });

    socket.on("disconnect", () => {
        console.log("Disconnected")
    });
    
  });

};


module.exports = { socketConnection }