var express = require('express');
const pathResolver = require(process.env.resolver);
const UserController = require(pathResolver.controllers('user-controller'));
var router = express.Router();
var $ = pathResolver.parser;
let path = require('path');
// Handles any requests that don't match the ones above

router.get('*', (req,res) =>{
    console.log(path.join(__dirname+'/public/index.html'));
    res.sendFile(path.join(__dirname+'../../../public/index.html'));
});

module.exports = router;