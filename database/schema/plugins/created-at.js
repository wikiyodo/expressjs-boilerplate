var registerAtPlugin = (schema, options) => {
    schema.add({ registerAt: Date });
    schema.pre('save', (next) => {
        this.registerAt = new Date;
        next();
    });

    if (options && options.index) {
        schema.path('registerAt').index(options.index);
    }
};


module.exports = registerAtPlugin;