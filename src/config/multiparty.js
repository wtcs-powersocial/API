const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty({ uploadDir: '../uploads' });

module.exports = multipartyMiddleware;