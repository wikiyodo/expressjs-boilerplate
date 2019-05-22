var express = require('express');
const pathResolver = require(process.env.resolver);
const AuthMiddleWare = require(pathResolver.middleware('authMiddleware'));
var router = express.Router();
var $ = pathResolver.parser;


// router.use($('api.event.root', 'api'), AuthMiddleWare);

module.exports = router;