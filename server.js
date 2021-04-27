const  express  =  require ('express') ;  // import express; usando express;
const server = express();

const database = require('./database');

server.use(express.json()) //toda informação que vier do cliente vai ser processada como JSON

// Métodos HTTP (REST)
//GET = READ (obter recursos) tipo JSON (JavaScrip Object Notation)
//POST = CREATE (adicionar um recurso)
//PUT = UPDATE (Atualizar um recurso)
//DELETE (Apagar um recurso)

//Informações passadas pela URL = request.query (?nome = Henrique)
//Informações passadas pela URL = request.params (produto/1)
//Informação passada pela API = corpo de mensagem (request.body(JSON))


//localhost:3000/
server.get('/', async function(request, response) {
    const contatos = await database.read();
    response.json(contatos);
})

// localhost:3000/1
server.get('/:id', async function(request, response) {
    const id = request.params.id;
    const contato = await database.find(id);
    response.json(contato);
})

// localhost:3000/
server.post('/', async function(request, response) {
    const nome = request.body.nome;
    const telefone = request.body.telefone;

    const result = await database.create(nome, telefone);
    response.status(201).send();
})

server.put('/:id', async function(request, response){
    const id = request.params.id;
    const nome = request.body.nome;
    const telefone = request.body.telefone;

    const result = await database.update(id, nome, telefone);
    response.status(200).send();
})

server.delete('/:id', async function (request, response) {
    const id = request.params.id;
    const result = await database.delete(id);
    response.status(200).send();
})
server.listen(process.env.PORT || 3000);