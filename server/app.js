const express = require('express');
const helmet = require('helmet');
const watsappRoutes = require('./watsapp.route.js');
const app = express();
const http = require('http').Server(app)
const {socketConnection} = require('./socket.io/connection')

const io = socketConnection(http)

const port = process.env.PORT || 9000;
const dbConnect = require('./db'); 

//middlewares
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// secure application
app.use(helmet())

// api routes
app.use('/api/v1', watsappRoutes);

// error handler
app.use((err, req, res, next) => {
    console.log({err});
    res.status(500).send('Internal server error');
})

//listen on port
http.listen(port, ()=>{
    console.log(`Listening on localhost:${port}`)
    dbConnect
    .then((db) => console.log(`Connected to db`))
    .catch((err) => {throw err});
});


module.exports = app;
