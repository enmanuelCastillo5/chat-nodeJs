const http = require('http');


const express = require('express');
const socketio = require('socket.io');

const app = express();



const server = http.createServer(app);
const io = socketio.listen(server);




io.on('connection', socket => {
    console.log('new user connected');
})

//static files
app.use(express.static('public'));





//starting server
server.listen(9000, () => {
    console.log('server on port 9000');

});