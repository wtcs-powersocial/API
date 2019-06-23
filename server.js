const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectID;
const multiparty = require('connect-multiparty');
// manipulação de arquivos
const mv = require('mv'); // necessário para linux
const fs = require('fs'); // nativo do nodejs

// start do express;
const aplication = express();

// middlwares
aplication.use(bodyParser.urlencoded({ extended: true }));
aplication.use(bodyParser.json());
aplication.use(multiparty());

aplication.use(function(req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();

});

// definição da porta
const PORT = 8080;

aplication.listen(PORT, () => console.log('API no ar na porta: ' + PORT));

// config connection
const uri = 'localhost';
const porta_bd = 27017;
const connection = new mongodb.Db(
    'wtcs', // nome do bd
    new mongodb.Server(uri, porta_bd, {} // obj opcionais
    ), {} // obj opcionais

);

// definição das rotas

aplication.get('/api/users', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    connection.open((erro, mongoClient) => {
        mongoClient.collection('users', (erro, collection) => {
            collection.find().toArray((erro, results) => {
                erro ? res.json(erro) : res.json(results);
                mongoClient.close();
            });
        });
    });
});


aplication.get('/api/denuncias', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    connection.open((erro, mongoClient) => {
        mongoClient.collection('denouces', (erro, collection) => {
            collection.find().toArray((erro, results) => {
                erro ? res.json(erro) : res.json(results);
                mongoClient.close();
            });
        });
    });
});