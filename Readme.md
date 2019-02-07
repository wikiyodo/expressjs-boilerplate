# Expressjs Boilerplate

A boilerplate application for building web apps using express, mongoose and passport. 


[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

## Usage

    $ git clone https://github.com/wikiyodo/expressjs-boilerplate.git
    $ cd expressjs-boilerplate 
    $ npm install
    $ cp .env.example .env
    $ npm run start:staging
## Features

 - Command line tools
 - MVC project structure
 - Easy database seeding
 - Dynamic Routing
 - Validation
 - 

```bash

├── /.data/                    
├── /app/                   
│   ├── Http
│   │   ├── Controllers
│   │   ├── Middleware
│   ├── Model
├── /bootstrap/                
│   │   ├── boot-configuration.js
│   │   ├── boot-environment.js
│   │   ├── boot-helper-path.js
│   │   ├── boot-router.js
│   │   ├── index.js
│   │   ├── post-index.js
├── /commands/                      
│   ├── index.js
│   ├── seed.js
├── /database/
│   ├── /schema/                   
│   │   ├── bank.js
│   │   ├── users.js
│   ├── /seeds/                    
│   │    ├── bank.js
│   ├── /connection.js
│   └── /all-seeds.js              
├── /global/
│   ├── constants.js
│   ├── user-roles.js
├── /helpers/*
├── /resources/
│   ├── /lang/
│   ├── /view/
├── /routes/
│   ├── /api/
│   │   ├── index.js
│   │   ├── user.js
│   │   ├── guest.js
│   ├── index.js
│   ├── routes-string.js
├── /tests/
├── .env
├── .env.example
├── .gitignore
├── app.js
├── cmd.js
├── package.json
├── package-lock.json
└── Readme.md

```
## Resolver
The resolver contains a list of modules that can help in various aspects.
 - parser
 - router
 - connection
 - model
 - dbSchema
 - defaultPath
 - controllers
 - middleware
```
// how to access the resolver
var resolver =  require(process.env.resolver);
```
#### Parser
Used for parsing route strings and object
```
resolver.parser(urlSelector, urlParameters, skipBackSlash);
```
#### Router
Returns a string of path relative to the root directory. 
```
resolver.router('database/all-seeds'); // returns __ROOT_DIRECTORY__/database/all-seeds
```
#### Connection
Returns the path to the DB connection module.
```
const resolver = require(process.env.resolver);
var mongoose = require(resolver.connection());
mongoose.model('User', UserSchema);
```
#### Model
Returns the path to the model file passed as parameter
```
const resolver = require(process.env.resolver);
var bankModelPath = pathResolver.model('bank');
const Bank = require(bankModelPath);
```
#### dbSchema
Returns the path to the database schema file passed as parameter
```
const resolver = require(process.env.resolver);
var bankSchemaPath = resolver.dbSchema('bank');
const BankSchema = require(bankSchemaPath);

var Bank = mongoose.model('Bank', BankSchema);

```
#### Controllers
Returns the path to the controller file passed as parameter
```
const resolver = require(process.env.resolver);
var userControllerPath = resolver.controllers('user-controller');
const UserController= require(userControllerPath);

UserController.deleteUser(user_id, (err, response)=>{ });
```

#### Middleware
Returns the path to the middleware file passed as parameter
```
const resolver = require(process.env.resolver);
var authMiddlewarePath= resolver.middleware('auth');
const AuthMiddleware= require(authMiddlewarePath);

app.use('/user', AuthMiddleware);
```

## Routing
All routes are contained in the __PROJECT_DIRECTORY__/routes and are attached/mapped to the base router which is contained in /routes/index.js
```
var express = require('express');
var router = express.Router();
// this contains all API routes.
var apiRouter = require('./api/index');
// this contains all routes that can be accessed via the web browsers
var webRouter = require('./web/index');
var routeString = require('./routes-string');

module.exports = (app) => {
    app.use('/api', apiRouter);
    app.use('/', apiRouter);
};
```
### Create a route file
Say, you want to create an API endpoint for people to get the current server time in a separate file (time.js which will contain all endpoints relating to time). 
#### Step 1: Create route file.
Create and open /routes/api/time.js. then the content should look like:
```
var express = require('express');
var router = express.Router();

// endpoint = /api/time/current
router.get('/current'), (req, res)=>{
	res.status = 200;
	res.send({time:Date.now});
	res.end();
});

module.exports = router;
```
#### Step 2: Link the route file to the API route file for recognision
```
...
const TimeRouter = require('./time'); // this loads the time.js file

...

// use endpoint = /api/time
router.use('/time', TimeRouter );
```
#### Step 3: Test with your postman or whatever tool you wish to use.

### Dynamic Routing
Dynamic routing allows you to place and declare all your routes/paths in a file and call them for use anywhere without the need of re-declaring it. Once you change the value of a route, it changes everywhere it is used.

All routes & paths are placed in /routes/routes-string.js
```
const api = {
    user: {
        get: '/:id',
        roles: {
            get: '/all',

        },
        register: {
            ':role': {
                save: '/save/:userId?'
            }
        }
    },
    bank: {
        get: '/all'
    }
};

const WEB = {

};


module.exports = {
    api,
    ...WEB
};

```

```
...
const resolver = require(process.env.resolver);
// the dynamic routing module is place in the resolver and can be accessed resolver.parser
var $ = resolver.parser;
...
// $('api.bank.get', 'api') returns /api/bank/all as path
router.get($('api.bank.get', 'api'), BankController.getAllBanks);

```
__resolver.parser(path, trimIndex)__ is used to parse the indexes of a route.
```
Given that our route is -->
{
	user: {
		get:{
			all: '/all'
		},
		':userId':{
			profile: 'profile'
		}
	}
}

// to formulate user/get/all we will transverse through the index user.get.all
// to formulate user/:userId/profile, transverse through user.:userId.profile

resolver.parser('user.get.all'); // returns /user/get/all
resolver.parser('user.get.all', 'user'); // returns /get/all
resolver.parser('user.get.all', 'user.get'); // returns /all
resolver.parser('user.:userId.profile', {
	userId: 3
}); // returns /user/3/profile
```
## Database Setup
To set your database details, open /.env file, and update the content as follows:
```
  "DATABASE": {
    "USERNAME": "YOUR DATABASE USERNAME",
    "PASSWORD": "YOUR DATABASE PASSWORD",
    "HOST": "YOUR DATABASE HOST e.g localhost",
    "PORT": "YOUR DATABASE PORT e.g 27017",
    "NAME": "YOUR DATABASE NAME",
    "OPTIONS": {} // extra mongoose options
  }
```
## Controllers
To create a controller, create a new file e.g user-controller.js in /app/Http/Controllers. A typical controller looks like this;
```
const resolver = require(process.env.resolver);
const Controller = require('./controller');
var UserController = {};

UserController.getUserRoles = (req, res, next) => {
    var returnableRoles = [];
    for (var role in Roles)
        returnableRoles.push(Roles[role]);
    Controller.defaultResponse(res, returnableRoles);
};

module.exports = UserController;
```
To access your controller anywhere, your can easily use **resolver.controllers('name-of-your-controller')**
```
...
const resolver = require(process.env.resolver);
const UserController = require(resolver.controllers('user-controller'));
...
router.get('/user/roles', UserController.getUserRoles);
...
```

## Middleware
To create a middleware, create a new file e.g auth.js in /app/Http/Middleware. A typical middleware looks like this;
```
module.exports = (req, res, next) => {
    // your logic here

    // proceed to next middleware
    next();
}

module.exports = UserController;
```
To access your middleware anywhere, your can easily use **resolver.middleware('name-of-your-controller')**
```
...
const resolver = require(process.env.resolver);
const AuthMiddleware= require(resolver.middleware('auth'));
...
router.use('/user', AuthMiddleware);
...
```
## Schema
All database schema for the project is placed in /database/schema directory. A typical schema looks like this:
```
const resolver = require(process.env.resolver);
var mongoose = require(resolver.connection());
var lastUpdateDate = require('./plugins/last-update');
var Schema = mongoose.Schema;

// sample for a bank schema
var structure = {};
structure.name = String;
structure.code = String;

var bankSchema = new Schema(structure);

bankSchema.plugin(lastUpdateDate);

module.exports = bankSchema;
```
## Seeds
All database seeds are placed in /database/seeds directory.
```
const pathResolver = require(process.env.resolver);
const Bank= require(pathResolver.model('bank')).Bank;


var getBanks = () => {
    return {
        "ACCESS BANK": "044",
        "ACCESSMOBILE": "323",
        "ASO SAVINGS AND LOANS": "401",
        "CELLULANT": "317",
        "CENTRAL BANK OF NIGERIA": "001",
        "CITIBANK": "023",
        "CORONATION MERCHANT BANK": "559",
        "CORPORETTI": "310",
        "COVENANT MICROFINANCE BANK": "551",
        "DIAMOND BANK": "063",
        "EARTHOLEUM(QIK QIK)": "302",
        "ECOBANK NIGERIA": "050",
        "ECOMOBILE": "307",
        "EKONDO MICROFINANCE BANK": "562",
        "ENTERPRISE BANK": "084",
        "EQUITORIAL TRUST BANK": "040",
        "E - TRANZACT": "306",
        "FBN M- MONEY": "309",
        "FBN MORTGAGES": "413",
        "FETS(MY WALLET)": "314",
        "FIDELITY BANK": "070",
        "FIDELITY MOBILE": "318",
        "FINATRUST MICROFINANCE BANK": "608",
        "FIRST BANK OF NIGERIA": "011",
        "FIRST CITY MONUMENT BANK": "214",
        "FIRST INLAND BANK": "085",
        "FORTIS MICROFINANCE BANK": "501",
        "FORTIS MOBILE": "308",
        "FSDH": "601",
        "GT MOBILE MONEY": "315",
        "GUARANTY TRUST BANK": "058",
        "HEDONMARK": "324",
        "HERITAGE BANK": "030",
        "IMPERIAL HOMES MORTGAGE BANK": "415",
        "INTERCONTINENTAL BANK": "069",
        "JAIZ BANK": "301",
        "JUBILEE LIFE": "402",
        "KEGOW": "303",
        "KEYSTONE BANK": "082",
        "MAINSTREET BANK": "014",
        "MIMONEY(POWERED BY INTELLIFIN)": "330",
        "M - KUDI": "313",
        "MONETIZE": "312",
        "MONEYBOX": "325",
        "NEW PRUDENTIAL BANK": "561",
        "NPF MFB": "552",
        "OCEANIC BANK": "056",
        "OMOLUABI SAVINGS AND LOANS": "606",
        "ONE FINANCE": "565",
        "PAGA": "327",
        "PAGE MFBANK": "560",
        "PARALLEX": "502",
        "PARKWAY(READY CASH)": "311",
        "PAYATTITUDE ONLINE": "329",
        "PAYCOM": "304",
        "PROVIDUS BANK": "101",
        "SAFETRUST MORTGAGE BANK": "403",
        "SEED CAPITAL MICROFINANCE BANK": "609",
        "SKYE BANK": "076",
        "STANBIC IBTC BANK": "221",
        "STANBIC MOBILE": "304",
        "STANDARD CHARTERED BANK": "068",
        "STERLING BANK": "232",
        "STERLING MOBILE": "326",
        "SUNTRUST": "100",
        "TEASY MOBILE": "319",
        "TRUSTBOND": "523",
        "U - MO": "316",
        "UNION BANK OF NIGERIA": "032",
        "UNITED BANK FOR AFRICA": "033",
        "UNITY BANK": "215",
        "VFD MICROFINANCE BANK": "566",
        "VISUAL ICT": "328",
        "VTNETWORK": "320",
        "WEMA BANK": "035",
        "ZENITH BANK": "057",
        "ZENITH MOBILE": "322"
    };
};

var locationSeed = () => {
    // get all banks 
    banks = getBanks();
    var insertables = [];
    for (var name in banks) {
        var code = banks[name];
        insertables.push({
            name,
            code
        });
    }

    Bank.insertMany(insertables, (err, docs) => {
        if (err) {
            console.error(err);
        }
    });
};

module.exports = locationSeed;
```
**After placing your seed in the seeds directory, you must specify it in /database/all-seeds.js to enable the seeder to locate it** 
```
var SeedBanks= require('./seeds/banks');

var exports = {
    SeedBanks,
    // place your seeds here
};

module.exports = exports;
```

To migrate your seeds then you use the bellow command.
```
> node cmd run:seed
```

## Commands
This enable you to run certain commands in the CLI. 

**To create you custom command;**
create a file that host the logic to your command in */commands* e.g /commands/remove-users.js could contain the below snippet
```
var exports = {};

exports.removeOldUsers = (args) => {
    // logic here
};

module.exports = exports;
```

then specify your command name and also a callable function in */commands/index.js*
```

var seeder = require('./seed');

/**
 * @info all arguments are to be placed here
 */
const arguments = {
    'run:seed': seeder.runSeed,
    'your_command': CallableFunction
};


module.exports = arguments;
```

##  Validation
This allows you to validate a given value against some set of rules. 
```
// Use this to import validation module
var resolver = require(process.env.resolver);
var validator = require(resolver.validator());

```
validations are done asynchronously. 
**validator(array_of_rules, callback);**

```

validator([
   {
       fieldName: "name",	// name of the field
       fieldValue: 2, 	// the value of the field
       validation: 'min:3|max:4', // set of validation rules
       errorMessage:"Invalid name" // custom error message for all rules.
   }
], (result) => {
       res.send(result);
       res.end();
   });
```
The allowed rules include:
#### min:value
This checks that the giving value is of minimum length or value of the specified value. e.g. min:2, checks that the string has a minimum length of 2 characters and in case it is numerical, it checks that the given number is greater than or equals 2.
#### max:value
This checks that the giving value is of maximum length or value of the specified value. e.g. min:2, checks that the string has a maximum length of 2 characters and in case it is numerical, it checks that the given number is less than or equals 2.
#### alpha
This checks that the given value only contains alphabetical characters and nothing else.
#### alpha-num
This checks that the given value only contains alpha numerical characters and nothing else.
#### array
This confirms that the given value is an array of items.
#### decimal
This confirms that the given value is a decimal number
#### email
This validates that the given value is a valid email.
#### number
This validates that the given value contains only numerical values.
#### phone 
This checks if the given value is a valid phone number.
#### required
This checks that the given value is not empty.

**To check if a validation failed**
```
validator(rules, (result) => {
		result.failed(); // returns a boolean. true when it fails and false when it doesnt.
		result.getFirst('field name'); // returns the first error for the field and undefined in case there is no error
		result.getError('field name'); // returns all errors for the field
   });
```
## Testing
Unit testing has not been included in this boilerplate. However, you can choose to include it  on your own.

## License

MIT
