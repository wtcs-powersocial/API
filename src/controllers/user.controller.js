const User = require('../models/user.model.js');
/*
const mv = require('mv');
const fsx = require('fs-extra');
*/
const fs = require('fs'); // nativo do nodejs


exports.create = (req, res) => {
    console.log(req.files);
    const user = new User();
    user.nameComplete = req.body.nameComplete;
    user.nameUser = req.body.nameUser;
    user.email = req.body.email;
    user.cpf = req.body.cpf;
    user.password = req.body.password;
    user.dataNasc = req.body.dataNasc;
    user.icon = req.body.icon;

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
}

// get
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
}