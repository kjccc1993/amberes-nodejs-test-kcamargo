//Base de datos ficticia (se resetea cada vez que se reinicia el servicio),
//en producción esto no se puede hacer debido a que colapsaría la memoria de la máquina.
//Nunca he usado postgresql, pero creo que para los fines de la prueba
//esta funcion autoejecutada funciona bastante bien.

const coinsDB = (function () {
  let coins = {};

  return {
    update: (coin, price) => (coins[coin] = price),
    get: (coin) => (coin ? coins[coin] : coins),
  };
})();

module.exports = coinsDB;
