const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // serve static files

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('documentChanged', (data) => {
        // Broadcast the change to all other connected clients
        socket.broadcast.emit('updateDocument', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:8080${PORT}`);
});
