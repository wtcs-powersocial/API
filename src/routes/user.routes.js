const routes = require('express').Router();
const User = require('../models/user.model');
const Image = require('../models/image.model');
const multipartyMiddleware = require('../config/multiparty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(params = {}) {
    return jwt.sign(params, 'secretKey', { expiresIn: 86480 });
}

/**
 * Registrando novos usuários
 */
routes.post('/register', multipartyMiddleware, async(req, res) => {
    const { email } = req.body;

    if (await User.findOne({ email }))
        return res.status(400).send({ msg: 'Este email já foi cadastrado por um usuário.' });

    const user = new User();
    user.nameComplete = req.body.nameComplete;
    user.email = req.body.email;
    user.cpf = req.body.cpf;
    user.password = req.body.password;
    user.dataNasc = req.body.dataNasc;
    user.icon = req.body.icon

    user.save()
        .then(data => {
            data.password = undefined;
            res.status(200).json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
});


/**
 * Autenticando usuário
 */
routes.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'Usuário não cadastrado. Crie uma conta' });

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Senha inválida.' });
    }

    user.password = undefined;
    return res.status(200).send({ user, token: generateToken({ id: user._id }) });


})

/**
 * Capturando usuários registrados
 */
routes.get('/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
});


/**
 * Capturando usuário específico
 */
routes.get('/users/userId', (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    msg: "Denúncia não encontrada."
                });
            }
            res.json(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Denúncia não encontrada com esse ID: " + req.params.userId
                });
            }
            return res.status(500).json({
                msg: err
            });
        });
});

module.exports = routes;