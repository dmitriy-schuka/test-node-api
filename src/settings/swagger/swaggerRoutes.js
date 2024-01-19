const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-docs.json');

const swaggerRoutes = express.Router();

swaggerRoutes.use('/', swaggerUi.serve);
swaggerRoutes.get('/', swaggerUi.setup(swaggerDocument, { swaggerOptions: { url: '/' } }));

module.exports = swaggerRoutes;
