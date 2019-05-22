var controller = {};

controller.defaultResponse = (res, content, message, status) => {

    res.send({
        status: status ? status : false,
        message: message || "action completed",
        extras: content || []
    });
    res.end();
};

controller.success = (res, content, message) => {
    return controller.defaultResponse(res, content, message, true);
};


controller.error = (res, content, message) => {
    return controller.defaultResponse(res, content, message, false);
};

module.exports = controller;