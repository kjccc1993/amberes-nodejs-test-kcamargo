const mainRouter = require('express').Router();
const coinsRouter = require('./coins');

mainRouter.use('/coins', coinsRouter);

module.exports = (app) => {
  app.use('/api/v1', mainRouter);
};
