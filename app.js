const express = require('express');
const app = express();
const socket = require('socket.io');
const cors = require('cors');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-PINGOTHER, Authorization');
    app.use(cors());
    next();
})



app.get('/', (req, res) => {
    res.send('Mandou bem!');
})

const server = app.listen(8080, () => {
    console.log('Servidor iniciado na porta: http://localhost:8080');
})

io = socket(server, {cors: {origin: '*'}});

io.on('connection', (socket) => {
    console.log(socket.id + 'Usuário conectado');

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
})