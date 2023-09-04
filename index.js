const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


// Instancia el objeto que hara las veces de servidor
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('changeFilter', (message) => {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
        })
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
})


// Pnne a escuchar el servidor por el puerto 3000
app.listen(port, () => {
    console.log('Server on Port 3000');
});
