const express = require('express');
const cors = require('cors');
const routes = require('../routes');

module.exports = function serverAppUse() {
  const app = express();

  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(routes);

  return app;
};
