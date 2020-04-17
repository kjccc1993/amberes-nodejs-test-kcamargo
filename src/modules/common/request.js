'use strict';
const request = require('request');

module.exports = httpRequest;

function httpRequest({ body, method, url, headers }) {
  return new Promise(function (resolve, reject) {
    const REQUEST = {
      GET: request.get,
      PUT: request.put,
      POST: request.post,
      DELETE: request.delete,
      OPTIONS: request.options,
    };

    const options = {
      url,
      json: body || '',
      headers,
    };

    REQUEST[method](options, _perform);

    function _perform(err, resp) {
      if (err) {
        console.log('Error en el request', err);
        return reject({ message: 'Server error', err });
      }

      if (!resp) {
        return reject({ message: 'Sin respuesta del servidor' });
      }

      try {
        resp.body = resp.body && typeof resp.body == 'string' ? JSON.parse(resp.body) : resp.body;
      } catch (err) {
        console.log('Error parseando respuesta', err);
        reject('Error parseando respuesta');
      }

      return resolve(resp);
    }
  });
}
