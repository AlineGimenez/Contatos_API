const express = require('express');//referência da biblioteca - import express; using express;
const { uuid } = require('uuidv4');

const server = express();

server.use(express.json()) //tota informação que vier do cliente vai ser processada como JSON

// Métodos HTTP (REST)
//GET = READ (obter recursos) tipo JSON (JavaScrip Object Notation)
//POST = CREATE (adicionar um recurso)
//PUT = UPDATE (Atualizar um recurso)
//DELETE (Apagar um recurso)

//Informações passadas pela URL = request.query (?nome = Henrique)
//Informações passadas pela URL = request.params (produto/1)
//Informação passada pela API = corpo de mensagem (request.body(JSON))

contatos = [];

server.get('/', function(request, response) {//Request = tudo o que manda do cliente para o servidor, response = tudo o que manda do servidor para o cliente
    response.json(contatos);
})

server.get('/:id', function(request, response) {//Request = tudo o que manda do cliente para o servidor, response = tudo o que manda do servidor para o cliente
    const id = request.params.id;
    response.json(id);
})

server.post('/', function(request, response){
    const nome = request.body.nome;
    const telefone = request.body.telefone;

    tutular = {
        id: uuid(),
        nome: nome,
        telefone: telefone
    }
    contatos.push(tutular);
    response.status(201).send();
})

server.listen(process.env.PORT || 3000);