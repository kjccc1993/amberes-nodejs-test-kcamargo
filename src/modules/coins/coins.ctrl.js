const httpRequest = require('../common/request');
const coinsDB = require('../../infrastructure/database/coins.db');

module.exports = { getMarketPrices, setCoinPrice, convertCoins };

const binanceUrl = 'https://api.binance.com/api/v3/avgPrice?symbol=';
const petroUrl = 'https://petroapp-price.petro.gob.ve/price/';

function getMarketPrices(req, res) {
  const { usedb } = req.query;
  getCoinsPrices(usedb)
    .then((data) => res.status(200).json({ message: 'successful', data }))
    .catch((err) => res.status(400).json({ message: 'unsuccessful', err }));
}

function getCoinsPrices(usedb) {
  const coins = 'BTC,ETH,DASH,EUR'.split(',');
  let prCoins = [];
  let prCoinsVzla = [];

  //Armo el arreglo de promesas para los request de cada moneda
  prCoins = coins.map((coin) => {
    return httpRequest({ url: `${binanceUrl}${coin}USDT`, method: 'GET' })
      .then(({ body }) => ({ coin, price: Number(body.price) }))
      .catch((err) => Promise.reject({ message: 'Error consultando la moneda', coin, err }));
  });

  //Request para PTR y BS
  prCoinsVzla = httpRequest({
    url: petroUrl,
    method: 'POST',
    body: {
      coins: ['PTR', 'BS'],
      fiats: ['USD'],
    },
  })
    .then(({ body }) => {
      const {
        data: { PTR, BS },
      } = body;
      const resp = [];

      if (PTR) resp.push({ coin: 'PTR', price: PTR.USD });
      if (BS) resp.push({ coin: 'BS', price: BS.USD });

      //simulo que no se encontro ni PTR ni BS.
      return usedb ? [] : resp;
    })
    .catch((err) => Promise.reject({ message: 'Error consultando la moneda', err }));

  return Promise.all([Promise.all(prCoins), prCoinsVzla])
    .then(([coinsResp, coinsVzlaResp]) => {
      const validated = _validateCoins(coinsResp.concat(coinsVzlaResp));
      return validated;
    })
    .catch((err) => {
      console.log('Error consultando', err);
      return Promise.reject(err);
    });

  //valida si están todas las monedas
  function _validateCoins(resp) {
    const mandatory = coins.concat(['PTR', 'BS']);
    const fixed = {
      PTR: 60, //1PTR = 60USD
      BS: 0.00001, //100.000BS = 1USD
    };

    mandatory.forEach((e) => {
      //No se encontró en la consulta, lo agrego de la base de datos
      if (!resp.find((f) => f.coin === e)) {
        resp.push({
          coin: e,
          price: coinsDB.get(e) || fixed[e],
        });
      }
    });

    return resp;
  }
}

function setCoinPrice(req, res) {
  const { coin, price } = req.body;
  coinsDB.update(coin, price);

  res.status(200).json({ message: 'successful' });
}


function convertCoins(req, res) {
  const { coin, amount } = req.body;
  const { usedb } = req.query;

  getCoinsPrices(usedb)
    .then((data) => {
      const coinBase = data.find((e) => e.coin == coin);
      const usdBase = coinBase.price * amount;
      const converted = data.map((e) => ({ coin: e.coin, price: usdBase / e.price }));

      res.status(200).json({ message: 'successful', data: converted });
    })
    .catch((err) => res.status(400).json({ message: 'unsuccessful', err }));
}
