const express = require('express');
const cors = require('cors');
const swaggerRoutes = require('../swagger/swaggerRoutes');
const router = require('../../routes');
const ErrorHandlers = require('../../middlewares/errorHandler');
const app = express();

/** cors */
app.use(cors());
app.options('*', cors());

app.use(express.json());

/** api */
app.use('/api/v1', router );
app.use('/api-docs', swaggerRoutes);

router.use(ErrorHandlers.handleApplicationError);

module.exports = app;