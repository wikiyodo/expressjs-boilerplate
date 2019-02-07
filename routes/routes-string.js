const api = {
    parent:'/api',
    user: {
        get: '/:id',
        roles: {
            get: '/all',

        },
        parent: this,
        register: {
            ':role': {
                save: '/save/:userId?'
            }
        }
    },
    bank: {
        get: '/all'
    }
};

const WEB = {

};


module.exports = {
    api,
    ...WEB
};
