const User = require('../models/user.model.js');


// insert
exports.create = (req, res) => {
    // Create a Customer
    const user = new User(req.body);
    console.log(user)

    // Save a Customer in the MongoDB
    user.save()
        .then(user => {
            res.status(200).json(user);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


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
};

/*
// FIND a Customer
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.params.customerId
                });
            }
            res.json(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.params.customerId
                });
            }
            return res.status(500).json({
                msg: "Error retrieving Customer with id " + req.params.customerId
            });
        });
};

// UPDATE a Customer
exports.update = (req, res) => {
    // Find customer and update it
    Customer.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(customer => {
            if (!customer) {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.params.customerId
                });
            }
            res.json(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.params.customerId
                });
            }
            return res.status(500).json({
                msg: "Error updating customer with id " + req.params.customerId
            });
        });
};

// DELETE a Customer
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.params.customerId
                });
            }
            res.json({ msg: "Customer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.params.customerId
                });
            }
            return res.status(500).json({
                msg: "Could not delete customer with id " + req.params.customerId
            });
        });
};
*/