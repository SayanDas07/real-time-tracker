const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('sendLocation', (coords) => {
        io.emit('receiveLocation',{id: socket.id, ...coords});
    });
    console.log('A user connected');

    socket.on('disconnect', () => {
        io.emit('removeLocation', socket.id);
        console.log('A user disconnected');
    });
});
app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});