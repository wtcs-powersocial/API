const express = require('express');
const routes = express.Router();
const multipartyMiddleware = require('../config/multiparty');
const Denouce = require('../models/denouce.models');
const Image = require('../models/image.model');

// middlewar
const sentinelaApi = require('../middlewares/sentinela');

routes.use(sentinelaApi);

routes.post('/denouces', multipartyMiddleware, async(req, res) => {

    console.log(req.body);
    const denouce = new Denouce({
        categoria: req.body.categoria,
        descricao: req.body.descricao,
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
        dataDenuncia: req.body.data,
        status: req.body.status,
        autor: JSON.parse(req.body.autor),
        img_denuncia: req.body.imagem
    });
    /*
    await Image.create({
            name: req.files.img_denuncia.originalFilename,
            size: req.files.img_denuncia.size,
            key: req.files.img_denuncia.name,
            url: ''
        })
    */

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
routes.get('/denouces', multipartyMiddleware, (req, res) => {
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


module.exports = routes;