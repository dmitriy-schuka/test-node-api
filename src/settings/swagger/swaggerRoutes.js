const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-docs.json');

const swaggerRoutes = express.Router();
swaggerRoutes.get('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = swaggerRoutes;
