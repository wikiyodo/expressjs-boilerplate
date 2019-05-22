var express = require('express');
const pathResolver = require(process.env.resolver);
const UserController = require(pathResolver.controllers('user-controller'));
var router = express.Router();
var $ = pathResolver.parser;

// router.post($('api.user.register', 'api'), UserController.register);

module.exports = router;