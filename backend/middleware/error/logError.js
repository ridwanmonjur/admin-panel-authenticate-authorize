const { winstonLogger } = require( '../../winston/logger');

const logError = (err, _req, _res, next) => { 
    winstonLogger.error(err); 
    next(err);
};

module.exports = { logError }