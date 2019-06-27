module.exports = function(aplication) {
    const multiparty = require('connect-multiparty');
    const vdc = multiparty();
    const user = require('../controllers/user.controller.js');
    // Create a new Customer
    aplication.post('/api/users', vdc, user.create);

    // Retrieve all Customer
    aplication.get('/api/users', user.findAll);
    /*
    // Retrieve a single Customer by Id
    app.get('/api/customers/:customerId', customers.findOne);
 
    // Update a Customer with Id
    app.put('/api/customers', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/customers/:customerId', customers.delete);
*/
}