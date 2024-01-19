const express = require('express');
const cors = require('cors');
const swaggerRoutes = require('../swagger/swaggerRoutes');
const router = require('../../routes');
const expressConfig = express();

/** cors */
expressConfig.use(cors());
expressConfig.options('*', cors());

expressConfig.use(express.json());

/** api */
expressConfig.use('/api/v1', router );
expressConfig.use('/api-docs', swaggerRoutes);

module.exports = expressConfig;