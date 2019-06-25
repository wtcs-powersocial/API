module.exports = function(aplication) {
    const category = require('../controllers/category.controller.js');

    aplication.get('/api/categories', category.findAll);
}