const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
require('dotenv').config();

const ENV = process.env.NODE_ENV || 'dev';
const app = express();
const middlewares = require('./middlewares');
const database = require('./database');

app.use(compress());
app.use(morgan(ENV || 'test'));
app.use(cors());

// passport -> Controle de acesso JWT
app.use(passport.initialize());
middlewares.auth.local(passport);
middlewares.auth.basic(passport);
app.use(passport.session({session: false}));


// body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Chama o db
database.init(mongoose);

// define 'rotas'
app.use('/api/auth', require('./routes').auth);
app.use('/api/layout', require('./routes').layout);
app.use('/api/media', require('./routes').media);
app.use('/api/text', require('./routes').text);


module.exports = app;
