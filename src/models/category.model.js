const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    categoria: { type: String, require: true },
});

module.exports = mongoose.model('Category', CategorySchema);