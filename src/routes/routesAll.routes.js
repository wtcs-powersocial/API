const routes = require('express').Router();
const multiparty = require('connect-multiparty');
// models
const Image = require('../models/image.model');
const Denouce = require('../models/denouce.models');
const Category = require('../models/category.model');
const User = require('../models/user.model');


const multipartyMiddleware = multiparty({ uploadDir: '../upload' });

/**
 * Rotas do model Denouce
 */
routes.post('/denouces', multipartyMiddleware, async(req, res) => {

    const denouce = new Denouce({
        categoria: req.body.categoria,
        descricao: req.body.descricao,
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
        dataDenuncia: req.body.data,
        status: req.body.status,
        autor: req.body.autor,
        img_denuncia: await Image.create({
            name: req.files.img_denuncia.originalFilename,
            size: req.files.img_denuncia.size,
            key: req.files.img_denuncia.name,
            url: ''
        })
    });

    denouce.save()
        .then(dados => {
            res.status(200).json(dados);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
});

// retorno de todas as denúncias não atendidas
routes.get('/denouces', (req, res) => {
    Denouce.find({ status: false })
        .then(denouces => {
            res.status(200).json(denouces);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
});

// return uma denuncia
routes.get('/denouces/:denouceId', (req, res) => {
    Denouce.findById(req.params.denouceId)
        .then(denouce => {
            if (!denouce) {
                return res.status(404).json({
                    msg: "Denúncia não encontrada."
                });
            }
            res.json(denouce);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Denúncia não encontrada com esse ID: " + req.params.customerId
                });
            }
            return res.status(500).json({
                msg: err
            });
        });
});



/**
 * Rotas de Users
 */

routes.post('/users', multipartyMiddleware, async(req, res) => {
    const { email } = req.body;

    if (await User.findOne({ email }))
        return res.status(400).send({ msg: 'Este email já foi cadastrado por um usuário.' });

    const user = new User();
    user.nameComplete = req.body.nameComplete;
    user.email = req.body.email;
    user.cpf = req.body.cpf;
    user.password = req.body.password;
    user.dataNasc = req.body.dataNasc;
    user.icon = await Image.create({
        name: req.files.icon.originalFilename,
        size: req.files.icon.size,
        key: req.files.icon.name,
        url: ''
    });

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
    })
    /**
     * Rotas de Categories
     */
routes.get('/categories', (req, res) => {
    Category.find()
        .then(categories => {
            res.status(200).json(categories);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
});

module.exports = routes;