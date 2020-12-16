const mongoose = require('mongoose');

const connection_url = 'mongodb+srv://admin:zWJ4FpvrhqrwxMYn@cluster0.gmhd0.mongodb.net/watsappDB?retryWrites=true&w=majority';
const connect = mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = connect;

