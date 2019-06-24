const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', UserSchema);