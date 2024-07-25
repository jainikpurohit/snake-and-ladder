const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const configureMiddleware = (app) => {
  app.use(morgan('combined')); // Logging
  app.use(helmet()); // Security
  app.use(rateLimit({ // Rate limiting
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
};

module.exports = configureMiddleware;
