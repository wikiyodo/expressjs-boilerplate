var express = require('express');
const pathResolver = require(process.env.resolver);
const UserController = require(pathResolver.controllers('user-controller'));
const GuestRouter = require('./guest');
const UserRouter = require('./user');
var router = express.Router();
var $ = pathResolver.parser;

router.use('/', GuestRouter);
router.use('/', UserRouter);



router.use(UserController.notFound);

module.exports = router;