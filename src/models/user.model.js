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
    password: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true
    },
    dataNasc: {
        type: Date,
        require: true
    },
    icon: {
        type: Object,
        require: true
    }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);