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

// definição da porta
const PORT = 8080;

aplication.listen(PORT, () => console.log('API no ar...'));

// config connection
const uri = 'localhost';
const porta_bd = 27017;
const connection = new mongodb(
    'wtcs', // nome do bd
    new mongodb.Server( // servidor
        uri, porta_bd, {} // obj opcionais
    ), {} // obj opcionais

);