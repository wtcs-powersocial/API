const express = require('express');
const aplication = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');
const cors = require('cors'); // permissões p/ consumo da api
const morgan = require('morgan');


aplication.use(bodyParser.json({ extend: false }));
aplication.use(bodyParser.urlencoded({ extended: true }));
aplication.use(morgan('dev'));


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
aplication.use(multiparty());

// rotas
aplication.use(require('./src/routes/user.routes'));
aplication.use(require('./src/routes/category.routes'));
aplication.use(require('./src/routes/denouce.routes'));

aplication.listen(3000, () => console.log('APP on...'));