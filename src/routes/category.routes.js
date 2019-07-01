const express = require('express');
const routes = express.Router();
const Category = require('../models/category.model');

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