'use strict';

// Dependencias
const express = require('express'),
  app = express(),
  http = require('http'),
  middlewares = require('./middlewares'),
  routes = require('./routes');

function createServer() {
  // Middlewares
  middlewares(app);

  //Rutas
  routes(app);

  //Levanta el servicio
  let server = http.createServer(app);

  server.listen(8080, function () {
    console.log('Server is running!');
    console.log('Date: ', new Date().toLocaleDateString());
    console.log('visit => https://localhost:8080');
  });
}

module.exports = createServer;
