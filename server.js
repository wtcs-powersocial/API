const express = require('express');
const aplication = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');
const cors = require('cors'); // permissões p/ consumo da api
const consign = require('consign');
const fileUpload = require('express-fileupload');
const multer = require('multer');
// manipulação de arquivos
const mv = require('mv'); // necessário para linux
const fs = require('fs');


const vdc = multiparty();
aplication.use(multiparty())
aplication.use(fileUpload());


aplication.use(express.json({ extend: false }));
aplication.use(express.urlencoded({ extended: false }));


// Configurando banco de dados
const dbConfig = require('./src/config/database.js');

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
    origin: '*', // client (todo mundo pode acessar)
    optionsSuccessStatus: 200
}

aplication.use(cors(corsOptions));

consign()
    .include('./src/routes')
    .into(aplication);

/*
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.ogirinalname)
    }
});
*/

aplication.listen(3000, () => console.log('APP on...'));