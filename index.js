const express = require('express')
const app =express()
require('dotenv').config()
const { config } = require('dotenv')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
const { Client } = require('pg');
const cors = require('cors');
app.use(cors());
const { response } = require('express');


const client = new Client({
	host: "localhost",
	port: 5432,
	user: "postgres",
	password: "hudahuda",
	database: "database1",
});

client.connect((err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected ');
});

console.log(process.env.QUERY_INSERT);

app.get('/', (req,res) => {
    res.send('Is Connected')
})

//insert
app.post('/database', function(req, res) {
    const query = `INSERT INTO nilai_un (nama, nilai) VALUES ('${req.body.nama}', '${req.body.nilai}')`;

    client.query(query, (err, results) => {
        
        if (err) {
            res.statusCode = 404;
            res.send(null);
            console.error(err);
            console.log("Data tidak berhasil dimasukkan, tipe data salah!");
            return;
        }
        console.log(`Data [${req.body.nama}, ${req.body.nilai}] berhasil di-insert.`);
        res.send(`Data [${req.body.nama}, ${req.body.nilai}] berhasil di-insert.`);
    });
});

app.get('/database', (req, res) => {
    const query = `SELECT * FROM nilai_un ORDER BY id asc;`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(results.rows);
    });
});

PORT = process.env.PORT
app.listen(PORT, () => {console.log(`Application is running on ${PORT}!! `)})