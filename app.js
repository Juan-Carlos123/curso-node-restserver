require('dotenv').config();
const Server = require('./models/server');

const listen = new Server();

listen.listens();

