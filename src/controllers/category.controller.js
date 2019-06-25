const Category = require('../models/category.model.js');
// get
exports.findAll = (req, res) => {
    Category.find()
        .then(categories => {
            res.status(200).json(categories);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};