let express = require('express'),
  coinsRouter = express.Router(),
  coinsCtrl = require('../../../modules/coins/coins.ctrl');

coinsRouter.route('/').get(coinsCtrl.getMarketPrices);
coinsRouter.route('/set').post(coinsCtrl.setCoinPrice);
coinsRouter.route('/convert').post(coinsCtrl.convertCoins);

module.exports = coinsRouter;
