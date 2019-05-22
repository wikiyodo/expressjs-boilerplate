// import helpers
const pathResolver = require(process.env.resolver);
const UserModel = require(pathResolver.model('user'));
const User = UserModel.User;
const Controller = require('./controller');
let validator = require(pathResolver.validator());
const helpers = require(pathResolver.defaultPath('helpers/aob'));

let UserController = {};

UserController.notFound = (req, res, next, message, extras) => {
    res.status = 404;
    Controller.defaultResponse(res,null, message, false);
};

UserController.register = (req, res, next) => {
    // validate the request
    // required: firstname, lastname, email, password
    let {firstName, lastName, email, password} = req.body;
    validator([
        {
            fieldName: "first name",	// name of the field
            fieldValue: firstName, 	// the value of the field
            validation: 'required|alpha|min:3|max:15', // set of validation rules
        },
        {
            fieldName: "last name",	// name of the field
            fieldValue: lastName, 	// the value of the field
            validation: 'required|alpha|min:3|max:15', // set of validation rules
        },
        {
            fieldName: "email",	// name of the field
            fieldValue: email, 	// the value of the field
            validation: 'required|email', // set of validation rules
        },
        {
            fieldName: "password",	// name of the field
            fieldValue: password, 	// the value of the field
            validation: 'required|string|min:3|max:15', // set of validation rules
        },
     ], (validation) => {
            if(validation.failed()){
                Controller.error(res,{
                    firstName: validation.firstError('first name'),
                    lastName: validation.firstError('last name'),
                    email: validation.firstError('email'),
                    password: validation.firstError('password'),
                }, "Account could not be created. Check fields to fix error");
                return;
            }

            // check if a similar user exists : email must be unique
            UserModel.userExists({email}, (exists)=>{
                console.log(exists);
                if(exists){
                    Controller.error(res,{
                        email: "This account already exists",
                    }, "Account could not be created. Check fields to fix error");
                    return;
                }else{
                    // the validation was successful then create the user account
                    UserModel.createUser(firstName, lastName, email, password);
                    Controller.success(res, null, "Your account has been created!")
                    return;
                }
            });
        });
};


UserController.login = (req, res, next) => {
    // validate the request
    // required: firstname, lastname, email, password
    let { email, password } = req.body;
	console.log(password);
    validator([
        {
            fieldName: "email",	// name of the field
            fieldValue: email, 	// the value of the field
            validation: 'required|email', // set of validation rules
        },
        {
            fieldName: "password",	// name of the field
            fieldValue: password, 	// the value of the field
            validation: 'required|string', // set of validation rules
        },
     ], (validation) => {
            if(validation.failed()){
                Controller.error(res,null, "Invalid username/password");
                return;
            }

            // get the account associated with 
            UserModel.findUser({email}, async (err, user)=>{
                if(user == null || user.password !== helpers.hash(password)){
                    Controller.error(res,null, "Invalid username/password");
                    return;
                }
                user.password = undefined;
                user.apiKey  = undefined;    
                let apiKey= await UserModel.setApiKey(user._id);
                console.log(apiKey);
                Controller.success(res,{apiKey,user}, "You have successfully logged in.");
            });
        });
};


module.exports = UserController;