const pathResolver = require(process.env.resolver);
const Roles = require(pathResolver.defaultPath('global/user-roles'));
const Controller = require('./controller');
var UserController = {};

UserController.notFound = (req, res, next, message, extras) => {
    res.status = 404;
    Controller.defaultResponse(res,null, message, false)
};

UserController.getUserRoles = (req, res, next) => {
    var returnableRoles = [];
    for (var role in Roles)
        returnableRoles.push(Roles[role]);
    Controller.defaultResponse(res, returnableRoles);
};

UserController.register = (req, res, next) => {
    var userRole = req.params.role || '';

    switch (userRole.toLowerCase()) {
        case Roles.SERVICE_PROVIDER.slug:
            UserController.registerAsServiceProvider(req, res, next, () => { })
            break;
        case Roles.CUSTOMER.slug:
            UserController.registerAsServiceProvider(req, res, next, () => { })
            break;
        default:
            UserController.notFound(req, res, next, userRole + " user role not found for registration")
                break;
    }
};

UserController.registerAsServiceProvider = (req, res, next, callback) => {

};


UserController.registerAsCustomer = (req, res, next, callback) => {
    
};


module.exports = UserController;