const pathResolver = require(process.env.resolver);
const UserModel = require(pathResolver.model('user'));

module.exports = (req, res, next) => {
    // check if the autorization key is present
    let apiKey = req.header('Authorization') || '';
    apiKey = apiKey.substring(7, apiKey.length);

    // get the user with auth key
    let user = UserModel.findUser({apiKey}, (err, user)=>{
        if(err || !user){
            res.status(401);
            res.send({
                status:  false,
                message: "Authentication failed",
                extras: []
            });
            res.end();
            return;
        }
        console.log("User authenticated");
        res.locals.user = user;
        next();
    });
}
