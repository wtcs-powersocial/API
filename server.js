const express = require('express');
const aplication = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');
const cors = require('cors'); // permissões
const consign = require('consign');
// manipulação de arquivos
const mv = require('mv'); // necessário para linux
const fs = require('fs'); // nativo do nodejs

aplication.use(bodyParser.json())
aplication.use(bodyParser.urlencoded({ extended: false }));

// Configurando banco de dados
const dbConfig = require('./src/config/database.js');

const User = require('./src/models/user.model.js');

mongoose.Promise = global.Promise;

// Conexão
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(() => {
        console.log("Conexão com MongoDB realizada com SUCESSO.");
    }).catch(err => {
        console.log('Não foi possível realizar a conexão: ' + err);
        process.exit();
    });
// permissões
const corsOptions = {
    origin: '*', // client
    optionsSuccessStatus: 200
}

aplication.use(cors(corsOptions));

consign().include('./src/routes').into(aplication);

aplication.listen(3000, () => console.log('APP on...'));