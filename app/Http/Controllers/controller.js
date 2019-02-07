var controller = {};

controller.defaultResponse = (res, content, message, status) => {

    res.send({
        status: status ? status : false,
        message: message || "action completed",
        extras: content || []
    });
    res.end();
};

module.exports = controller;