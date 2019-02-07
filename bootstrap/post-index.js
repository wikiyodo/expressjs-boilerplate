/**
*   This initiates all bootables that can only be booted after the main bootables
    that are added to the system
*   Any bootable file to be added to this booter then but be an object, with a method init() which is
*   which serves as the singlet entry to the bootable file
*/

const BootRouter = require('./boot-router');


const bootables = [
    BootRouter,
];


const init = (app) => {
    bootables.map((e, i) => {
        e(app);
    });
};

module.exports = init;