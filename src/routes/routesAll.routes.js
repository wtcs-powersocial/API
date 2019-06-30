const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
// models
const Post = require('../models/post');
const Denouce = require('../models/denouce.models');
const Category = require('../models/category.model');
const User = require('../models/user.model');

// rotas do model post
routes.post('/posts', multer(multerConfig).single('file'), async(req, res) => {
    console.log(req.file);
    console.log(req.files);
    console.log(req.body);
    const post = await Post.create({
        name: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        url: ''
    });

    return res.json(post);
});

/**
 * Rotas do model Denouce
 */
routes.post('/denouces', (req, res) => {

    const denouce = new Denouce({
        categoria: req.body.categoria,
        descricao: req.body.descricao,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        //img_denuncia: req.files.path,
        dataDenuncia: req.body.data,
        status: req.body.status,
        autor: req.body.autor
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

routes.post('/users', (req, res) => {
    const user = new User();
    user.nameComplete = req.body.nameComplete;
    user.email = req.body.email;
    user.cpf = req.body.cpf;
    user.password = req.body.password;
    user.dataNasc = req.body.dataNasc;
    // user.icon = req.body.icon;

    //user.icon.type = fs.readFileSync(req.files.icon.path)
    //user.icon.contentType = 'image/*';
    //console.log(req.files);

    user.save()
        .then(data => {
            res.status(200).json(data);
            console.log(user);
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