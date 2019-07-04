const mongoose = require('mongoose');
const bcrypto = require('bcryptjs');

const UserSchema = mongoose.Schema({
    nameComplete: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
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
        type: String,
        require: true
    }
}, { collection: 'users' });


UserSchema.pre('save', async function(next) {
    const hash = await bcrypto.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = mongoose.model('User', UserSchema);