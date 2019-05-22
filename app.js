'use strict';

const express = require("express");
const app = express();

const helpers = require("./helpers/index");
const Booter = require("./bootstrap/index");
let bodyParser = require('body-parser');
let cors = require("cors");
const path = require('path');


// init booter
Booter(app);



// due to the asynchronous nature of some bootables in the above
// we will observe 300ms silence then proceed to executing the remaining
const serverStart= async () => {
    console.warn("waiting for booters...");
	app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

    await sleep(300);

    const PostBooter = require("./bootstrap/post-index");
    PostBooter(app);

    console.log("proceeding to server start");

    const userMiddleWare = require('./app/Model/user');

    const port = 3003;

    // set template engine 
    // app.set('view engine', 'hbs')

    // set view engine
    // app.set('views', path.join(__dirname, 'resources/view'))

    app.use(express.static('public'))
    // console.clear();


    app.listen(port, () => {
        console.log("This app is listening on port " + port);
    });
};

var sleep = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};
serverStart();