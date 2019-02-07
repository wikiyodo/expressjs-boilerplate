/**
* This contains the logic for database seeding
*/

var resolver = require(process.env.resolver);
var data = require(resolver.defaultPath('helpers/data/index'));
var config = resolver.env.get();

// declare the default directory for data
var dataDefaultDirectory = ('./seed');
// get all seeds
var allSeeds = require(resolver.defaultPath('database/all-seeds.js'))

// implement a method that ticks the number of times the seeder was run
var getSeederValue = (seederName, callback) => {
    data.read(dataDefaultDirectory, seederName, callback);
};

var writeSeederFile = (seederName, value, callback) => {
    var formedValue = {
        name: seederName,
        value: value
    };
    data.write(dataDefaultDirectory, seederName, formedValue, callback);
};

var updateSeederFile = (seederName, value, callback) => {
    var formedValue = {
        name: seederName,
        value: value
    };
    data.update(dataDefaultDirectory, seederName, formedValue, callback);
};

var setSeederValue = (err, value, seederName) => {
    // check if the seeder already exists
    if (value && typeof value == 'object' && value.name) {
        // this seeder already exists
        updateSeederFile(seederName, 1+(parseInt(value.value)), (err) => {
            if(err)
                console.log("Unable to register seed after seeeding because " + err);
            else
                console.log(seederName + " already seeded");
        });
    } else {

        // call seeder file/method
        allSeeds[seederName]();
        // create a new seeder file
        writeSeederFile(seederName, 1, () => {
            console.log("Seeding " + seederName + " successful");
        });
    }

};


var tickSeeder = (seederName) => {
    getSeederValue(seederName, setSeederValue)
};

var wizard = () => {
    // now iterate through the seeds and run each
    for (var seederName in allSeeds) {
        console.log("Seeding " + seederName);
        //now tick this in the seeder database
        tickSeeder(seederName);
    }
}

module.exports = wizard;