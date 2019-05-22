const pathResolver = require(process.env.resolver);
const mongoose = require('mongoose');
const UserSchema = require(pathResolver.dbSchema('users'));
const helpers = require(pathResolver.defaultPath('helpers/aob'));

let User = mongoose.model('User', UserSchema);

let userVotes = (user) => {
    if (user instanceof 'object')
        return user.votes;
    return 0;
};

let userExists = (parameters, callback) => {
    findUser(parameters, (err, user)=>{
        callback(user != null);
    });
};

let findUser = (parameter, callback) => {
    return User.findOne(parameter, callback);
};

let createUser = async (firstName, lastName, email, password, callback) => {
    password = helpers.hash(password);
    if(!callback)
        callback = ()=>{};
    
    User.create({firstName, lastName, email, password}).then(callback);
};

let updateUser = async (userId, params, callback) => {
    if(params.password)
        params.password = helpers.hash(params.password);
    
    if(!callback)
        callback = ()=>{};
    
    User.findOneAndUpdate({ _id: userId }, params, ).then(callback);
};

let setApiKey = async (userId, callback) => {
    let apiKey = helpers.createRandomString(100);
    console.log(apiKey);
    updateUser(userId, {apiKey}, callback);

    if(!callback)
        return apiKey;
};


module.exports = {
    User,
    userVotes,
    userExists,
    createUser,
    updateUser,
    setApiKey,
    findUser
};  