const http = require('http');
const path = require('path');



const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//db.connections
mongoose.connect('mongodb://localhost/chat-database', { useUnifiedTopology: true, useNewUrlParser: true })
.then (db => console.log(`DB is conected`))
.catch(err => console.log(err));





app.set('port', process.env.PORT || 9000);

require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting server
server.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));

});