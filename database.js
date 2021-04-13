const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'rfaehfyxmblxja',
    password: 'bfb12e0d1db64da39248f30bc239f5c8629b73d6aef206ba66a4653a56f95d14',
    host: 'ec2-52-1-115-6.compute-1.amazonaws.com',
    database: 'd7ovusehi8pcoc',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

/*const script = 'CREATE TABLE IF NOT EXISTS contatos (ID serial primary key, nome varchar(60) not null, telefone varchar(20) not null)';

pool.query(script, function (error, result) {
    if (error)
        throw error;
    else
        console.log("Tabela criada com sucesso.");
})*/

module.exports = {
    async create(nome, telefone) {
        try {
            const sql = 'INSERT INTO contatos (nome, telefone) VALUES ($1, $2)';
            const result = await pool.query(sql, [nome, telefone]);
            return result.rows;
        }catch (error) {
            console.log(error);
            return -1
        }
    },
    async read(){
        const sql = 'SELECT * FROM contatos order by nome';
        const result = await pool.query(sql);
        return result.rows;
    }
}




