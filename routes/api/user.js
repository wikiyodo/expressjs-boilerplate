var express = require('express');
const pathResolver = require(process.env.resolver);
const UserController = require(pathResolver.controllers('user-controller'));
const TestMiddleWare = require(pathResolver.middleware('wikiMiddleware'));
var router = express.Router();
var $ = pathResolver.parser;

router.get($('api.user.roles.get', 'api'), UserController.getUserRoles);
router.get($('api.user.register.:role.save', 'api'), UserController.register);

module.exports = router;