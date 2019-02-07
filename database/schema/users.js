const resolver = require(process.env.resolver);
var mongoose = require('mongoose');
var lastUpdateDate = require('./plugins/last-update');
var Schema = mongoose.Schema;

// sample for a user schema
var structure = {};
structure.firstname = String;
structure.lastname = String;
structure.email = String;
structure.phone = String;
structure.rating = {
    raters: [
        {
            userId: String,
            star: Number,
            date: { 
                type: Date,
                default: Date.now
            }
        }
    ],
    total: Number,
    all: Number,
    average: Number,
};
structure.registerAt = { type: Date, default: Date.now };
structure.accountType = Number;
structure.companyName = String;
structure.certificate = Number;
structure.idCard = Number;
structure.catalog = [
    {
        imageUrl: String,
        uploadId: String,
    }
];
structure.bankAccount = {
    name: String,
    number: Number,
    code: String,
};

structure.picture = {
    imageUrl: String,
    uploadId: String,
};

structure.banner = {
    imageUrl: String,
    uploadId: String,
};
structure.role = Number;
structure.status = Number;
structure.devices = [
    {
        name: String,
        ip: String,
        date: {
            type: Date,
            default: Date.now
        },
    }
];
structure.cards = [
    {
        number: Number,
        cvv: Number,
        expiry: {
            month: Number,
            year: Number
        },
        date: { type: Date, default: Date.now}
    }
];
structure.address = {
    latitude: Number,
    longitute: Number
};

var userSchema = new Schema(structure);

userSchema.plugin(lastUpdateDate);

module.exports = userSchema;