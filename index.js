const express = require('express')
const app = express()


let bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))


app.use(express.static('public'));


const mysql = require('mysql');
const MYSQL_HOST = process.env.MYSQLHOST;
const MYSQL_USER = process.env.MYSQLUSER;
const MYSQL_PASS = process.env.MYSQLPASSWORD;
const MYSQL_DB = process.env.MYSQLDATABASE;
// const port = process.env.MYSQLPORT;
const port = 7619


app.get('/', (req, res) => {
    res.send("Teste de plataforma PetShop");
})


app.get('/anao', function(req, res) {
    res.json({"texto": "Ta funcionando!"})
})


app.post('/petshop', (req, res) => {
    let intentName = request.body.queryResult.intent.displayName;

    if (intentName === "agendamento"){
        let nome = request.body.queryResult.parameters['nome-cliente'];
        let fone = request.body.queryResult.parameters['fone-cliente'];

        let sql_query = "INSERT INTO clientes (nome, fone) VALUES ('" + nome + "', '" + fone + "')"
        let conn = mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASS,
            database: MYSQL_DB,
            port: port
        })
        conn.connect();
        conn.query(sql_query, (err, results, fields) => {
            if (err) throw err;
            conn.end();
            res.json({"fulfillmentText": "Seus dados foram salvos com sucesso, quer agendar agora, seu tanso?"})
        })
    }
})


app.listen(port || 3000, () => {
//   console.log(`Example app listening on port ${port}`)
})
