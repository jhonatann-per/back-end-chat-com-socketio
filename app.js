const express = require('express');
const app = express();
const socket = require('socket.io');
const cors = require('cors');

app.use(express.json());
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

    socket.on('conectar_a_sala', (dados) => {
        socket.join(dados);
        console.log('Conectado a sala: ' + dados);
    })

    socket.on('enviar_mensagem', (dados) => {
        console.log(dados);
        socket.to(dados.sala).emit('receber_mensagem', dados.conteudo);
    })
})