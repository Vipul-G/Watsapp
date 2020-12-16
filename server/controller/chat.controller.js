const Chat = require('../models/chat.model')

module.exports = (chat) => {
     return Chat.create(chat)
}