const helpers = require("./helpers/index");
var util = require('util');
const Booter = require("./bootstrap/index");
// init booter
Booter();


var sleep = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};
const PostBooter = require("./bootstrap/post-index");

(async () => {
    await sleep(300);
    var argv = process.argv.slice(2);

    const arguments = require('./commands/index');

    const runCommand = (args) => {
        if (args.length == 0) return;

        var command = args[0];
        var params = args.splice(1);

        var callback = arguments[command];

        if (callback)
            callback(params);
        else {
            // no command was found
            console.error(command + " command not found");
            console.log("here is a list of available commands");
            for (var command in arguments) {
                console.log(command);
            }
        }
    };

    if (argv.length == 0) {
        console.info("I am at your command!");
        console.log("I am waiting for your command!")
        console.info("use 'quit' command to make me stop");
        process.stdin.resume();
        process.stdin.setEncoding('utf-8');

        process.stdin.on('data', (text) => {
            text = text.trim();
            if (text == 'quit' || text == 'quit\n') {
                process.exit();
                console.log("I am exiting");
                return 1;
            }
            var args = text.split(' ');
            process.stdin.pause();
            runCommand(args);
        });
    } else {
        runCommand(argv);
    }

})();
