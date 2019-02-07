var Controller = require('./controller');

const pathResolver = require(process.env.resolver);
const Bank = require(pathResolver.model('bank')).Bank;

var BankController = {};

BankController.notFound = (req, res, next) => {
    res.status = 404;
    res.end();
};

BankController.getAllBanks = (req, res, next) => {
    Bank.find({}, {
        code: 1,
        name: 1,
        _id: 0
    }).then((content) => {
        Controller.defaultResponse(res, content);
    });
};

BankController.getBankByDetail = (req, res, next) => {
    var bankDetail = req.query.name || req.query.code;

    Bank.find({

    }, {
        code: 1,
        name: 1,
        _id: 0
    }).then((content) => {
        Controller.defaultResponse(res, content);
    });
};

module.exports = BankController;