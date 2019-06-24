const express = require('express');
const aplication = express();
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');
// manipulação de arquivos
const mv = require('mv'); // necessário para linux
const fs = require('fs'); // nativo do nodejs

aplication.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

const Customer = require('./app/models/customer.model.js');

mongoose.Promise = global.Promise;