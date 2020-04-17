'use strict';

const bodyParser = require('body-parser');
const authenticate = require('../../../modules/common/authenticate');

module.exports = (app) => {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

  //Estoy autenticando todos los request, pero podría hacerlo para
  //los request que me interese por separado
  app.use(authenticate, function (req, res, next) {
    console.log('Method & Url', req.method, req.url);
    console.log('------------ BODY -------------');
    console.log(req.body);
    console.log('-------------------------------');

    next();
  });
};
