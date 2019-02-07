var lastUpdatePlugin = (schema, options) => {
    schema.add({ lastUpdateDate: Date });
    schema.pre('save', (next) => {
        this.lastUpdateDate = new Date;
        next();
    });

    if (options && options.index) {
        schema.path('lastUpdateDate').index(options.index);
    }
};


module.exports = lastUpdatePlugin;