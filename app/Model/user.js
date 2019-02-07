const pathResolver = require(process.env.resolver);
const mongoose = require('mongoose');
const UserSchema = require(pathResolver.dbSchema('users'));

var User = mongoose.model('User', UserSchema);

var userVotes = (user) => {
    if (user instanceof 'object')
        return user.votes;
    return 0;
};

module.exports = {
    User,
    userVotes
};  