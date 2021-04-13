const  express  =  require ('express') ;  // import express; usando express;
const  { uuid }  =  require ('uuidv4') ;

const server = express();

server.use(express.json()) //toda informação que vier do cliente vai ser processada como JSON

// Métodos HTTP (REST)
//GET = READ (obter recursos) tipo JSON (JavaScrip Object Notation)
//POST = CREATE (adicionar um recurso)
//PUT = UPDATE (Atualizar um recurso)
//DELETE (Apagar um recurso)

//Informações passadas pela URL = request.query (?nome = Henrique)
//Informações passadas pela URL = request.params (produto/1)
//Informação passada pela API = corpo de mensagem (request.body(JSON))

contatos = [];

//localhost:3000/
server.get('/', function (request, response) {//Request = tudo o que manda do cliente para o servidor, response = tudo o que manda do servidor para o cliente
    response.json(contatos);
})

//localhost:3000/2c3f1ba2-0959-4760-a1cc-cdde5876d2d2
server.get('/:id', function (request, response) {//Request = tudo o que manda do cliente para o servidor, response = tudo o que manda do servidor para o cliente
    const id = request.params.id;
    const result = contatos.filter(contato => contato.id ==id);
    response.json(result);
})

server.post('/', function (request, response) {
    const nome = request.body.nome;
    const telefone = request.body.telefone;

    var contato = {
        id: uuid(),
        nome,
        telefone
    };

    contatos.push(contato);
    response.status(201).send();

})

server.listen(process.env.PORT || 3000);