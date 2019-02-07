/**
 * This contains all DB interactions that involves the User model
 * No Method/class/object is allowed to use the User model directly unless through this file
 */

// All methods here assume that all neccessary validations are done

const pathResolver = require(process.env.resolver);
const User = require(pathResolver.model('user')).Bank;
const Roles = require(pathResolver.defaultPath('global/user-roles'));

var UserInteractor = {};

UserInteractor.createCustomer = (firstname, lastname, email, phoneNumber, deviceIp, deviceName, longitude, latitude) => {
    var address = {
        latitude: latitude,
        longitude: longitude,
    };

    email = email || '';

    devices = {
        name: deviceName,
        ip: deviceIp,
    };
    User.insert({
        firstname,
        lastname,
        email,
        phone,
        accountType: Roles.CUSTOMER.slug,
        devices,
        address
    });
};

module.exports = UserInteractor;