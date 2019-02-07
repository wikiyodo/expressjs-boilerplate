var express = require('express');
var router = express.Router();
var apiRouter = require('./api/index');
var webRouter = require('./web/index');
var routeString = require('./routes-string');

module.exports = (app) => {
    app.use('/api', apiRouter);
    app.use('/web', apiRouter);
};