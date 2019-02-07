var express = require('express');
const pathResolver = require(process.env.resolver);
const UserController = require(pathResolver.controllers('user-controller'));
var BankController = require(pathResolver.controllers('bank-controller'));
const TestMiddleWare = require(pathResolver.middleware('wikiMiddleware'));
var router = express.Router();
var $ = pathResolver.parser;

router.get($('api.bank.get', 'api'), BankController.getAllBanks);

module.exports = router;