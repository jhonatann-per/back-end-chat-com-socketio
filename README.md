# Projeto Chat

Este projeto é um chat simples com algumas salas de bate-papo, desenvolvido utilizando as seguintes tecnologias:

- **React.js**: Para a construção da interface do usuário.
- **Node.js**: Para o servidor backend.
- **Socket.io**: Para a comunicação em tempo real entre os usuários.

O objetivo é permitir que os usuários entrem em diferentes salas de bate-papo e se comuniquem em tempo real.


Frameworks e Bibliotecas Instaladas:


1- Para instalar o node_modules e armazenar todas as dependências do projeto.
### npm init

2- Express: Um framework para Node.js que facilita a criação de aplicações web e APIs.
### npm install express

3- SOCKET IO: Uma biblioteca que permite comunicação em tempo real entre clientes e servidores.
### npm install socket.io

4- O CORS é usado para permitir que seu servidor atenda a requisições de diferentes origens (domínios) como do front end.
### npm install cors

5- Vamos utilizar o mysql com WorkBench como banco de dados desse projeto comando para criar nossa base de dados:
### CREATE DATABASE chat CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
### Sequelize

6- O Sequelize é um ORM (Object-Relational Mapper) para Node.js que facilita a interação com bancos de dados MySQL. Neste projeto, utilizaremos o Sequelize para interagir de maneira mais eficiente e organizada com o banco de dados MySQL.

O Sequelize nos ajudará a:
- Gerenciar operações CRUD (Create, Read, Update, Delete).
- Manter a integridade dos dados.

Para instalar o Sequelize e o driver do MySQL, utilize os seguintes comandos:

### npm install --save sequelize

Deve-se instalar o driver do banco de dados que se deseja utilizar com o Sequelize.
### npm install --save mysql2
