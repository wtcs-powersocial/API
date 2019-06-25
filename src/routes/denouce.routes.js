module.exports = function(aplication) {

    const denouce = require('../controllers/denouce.controller.js');

    // Create a new Customer
    aplication.post('/api/denouces', denouce.create);

    // Retrieve all Customer
    aplication.get('/api/denouces', denouce.findAll);
    /*
    // Retrieve a single Customer by Id
    app.get('/api/customers/:customerId', customers.findOne);
 
    // Update a Customer with Id
    app.put('/api/customers', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/customers/:customerId', customers.delete);
*/
}