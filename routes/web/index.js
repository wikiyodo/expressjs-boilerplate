var express = require('express');
const pathResolver = require(process.env.resolver);
const UserController = require(pathResolver.controllers('user-controller'));
const TestMiddleWare = require(pathResolver.middleware('wikiMiddleware'));
var router = express.Router();
var $ = pathResolver.parser;


router.use($('api.user.get', 'api.user'), TestMiddleWare);
router.get('/user/:id', function (req, res, next) {
    res.send({ wiki: "tesnet" });
    res.end();
});

router.use(UserController.notFound);

module.exports = router;