const express = require('express');
const app = express();
const socket = require('socket.io');
const cors = require('cors');

const Mensagens = require('./models/Mensagens');
const Usuario = require('./models/Usuario');
const Sala = require('./models/Sala');

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-PINGOTHER, Authorization');
    app.use(cors());
    next();
})


app.get('/', (req, res) => {
    res.send('Servidor rodando!');
})

app.post('/cadastrar-usuario', async (req, res) => {
    var dados = req.body;
    const usuario = await Usuario.findOne({
        where: {
            email: dados.email
        }
    });  

    if (usuario){
        return res.status(400).json({
            mensagem: 'Este e-mail já está cadastrado!'
        });
    } else {
        await Usuario.create(dados).then(() => {
            return res.json({
                mensagem: 'Usuário cadastrado com sucesso!'
            });
        }).catch((erro) => {
            return res.status(400).json({
                erro: true,
                mensagem: 'Erro ao tentar cadastrar usuário!'
            });
        });
    }
});


app.post('/login', async (req, res) => {
    var dados = req.body;
    const usuarioLogado = await Usuario.findOne({
        attributes: ['id', 'nome', 'email'],
        where: {
            email: dados.email,
        }
    });

    if (usuarioLogado){
        return res.json({
            usuario: usuarioLogado,
            mensagem: 'Usuário logado com sucesso!'
        });
    } else {
        return res.status(400).json({
            mensagem: 'E-mail inválidos!'
        });
    }
});


app.post('/cadastrar-mensagem', async (req, res) => {
    var dados = req.body;
    const mensagem =await Mensagens.create(dados)
    .then(() => {
        return res.json({
            mensagem: 'Mensagem cadastrada com sucesso!'
        });
    }).catch((erro) => {
        return res.status(400).json({
            mensagem: 'Erro ao cadastrar mensagem!'
        });
    });
});


app.post('/cadastrar-sala', async (req,res) =>{
    var dados = req.body;;
    const sala = await Sala.create(dados)
    .then(() => {
        return res.json({
            mensagem: 'Sala cadastrada com sucesso!'
        });
    }).catch((erro) => {
        return res.status(400).json({
            mensagem: 'Erro ao cadastrar sala!'
        });
    });
});


app.get('/listar-mensagens:sala', async (req, res) => {
    const {sala} = req.params;
    const mensagens = await Mensagens.findAll({
        order: [['id', 'ASC']],
        where: {salaId: sala},
        include: [{model: Usuario}, {model: Sala}]
    })
    .then((mensagens) => {
        return res.json({
            erro: false,
            mensagens: mensagens
        });
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            mensagem: 'Erro ao listar mensagens!'
        });
    });
});

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

        Mensagens.create({
            mensagem: dados.conteudo.mensagem,
            salaId: dados.sala,
            usuarioId: dados.conteudo.usuario.id
        })
        socket.to(dados.sala).emit('receber_mensagem', dados.conteudo);
    })
})