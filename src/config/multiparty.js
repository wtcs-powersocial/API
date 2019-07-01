const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty({ uploadDir: '../upload' });

module.exports = multipartyMiddleware;