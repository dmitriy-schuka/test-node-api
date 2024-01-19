require('dotenv').config();

const server = require('./settings/express');
const PORT = process.env.NODE_PORT || 8000;

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));