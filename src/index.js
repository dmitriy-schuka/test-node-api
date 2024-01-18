require('dotenv').config();

const app = require('./settings/express');
const PORT = process.env.NODE_PORT || 8000;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));