const mongoose = require('mongoose');

const DenouceSchema = mongoose.Schema({
    categoria: { type: String, require: true },
    descricao: { type: String, require: true },
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
    img_denuncia: { type: Object, require: true },
    dataDenuncia: { type: Date, default: Date.now },
    status: { type: Boolean, default: false },
    autor: { type: String, require: true }
});

module.exports = mongoose.model('Denouce', DenouceSchema);


/*
autor = require('./user.model');
const mongoose = require('mongoose');

const LozilationSchema = mongoose.Schema({
    latitude: {
        type: Number,
        require: true
    },
    longitude: {
        type: Number,
        require: true
    }
});

const UserSchema = mongoose.Schema({
    nameComplete: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    nameUser: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true
    },
    dataNasc: {
        type: String,
        require: true
    }
});

// const AvaliableSchema = mongoose.Schema({})

const DenouceSchema = mongoose.Schema({
    categoria: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    autor: {
        type: UserSchema,
        require: true
    },
    data: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    local: {
        type: LozilationSchema,
        require: true
    },
    img_denuncia: {
        type: Object
    },
    avaliable: {
        type: Object
    },
    comentarios: {
        type: Object
    }
});

*/